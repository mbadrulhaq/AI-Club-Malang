# Track 5 — AIC Maker Lab
### AIoT, Edge AI & Smart Device

| | |
|---|---|
| **Level pusat** | 5 (Organizations) |
| **Target peserta** | AI Builder / AI Engineer + pelaku usaha dengan kebutuhan fisik |
| **Format** | **Lab berbasis proyek** — 1 proyek nyata per angkatan, 8 sesi |
| **Prasyarat** | Selesai Track 2. Tidak wajib punya latar elektronika. |
| **Kapasitas** | 6–10 orang per proyek |
| **Jadwal buka** | Bulan 7 — atau lebih cepat bila ada klien/proyek nyata |

---

## Track Ini Sudah Punya Dua Pelanggan

Berbeda dari track lain, Maker Lab tidak perlu mencari permintaan. Dua anggota menulis kebutuhannya sendiri di perkenalan grup:

> *"ai iot penghitung lobster laut"*
> *"buat manajemen hidroponik tomat Chery dan kebun alpukat"*

Dua kalimat itu adalah **dua proyek berbayar yang sudah menunggu**, dari sektor yang justru kuat di Malang Raya: perikanan dan pertanian. Ditambah lokasi Malang yang dikelilingi lahan pertanian, peternakan, dan wisata, permintaan seperti ini akan terus datang.

> **Karena itu Maker Lab dijalankan sebagai lab proyek, bukan kelas.** Setiap angkatan mengambil satu kebutuhan nyata dari anggota atau klien, lalu menyelesaikannya bersama dari nol sampai terpasang. Materi diajarkan sambil membangun — bukan sebelumnya.

---

## Silabus 8 Sesi

### Sesi 5.1 — Dasar IoT untuk Orang AI
Sensor, actuator, microcontroller, gateway, dashboard. Peta perangkat: **ESP32** (murah, WiFi, untuk sensor), **Raspberry Pi** (Linux penuh, untuk kamera & pemrosesan ringan), **NVIDIA Jetson** (untuk computer vision berat). Memilih perangkat sesuai kebutuhan dan anggaran.

### Sesi 5.2 — Menghubungkan Perangkat
GPIO, I2C, SPI dalam bahasa sederhana. WiFi & MQTT. Broker MQTT (Mosquitto). HTTP & webhook. Mengirim data sensor ke internet. Node-RED sebagai penghubung visual.

### Sesi 5.3 — Data Masuk ke Sistem
MQTT → n8n → database. Time-series database. Dashboard: Grafana, Looker Studio, Node-RED Dashboard. Ambang batas & peringatan. Notifikasi ke Telegram/WhatsApp.

### Sesi 5.4 — Computer Vision Dasar
Deteksi objek: YOLO dan sejenisnya. Menghitung objek (langsung menjawab kasus *penghitung lobster*). Deteksi gerak & keamanan. Pemasangan kamera: pencahayaan, sudut, jarak. Kualitas data lebih menentukan daripada model.

### Sesi 5.5 — Edge AI
Menjalankan model di perangkat, bukan di cloud: lebih cepat, hemat kuota, tetap jalan saat internet putus. TensorFlow Lite, ONNX. Optimasi model untuk perangkat kecil. Kapan memproses di edge dan kapan mengirim ke server.

### Sesi 5.6 — AI di Atas Data Sensor
LLM membaca data sensor dan membuat laporan bahasa manusia. Deteksi anomali. Perawatan prediktif. Rekomendasi tindakan (langsung menjawab kasus *manajemen hidroponik*: sensor kelembaban & nutrisi → AI → rekomendasi penyiraman).

### Sesi 5.7 — Membangun Proyek Angkatan
Kerja kelompok pada satu kebutuhan nyata: rancang → rakit → uji → pasang.

### Sesi 5.8 — Pemasangan & Serah Terima
Pemasangan di lokasi. Catu daya & ketahanan cuaca. Dokumentasi. Pelatihan pengguna. Skema perawatan berbayar.

---

## Bank Proyek Maker Lab

| Proyek | Sektor | Sumber | Perangkat inti |
|---|---|---|---|
| **Penghitung lobster** | Perikanan | Permintaan anggota | Kamera + Jetson/RPi + YOLO |
| **Manajemen hidroponik & kebun alpukat** | Pertanian | Permintaan anggota | ESP32 + sensor kelembaban/EC/pH + dashboard |
| Penghitung pengunjung | Ritel, kafe, wisata | Umum di Malang | Kamera + RPi |
| Pemantau mesin produksi | Manufaktur | UMKM Malang | ESP32 + sensor getar/suhu |
| Smart room / kelas | Pendidikan | Banyak guru di komunitas | ESP32 + sensor + relay |
| Kamera keamanan cerdas | Umum | Umum | Kamera + deteksi objek |
| Pemantau kualitas udara | Kesehatan, kantor | Umum | ESP32 + sensor PM2.5 |
| Smart farming ternak | Peternakan | Malang Raya | Sensor + kamera + notifikasi |

---

## Output Wajib

| # | Output |
|---|---|
| 1 | 1 perangkat mengirim data sensor ke dashboard |
| 2 | 1 model computer vision berjalan pada kasus nyata |
| 3 | Rangkaian lengkap: sensor/kamera → AI → dashboard/notifikasi/aksi |
| 4 | Proyek angkatan terpasang di lokasi nyata |
| 5 | Dokumentasi + panduan pengguna + skema perawatan |

---

## Perkiraan Biaya Perangkat

| Perangkat | Harga |
|---|---|
| ESP32 | Rp 50–80 rb |
| Paket sensor dasar (suhu, kelembaban, cahaya, gerak) | Rp 150–250 rb |
| Raspberry Pi 4/5 | Rp 900 rb – 1,8 jt |
| Kamera modul | Rp 150–400 rb |
| NVIDIA Jetson Nano/Orin | Rp 2,5–8 jt |
| Sensor pertanian (EC, pH, kelembaban tanah) | Rp 300–800 rb |
| **Kit lab bersama** | **±Rp 3–5 juta** |

> **Perangkat dibeli sekali, dipakai banyak angkatan.** Kit lab Rp 3–5 juta bisa dibiayai dari kas komunitas, sponsor kampus, atau uang muka klien proyek pertama. Setelah itu setiap angkatan hanya menambah komponen khusus proyeknya.

---

## Catatan untuk Mentor

- **Jangan mulai dari teori elektronika.** Mulai dari proyek. Peserta belajar MQTT karena butuh mengirim data lobsternya, bukan karena ada slide tentang MQTT.
- Pasangkan satu orang yang paham perangkat keras dengan satu orang yang paham AI. Jarang ada yang menguasai keduanya, dan pasangan ini bekerja sangat baik.
- **Bawa klien ke ruangan.** Proyek yang pemiliknya hadir di sesi rancangan selesai jauh lebih sering daripada proyek yang hanya berdasarkan cerita.
- Track ini menghasilkan foto dan video paling menarik untuk media sosial komunitas. Dokumentasikan setiap sesi — ini bahan konten terbaik yang dimiliki AI Club Malang.
