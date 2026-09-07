# Modul Lengkap AI Club Malang — Beginner sampai Advanced

**Versi 1.0** · Disusun 5 September 2026
**Basis:** kerangka 5 track & kurikulum 16 minggu AI Club Malang, dikalibrasi dengan **data nyata 1.067 anggota** dari grup lama + grup Reborn.

---

## Kenapa modul ini berbeda dari silabus biasa

Modul ini tidak disusun dari tebakan tentang apa yang "seharusnya" dipelajari komunitas AI. Ia disusun dari **apa yang anggota Malang tulis sendiri** di kolom perkenalan grup.

**107 anggota** mengisi kolom *"Lagi ngulik AI buat apa"*, **63** mengisi *"Tools yang sering dipakai"*, **160** mengisi *"Punya karya/jasa/project apa"*. Itu riset pasar yang sudah jadi — dan hasilnya memberi arah yang sangat jelas.

### Temuan 1 — Kebutuhan anggota (n=107)

| Peringkat | Tema | % anggota | Track yang melayani |
|---|---|---|---|
| **1** | **Otomasi & Workflow** | **30%** | Track 2 — Builder |
| 2 | Kerja Kantor & Produktivitas | 21% | Track 1 — Explorer |
| 3 | Marketing & Jualan | 18% | Track 1 — Explorer |
| 4 | Pendidikan & Riset | 16% | Track 1 — Explorer |
| 5 | Konten & Sosial Media | 13% | Track 1 — Explorer |
| 6 | Aplikasi & Coding | 12% | Track 3 — Engineer |
| 7 | Keuangan & Data | 4% | Track 2 & 3 |

### Temuan 2 — Tools yang benar-benar dipakai (jumlah penyebutan di seluruh chat)

| Tool | Sebutan | | Tool | Sebutan |
|---|---|---|---|---|
| ChatGPT | 350 | | Claude Code | 35 |
| Claude | 298 | | Qwen | 22 |
| Gemini | 200 | | Veo / Google Flow | 21 |
| DeepSeek | 68 | | WhatsApp API (Fonnte/Wablas) | 16 |
| Opencode | 67 | | Python | 15 |
| **n8n** | **55** | | Canva | 13 |

**Yang hampir tidak disebut sama sekali:** Ollama (0), Hugging Face (1), LM Studio (1), Midjourney (1), Firefly (1), NotebookLM (3), Perplexity (6), Make (3).

### Temuan 3 — Tiga kesimpulan yang membentuk modul ini

**1. Malang adalah komunitas automation-first, bukan creative-first.**
n8n (55) disebut lebih sering daripada seluruh tool kreatif digabung (Veo 21 + Canva 13 + Kling 9 + ElevenLabs 11 + Suno 6 + Midjourney 1 = 61, tersebar di 6 tool). Dan 30% anggota secara eksplisit menulis "otomasi" sebagai tujuan mereka — tema tunggal terbesar.
→ **Track Builder (automation) naik menjadi track unggulan, bukan track lanjutan.**

**2. Anggota Malang sudah multi-model, bukan pengguna satu tool.**
ChatGPT, Claude, dan Gemini dipakai berdampingan (350/298/200), ditambah DeepSeek dan Qwen. Ini bukan komunitas pemula murni — ini komunitas yang sudah membandingkan model.
→ **Materi "kenalan dengan AI" dipangkas; materi "memilih model yang tepat untuk tugas tertentu" diperkuat.**

**3. AIoT punya permintaan nyata, tapi sempit.**
Dua anggota menulis kebutuhan yang sangat konkret: *"AI IoT penghitung lobster laut"* dan *"manajemen hidroponik tomat cherry dan kebun alpukat"*. Itu bukan wacana — itu proyek yang menunggu dikerjakan.
→ **Track AIoT tetap ada, tapi sebagai lab proyek berbasis permintaan, bukan kelas reguler.**

> Kerangka 5 track yang sudah Anda susun **sudah tepat**. Yang diberikan data ini bukan koreksi arah, melainkan **urutan pembukaan dan bobot jam** — supaya track yang paling dicari dibuka lebih dulu dan kelasnya penuh sejak hari pertama.

---

## Peta Jalur Belajar

