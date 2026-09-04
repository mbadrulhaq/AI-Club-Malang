# 08 — Spesifikasi Tracker

**Prinsip:** Notion untuk *keputusan & aturan*. Google Sheet untuk *angka & daftar nama*. **Tidak ada data yang ditulis dua kali.**

---

## Bagian A — Google Sheet `AICM — Master Data`

Buat 1 file, 7 tab. Bagikan aksesnya: Ketua (edit), Sekretaris (edit), Bendahara (edit tab Keuangan), pengurus lain (lihat saja).

### Tab 1 · `Anggota` — jantung sistem

| Kolom | Isi | Catatan |
|-------|-----|---------|
| A · ID | AICM-001 dst. | Nomor urut otomatis |
| B · Nama | | |
| C · WhatsApp | Format 62xxx | Wajib seragam untuk Fonnte |
| D · Email | | Harus sama dengan aiclub.id |
| E · Kecamatan | | |
| F · Terdaftar aiclub.id | Ya / Belum | **Metrik KPI Lapis 1** |
| G · Tanggal gabung | | |
| H · Sumber | Grup lama / Event / Medsos / Referal | |
| I · Level AI | 1–5 | Dari survei |
| J · Minat utama | Marketing / Konten / Agent / Aplikasi / Dasar | Dari survei |
| K · Punya usaha | Ya (bidang) / Tidak | Untuk penawaran B2B |
| L · Jumlah kehadiran | Angka | Diperbarui tiap event |
| M · **Penghasilan Pertama** | Belum / < 1jt / 1–5jt / > 5jt | 🌟 **Bintang Utara** |
| N · Status | Aktif / Pasif / Berhenti | |
| O · Calon mentor | Ya / Tidak | Dari survei no. 12 |
| P · Catatan | | |

### Tab 2 · `Kandidat Pengurus`

| Kolom | Isi |
|-------|-----|
| Nama · WA · Kursi diminati | |
| **Skor 1** Ketersediaan (0–25) | |
| **Skor 2** Rekam jejak (0–20) | |
| **Skor 3** Keterampilan (0–20) | |
| **Skor 4** Jaringan (0–15) | |
| **Skor 5** Inisiatif (0–10) | |
| **Skor 6** Nilai (0–10) | |
| **TOTAL** | `=SUM(D:I)` |
| Gender | Untuk memastikan ≥ 1 kursi perempuan |
| Punya bisnis AI sendiri | Deklarasi kepentingan |
| Keputusan | Diterima / Cadangan / Belum |
| Jalur alternatif ditawarkan | Panitia / Konten / Mentor |
| Sudah di-DM | Ya / Belum |

> Isi tab ini **sebelum** membuka pendaftaran — masukkan semua nama yang sudah pernah meminta secara personal. Begitu mereka ada di dalam sistem skor, penolakan berhenti menjadi urusan pribadi Anda.

### Tab 3 · `Event`

Nama · Tanggal · **Level (1–5)** · Mentor · Tempat · Target peserta · Daftar · **Hadir** · **Rasio isi form** · Tiket · Pemasukan · Pengeluaran · Laba bersih · Rating · Link dokumentasi

### Tab 4 · `Keuangan`

Tanggal · Event · Jenis (Masuk/Keluar) · Kategori · Jumlah · Metode · Nota (link foto) · PJ · Saldo berjalan
*Baris tetap tiap event:* Tiket kotor → Admin 3% → Sewa → Konsumsi → **Bersih** → Mentor 40% → Panitia 20% → Kas 30% → Pos iklan 10%

### Tab 5 · `Project`

Tanggal masuk · Sumber lead · Klien · Kebutuhan · Perkiraan nilai · Status (Baru/Kualifikasi/Penawaran/Deal/Batal) · Eksekutor · Nilai deal · Bagi hasil · Catatan

> Tab ini yang mengubah AI Club Malang dari komunitas belajar menjadi **komunitas berpenghasilan**. Isi walau baru satu baris.

### Tab 6 · `Migrasi` (700 nomor grup lama)

