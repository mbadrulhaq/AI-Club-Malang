# Tutorial 01 — Automasi Report
### Laporan penjualan harian yang mengirim dirinya sendiri

| | |
|---|---|
| **Level** | Pemula — belum pernah pakai n8n sama sekali |
| **Durasi** | 2–3 jam |
| **Prasyarat** | Bisa memakai Google Sheets. **Tidak perlu bisa coding** |
| **Track / Minggu** | Track 2 Builder · Minggu 9–11 |

---

## Yang Anda Miliki di Akhir Tutorial

Setiap hari pukul **17.00**, tanpa Anda sentuh:

```
Google Sheets          n8n                      AI                    WhatsApp / Telegram
(data penjualan)  →  ambil data hari ini  →  tulis narasi laporan  →  terkirim ke HP Anda
```

Pesan yang masuk kira-kira seperti ini:

```
📊 Laporan Penjualan — 5 September 2026

Hari ini masuk 23 transaksi dengan total omzet Rp 4.150.000,
naik dari rata-rata harian minggu ini.

• Es Kopi Susu tetap terlaris (41 cup)
• Rata-rata per transaksi Rp 180.435
• Jam ramai bergeser ke sore, bukan siang

Saran besok: siapkan stok Es Kopi Susu lebih banyak
untuk shift sore.
```

---

## Peta 30 Detik

Lima kotak, dihubungkan garis, dijalankan dari kiri ke kanan:

| Urutan | Node di n8n | Tugasnya |
|---|---|---|
| 1 | **Schedule Trigger** | Membangunkan workflow tiap hari jam 17.00 |
| 2 | **Google Sheets** | Mengambil seluruh baris dari spreadsheet |
| 3 | **Code** | Menyaring baris hari ini + menghitung ringkasan |
| 4 | **AI** | Mengubah angka menjadi kalimat |
| 5 | **Telegram / HTTP Request** | Mengirim ke HP |

---

# BAGIAN 0 — Persiapan (30 menit)

## 0.1 Tiga Istilah yang Perlu Anda Tahu Dulu

Cukup tiga. Tidak lebih.

| Istilah | Artinya dalam bahasa manusia |
|---|---|
| **Node** | Satu kotak kerja. Satu node = satu tugas. Seperti satu langkah di resep masakan |
| **Workflow** | Rangkaian node yang terhubung. Ini "resep" lengkapnya |
| **Item** | Satu potong data yang mengalir antar node. Satu baris spreadsheet = satu item |

Satu istilah bonus yang akan sering muncul:

**Expression** — cara mengambil nilai dari node sebelumnya. Ditulis di antara kurung kurawal ganda:

```
{{ $json.namaKolom }}
```

Artinya: *"ambil isi kolom `namaKolom` dari item yang sedang diproses"*. Itu saja.

## 0.2 Masuk ke n8n

Komunitas menyediakan instance bersama. Minta ke Koordinator Kurikulum:
- Alamat n8n (contoh: `https://n8n.aiclubmalang.id`)
- Nama pengguna & kata sandi
- Nama folder Anda (supaya workflow peserta tidak tercampur)

Setelah masuk, klik **Overview → Create Workflow**. Beri nama: `Laporan Harian — [Nama Anda]`.

> 💡 **Kenapa pakai instance bersama dulu?** Karena memasang n8n sendiri adalah penyebab menyerah nomor satu di kelas ini. Pasang sendiri nanti di minggu berikutnya, setelah Anda tahu n8n itu bisa apa.

## 0.3 Siapkan Google Sheets

Buat spreadsheet baru, beri nama `Data Penjualan`. **Baris pertama wajib berisi nama kolom persis seperti ini** (huruf besar-kecil berpengaruh):

| Tanggal | Produk | Qty | Harga | Total | Kasir |
|---|---|---|---|---|---|
| 2026-09-05 | Es Kopi Susu | 2 | 18000 | 36000 | Rina |
| 2026-09-05 | Roti Bakar | 1 | 15000 | 15000 | Rina |
| 2026-09-05 | Es Kopi Susu | 3 | 18000 | 54000 | Budi |

**Aturan pengisian:**
- `Tanggal` — format `YYYY-MM-DD` (2026-09-05). Ini yang paling jarang salah
- `Qty`, `Harga`, `Total` — **angka polos**, tanpa "Rp", tanpa titik, tanpa koma
- Jangan ada baris kosong di tengah data
- Isi minimal **10 baris data hari ini** untuk latihan

