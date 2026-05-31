from __future__ import annotations

import io
import shutil
import subprocess
from pathlib import Path
from typing import Optional

import fitz  # PyMuPDF
from PIL import Image
from . import register
from .base import BaseConverter, ConversionResult, ProgressCb


def _is_scanned_pdf(path: Path) -> bool:
    """Heuristic: a PDF is 'scanned' if pages contain images and almost no text."""
    try:
        doc = fitz.open(path)
        sample = min(len(doc), 5)
        text_chars = 0
        image_pages = 0
        for i in range(sample):
            page = doc[i]
            text_chars += len(page.get_text("text").strip())
            if page.get_images(full=True):
                image_pages += 1
        doc.close()
        return text_chars < 80 and image_pages > 0
    except Exception:
        return False


@register("pdf", "docx")
class PdfToDocxConverter(BaseConverter):
    """Preserves layout via LibreOffice; falls back to OCR for scanned PDFs."""

    source_ext = "pdf"
    target_ext = "docx"

    def convert(self, input_path: Path, output_dir: Path, progress: Optional[ProgressCb] = None) -> ConversionResult:
        self._emit(progress, "parsing", 10)
        scanned = _is_scanned_pdf(input_path)

        if scanned:
            self._emit(progress, "ocr", 25)
            return self._ocr_pipeline(input_path, output_dir, progress)

        self._emit(progress, "converting", 45)
        out = _libreoffice_convert(input_path, output_dir, "docx")
        self._emit(progress, "optimizing", 85)
        return ConversionResult(output_path=out)

    def _ocr_pipeline(self, input_path: Path, output_dir: Path, progress: Optional[ProgressCb]) -> ConversionResult:
        from pdf2image import convert_from_path
        import pytesseract
        from docx import Document

        images = convert_from_path(str(input_path), dpi=200)
        doc = Document()
        total = len(images) or 1
        for idx, image in enumerate(images):
            text = pytesseract.image_to_string(image)
            for paragraph in text.split("\n\n"):
                if paragraph.strip():
                    doc.add_paragraph(paragraph.strip())
            if idx < len(images) - 1:
                doc.add_page_break()
            self._emit(progress, "ocr", 30 + int(50 * (idx + 1) / total))

        out = output_dir / (input_path.stem + ".docx")
        doc.save(out)
        return ConversionResult(output_path=out, pages=total)


@register("pdf", "txt")
class PdfToTxtConverter(BaseConverter):
    source_ext = "pdf"
    target_ext = "txt"

    def convert(self, input_path: Path, output_dir: Path, progress: Optional[ProgressCb] = None) -> ConversionResult:
        self._emit(progress, "parsing", 30)
        doc = fitz.open(input_path)
        text_parts: list[str] = []
        for page in doc:
            text_parts.append(page.get_text("text"))
        out = output_dir / (input_path.stem + ".txt")
        out.write_text("\n\n".join(text_parts), encoding="utf-8")
        doc.close()
        self._emit(progress, "finalizing", 95)
        return ConversionResult(output_path=out, pages=len(text_parts))


@register("pdf", "jpg")
class PdfToJpgConverter(BaseConverter):
    source_ext = "pdf"
    target_ext = "jpg"

    def convert(self, input_path: Path, output_dir: Path, progress: Optional[ProgressCb] = None) -> ConversionResult:
        self._emit(progress, "parsing", 20)
        doc = fitz.open(input_path)
        outputs: list[Path] = []
        total = len(doc) or 1
        for i, page in enumerate(doc):
            pix = page.get_pixmap(dpi=160)
            img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
            out = output_dir / f"{input_path.stem}_page_{i + 1}.jpg"
            img.save(out, "JPEG", quality=92, optimize=True)
            outputs.append(out)
            self._emit(progress, "converting", 25 + int(60 * (i + 1) / total))
        doc.close()

        # If multipage, zip them together
        if len(outputs) == 1:
            final = outputs[0]
        else:
            zip_path = output_dir / (input_path.stem + ".zip")
            shutil.make_archive(str(zip_path.with_suffix("")), "zip", output_dir, ".")
            final = zip_path
        self._emit(progress, "finalizing", 95)
        return ConversionResult(output_path=final, pages=len(outputs))


