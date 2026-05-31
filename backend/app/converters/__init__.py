"""Conversion registry. Add new converters by decorating with @register."""
from __future__ import annotations

from pathlib import Path
from typing import Callable, Dict, Tuple, Type

from .base import BaseConverter

# Registry: (source_ext, target_ext) -> converter class
SUPPORTED_CONVERSIONS: Dict[Tuple[str, str], Type[BaseConverter]] = {}


def register(source: str, target: str) -> Callable[[Type[BaseConverter]], Type[BaseConverter]]:
    def deco(cls: Type[BaseConverter]) -> Type[BaseConverter]:
        SUPPORTED_CONVERSIONS[(source.lower(), target.lower())] = cls
        return cls

    return deco


def get_converter(source: str, target: str) -> BaseConverter:
    cls = SUPPORTED_CONVERSIONS.get((source.lower(), target.lower()))
    if cls is None:
        raise ValueError(f"Unsupported conversion: {source} -> {target}")
    return cls()


def supported_targets(source: str) -> list[str]:
    src = source.lower()
    return sorted({t for (s, t) in SUPPORTED_CONVERSIONS if s == src})


def all_pairs() -> list[Tuple[str, str]]:
    return sorted(SUPPORTED_CONVERSIONS.keys())


# Register all converters by importing them
from . import pdf_converters  # noqa: E402,F401
from . import image_converters  # noqa: E402,F401
from . import office_converters  # noqa: E402,F401
