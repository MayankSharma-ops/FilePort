from __future__ import annotations

import shutil
import subprocess
import zipfile
from pathlib import Path
from typing import Optional

import pikepdf

from . import register
from .base import BaseConverter, ConversionResult, ProgressCb
from .pdf_converters import libreoffice_convert


@register("docx", "pdf")
class DocxToPdfConverter(BaseConverter):
    source_ext = "docx"; target_ext = "pdf"

    def convert(self, input_path: Path, output_dir: Path, progress: Optional[ProgressCb] = None) -> ConversionResult:
        self._emit(progress, "converting", 50)
        out = libreoffice_convert(input_path, output_dir, "pdf")
        self._emit(progress, "finalizing", 95)
        return ConversionResult(output_path=out)


@register("pdf", "pdf-merged")
class PdfMergeConverter(BaseConverter):
    """Special: this converter takes a single file but the API also supports multi-file merge via the multi endpoint."""
    source_ext = "pdf"; target_ext = "pdf-merged"

    def convert(self, input_path: Path, output_dir: Path, progress: Optional[ProgressCb] = None) -> ConversionResult:
        # Merging only one file is a no-op rename
        out = output_dir / (input_path.stem + "_merged.pdf")
        shutil.copy2(input_path, out)
        return ConversionResult(output_path=out)


def merge_pdfs(input_paths: list[Path], output_dir: Path, progress: Optional[ProgressCb] = None) -> Path:
    out = output_dir / "merged.pdf"
    pdf = pikepdf.Pdf.new()
    total = len(input_paths) or 1
    for i, p in enumerate(input_paths):
        with pikepdf.Pdf.open(p) as src:
            pdf.pages.extend(src.pages)
        if progress:
            progress("merging", 20 + int(70 * (i + 1) / total))
    pdf.save(out)
    pdf.close()
    return out


@register("pdf", "pdf-split")
class PdfSplitConverter(BaseConverter):
    """Splits each page into its own PDF and zips them."""
    source_ext = "pdf"; target_ext = "pdf-split"

    def convert(self, input_path: Path, output_dir: Path, progress: Optional[ProgressCb] = None) -> ConversionResult:
        self._emit(progress, "splitting", 30)
        with pikepdf.Pdf.open(input_path) as src:
            total = len(src.pages) or 1
            split_files: list[Path] = []
            for i, page in enumerate(src.pages):
                new_pdf = pikepdf.Pdf.new()
                new_pdf.pages.append(page)
                page_path = output_dir / f"{input_path.stem}_page_{i + 1}.pdf"
                new_pdf.save(page_path)
                new_pdf.close()
                split_files.append(page_path)
                self._emit(progress, "splitting", 30 + int(60 * (i + 1) / total))

        if len(split_files) == 1:
            return ConversionResult(output_path=split_files[0], pages=1)

        zip_path = output_dir / (input_path.stem + "_split.zip")
        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
            for f in split_files:
                zf.write(f, arcname=f.name)
        return ConversionResult(output_path=zip_path, pages=len(split_files))
