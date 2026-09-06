# Kemitraan AIoT — Maker Lab Proyek Perdana

**Status:** 🟢 Kerja sama disetujui Ketua · Maker Lab naik dari "Bulan 7, bila kuorum" menjadi **proyek jalan sejak Bulan 1**

---

## Kenapa Ini Dijalankan Lebih Dulu

Maker Lab semula dijadwalkan bulan ke-7 karena diasumsikan butuh menunggu peminat. Asumsi itu gugur oleh dua kalimat yang ditulis anggota sendiri di perkenalan grup:

> *"ai iot penghitung lobster laut"*
> *"buat manajemen hidroponik tomat Chery dan kebun alpukat"*

**Itu bukan minat. Itu dua masalah bisnis yang pemiliknya sudah ada, sudah di grup, dan sudah menyebutkannya lebih dulu.** Dengan kerja sama disetujui, tidak ada lagi alasan menunggu.

---

## Proyek 1 — Penghitung Lobster

| | |
|---|---|
| **Sektor** | Perikanan / budidaya |
| **Masalah** | Penghitungan lobster manual: lambat, tidak konsisten, sulit diverifikasi saat transaksi |
| **Nilai bagi pemilik** | Hitungan akurat = harga akurat, stok akurat, sengketa berkurang |
| **Perangkat inti** | Kamera + Raspberry Pi 5 (atau Jetson bila volumenya besar) + model deteksi objek |
| **Perkiraan perangkat** | Rp 2,5–4 juta |
| **Durasi** | 8 sesi (±2 bulan) |

### Tahapan

| Sesi | Kegiatan | Hasil |
|---|---|---|
| 1 | Kunjungan lokasi + wawancara pemilik | Ruang lingkup tertulis, disepakati dua pihak |
| 2 | Pengumpulan data: foto/video lobster di kondisi nyata | Dataset awal |
| 3 | Penyiapan perangkat + kamera | Perangkat menyala, gambar masuk |
| 4–5 | Pelatihan & penyetelan model deteksi | Model menghitung dengan akurasi terukur |
| 6 | Dashboard + notifikasi | Angka bisa dibaca pemilik |
| 7 | Uji lapangan | Perbandingan hitung manual vs sistem |
| 8 | Pemasangan + pelatihan pengguna + serah terima | Sistem dipakai harian |

### Yang menentukan berhasil-tidaknya
Pencahayaan, sudut kamera, dan latar belakang jauh lebih menentukan daripada pilihan model. **Sesi 2 dan 3 adalah sesi terpenting** — bukan sesi pelatihan model.

---

## Proyek 2 — Manajemen Hidroponik & Kebun Alpukat

| | |
|---|---|
| **Sektor** | Pertanian / agrowisata |
| **Masalah** | Pemantauan kelembaban, nutrisi, dan pH manual; keputusan penyiraman berdasar perkiraan |
| **Nilai bagi pemilik** | Panen lebih stabil, hemat air & nutrisi, ada catatan untuk evaluasi |
| **Perangkat inti** | ESP32 + sensor kelembaban tanah, EC, pH, suhu/kelembaban udara + relay pompa |
| **Perkiraan perangkat** | Rp 1,5–2,5 juta |
| **Durasi** | 8 sesi (±2 bulan) |

### Tahapan

| Sesi | Kegiatan | Hasil |
|---|---|---|
| 1 | Kunjungan lokasi + wawancara | Ruang lingkup tertulis |
| 2 | Rakit ESP32 + sensor di meja | Sensor membaca angka |
| 3 | MQTT + kirim data ke server | Data masuk database |
| 4 | Dashboard + ambang batas peringatan | Grafik & notifikasi Telegram/WA |
| 5 | Pemasangan di lokasi | Perangkat hidup di kebun |
| 6 | AI membaca data sensor | Laporan bahasa manusia + rekomendasi penyiraman |
| 7 | Otomasi penyiraman (dengan persetujuan manusia) | Relay pompa terkendali |
| 8 | Serah terima + panduan perawatan | Pemilik bisa mengoperasikan sendiri |

### Kenapa proyek ini strategis
Malang Raya dikelilingi lahan pertanian, dan Batu adalah pusat agrowisata. **Satu sistem hidroponik yang berhasil menjadi contoh yang bisa ditunjukkan ke puluhan pemilik kebun lain** — dan sektor ini hampir belum tersentuh pemain teknologi lokal.

---

## Skema Kemitraan yang Disarankan

**Pilot Berbagi Biaya** — bukan proyek berbayar penuh, bukan pula gratis.

| Pihak | Menanggung | Mendapat |
|---|---|---|
| **Mitra (pemilik masalah)** | Perangkat + lokasi + akses data + waktu | Sistem jadi, terpasang, dan menjadi miliknya. Pelatihan pengguna. Perawatan 3 bulan |
| **AI Club Malang** | Tenaga, keahlian, mentor, kit lab bersama | Studi kasus, hak publikasi, dokumentasi, dan **template yang bisa dijual ulang** |
| **Peserta Maker Lab** | Waktu & kerja | Portofolio nyata, sertifikat Maker, prioritas eksekusi proyek berbayar berikutnya |