> ⚠️ Kesalahan paling sering: menulis `Rp 36.000` di kolom Total. Spreadsheet membacanya sebagai teks, bukan angka, dan hitungannya jadi nol. Tulis `36000` saja.

## 0.4 Siapkan Telegram Bot (10 menit)

Telegram dipakai untuk latihan karena gratis dan tidak butuh persetujuan apa pun.

**Membuat bot:**
1. Buka Telegram, cari **@BotFather**
2. Kirim `/newbot`
3. Beri nama bot (bebas), lalu username yang harus berakhiran `bot` — contoh `laporan_toko_rina_bot`
4. BotFather membalas dengan **token**, bentuknya seperti `8123456789:AAF...`
5. **Salin token itu, simpan.** Ini kunci — jangan dibagikan ke grup

**Mencari chat ID Anda:**
1. Cari bot yang baru Anda buat, tekan **Start**, kirim pesan apa saja (misal: `halo`)
2. Buka di browser: `https://api.telegram.org/bot<TOKEN>/getUpdates`
   (ganti `<TOKEN>` dengan token Anda, tanpa tanda kurung)
3. Cari bagian `"chat":{"id":123456789` — angka itulah **chat ID** Anda

> **Kalau `getUpdates` isinya kosong `{"ok":true,"result":[]}`** — berarti Anda belum mengirim pesan ke bot. Kirim dulu satu pesan, lalu muat ulang halamannya.

---

# BAGIAN 1 — Node 1: Schedule Trigger (10 menit)

Node pertama menentukan **kapan** workflow berjalan.

1. Di kanvas kosong, klik tanda **+** besar di tengah
2. Ketik `Schedule`, pilih **Schedule Trigger**
3. Atur:

| Kolom | Isi |
|---|---|
| Trigger Rules → Trigger Interval | **Days** |
| Days Between Triggers | `1` |
| Trigger at Hour | `5pm` (17.00) |
| Trigger at Minute | `0` |

4. Klik **Back to canvas**

> 💡 Selama latihan, Anda **tidak perlu menunggu jam 17.00**. Tombol **Execute Workflow** di bagian bawah menjalankannya sekarang juga. Jadwal baru berlaku setelah workflow diaktifkan (toggle **Active** di kanan atas).

---

# BAGIAN 2 — Node 2: Ambil Data dari Google Sheets (20 menit)

1. Klik tanda **+** di sebelah kanan node Schedule Trigger
2. Ketik `Google Sheets`, pilih **Google Sheets**
3. Pilih Action: **Get Row(s) in Sheet**

**Menyambungkan akun Google:**

4. Di kolom **Credential to connect with**, klik **Create new credential**
5. Pilih **Sign in with Google**, ikuti proses izin, pilih akun Anda
6. Beri centang pada izin Google Sheets, klik **Continue**

**Mengarahkan ke spreadsheet:**

| Kolom | Isi |
|---|---|
| Resource | `Sheet Within Document` |
| Operation | `Get Row(s)` |
| Document | `From list` → pilih **Data Penjualan** |
| Sheet | `From list` → pilih **Sheet1** |

7. Klik **Execute step** (tombol ▶ di dalam node)

**Yang harus Anda lihat:** panel **OUTPUT** di kanan berisi daftar baris. Setiap baris punya kolom `Tanggal`, `Produk`, `Qty`, `Harga`, `Total`, `Kasir`.

> ### 🔧 Kalau error
>
> | Pesan error | Sebabnya | Perbaikannya |
> |---|---|---|
> | `The resource you are requesting could not be found` | Salah pilih dokumen atau sheet | Pilih ulang dari daftar, jangan ketik manual |
> | `Forbidden` / `403` | Akun Google yang disambungkan tidak punya akses | Pastikan spreadsheet dimiliki atau dibagikan ke akun itu |
> | Output kosong `[]` | Sheet-nya memang kosong, atau baris judul salah | Cek baris pertama berisi nama kolom, dan ada data di bawahnya |
> | `invalid_grant` | Izin Google kedaluwarsa | Buat ulang credential-nya |

---

# BAGIAN 3 — Node 3: Hitung Ringkasan dengan Code (30 menit)