@register("pdf", "png")
class PdfToPngConverter(BaseConverter):
    source_ext = "pdf"
    target_ext = "png"

    def convert(self, input_path: Path, output_dir: Path, progress: Optional[ProgressCb] = None) -> ConversionResult:
        doc = fitz.open(input_path)
        outputs: list[Path] = []
        total = len(doc) or 1
        for i, page in enumerate(doc):
            pix = page.get_pixmap(dpi=160)
            out = output_dir / f"{input_path.stem}_page_{i + 1}.png"
            pix.save(out)
            outputs.append(out)
            self._emit(progress, "converting", 20 + int(70 * (i + 1) / total))
        doc.close()
        if len(outputs) == 1:
            return ConversionResult(output_path=outputs[0], pages=1)
        zip_path = output_dir / (input_path.stem + ".zip")
        shutil.make_archive(str(zip_path.with_suffix("")), "zip", output_dir, ".")
        return ConversionResult(output_path=zip_path, pages=len(outputs))


@register("pdf", "pdf-compressed")
class PdfCompressConverter(BaseConverter):
    source_ext = "pdf"
    target_ext = "pdf-compressed"

    def convert(self, input_path: Path, output_dir: Path, progress: Optional[ProgressCb] = None) -> ConversionResult:
        self._emit(progress, "optimizing", 30)
        out = output_dir / (input_path.stem + "_compressed.pdf")
        # Use Ghostscript for high-quality compression. Binary name differs by OS.
        gs_bin = shutil.which("gs") or shutil.which("gswin64c") or shutil.which("gswin32c")
        if not gs_bin:
            raise RuntimeError("Ghostscript not found on PATH (looked for gs / gswin64c)")
        cmd = [
            gs_bin, "-sDEVICE=pdfwrite", "-dCompatibilityLevel=1.4",
            "-dPDFSETTINGS=/ebook", "-dNOPAUSE", "-dQUIET", "-dBATCH",
            f"-sOutputFile={out}", str(input_path),
        ]
        subprocess.run(cmd, check=True)
        self._emit(progress, "finalizing", 95)
        return ConversionResult(output_path=out)


def _libreoffice_convert(input_path: Path, output_dir: Path, target_filter: str) -> Path:
    """Run LibreOffice headless conversion."""
    profile = output_dir / ".lo_profile"
    profile.mkdir(exist_ok=True)
    soffice = (
        shutil.which("soffice")
        or shutil.which("soffice.exe")
        or r"C:\Program Files\LibreOffice\program\soffice.exe"
    )
    if not Path(soffice).exists() and not shutil.which(soffice):
        raise RuntimeError(
            "LibreOffice (soffice) not found. Install LibreOffice and ensure 'soffice' is on PATH."
        )
    profile_uri = profile.resolve().as_uri()
    cmd = [
        soffice,
        "--headless",
        f"-env:UserInstallation={profile_uri}",
        "--convert-to",
        target_filter,
        "--outdir",
        str(output_dir),
        str(input_path),
    ]
    subprocess.run(cmd, check=True, timeout=300)
    out = output_dir / (input_path.stem + "." + target_filter.split(":")[0])
    if not out.exists():
        # LibreOffice sometimes writes the file with a different name
        candidates = list(output_dir.glob(f"{input_path.stem}.*"))
        candidates = [c for c in candidates if c.suffix.lstrip(".") == target_filter.split(":")[0]]
        if candidates:
            out = candidates[0]
    if not out.exists():
        raise RuntimeError("LibreOffice conversion failed")
    return out


# Expose for office converters
libreoffice_convert = _libreoffice_convert
