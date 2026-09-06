# Track 3 — AIC Engineer Lab
### Agentic AI, RAG, API & AI Engineering

| | |
|---|---|
| **Level pusat** | 3–5 (Agents → Innovators → Organizations) |
| **Target peserta** | AI Builder → **AI Engineer** |
| **Durasi** | 12 minggu |
| **Prasyarat** | Selesai Track 2 **atau** sudah bisa membuat workflow sendiri. Python/JS dasar sangat membantu (boleh dibantu AI). |
| **Kapasitas kelas** | 10–15 orang |
| **Melayani** | 12% kebutuhan anggota (aplikasi & coding) + seluruh permintaan project korporat |

---

## Kenapa Track Ini Penting Meski Pesertanya Sedikit

Peserta track ini sedikit, tapi **merekalah yang mengeksekusi project besar**. Malang sudah menerima penawaran pembuatan software Rp 40 juta dan Rp 60 juta. Tanpa orang yang bisa mengerjakan, penawaran seperti itu akan terus lewat begitu saja.

Anggota yang sudah menyatakan berada di level ini menulis:
> *"Membangun AI Agent untuk bisnis dan automasi workflow."*
> *"architecture, optimize codebase Nestjs, Angular, Android"*
> *"AI Agent workspace, Voice TTS real time, ERP AI mini, app BK konseling"*
> *"Mencari partner untuk pengembangan AI Agent dan integrasi dengan sistem bisnis"*
> *"AI untuk academic/industry research, AI untuk automate marketing"*

Tool yang mereka pakai juga sudah terlihat di data: **Opencode (67), Claude Code (35), Python (15), Cursor (8), Supabase (6), Replit (4)**.

---

## Janji Track

> Setelah 12 minggu, Anda bisa membangun AI assistant yang menjawab dari dokumen milik klien, memakai tools dan API, dan berjalan di server sungguhan — cukup layak untuk dijual.

---

## Silabus 12 Minggu

### Blok A — Fondasi (Minggu 1–3)

**Modul 3.1 — Empat Hal yang Sering Tertukar**
Chatbot · Automation · AI Assistant · AI Agent — perbedaan, kapan memakai yang mana, dan biaya masing-masing. Peserta membuat tabel keputusan sendiri.

**Modul 3.2 — Bekerja dengan API Model**
Memanggil model lewat API (OpenAI / Gemini / Claude). System prompt vs user prompt. Parameter: temperature, max tokens, stop sequence. Streaming. Structured output (JSON schema). Menangani error & percobaan ulang. Menghitung biaya per 1.000 permintaan.

**Modul 3.3 — Coding Berbantuan AI**
Python/JavaScript secukupnya untuk membuat prototipe. Memakai Claude Code / Cursor / Opencode secara efektif. Membaca kode yang dibuat AI secara kritis. Git dasar. Lingkungan virtual & manajemen dependensi.

### Blok B — RAG & Knowledge Base (Minggu 4–6)

**Modul 3.4 — Konsep RAG dalam Bahasa Manusia**
Kenapa AI tidak tahu isi dokumen Anda. Alur: dokumen → potong → embedding → simpan → cari → jawab. Kapan RAG diperlukan dan kapan cukup menempelkan dokumen ke prompt.

**Modul 3.5 — Membangun RAG Pertama**
Memuat dokumen (PDF, DOCX, web). Strategi pemotongan (chunking) dan kenapa ukuran potongan menentukan kualitas jawaban. Model embedding. Vector database: Supabase pgvector, Chroma, Qdrant. Pencarian mirip vs hibrida. **Menyertakan sumber di setiap jawaban** — syarat wajib agar bisa dipercaya.

**Modul 3.6 — Menaikkan Kualitas RAG**
Penulisan ulang pertanyaan. Re-ranking. Metadata & penyaringan. Menangani tabel dan gambar. Evaluasi: apakah jawabannya benar, apakah sumbernya tepat. Menangani pertanyaan yang tidak ada jawabannya di dokumen.

### Blok C — Agent & Tools (Minggu 7–9)

