"""Per-job state stored in Redis. Keeps the API stateless."""
from __future__ import annotations

import json
from typing import Optional

import redis

from .config import get_settings
from .schemas import JobState

settings = get_settings()
_r = redis.from_url(settings.redis_url, decode_responses=True)
_TTL_SECONDS = settings.file_ttl_minutes * 60


def _key(job_id: str) -> str:
    return f"gathordocs:job:{job_id}"


def save(state: JobState) -> None:
    _r.set(_key(state.job_id), state.model_dump_json(), ex=_TTL_SECONDS)


def load(job_id: str) -> Optional[JobState]:
    raw = _r.get(_key(job_id))
    if not raw:
        return None
    return JobState.model_validate(json.loads(raw))


def update(job_id: str, **fields) -> Optional[JobState]:
    current = load(job_id)
    if current is None:
        return None
    data = current.model_dump()
    data.update(fields)
    new_state = JobState(**data)
    save(new_state)
    return new_state