Node ini menyaring baris hari ini dan menghitung angka-angkanya. **Anda tidak perlu paham setiap barisnya** — salin dulu, jalankan, baru baca komentarnya.

1. Klik **+** setelah node Google Sheets
2. Ketik `Code`, pilih **Code**
3. Pastikan **Mode** = `Run Once for All Items`
4. Hapus isi bawaannya, salin kode berikut:

```javascript
// ── Ambil semua baris dari node Google Sheets ─────────────────────
const semua = $input.all().map(item => item.json);

// ── Tanggal hari ini menurut waktu Indonesia (format 2026-09-05) ──
const hariIni = new Date().toLocaleDateString('sv-SE', {
  timeZone: 'Asia/Jakarta',
});

// ── Ubah berbagai format tanggal menjadi satu bentuk baku ─────────
function keTanggalBaku(nilai) {
  if (!nilai) return '';
  const teks = String(nilai).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(teks)) return teks.slice(0, 10);   // 2026-09-05
  const cocok = teks.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/); // 05/09/2026
  if (cocok) {
    return `${cocok[3]}-${cocok[2].padStart(2, '0')}-${cocok[1].padStart(2, '0')}`;
  }
  return teks;
}

// ── Ubah "Rp 36.000" atau "36000" menjadi angka 36000 ─────────────
function keAngka(nilai) {
  const bersih = String(nilai ?? '0').replace(/[^0-9,-]/g, '').replace(',', '.');
  return Number(bersih) || 0;
}

// ── Saring hanya baris hari ini ───────────────────────────────────
const barisHariIni = semua.filter(r => keTanggalBaku(r.Tanggal) === hariIni);

// ── Hitung ringkasannya ───────────────────────────────────────────
const jumlahTransaksi = barisHariIni.length;
const totalOmzet = barisHariIni.reduce((t, r) => t + keAngka(r.Total), 0);
const rataRata = jumlahTransaksi ? Math.round(totalOmzet / jumlahTransaksi) : 0;

// ── Cari 3 produk terlaris ────────────────────────────────────────
const perProduk = {};
for (const r of barisHariIni) {
  const nama = String(r.Produk || 'Tidak diisi').trim();
  perProduk[nama] = (perProduk[nama] || 0) + keAngka(r.Qty);
}
const terlaris = Object.entries(perProduk)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3)
  .map(([nama, qty]) => `${nama} (${qty})`)
  .join(', ') || 'belum ada';

// ── Kirim hasilnya ke node berikutnya ─────────────────────────────
return [{
  json: {
    tanggal: hariIni,
    jumlahTransaksi,
    totalOmzet,
    rataRata,
    terlaris,
    adaData: jumlahTransaksi > 0,
  },
}];
```

5. Klik **Execute step**

**Yang harus Anda lihat:** satu item berisi `tanggal`, `jumlahTransaksi`, `totalOmzet`, `rataRata`, `terlaris`, `adaData`.

> ### 🔧 Kalau error
>
> | Gejala | Sebabnya | Perbaikannya |
> |---|---|---|
> | `jumlahTransaksi: 0` padahal ada data | Tanggal di sheet bukan hari ini, atau formatnya aneh | Isi beberapa baris dengan tanggal hari ini format `YYYY-MM-DD` |
> | `totalOmzet: 0` padahal transaksi ada | Kolom Total berisi teks `Rp 36.000` | Ubah jadi angka polos `36000` |
> | `Cannot read properties of undefined` | Nama kolom tidak sama persis | Cek huruf besar-kecil: `Total` bukan `total` |
> | `$input is not defined` | Mode-nya salah | Ubah ke `Run Once for All Items` |

> 💡 **Cara membaca error di n8n:** klik node yang berwarna merah, lihat tab **OUTPUT**. Pesan error selalu menyebut **node mana** dan **baris keberapa**. Baca kalimat pertamanya saja — 90% jawabannya ada di situ.

---

# BAGIAN 4 — Node 4: AI Menulis Laporannya (30 menit)

Angka sudah ada. Sekarang AI yang mengubahnya jadi kalimat.

1. Klik **+** setelah node Code
2. Ketik `Basic LLM Chain`, pilih **Basic LLM Chain**
   *(kalau tidak ada, pakai node **OpenAI** dengan action **Message a Model** — isian promptnya sama)*
