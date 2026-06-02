from __future__ import annotations

from pathlib import Path
from typing import Optional

from PIL import Image

from . import register
from .base import BaseConverter, ConversionResult, ProgressCb


class _ImageConverter(BaseConverter):
    pillow_format: str = ""

    def convert(self, input_path: Path, output_dir: Path, progress: Optional[ProgressCb] = None) -> ConversionResult:
        self._emit(progress, "parsing", 30)
        with Image.open(input_path) as im:
            if self.pillow_format == "JPEG" and im.mode in ("RGBA", "P"):
                im = im.convert("RGB")
            self._emit(progress, "converting", 70)
            out = output_dir / (input_path.stem + "." + self.target_ext)
            save_kwargs: dict = {"optimize": True}
            if self.pillow_format == "JPEG":
                save_kwargs["quality"] = 92
            elif self.pillow_format == "WEBP":
                save_kwargs["quality"] = 90
            im.save(out, self.pillow_format, **save_kwargs)
        self._emit(progress, "finalizing", 95)
        return ConversionResult(output_path=out)


@register("png", "jpg")
class PngToJpgConverter(_ImageConverter):
    source_ext = "png"; target_ext = "jpg"; pillow_format = "JPEG"


@register("jpg", "png")
class JpgToPngConverter(_ImageConverter):
    source_ext = "jpg"; target_ext = "png"; pillow_format = "PNG"


@register("png", "webp")
class PngToWebpConverter(_ImageConverter):
    source_ext = "png"; target_ext = "webp"; pillow_format = "WEBP"


@register("jpg", "webp")
class JpgToWebpConverter(_ImageConverter):
    source_ext = "jpg"; target_ext = "webp"; pillow_format = "WEBP"


@register("webp", "png")
class WebpToPngConverter(_ImageConverter):
    source_ext = "webp"; target_ext = "png"; pillow_format = "PNG"


@register("webp", "jpg")
class WebpToJpgConverter(_ImageConverter):
    source_ext = "webp"; target_ext = "jpg"; pillow_format = "JPEG"


@register("jpg", "pdf")
class JpgToPdfConverter(BaseConverter):
    source_ext = "jpg"; target_ext = "pdf"

    def convert(self, input_path: Path, output_dir: Path, progress: Optional[ProgressCb] = None) -> ConversionResult:
        self._emit(progress, "converting", 50)
        with Image.open(input_path) as im:
            rgb = im.convert("RGB")
            out = output_dir / (input_path.stem + ".pdf")
            rgb.save(out, "PDF", resolution=150.0)
        self._emit(progress, "finalizing", 95)
        return ConversionResult(output_path=out)


@register("png", "pdf")
class PngToPdfConverter(JpgToPdfConverter):
    source_ext = "png"; target_ext = "pdf"
