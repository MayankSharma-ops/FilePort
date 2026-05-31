from __future__ import annotations

import time
from pathlib import Path

from .celery_app import celery
from .converters import get_converter
from .db import ConversionLog, init_db, session_scope
from .schemas import JobState
from .state import load, save, update
from .storage import job_dir, purge_expired


@celery.task(name="app.tasks.convert_task")
def convert_task(job_id: str, source_ext: str, target_ext: str, input_filename: str) -> None:
    started = time.time()
    state = load(job_id) or JobState(job_id=job_id, status="queued", progress=0, stage="queued")
    state.status = "parsing"
    state.stage = "parsing"
    state.progress = 5
    save(state)

    workdir = job_dir(job_id)
    input_path = workdir / input_filename
    output_dir = workdir / "out"
    output_dir.mkdir(exist_ok=True)

    success = False
    error: str | None = None
    file_size = input_path.stat().st_size if input_path.exists() else 0

    def progress_cb(stage: str, percent: int) -> None:
        update(job_id, status=stage if stage in {"parsing", "converting", "ocr", "optimizing", "merging", "splitting", "finalizing"} else "converting", stage=stage, progress=max(state.progress, percent))

    try:
        converter = get_converter(source_ext, target_ext)
        result = converter.convert(input_path, output_dir, progress=progress_cb)
        out_name = result.output_path.name
        update(
            job_id,
            status="completed",
            stage="completed",
            progress=100,
            download_url=f"/api/jobs/{job_id}/download",
            output_filename=out_name,
        )
        success = True
    except Exception as exc:  # pragma: no cover
        error = str(exc)[:480]
        update(job_id, status="failed", stage="failed", progress=100, error=error)
    finally:
        duration = (time.time() - started) * 1000.0
        try:
            init_db()
            with session_scope() as s:
                s.add(
                    ConversionLog(
                        job_id=job_id,
                        source_format=source_ext,
                        target_format=target_ext,
                        file_size=file_size,
                        success=success,
                        duration_ms=duration,
                        error=error,
                    )
                )
        except Exception:
            pass


@celery.task(name="app.tasks.purge_expired_task")
def purge_expired_task() -> int:
    return purge_expired()
