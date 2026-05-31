from celery import Celery
from celery.schedules import crontab

from .config import get_settings

settings = get_settings()

celery = Celery(
    "gathordocs",
    broker=settings.redis_url,
    backend=settings.redis_url,
    include=["app.tasks"],
)

celery.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=600,
    task_soft_time_limit=540,
    worker_max_tasks_per_child=50,
)

celery.conf.beat_schedule = {
    "purge-expired-files-every-5-min": {
        "task": "app.tasks.purge_expired_task",
        "schedule": crontab(minute="*/5"),
    },
}
