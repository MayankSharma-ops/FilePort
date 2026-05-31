from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass
from pathlib import Path
from typing import Callable, Optional


ProgressCb = Callable[[str, int], None]


@dataclass
class ConversionResult:
    output_path: Path
    pages: int = 0


class BaseConverter(ABC):
    """All converters subclass this and implement convert()."""

    source_ext: str = ""
    target_ext: str = ""

    @abstractmethod
    def convert(
        self,
        input_path: Path,
        output_dir: Path,
        progress: Optional[ProgressCb] = None,
    ) -> ConversionResult: ...

    @staticmethod
    def _emit(progress: Optional[ProgressCb], stage: str, percent: int) -> None:
        if progress is not None:
            progress(stage, percent)
