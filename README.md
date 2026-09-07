# AI Club Malang — Operating System Pengurus & Mentor

> Basis: hasil diskusi dengan **Mas Ananta** (Mentor AI Club Blitar), 4 September 2026 + benchmark struktur pusat **aiclub.id**.
> Status: **Draft v1 — siap dieksekusi**, menunggu konfirmasi Mas Eko untuk item bertanda 🔴.

---

## Bintang Utara (North Star)

> **Anggota AI Club Malang harus menghasilkan uang dari AI.**
> Bukan komunitas hobi. Kalau anggota tidak menghasilkan, kopdar berbayar akan ditinggalkan.

Semua aturan, KPI, dan SOP di repo ini diturunkan dari satu kalimat itu.

---

## Isi Dokumen

| # | Dokumen | Untuk siapa | Kapan dipakai |
|---|---------|-------------|---------------|
| 01 | [Intisari Diskusi & Benchmark Antar Kota](docs/01-INTISARI-DISKUSI.md) | Ketua + Inti | Sekali baca, jadi konteks |
| 02 | [To-Do Sprint 4–6 September 2026](docs/02-TODO-SPRINT-4-6-SEP.md) | Ketua (Anda) | **Mulai dari sini** |
| 03 | [Aturan Pengurus](docs/03-ATURAN-PENGURUS.md) | Calon & pengurus | Dibacakan saat onboarding |
| 04 | [Aturan Mentor](docs/04-ATURAN-MENTOR.md) | Mentor | Dibacakan saat onboarding |
| 05 | [KPI & Dashboard](docs/05-KPI.md) | Ketua + Inti | Review bulanan |
| 06 | [SOP Operasional (8 SOP)](docs/06-SOP.md) | Semua pengurus | Saat menjalankan program |
| 07 | [Template Pesan Siap Pakai](docs/07-TEMPLATE-PESAN.md) | Ketua | Copy-paste hari ini |
| 08 | [Spesifikasi Tracker (Sheet + Notion)](docs/08-TRACKER-SPEC.md) | Ketua + Sekretaris | Setup sekali |
| 09 | [Benchmark aiclub.id (Pusat)](docs/09-BENCHMARK-AICLUB-ID.md) | Ketua | Referensi fast-track |

---

## Notion vs Google Sheet vs Google Doc — Rekomendasi

**Jawaban singkat: pakai dua, jangan tiga.**

| Tool | Dipakai untuk | Alasan |
|------|---------------|--------|
| **Notion** ✅ *home base* | Aturan, SOP, KPI, notulen rapat, database Pengurus, database Mentor, kalender event, halaman onboarding | Relasional (1 orang bisa ditarik ke event, KPI, notulen sekaligus), bisa di-share view publik ke anggota, enak di HP, gratis untuk tim kecil |
| **Google Sheet** ✅ *mesin data* | (1) Database 800+ anggota, (2) Keuangan per event, (3) Rekap survei | Menang telak untuk volume besar, formula, dan **export CSV langsung ke Fonnte** untuk blasting WA |
| **Google Doc** ❌ | — | Lewati. Hanya pakai kalau butuh proposal sponsor / dokumen legal yang mau dicetak. |

**Aturan mainnya:** Notion untuk *keputusan & aturan*. Sheet untuk *angka & daftar nama*. Jangan pernah menyimpan hal yang sama di dua tempat — Notion cukup menaruh link ke Sheet.

Struktur kolom persisnya ada di [08-TRACKER-SPEC.md](docs/08-TRACKER-SPEC.md).

---

## Cara Pakai Repo Ini

1. Buka [02-TODO-SPRINT-4-6-SEP.md](docs/02-TODO-SPRINT-4-6-SEP.md) — kerjakan per tanggal.
2. Copy isi dokumen 03–06 ke Notion (sudah dalam format yang tinggal tempel).
3. Buat Sheet sesuai [08-TRACKER-SPEC.md](docs/08-TRACKER-SPEC.md).
4. Item bertanda 🔴 = **jangan diumumkan sebelum dikonfirmasi Mas Eko**.

---

## Legenda

- 🔴 Butuh konfirmasi pusat (Mas Eko) sebelum dijalankan
- 🟡 Keputusan internal Malang, bisa jalan sekarang
- 🟢 Sudah pasti / sudah dikonfirmasi

---

## Modul Pembelajaran

Modul lengkap Beginner → Advanced, dikalibrasi dengan data 1.067 anggota.

| # | Dokumen | Untuk siapa |
|---|---------|-------------|
| 00 | [Index & Kalibrasi Data](docs/modul/00-INDEX.md) | Pengurus + mentor |
| 01 | [Track 1 — AIC Explorer](docs/modul/01-TRACK-EXPLORER.md) | Mentor Track 1 |
| 02 | [Track 2 — AIC Builder](docs/modul/02-TRACK-BUILDER.md) | Mentor Track 2 |
| 03 | [Track 3 — AIC Engineer Lab](docs/modul/03-TRACK-ENGINEER.md) | Mentor Track 3 |
| 04 | [Track 4 — AIC Private Lab](docs/modul/04-TRACK-LOCAL-AI.md) | Mentor Track 4 |
| 05 | [Track 5 — AIC Maker Lab](docs/modul/05-TRACK-AIOT.md) | Mentor Track 5 |
| 06 | [Kurikulum 16 Minggu](docs/modul/06-KURIKULUM-16-MINGGU.md) | **Fasilitator, tiap minggu** |
| 07 | [Capstone & Penilaian](docs/modul/07-CAPSTONE-PENILAIAN.md) | Koord. Kurikulum |
| 08 | [Panduan Fasilitator](docs/modul/08-PANDUAN-FASILITATOR.md) | Semua mentor |
| 09 | [Prompt Library](docs/modul/09-PROMPT-LIBRARY.md) | Peserta |
| 10 | [Direktori Tools](docs/modul/10-DIREKTORI-TOOLS.md) | Peserta + mentor |
| 11 | [Model Bisnis & Paket Harga](docs/modul/11-MODEL-BISNIS.md) | Ketua + Bendahara |
| 12 | [Anggaran Operasional Bulanan](docs/modul/12-ANGGARAN-BULANAN.md) | Ketua + Bendahara |
| 13 | [Kemitraan AIoT — Proyek Perdana](docs/modul/13-KEMITRAAN-AIOT.md) | Ketua + Mentor Maker Lab |

---

## Tutorial Teknis

Empat tutorial praktik langkah-demi-langkah untuk pemula — lihat [indeksnya](docs/tutorial/00-INDEX.md).

| # | Tutorial | Level | Durasi | Hasil akhir |
|---|---|---|---|---|
| 01 | [Automasi Report](docs/tutorial/01-AUTOMASI-REPORT.md) | Pemula | 2–3 jam | Laporan harian terkirim otomatis ke WhatsApp |
| 02 | [Generating Gambar](docs/tutorial/02-GENERATING-GAMBAR.md) | Pemula | 2 jam | 10 aset visual + resep prompt sendiri |
| 03 | [Automasi Ads](docs/tutorial/03-AUTOMASI-ADS.md) | Pemula–Menengah | 3 jam | 15 varian copy + laporan performa harian |
| 04 | [Automasi Posting](docs/tutorial/04-AUTOMASI-POSTING.md) | Menengah | 3–4 jam | Kalender konten yang posting sendiri |

**Presentasi:** `scripts/deck_modul.js` membangun deck 48 slide (`out/Modul_AI_Club_Malang.pptx`).
Jalankan `node scripts/deck_modul.js` — butuh `npm install pptxgenjs`.
