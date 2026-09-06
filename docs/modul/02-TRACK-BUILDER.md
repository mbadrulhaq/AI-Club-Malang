# Track 2 — AIC Builder
### Automation Workflow & Integrasi

| | |
|---|---|
| **Level pusat** | 3 (Agents) |
| **Target peserta** | AI Power User → **AI Builder** |
| **Durasi** | 8 minggu (Minggu 9–12 kurikulum inti + 4 minggu pendalaman) |
| **Prasyarat** | Selesai Track 1 **atau** sudah terbiasa memakai AI harian. Tidak wajib bisa coding. |
| **Kapasitas kelas** | 15–25 orang (praktik intensif, butuh pendampingan) |
| **Melayani** | **30% kebutuhan anggota — tema terbesar tunggal** |

---

## Kenapa Track Ini Track Unggulan Malang

Dari 107 anggota yang menulis tujuannya, **32 orang menyebut otomasi secara eksplisit** — lebih besar dari tema apa pun. Dan **n8n disebut 55 kali** di percakapan grup, mengalahkan seluruh tool kreatif digabung.

Kutipan langsung dari anggota:
> *"Membangun AI Agent untuk bisnis dan automasi workflow."*
> *"automation, lead, crm, digital marketing"*
> *"lagi pengen belajar automation sekalian explore sejauh apa penerapan AI bisa dilakukan"*
> *"otomasi pekerjaan sederhana dan bantu brainstorm ide"*
> *"custom gpt dan otomasi"*

**Ini bukan permintaan yang harus diciptakan. Ini permintaan yang sudah antre.**

---

## Janji Track

> Setelah 8 minggu, Anda punya minimal **satu automation yang benar-benar berjalan setiap hari tanpa Anda sentuh** — dan Anda tahu cara membuat yang berikutnya sendiri.

---

## Silabus 8 Minggu

### Modul 2.1 — Cara Berpikir Automation (Minggu 9)

**Tujuan:** melihat pekerjaan sebagai alur, bukan sebagai tugas.

| Sub-materi | Isi |
|---|---|
| Anatomi workflow | Trigger → kondisi → aksi → output |
| Memetakan proses | Menggambar pekerjaan sendiri sebagai diagram |
| Apa yang layak diotomasi | Berulang · aturannya jelas · volumenya cukup |
| Apa yang **tidak** layak | Butuh penilaian manusia, jarang terjadi, aturannya berubah-ubah |
| Human-in-the-loop | Titik di mana manusia wajib menyetujui |
| Hitung untung-rugi | Waktu yang dihemat vs waktu membangun |

**Praktik:** gambar 1 proses kerja peserta dari awal sampai akhir.
**Output:** *Blueprint Automation* — 1 halaman diagram + daftar langkah.

### Modul 2.2 — n8n Dasar (Minggu 10)

**Tujuan:** membuat workflow pertama yang benar-benar jalan.

| Sub-materi | Isi |
|---|---|
| Kenapa n8n | Self-host, murah, node lengkap, komunitas Indonesia besar |
| Pemasangan | n8n Cloud vs self-host (VPS/Docker) — pilih sesuai kondisi |
| Konsep inti | Node, koneksi, item, ekspresi, credential |
| Trigger | Manual, jadwal, webhook, watcher |
| Node dasar | HTTP Request, Set, IF, Merge, Code |
| Integrasi pertama | Google Sheets, Gmail, Telegram |
| Debugging | Membaca error, uji per node, riwayat eksekusi |

**Praktik:** Form → Google Sheets → notifikasi Telegram.
**Output:** workflow n8n pertama yang berjalan.

### Modul 2.3 — AI di Dalam Workflow (Minggu 11)

**Tujuan:** menaruh kecerdasan di tengah alur otomatis.

| Sub-materi | Isi |
|---|---|
| Node AI | OpenAI / Gemini / Claude di dalam n8n |
| Klasifikasi | Memilah pesan masuk: keluhan / pertanyaan / order |
| Ekstraksi | Dari teks bebas menjadi data terstruktur (JSON) |
| Ringkasan otomatis | Email panjang, transkrip rapat, dokumen |
| Analisis sentimen | Menandai keluhan yang perlu segera ditangani |
| Prompt di dalam workflow | Kenapa prompt di automation harus **lebih ketat** daripada di chat |
| Biaya & token | Menghitung ongkos per eksekusi |
| Fallback | Apa yang terjadi kalau AI gagal menjawab |

**Praktik:** data masuk → AI memproses → hasil terkirim.
**Output:** *AI-powered workflow* yang berjalan.

### Modul 2.4 — Integrasi WhatsApp & Aplikasi Bisnis (Minggu 12)

**Tujuan:** menyambungkan automation ke kanal yang benar-benar dipakai di Indonesia.
*(WhatsApp API / Fonnte disebut 16× oleh anggota)*

| Sub-materi | Isi |
|---|---|
| WhatsApp gateway | Fonnte, Wablas — kirim, terima, webhook |
| Aturan main WA | Batas kirim, cara menghindari blokir, izin pengguna |
| Telegram Bot | Alternatif gratis untuk notifikasi internal |
| Google Workspace | Sheets, Docs, Drive, Calendar, Forms |
| Database | Airtable, Notion, Supabase, PostgreSQL |
| CRM & pembayaran | HubSpot, Midtrans/Xendit, dan sejenisnya |
| Dashboard | Looker Studio, Metabase |

