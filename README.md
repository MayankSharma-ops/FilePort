# GathorDocs

Premium AI-native file conversion platform. Upload, convert, download. No signup. Files auto-delete after 30 minutes.

## Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, React Dropzone, Zustand
- **Backend**: FastAPI, Celery, Redis, PostgreSQL
- **Conversion**: LibreOffice (headless), PyMuPDF, pdfplumber, python-docx, Pillow, Tesseract OCR

## Architecture

```
┌──────────────┐  upload   ┌──────────────┐  enqueue   ┌──────────┐
│   Next.js    ├──────────▶│   FastAPI    ├───────────▶│  Celery  │
│  (frontend)  │◀──poll────│  (gateway)   │            │ (workers)│
└──────────────┘           └──────┬───────┘            └────┬─────┘
                                  │                         │
                            ┌─────▼─────┐             ┌─────▼─────┐
                            │ Postgres  │             │   Redis   │
                            │(analytics)│             │  (queue)  │
                            └───────────┘             └───────────┘
```

Files live in ephemeral local storage (`./storage`). A janitor task purges anything older than 30 minutes.

## Prerequisites (Windows)

Install once:

| Tool | Why | Install |
|------|-----|---------|
| Node.js 20+ | Frontend | https://nodejs.org |
| Python 3.11+ | Backend | https://www.python.org/downloads/ |
| PostgreSQL 16+ | Analytics | You already have this |
| Redis | Queue + cache | Memurai (https://www.memurai.com/) or WSL `sudo apt install redis-server` |
| LibreOffice | DOCX↔PDF | https://www.libreoffice.org/download/ |
| Poppler | PDF rendering | https://github.com/oschwartz10612/poppler-windows/releases |
| Tesseract OCR | Scanned PDFs | https://github.com/UB-Mannheim/tesseract/wiki |
| Ghostscript | PDF compression | https://www.ghostscript.com/releases/gsdnld.html |

After install, make sure these are on `PATH`:
- `soffice` (LibreOffice)
- `pdftoppm`, `pdfinfo` (Poppler)
- `tesseract`
- `gswin64c` (Ghostscript) — or symlink/alias to `gs`

Verify in a fresh shell:

```cmd
soffice --version
pdftoppm -v
tesseract --version
gswin64c --version
```

## Configure

Copy the env file and fill in your Postgres password:

```cmd
copy .env.example .env
```

Open `.env` and set `POSTGRES_PASSWORD` to your local Postgres password. Create the database (you've already done this):

```sql
CREATE DATABASE gathordocs;
```

Tables are auto-created on first API startup.

## Run

Open four terminals.

**1. Redis** (skip if Memurai is running as a Windows service):

```cmd
redis-server
```

**2. Backend API**

```cmd
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**3. Celery worker**

```cmd
cd backend
.venv\Scripts\activate
celery -A app.celery_app.celery worker --loglevel=info --pool=solo
```

> On Windows you must use `--pool=solo` (or `--pool=threads`) — the default prefork pool isn't supported.

**4. Frontend**

```cmd
cd frontend
npm install
npm run dev
```

Visit http://localhost:3000.

## Conversion registry

New converters are added by registering a class against a `(source, target)` tuple. No giant if/else chains.

```python
@register("pdf", "docx")
class PdfToDocxConverter(BaseConverter): ...
```

## Privacy

- No accounts, no tracking pixels
- Uploaded and generated files auto-delete after 30 minutes
- Only anonymized conversion telemetry is persisted (format pair, duration, success)