**Modul 3.7 — Tool Use & Function Calling**
Mendefinisikan tool yang bisa dipanggil model. Menulis deskripsi tool yang jelas — ini penentu keberhasilan terbesar. Menjalankan tool dengan aman. Menangani panggilan tool yang gagal.

**Modul 3.8 — Merancang AI Agent**
Loop agent: berpikir → bertindak → mengamati. Memori: percakapan, ringkasan, jangka panjang. Perencanaan multi-langkah. **Batas & pagar pengaman** — biaya maksimum, jumlah langkah maksimum, aksi yang dilarang. **Titik persetujuan manusia untuk aksi berisiko.** Kapan agent adalah jawaban yang salah — dan itu sering.

**Modul 3.9 — MCP (Model Context Protocol)**
Standar penyambungan AI ke tools dan sumber data. Konsep server & client. Memakai MCP server yang sudah ada. Membuat MCP server sederhana. Kapan MCP lebih baik daripada integrasi langsung.

### Blok D — Produksi (Minggu 10–12)

**Modul 3.10 — Backend & Deployment**
API sederhana (FastAPI / Express). Autentikasi & kunci API. Docker dasar. Deploy ke VPS / Railway / Fly.io. Variabel lingkungan & pengelolaan rahasia. Pemantauan & log.

**Modul 3.11 — Evaluasi, Biaya & Keamanan**
Membuat kumpulan kasus uji. Mengukur akurasi, konsistensi, latency, biaya. Prompt injection & cara meredamnya. Kebocoran data. Rate limiting & pengendalian biaya. Kapan model kecil sudah cukup — dan itu lebih sering daripada yang dikira.

**Modul 3.12 — Capstone & Demo**
Membangun dan menyerahkan satu sistem AI yang berjalan.

---

## Output Wajib Track 3 (syarat lulus)

| # | Output | Kriteria |
|---|---|---|
| 1 | Skrip pemanggilan API model | Structured output + penanganan error |
| 2 | **Prototipe RAG yang berjalan** | Menjawab dari dokumen **dengan menyertakan sumber** |
| 3 | AI agent dengan minimal 2 tool | Ada pagar pengaman & titik persetujuan manusia |
| 4 | 1 integrasi MCP | Memakai atau membuat MCP server |
| 5 | Sistem yang sudah ter-deploy | Bisa diakses lewat URL |
| 6 | Laporan evaluasi | Akurasi · latency · biaya per permintaan |

---

## Perlengkapan & Biaya

| Kebutuhan | Wajib? | Perkiraan biaya |
|---|---|---|
| Laptop (RAM ≥ 8 GB) | ✅ | — |
| API key model | ✅ | ±Rp 150–400 rb/bulan saat belajar |
| Vector database | ✅ | Gratis (Supabase/Chroma tingkat gratis) |
| VPS untuk deploy | ✅ Blok D | ±Rp 100–200 rb/bulan |
| Domain | 🟡 | ±Rp 150 rb/tahun |
| GitHub | ✅ | Rp 0 |

---

## Catatan untuk Mentor

- **Sebutkan sejak Minggu 1: sebagian besar masalah tidak membutuhkan agent.** Automation biasa lebih murah, lebih cepat, dan jauh lebih mudah ditebak. Mentor yang mengajarkan ini menghasilkan engineer yang dipercaya klien; yang tidak, menghasilkan orang yang membuat sistem mahal untuk masalah sederhana.
- **RAG adalah materi paling laku dijual di track ini.** Setiap perusahaan punya dokumen menumpuk. Perbanyak jam di Blok B — di situ letak uangnya.
- Peserta datang dengan latar belakang coding yang berbeda-beda. Pasangkan yang kuat coding dengan yang kuat memahami proses bisnis; keduanya saling butuh.
- Wajibkan **menyertakan sumber** di setiap keluaran RAG sejak hari pertama. Jawaban tanpa sumber tidak bisa dipertanggungjawabkan ke klien, dan kebiasaan ini sulit ditambahkan belakangan.