```
                    AI User  →  AI Power User  →  AI Builder  →  AI Engineer
                       │              │                │              │
   TRACK 1  EXPLORER   ████████████████████            │              │
   Prompting, produktivitas, riset, konten             │              │
                                      │                │              │
   TRACK 2  BUILDER                   ████████████████████             │
   Automation, n8n, integrasi, workflow                │              │
                                                       │              │
   TRACK 3  ENGINEER                                   ████████████████████
   RAG, agent, API, MCP, deployment                    │              │
                                                       │              │
   TRACK 4  LOCAL AI LAB                               ░░░░░░░░░░░░░░░░░░░░
   Ollama, Hugging Face, private AI          (lab, sesuai permintaan)
                                                       │              │
   TRACK 5  AIoT & EDGE LAB                            ░░░░░░░░░░░░░░░░░░░░
   Sensor, kamera, ESP32, computer vision    (lab, berbasis proyek nyata)
```

---

## Lima Track

| # | Nama Track | Nama Populer | Level | Prioritas buka | Materi inti |
|---|---|---|---|---|---|
| 1 | AIC Prompting & Content Creation | **AIC Explorer** | Beginner–Intermediate | **Bulan 1** | Prompting, produktivitas, riset, konten, creative AI, AI assistant |
| 2 | AIC Automation Workflow | **AIC Builder** | Intermediate | **Bulan 1** *(paralel)* | n8n, webhook, API, integrasi, AI dalam workflow |
| 3 | AIC Agentic AI & Engineering | **AIC Engineer Lab** | Intermediate–Advanced | **Bulan 2** | RAG, agent, tool use, MCP, API, deployment |
| 4 | AIC Local AI & Hugging Face Lab | **AIC Private Lab** | Intermediate–Advanced | **Bulan 4** | Ollama, LM Studio, Open WebUI, model open-source, local RAG |
| 5 | AIC AIoT & Edge AI Lab | **AIC Maker Lab** | Advanced / Lab | **Bulan 1** *(proyek kemitraan)* | ESP32, Raspberry Pi, MQTT, computer vision, edge AI |

**Tiga perubahan dari draf awal, semuanya karena hambatan yang sudah hilang:**

| Perubahan | Sebelumnya | Sekarang | Kenapa berubah |
|---|---|---|---|
| Track 2 dibuka bersamaan Track 1 | Bulan 4 | **Bulan 1** | 30% anggota datang untuk automation dan tidak akan menunggu |
| Track 3 dimajukan | Bulan 4 | **Bulan 2** | 🟢 Mentor sudah direkrut dan berkemampuan mendalam — tidak ada lagi yang perlu ditunggu |
| Track 4 dimajukan | Bulan 7, bila ada 8 pendaftar | **Bulan 4** | 🟢 Mentor siap + anggaran menyediakan sewa GPU per sesi |
| Track 5 dimajukan drastis | Bulan 7, bila kuorum | **Bulan 1** | 🟢 Kerja sama AIoT disetujui — dua proyek nyata sudah punya pemilik |

> Semula tiga track terakhir dijadwalkan menunggu ketersediaan mentor, dana, dan peminat. **Ketiganya sudah tersedia.** Yang tersisa hanya menjalankan.

---

## Pemetaan ke Jalur Belajar Pusat (aiclub.id/belajar)

Pusat memakai kerangka **Level 1→5**. Modul Malang harus bisa dibaca dalam bahasa itu agar selaras nasional.

| Level pusat | Nama | Track Malang | Perkiraan sebaran anggota Malang |
|---|---|---|---|
| **1** | Chatbots | Track 1 Minggu 1–4 | **±60%** — mayoritas |
| **2** | Reasoners | Track 1 Minggu 5–8 | ±20% |
| **3** | Agents | Track 2 penuh + Track 3 awal | ±12% |
| **4** | Innovators | Track 3 + Track 4 | ±6% |
| **5** | Organizations | Track 3 lanjutan + Track 5 | ±2% (segmen B2B) |

**Aturan wajib:** setiap poster, pengumuman, dan materi **harus mencantumkan Level (1–5)**. Peserta berhak tahu kelas ini untuk siapa sebelum mereka datang.

---

## Isi Modul