**Kenapa skema ini yang dipilih:**
- Mitra tidak diminta membayar jasa yang belum terbukti — hambatan psikologis hilang
- Komunitas tidak menanggung biaya perangkat — anggaran Rp 1 juta tetap utuh untuk kelas
- Peserta mendapat pengalaman lapangan yang tidak bisa didapat dari kelas mana pun

### Kesepakatan tertulis (wajib, 1 halaman)

```
KESEPAKATAN PILOT AIoT — AI CLUB MALANG

Mitra            : ____________________
Proyek           : ____________________
Lokasi           : ____________________

RUANG LINGKUP
Yang dikerjakan  : ____________________
Yang TIDAK       : ____________________
Ukuran berhasil  : ____________________ (angka, bukan kata sifat)

TANGGUNG JAWAB
Mitra            : perangkat (Rp _______), lokasi, akses data, 1 PIC
AI Club Malang   : tenaga, keahlian, mentor, dokumentasi

KEPEMILIKAN
Perangkat & sistem terpasang  : milik Mitra
Kode & dokumentasi teknis     : milik bersama
Hak publikasi & studi kasus   : AI Club Malang (nama usaha boleh disamarkan bila diminta)
Template untuk klien lain     : AI Club Malang

JADWAL           : 8 sesi, ______ s/d ______
PERAWATAN        : 3 bulan setelah serah terima, lalu opsional berbayar

Tanda tangan Mitra: ______   Ketua AI Club Malang: ______   Tanggal: ______
```

> Pasal **"Ukuran berhasil"** wajib diisi angka. *"Sistemnya jalan"* bukan ukuran. *"Hitungan sistem meleset maksimal 5% dibanding hitung manual pada 10 kali uji"* adalah ukuran. Tanpa itu, proyek tidak pernah bisa dinyatakan selesai — dan itu penyebab nomor satu proyek komunitas menggantung.

---

## Nilai Lanjutan: Dari Satu Proyek Menjadi Satu Lini Usaha

Ini bagian yang paling sering terlewat.

```
1 pilot lobster selesai
   → template deteksi & penghitungan objek
   → dijual ulang ke tambak, pengepul, gudang di Malang selatan
   → Rp 20–50 jt per pemasangan

1 pilot hidroponik selesai
   → template pemantauan pertanian
   → dijual ulang ke agrowisata Batu, greenhouse, peternakan
   → Rp 15–40 jt per pemasangan
```

**Yang dibangun bukan dua proyek. Yang dibangun adalah dua template beserta bukti bahwa keduanya bekerja** — dan bukti itulah yang dibeli klien berikutnya.

Untuk proyek berbayar setelah pilot, berlaku bagi hasil [Aturan Mentor §5.4](../04-ATURAN-MENTOR.md): eksekutor 70% · pembawa lead 15% · kas AI Club Malang 15%.

---

## Nilai untuk Komunitas di Luar Uang

| Manfaat | Kenapa besar |
|---|---|
| **Bahan konten terbaik** | Sensor menyala, kamera menghitung lobster, dashboard kebun — ini konten media sosial paling menarik yang bisa dimiliki komunitas AI mana pun di Malang |
| **Magnet liputan media** | Media lokal jauh lebih tertarik pada "AI menghitung lobster di Malang selatan" daripada pada "komunitas AI mengadakan seminar" |
| **Kartu masuk kampus** | Proyek nyata di sektor perikanan & pertanian adalah bahan kolaborasi riset yang langsung dimengerti fakultas |
| **Pembeda dari komunitas lain** | Hampir semua komunitas AI berhenti di layar. Yang menyentuh dunia fisik sangat sedikit |

---

## Langkah Pertama (minggu ini)

| ✅ | Aksi | PJ |
|---|---|---|
| ☐ | Japri dua anggota pemilik masalah, tawarkan skema pilot | Ketua |
| ☐ | Kunjungan lokasi salah satu proyek | Ketua + Mentor Maker Lab |
| ☐ | Isi lembar kesepakatan bersama mitra — terutama "ukuran berhasil" | Ketua |
| ☐ | Tetapkan mentor penanggung jawab Maker Lab | Ketua |
| ☐ | Buka pendaftaran Maker Lab, 6–10 orang | Koord. Kurikulum |
| ☐ | Daftar belanja perangkat, disetujui mitra | Mentor Maker Lab |

> Mulai dari **satu** proyek, bukan dua sekaligus. Proyek kedua dimulai setelah yang pertama melewati sesi 4 — supaya pelajaran dari yang pertama terpakai di yang kedua.
