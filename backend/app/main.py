import os
from pathlib import Path
from typing import List

from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from .config import get_settings
from .converters import SUPPORTED_CONVERSIONS, supported_targets
from .db import ConversionLog, init_db, session_scope
from .schemas import JobState, UploadResponse
from .state import load, save
from .storage import job_dir, new_job_id, sanitize_filename, save_upload
from .tasks import convert_task

settings = get_settings()
limiter = Limiter(key_func=get_remote_address, default_limits=[f"{settings.rate_limit_per_minute}/minute"])

app = FastAPI(title="GathorDocs API", version="0.1.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


@app.on_event("startup")
def _startup() -> None:
    try:
        init_db()
    except Exception:
        # DB might not be ready yet in dev; analytics is best-effort
        pass


# ---------- helpers ----------

ALLOWED_EXTS = {"pdf", "docx", "jpg", "jpeg", "png", "webp", "txt"}


def _ext_from_filename(name: str) -> str:
    return Path(name).suffix.lstrip(".").lower()


def _normalize_ext(ext: str) -> str:
    return "jpg" if ext == "jpeg" else ext


# ---------- routes ----------

@app.get("/health")
def health() -> dict:
    return {"ok": True}


@app.get("/api/formats")
def formats() -> dict:
    pairs = [{"source": s, "target": t} for (s, t) in SUPPORTED_CONVERSIONS.keys()]
    return {"pairs": pairs}


@app.post("/api/upload", response_model=UploadResponse)
@limiter.limit(f"{settings.rate_limit_per_minute}/minute")
async def upload(request: Request, file: UploadFile = File(...)) -> UploadResponse:
    if not file.filename:
        raise HTTPException(400, "filename required")

    raw = await file.read()
    if len(raw) == 0:
        raise HTTPException(400, "empty file")
    if len(raw) > settings.max_upload_bytes:
        raise HTTPException(413, "file too large")

    ext = _normalize_ext(_ext_from_filename(file.filename))
    if ext not in ALLOWED_EXTS:
        raise HTTPException(415, f"unsupported file type: {ext}")

    job_id = new_job_id()
    safe_name = sanitize_filename(file.filename)
    save_upload(job_id, safe_name, raw)

    state = JobState(job_id=job_id, status="queued", progress=0, stage="uploaded")
    save(state)

    return UploadResponse(
        job_id=job_id,
        filename=safe_name,
        size=len(raw),
        detected_format=ext,
        suggested_targets=supported_targets(ext),
    )


@app.post("/api/convert", response_model=JobState)
@limiter.limit(f"{settings.rate_limit_per_minute}/minute")
def convert(request: Request, job_id: str = Form(...), target_format: str = Form(...)) -> JobState:
    state = load(job_id)
    if state is None:
        raise HTTPException(404, "job not found or expired")

    workdir = job_dir(job_id)
    input_files = [p for p in workdir.iterdir() if p.is_file() and p.name.startswith("input_")]
    if not input_files:
        raise HTTPException(404, "input file missing or expired")

    input_path = input_files[0]
    source_ext = _normalize_ext(_ext_from_filename(input_path.name.replace("input_", "")))

    if (source_ext, target_format) not in SUPPORTED_CONVERSIONS:
        raise HTTPException(400, f"unsupported conversion: {source_ext} -> {target_format}")

    state.status = "queued"
    state.stage = "queued"
    state.progress = 0
    save(state)

    convert_task.delay(job_id, source_ext, target_format, input_path.name)
    return state


@app.post("/api/merge-pdf", response_model=JobState)
@limiter.limit(f"{settings.rate_limit_per_minute}/minute")
async def merge_pdf(request: Request, files: List[UploadFile] = File(...)) -> JobState:
    if len(files) < 2:
        raise HTTPException(400, "merge requires 2+ files")

    job_id = new_job_id()
    workdir = job_dir(job_id)
    saved: list[Path] = []
    for f in files:
        ext = _normalize_ext(_ext_from_filename(f.filename or ""))
        if ext != "pdf":
            raise HTTPException(415, "only PDF allowed in merge")
        data = await f.read()
        if len(data) > settings.max_upload_bytes:
            raise HTTPException(413, "file too large")
        path = workdir / f"input_{sanitize_filename(f.filename or 'file.pdf')}"
        path.write_bytes(data)
        saved.append(path)

    state = JobState(job_id=job_id, status="queued", progress=0, stage="queued")
    save(state)

    # Merge inline (fast op) instead of via celery for snappy UX
    from .converters.office_converters import merge_pdfs

    out_dir = workdir / "out"
    out_dir.mkdir(exist_ok=True)

    def progress_cb(stage: str, percent: int) -> None:
        state.status = "merging"
        state.stage = stage
        state.progress = percent
        save(state)

    try:
        out = merge_pdfs(saved, out_dir, progress=progress_cb)
        state.status = "completed"
        state.stage = "completed"
        state.progress = 100
        state.download_url = f"/api/jobs/{job_id}/download"
        state.output_filename = out.name
        save(state)
    except Exception as exc:
        state.status = "failed"
        state.error = str(exc)[:480]
        save(state)
    return state


@app.get("/api/jobs/{job_id}", response_model=JobState)
def get_job(job_id: str) -> JobState:
    state = load(job_id)
    if state is None:
        raise HTTPException(404, "job not found or expired")
    return state


@app.get("/api/jobs/{job_id}/download")
def download(job_id: str):
    state = load(job_id)
    if state is None or state.status != "completed" or not state.output_filename:
        raise HTTPException(404, "not ready")
    out_path = job_dir(job_id) / "out" / state.output_filename
    if not out_path.exists():
        raise HTTPException(404, "expired")
    return FileResponse(out_path, filename=state.output_filename)


@app.delete("/api/jobs/{job_id}")
def delete_job(job_id: str) -> dict:
    from .storage import _rmtree

    workdir = job_dir(job_id)
    _rmtree(workdir)
    return {"deleted": True}


@app.get("/api/analytics/summary")
def analytics_summary() -> dict:
    """Aggregated, anonymized stats for public display."""
    try:
        with session_scope() as s:
            total = s.query(ConversionLog).count()
            success = s.query(ConversionLog).filter(ConversionLog.success.is_(True)).count()
            return {
                "total_conversions": total,
                "success_rate": (success / total) if total else 0.0,
            }
    except Exception:
        return {"total_conversions": 0, "success_rate": 0.0}