3. Di bawah node akan muncul titik sambungan **Model**. Klik, pilih penyedia model, lalu pilih **Credential** milik komunitas (minta ke Koordinator Kurikulum)
4. Pada kolom **Prompt**, pilih **Define below**, lalu salin:

```
Kamu asisten laporan untuk pemilik usaha kecil di Indonesia.

DATA PENJUALAN HARI {{ $json.tanggal }}
- Jumlah transaksi : {{ $json.jumlahTransaksi }}
- Total omzet      : {{ $json.totalOmzet }}
- Rata-rata/transaksi : {{ $json.rataRata }}
- Produk terlaris  : {{ $json.terlaris }}

Tulis laporan singkat untuk dikirim lewat WhatsApp:
1. Judul dengan emoji dan tanggal
2. Satu kalimat pembuka berisi angka utama
3. Tiga poin temuan, diawali tanda •
4. Satu saran tindakan untuk besok

ATURAN
- Bahasa Indonesia, santai tapi profesional
- Maksimal 120 kata
- Tulis rupiah dengan titik pemisah ribuan, contoh: Rp 1.250.000
- JANGAN mengarang angka apa pun yang tidak ada di data di atas
- Kalau jumlah transaksi 0, jangan menganalisis apa-apa — cukup ingatkan
  bahwa data hari ini belum diisi
- Keluarkan HANYA isi laporannya, tanpa kalimat pengantar dari kamu
```

5. Klik **Execute step**

**Yang harus Anda lihat:** teks laporan yang rapi di panel OUTPUT.

> 💡 **Perhatikan nama kolom hasilnya.** Tergantung node yang dipakai, hasil AI bisa tersimpan di `text`, `response`, `output`, atau `message.content`. **Lihat sendiri di panel OUTPUT**, karena nama itu akan dipakai di node berikutnya. Di tutorial ini kita anggap namanya `text`.

> ### 🔧 Kalau error
>
> | Pesan error | Sebabnya | Perbaikannya |
> |---|---|---|
> | `401 Unauthorized` | API key salah atau belum dipasang | Pilih ulang credential |
> | `429 Too Many Requests` | Terlalu sering memanggil | Tunggu 1 menit, coba lagi |
> | `insufficient_quota` | Saldo API habis | Lapor Koordinator Kurikulum |
> | Hasil mengarang angka | Prompt kurang tegas | Pastikan baris "JANGAN mengarang angka" ada |
> | Hasil kepanjangan | Batas kata diabaikan | Tambah: "Kalau lebih dari 120 kata, potong." |

---

# BAGIAN 5 — Node 5: Kirim ke Telegram (15 menit)

1. Klik **+** setelah node AI
2. Ketik `Telegram`, pilih **Telegram**, action **Send Message**
3. Buat credential baru: tempel **token dari BotFather**
4. Isi:

| Kolom | Isi |
|---|---|
| Chat ID | chat ID Anda (angka dari Bagian 0.4) |
| Text | `{{ $json.text }}` |

5. Klik **Execute step**

**Cek HP Anda.** Laporan seharusnya sudah masuk.

> ### 🔧 Kalau error
>
> | Pesan error | Perbaikannya |
> |---|---|
> | `chat not found` | Chat ID salah, atau Anda belum menekan **Start** di bot |
> | `Unauthorized` | Token salah — salin ulang dari BotFather |
> | Pesan masuk tapi kosong | Nama kolom salah. Cek OUTPUT node AI, ganti `{{ $json.text }}` sesuai nama aslinya |
> | `can't parse entities` | AI mengeluarkan karakter Markdown aneh. Kosongkan kolom **Parse Mode** di Options |

---

# BAGIAN 6 — Kirim ke WhatsApp Lewat Fonnte (20 menit)

Telegram untuk latihan. **WhatsApp untuk pemakaian sehari-hari**, karena di situlah orang Indonesia benar-benar membaca.

1. Klik **+** setelah node AI (sejajar dengan Telegram, boleh keduanya)
2. Ketik `HTTP Request`, pilih **HTTP Request**
3. Isi:

| Kolom | Isi |
|---|---|
| Method | `POST` |
| URL | `https://api.fonnte.com/send` |
| Authentication | `None` |
| Send Headers | ✅ aktifkan |
| Header — Name | `Authorization` |
| Header — Value | token Fonnte komunitas |
| Send Body | ✅ aktifkan |
| Body Content Type | `Form-Urlencoded` |