Nama · WA · Gelombang (1/2/3) · Tanggal kirim · Status kirim · Respons · Sudah daftar aiclub.id · Sudah isi survei · Catatan

### Tab 7 · `Metrik Harian`

Tanggal · Anggota grup · Terdata aiclub.id · Pengikut medsos · Pendaftar event aktif · Kas · Anggota berpenghasilan · Catatan

> Isi tab ini **setiap hari selama sprint**, lalu cukup mingguan setelahnya. Grafik pertumbuhan yang dibuat dari tab ini adalah bahan presentasi terkuat Anda saat berbicara dengan pusat, kampus, atau calon mitra.

---

## Bagian B — Notion `AI Club Malang OS`

```
🏠 AI CLUB MALANG OS
│
├── 📌 Mulai Dari Sini            ← salin README.md
│
├── 📖 ATURAN
│   ├── Aturan Pengurus           ← salin 03
│   ├── Aturan Mentor             ← salin 04
│   └── Deklarasi Kepentingan     ← form, template halaman
│
├── ⚙️ SOP
│   └── SOP-01 s/d SOP-08         ← salin 06 (1 halaman per SOP)
│
├── 📊 KPI & DASHBOARD
│   ├── KPI Komunitas             ← salin 05
│   ├── Dashboard Bulanan         ← template, digandakan tiap bulan
│   └── 🔗 Link ke Google Sheet
│
├── 🗂️ DATABASE PENGURUS          ← database Notion
│   Properti: Nama · Kursi · WA · Mulai menjabat · Status ·
│             Skor KPI · Deklarasi kepentingan · Relasi→Event
│
├── 🎓 DATABASE MENTOR            ← database Notion
│   Properti: Nama · Jenjang · Karya · Level yang diampu ·
│             Jumlah sesi · Rating · Status · Relasi→Event
│
├── 📅 KALENDER EVENT             ← database Notion, tampilan Kalender
│   Properti: Nama · Tanggal · Level · Mentor · Tempat ·
│             Status H-21→H+3 · Panitia · Relasi→Pengurus
│
├── 📝 NOTULEN RAPAT              ← 1 halaman per rapat bulanan
│   Template: Dashboard · 3 hal macet · Keputusan · Tugas + PJ + tenggat
│
├── 🎒 JALUR BELAJAR LEVEL 1–5    ← peta materi + link aiclub.id/belajar
│
└── ✉️ TEMPLATE PESAN             ← salin 07
```

**Aturan Notion:**
- Halaman **Mulai Dari Sini**, **Aturan Pengurus**, dan **Aturan Mentor** dibagikan sebagai **link publik** ke semua anggota. Aturan yang bisa dibaca siapa saja jauh lebih mudah ditegakkan daripada aturan yang hanya ada di kepala Ketua.
- Database Pengurus & Mentor: akses terbatas pengurus.
- Setiap rapat bulanan **wajib** menghasilkan 1 halaman notulen. Tanpa kecuali.

---

## Bagian C — Urutan Setup (60 menit, Hari 1)

| Menit | Aksi |
|-------|------|
| 0–10 | Buat Google Sheet + 7 tab + header |
| 10–20 | Buat Google Form Pendaftaran Pengurus (§3 Template) → arahkan ke tab `Kandidat` |
| 20–30 | Buat Google Form Survei Anggota (§4 Template) → arahkan ke tab baru |
| 30–45 | Buat Notion, salin 5 dokumen inti |
| 45–55 | Buat 3 database Notion (Pengurus, Mentor, Event) |
| 55–60 | Bagikan link publik untuk halaman aturan |

**Otomasi yang layak dipasang belakangan (bukan sekarang):**
- Google Form → Sheet → notifikasi WA via Fonnte saat ada pendaftar baru
- QR presensi event → langsung masuk tab `Anggota`
- Notion API → tarik angka dari Sheet ke Dashboard

> Jangan mengerjakan otomasi selama sprint 3 hari ini. Otomasi adalah pengganda kecepatan — dan pengganda hanya berguna kalau ada yang bisa digandakan. Bangun alirannya dulu, otomatiskan di bulan kedua.
