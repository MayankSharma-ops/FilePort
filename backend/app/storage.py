"""Ephemeral file storage. Files are auto-purged after TTL."""
from __future__ import annotations

import os
import time
import uuid
from pathlib import Path

from .config import get_settings

settings = get_settings()
STORAGE_ROOT = Path(settings.storage_dir)
STORAGE_ROOT.mkdir(parents=True, exist_ok=True)


def job_dir(job_id: str) -> Path:
    p = STORAGE_ROOT / job_id
    p.mkdir(parents=True, exist_ok=True)
    return p


def new_job_id() -> str:
    return uuid.uuid4().hex


def save_upload(job_id: str, filename: str, data: bytes) -> Path:
    safe = sanitize_filename(filename)
    path = job_dir(job_id) / f"input_{safe}"
    path.write_bytes(data)
    return path


def sanitize_filename(name: str) -> str:
    name = os.path.basename(name)
    keep = "-_.() "
    cleaned = "".join(c for c in name if c.isalnum() or c in keep).strip()
    return cleaned[:120] or "file"


def purge_expired() -> int:
    """Delete job dirs older than TTL. Returns count removed."""
    cutoff = time.time() - settings.file_ttl_minutes * 60
    removed = 0
    if not STORAGE_ROOT.exists():
        return 0
    for entry in STORAGE_ROOT.iterdir():
        try:
            if entry.is_dir() and entry.stat().st_mtime < cutoff:
                _rmtree(entry)
                removed += 1
        except FileNotFoundError:
            continue
    return removed


def _rmtree(path: Path) -> None:
    for sub in path.iterdir():
        if sub.is_dir():
            _rmtree(sub)
        else:
            try:
                sub.unlink()
            except FileNotFoundError:
                pass
    try:
        path.rmdir()
    except FileNotFoundError:
        pass