4. Tambahkan dua parameter body:

| Name | Value |
|---|---|
| `target` | `628123456789` — nomor tujuan, awali `62`, tanpa `+` dan tanpa `0` |
| `message` | `{{ $json.text }}` |

5. Klik **Execute step**

> ### 🔧 Kalau error
>
> | Gejala | Perbaikannya |
> |---|---|
> | `"status": false, "reason": "token invalid"` | Token salah atau ada spasi ikut tersalin |
> | Terkirim tapi tidak sampai | Nomor tujuan salah format. Harus `628…`, bukan `08…` atau `+628…` |
> | `device not connected` | Perangkat WhatsApp di dasbor Fonnte belum tersambung. Lapor Koordinator |
>
> 📌 Tampilan dan nama kolom Fonnte bisa berubah. Kalau berbeda dari tutorial ini, buka dokumentasi resmi Fonnte dan cocokkan nama parameternya.

---

# BAGIAN 7 — Uji, Aktifkan, Rawat (15 menit)

## 7.1 Uji menyeluruh
1. Klik **Execute Workflow** di bawah kanvas
2. Semua node harus **hijau**. Satu saja merah, workflow berhenti di situ
3. Pastikan pesan benar-benar masuk ke HP

## 7.2 Aktifkan
Geser toggle **Active** di kanan atas ke posisi menyala. Mulai besok, jam 17.00 laporan berjalan sendiri.

## 7.3 Tambahkan penjaga kalau data kosong
Supaya tidak mengirim laporan kosong saat toko libur:

1. Sisipkan node **IF** di antara **Code** dan **AI**
2. Isi kondisi:

| Kolom | Isi |
|---|---|
| Value 1 | `{{ $json.adaData }}` |
| Operation | `is true` |

3. Sambungkan jalur **true** ke node AI. Jalur **false** dibiarkan kosong

## 7.4 Rawat mingguan
- Buka tab **Executions** seminggu sekali
- Yang berwarna merah = gagal. Klik untuk melihat sebabnya
- Penyebab paling umum: izin Google kedaluwarsa, atau nama kolom di sheet diubah orang lain

---

# BAGIAN 8 — Latihan

| # | Latihan | Yang dilatih |
|---|---|---|
| 1 | Ganti laporan harian jadi mingguan (7 hari terakhir) | Mengolah tanggal |
| 2 | Tambahkan perbandingan dengan kemarin, lengkap dengan panah ↑↓ | Logika perbandingan |
| 3 | Kirim ke 3 nomor sekaligus | Perulangan item |
| 4 | Simpan setiap laporan ke sheet `Arsip Laporan` | Menulis balik ke Sheets |
| 5 | **Ganti seluruh isinya dengan data pekerjaan Anda sendiri** | ⭐ Yang paling penting |

> **Latihan 5 adalah tugas sesungguhnya.** Laporan penjualan kafe hanyalah contoh. Yang membuat automation ini terpakai setelah kelas selesai adalah ketika datanya data Anda: absensi, stok, tagihan, jadwal, laporan proyek — apa pun yang selama ini Anda rekap manual tiap sore.

---

# BAGIAN 9 — Naik Level

| Ingin | Pelajari |
|---|---|
| Laporan berisi grafik | QuickChart lewat HTTP Request → kirim sebagai gambar |
| Data dari aplikasi kasir, bukan Sheets | Webhook / API kasir |
| Laporan lintas cabang | Loop + Merge |
| Deteksi anomali otomatis | Perbandingan statistik + prompt "cari yang tidak wajar" |
| Bertanya balik ke data lewat chat | RAG — Minggu 13 |

---

## Rangkuman Satu Halaman

```
Schedule Trigger  →  Google Sheets  →  Code  →  IF  →  AI  →  Telegram / Fonnte
   jam 17.00         ambil semua      hitung   ada    tulis      kirim
                        baris        ringkasan data?  narasi
```

**Tiga hal yang paling sering membuat gagal:**
1. Kolom angka ditulis `Rp 36.000` — harus `36000`
2. Nama kolom di kode tidak sama persis dengan di sheet (huruf besar-kecil berpengaruh)
3. Nama kolom hasil AI ditebak, bukan dilihat di panel OUTPUT