| # | Dokumen | Untuk siapa |
|---|---|---|
| 00 | **Index & Kalibrasi Data** (dokumen ini) | Pengurus + mentor |
| 01 | [Track 1 — AIC Explorer](01-TRACK-EXPLORER.md) | Mentor Track 1 |
| 02 | [Track 2 — AIC Builder](02-TRACK-BUILDER.md) | Mentor Track 2 |
| 03 | [Track 3 — AIC Engineer Lab](03-TRACK-ENGINEER.md) | Mentor Track 3 |
| 04 | [Track 4 — AIC Private Lab](04-TRACK-LOCAL-AI.md) | Mentor Track 4 |
| 05 | [Track 5 — AIC Maker Lab](05-TRACK-AIOT.md) | Mentor Track 5 |
| 06 | [Kurikulum 16 Minggu — Rencana Sesi Detail](06-KURIKULUM-16-MINGGU.md) | **Fasilitator, tiap minggu** |
| 07 | [Capstone & Sistem Penilaian](07-CAPSTONE-PENILAIAN.md) | Koord. Kurikulum |
| 08 | [Panduan Fasilitator & SOP Kelas](08-PANDUAN-FASILITATOR.md) | Semua mentor |
| 09 | [Prompt Library Anggota](09-PROMPT-LIBRARY.md) | Peserta |
| 10 | [Direktori Tools](10-DIREKTORI-TOOLS.md) | Peserta + mentor |
| 11 | [Model Bisnis & Paket Harga](11-MODEL-BISNIS.md) | Ketua + Bendahara 🔴 |
| 12 | [Anggaran Operasional Bulanan](12-ANGGARAN-BULANAN.md) | Ketua + Bendahara 🟢 |
| 13 | [Kemitraan AIoT — Proyek Perdana](13-KEMITRAAN-AIOT.md) | Ketua + Mentor Maker Lab 🟢 |

### Tutorial Teknis Pendamping

Materi praktik langkah-demi-langkah yang dipakai langsung di kelas — lihat [indeks tutorial](../tutorial/00-INDEX.md).

| Tutorial | Dipakai di | Level pusat |
|---|---|---|
| [01 Automasi Report](../tutorial/01-AUTOMASI-REPORT.md) | Track 2 · Minggu 9–11 | 3 |
| [02 Generating Gambar](../tutorial/02-GENERATING-GAMBAR.md) | Track 1 · Minggu 7 | 1 |
| [03 Automasi Ads](../tutorial/03-AUTOMASI-ADS.md) | Track 1 Minggu 6 + Track 2 Minggu 11 | 2–3 |
| [04 Automasi Posting](../tutorial/04-AUTOMASI-POSTING.md) | Track 2 · Minggu 12 | 3 |

🔴 = butuh konfirmasi pusat sebelum diumumkan.

---

## Prinsip Modul

**Prinsip belajar**
1. Tools berubah, cara berpikir tidak. Setiap sesi mengajarkan pola, bukan tombol.
2. Prompt bukan perintah — prompt adalah cara menyusun konteks dan tujuan.
3. Output AI wajib diperiksa, terutama untuk data, hukum, keuangan, medis, dan keputusan penting.
4. Jangan memasukkan data sensitif tanpa izin dan tanpa paham risikonya.
5. **Setiap sesi wajib menghasilkan output nyata.** Tidak ada sesi yang berakhir hanya dengan catatan.

**Prinsip komunitas**
1. Berbagi hasil, bukan sekadar bertanya nama tools.
2. Boleh pemula — tapi wajib praktik.
3. Yang sudah mahir mendampingi yang baru mulai.
4. Setiap bulan minimal ada 1 demo project dari anggota.
5. Setiap kelas Level 3+ wajib didahului kelas Level 1 di bulan yang sama.

---

## Cara Membaca Modul Ini

- **Mentor** → baca dokumen track Anda + [08 Panduan Fasilitator](08-PANDUAN-FASILITATOR.md).
- **Fasilitator kelas mingguan** → buka [06 Kurikulum 16 Minggu](06-KURIKULUM-16-MINGGU.md), cari minggu yang berjalan, jalankan apa adanya.
- **Peserta** → mulai dari [09 Prompt Library](09-PROMPT-LIBRARY.md) dan [10 Direktori Tools](10-DIREKTORI-TOOLS.md).
- **Ketua & Bendahara** → [11 Model Bisnis](11-MODEL-BISNIS.md) dan [12 Anggaran Bulanan](12-ANGGARAN-BULANAN.md).
- **Mentor Maker Lab** → [13 Kemitraan AIoT](13-KEMITRAAN-AIOT.md), mulai minggu ini.
