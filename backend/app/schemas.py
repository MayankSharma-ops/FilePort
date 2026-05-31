from __future__ import annotations

from typing import Literal, Optional
from pydantic import BaseModel


JobStatus = Literal["queued", "uploading", "parsing", "converting", "ocr", "optimizing", "merging", "splitting", "finalizing", "completed", "failed"]


class UploadResponse(BaseModel):
    job_id: str
    filename: str
    size: int
    detected_format: str
    suggested_targets: list[str]


class ConvertRequest(BaseModel):
    job_id: str
    target_format: str


class JobState(BaseModel):
    job_id: str
    status: JobStatus
    progress: int = 0
    stage: str = ""
    error: Optional[str] = None
    download_url: Optional[str] = None
    output_filename: Optional[str] = None


class FormatPair(BaseModel):
    source: str
    target: str
