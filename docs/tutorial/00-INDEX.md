# Tutorial Teknis AI Club Malang

Empat tutorial praktik, ditulis untuk **pemula yang belum pernah menyentuh automation sama sekali**.

Setiap tutorial ditulis dengan aturan yang sama:
- Setiap langkah menyebut **nama menu dan tombol yang sebenarnya**, bukan "lalu konfigurasikan node-nya"
- Setiap potongan kode dan prompt **bisa langsung disalin**
- Setiap bagian yang sering gagal punya kotak **"Kalau error"**
- Berakhir dengan sesuatu yang **benar-benar berjalan**, bukan catatan

---

## Empat Tutorial

| # | Tutorial | Level | Durasi | Hasil akhir |
|---|---|---|---|---|
| 01 | [Automasi Report](01-AUTOMASI-REPORT.md) | Pemula | 2–3 jam | Laporan penjualan harian terkirim otomatis ke WhatsApp tiap sore |
| 02 | [Generating Gambar](02-GENERATING-GAMBAR.md) | Pemula | 2 jam | 10 aset visual siap pakai + resep prompt milik sendiri |
| 03 | [Automasi Ads](03-AUTOMASI-ADS.md) | Pemula–Menengah | 3 jam | 15 varian copy iklan + laporan performa harian otomatis |
| 04 | [Automasi Posting](04-AUTOMASI-POSTING.md) | Menengah | 3–4 jam | Kalender konten yang posting sendiri, dengan persetujuan manusia |

---

## Urutan yang Disarankan

```
02 Generating Gambar   →  paling cepat terasa hasilnya, tidak perlu pasang apa pun
        ↓
01 Automasi Report     →  perkenalan n8n dengan kasus paling sederhana
        ↓
03 Automasi Ads        →  menggabungkan AI + data + laporan
        ↓
04 Automasi Posting    →  paling banyak izin & prasyarat, taruh terakhir
```

> **Jangan mulai dari 04.** Auto-posting butuh akun bisnis, aplikasi Meta, dan token — tiga hal yang membuat pemula menyerah sebelum merasakan satu keberhasilan pun. Mulai dari 02: dalam 20 menit sudah ada gambar jadi.

---

## Peta ke Kurikulum

| Tutorial | Track | Minggu | Level pusat |
|---|---|---|---|
| 02 Generating Gambar | Track 1 — Explorer | Minggu 7 | 1 |
| 01 Automasi Report | Track 2 — Builder | Minggu 9–11 | 3 |
| 03 Automasi Ads | Track 1 + Track 2 | Minggu 6 & 11 | 2–3 |
| 04 Automasi Posting | Track 2 — Builder | Minggu 12 | 3 |

---

## Alat yang Dipakai di Seluruh Tutorial

| Alat | Untuk | Biaya | Disediakan komunitas? |
|---|---|---|---|
| **n8n** | Mesin automation | Gratis (self-host) | ✅ Ya — instance bersama |
| **Google Sheets** | Database sederhana | Gratis | — |
| **API key model AI** | Menulis & menganalisis | Pemakaian | ✅ Ya — pool komunitas |
| **Telegram Bot** | Notifikasi & latihan | Gratis | — |
| **Fonnte** | Kirim WhatsApp | ±Rp 100 rb/bln | ✅ Ya |
| **Tool gambar AI** | Bikin visual | Ada versi gratis | — |

> Tiga alat berbintang ✅ sudah dibiayai [anggaran komunitas](../modul/12-ANGGARAN-BULANAN.md). **Peserta tidak perlu punya kartu kredit sendiri.** Minta akses ke Koordinator Kurikulum sebelum kelas dimulai.

---

## Aturan Keamanan (berlaku di semua tutorial)

| ❌ Jangan | ✅ Lakukan |
|---|---|
| Menempel API key langsung di dalam node | Simpan sebagai **Credential** di n8n |
| Membagikan token di grup WhatsApp | Kirim lewat japri, atau pakai pengelola kata sandi |
| Memakai data pelanggan asli saat latihan | Pakai data contoh atau data yang sudah disamarkan |
| Menjalankan workflow tanpa diuji | Uji manual dulu (**Execute Workflow**), baru aktifkan |
| Auto-posting tanpa persetujuan manusia | Selalu sisipkan langkah persetujuan di awal |

> Kalau token pernah tidak sengaja tersebar: **cabut dan buat baru**, jangan hanya dihapus pesannya. Token yang sudah terkirim dianggap bocor selamanya.