**Praktik:** pesan WA masuk → AI mengklasifikasi → tersimpan di database → balasan otomatis.
**Output:** integrasi lintas aplikasi yang berjalan.

### Modul 2.5 — Workflow yang Tidak Gampang Rusak (Minggu 13)

**Tujuan:** membedakan mainan dari sistem yang bisa diandalkan.

| Sub-materi | Isi |
|---|---|
| Error handling | Try/catch, cabang error, percobaan ulang |
| Logging | Mencatat apa yang terjadi, agar bisa ditelusuri |
| Monitoring & alert | Tahu duluan sebelum diberi tahu pengguna |
| Idempoten | Supaya tidak terkirim dua kali |
| Rate limit | Menghormati batas API |
| Keamanan credential | Jangan pernah menaruh API key di dalam node |
| Versioning | Cadangan workflow, lingkungan uji coba |

**Praktik:** perkuat workflow Minggu 11 agar tahan gangguan.
**Output:** workflow versi produksi + catatan penanganan error.

### Modul 2.6 — Pustaka Pola Automation (Minggu 14)

**Tujuan:** punya cetakan siap pakai, tidak mulai dari nol tiap kali.

| Pola | Contoh nyata |
|---|---|
| **Lead Capture & Qualification** | Iklan → form → AI menilai → CRM → notifikasi sales |
| **Content Pipeline** | Ide → draft AI → review manusia → jadwal posting |
| **Customer Service Triage** | Pesan masuk → AI memilah → jawab otomatis / eskalasi |
| **Laporan Otomatis** | Data harian → AI merangkum → laporan terkirim tiap Senin |
| **Pemantau Dokumen** | File baru di Drive → AI mengekstrak → masuk spreadsheet |
| **Reminder & Penagihan** | Jatuh tempo → pesan berjenjang → tandai lunas |
| **Rekap Absensi & Administrasi** | Form → validasi → rekap bulanan |
| **Social Listening** | Pantau kata kunci → AI menyaring → laporan mingguan |

**Praktik:** salin 1 pola, sesuaikan dengan kasus sendiri.
**Output:** 1 pola terpasang untuk kebutuhan pribadi.

### Modul 2.7 — Mini Project (Minggu 15)

**Tujuan:** membangun automation yang benar-benar dipakai orang lain, bukan hanya diri sendiri.

**Alur:** pilih proses → wawancara pemilik proses → rancang → bangun → uji → serah terima.

**Output:** automation yang dipakai minimal 1 orang selain pembuatnya, dengan dokumentasi singkat.

### Modul 2.8 — Demo Day & Serah Terima (Minggu 16)

**Format demo 5 menit:** masalah → siapa penggunanya → alur sebelum vs sesudah → demo langsung → waktu/biaya yang dihemat → risiko & batasan → rencana lanjutan.

---

## Output Wajib Track 2 (syarat lulus)

| # | Output | Kriteria |
|---|---|---|
| 1 | Blueprint automation | Diagram + daftar langkah |
| 2 | Workflow n8n dasar | Berjalan, minimal 3 node |
| 3 | Workflow dengan AI di dalamnya | Berjalan, ada penanganan error |
| 4 | 1 integrasi lintas aplikasi | Minimal 2 aplikasi tersambung |
| 5 | **1 automation end-to-end yang benar-benar berjalan** | **Wajib** — dipakai minimal 1 orang |
| 6 | Dokumentasi + demo 5 menit | Direkam |

---

## Perlengkapan & Biaya

| Kebutuhan | Wajib? | Perkiraan biaya |
|---|---|---|
| Laptop | ✅ | — |
| n8n | ✅ | Gratis (self-host) atau ±Rp 350 rb/bln (Cloud) |
| VPS untuk self-host | 🟡 | ±Rp 60–150 rb/bulan |
| API key model AI | ✅ | ±Rp 50–200 rb/bulan pemakaian belajar |
| Gateway WhatsApp | 🟡 Minggu 12 | ±Rp 100 rb/bulan |
| Akun Google | ✅ | Rp 0 |

> **Kelas patungan VPS.** Satu VPS Rp 150 rb/bulan bisa dipakai bersama 10 peserta untuk latihan = Rp 15 rb per orang. Ini menghilangkan hambatan biaya terbesar di track ini, dan sekaligus melatih peserta memakai server sungguhan.

---

## Catatan untuk Mentor

- **Minggu 10 adalah minggu paling rawan.** Pemasangan n8n dan urusan credential membuat banyak orang menyerah. Sediakan **1 instance n8n bersama milik komunitas** untuk latihan minggu pertama, baru minggu berikutnya peserta memasang sendiri.
- Selalu mulai dari **proses kerja nyata peserta**. Automation yang dibuat dari contoh fiktif tidak pernah dipakai setelah kelas selesai.
- Ajarkan **menghitung penghematan** sejak awal (menit × frekuensi × tarif per jam). Angka inilah yang nanti mereka pakai untuk menjual jasa automation ke klien.
- Track ini adalah pintu monetisasi tercepat anggota. Malang sudah terbukti punya permintaan software Rp 40 juta dan Rp 60 juta. Sebutkan itu di sesi pertama — bukan sebagai janji, tapi sebagai bukti pasar.
