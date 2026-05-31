from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# Project root .env (one level above backend/)
_ENV_FILE = Path(__file__).resolve().parents[2] / ".env"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=str(_ENV_FILE), extra="ignore")

    # Postgres
    postgres_user: str = "postgres"
    postgres_password: str = "postgres"
    postgres_db: str = "gathordocs"
    postgres_host: str = "localhost"
    postgres_port: int = 5432

    # Redis
    redis_url: str = "redis://localhost:6379/0"

    # Storage
    storage_dir: str = "./storage"
    file_ttl_minutes: int = 30
    max_upload_bytes: int = 100 * 1024 * 1024

    # Security
    allowed_origins: str = "http://localhost:3000"
    rate_limit_per_minute: int = 30

    @property
    def database_url(self) -> str:
        return (
            f"postgresql+psycopg://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
