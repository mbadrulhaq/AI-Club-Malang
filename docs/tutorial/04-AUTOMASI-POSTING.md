# Tutorial 04 — Automasi Posting
### Kalender konten yang memposting dirinya sendiri — setelah Anda setujui

| | |
|---|---|
| **Level** | Menengah |
| **Durasi** | 3–4 jam |
| **Prasyarat** | [Tutorial 01](01-AUTOMASI-REPORT.md) selesai. Untuk Bagian C: akun Instagram Bisnis + Halaman Facebook |
| **Track / Minggu** | Track 2 Builder · Minggu 12 |

---

## Baca Ini Dulu

Auto-posting adalah tutorial dengan **prasyarat terbanyak** dan **paling sering membuat pemula menyerah**. Maka urutannya dibuat menaik:

| Bagian | Isi | Prasyarat | Kesulitan |
|---|---|---|---|
| **A** | Kalender konten + AI penulis draft | Google Sheets saja | ⭐ Mudah |
| **B** | Auto-post ke Telegram | Bot Telegram | ⭐ Mudah |
| **C** | Auto-post ke Instagram | Akun Bisnis + Aplikasi Meta | ⭐⭐⭐ Sulit |
| **D** | Multi-platform lewat layanan pihak ketiga | Akun berbayar | ⭐⭐ Sedang |

**Selesaikan A dan B dulu.** Keduanya sudah memberi 80% manfaatnya: konten terjadwal, draft otomatis, dan tidak ada lagi "besok posting apa ya".

> ⚠️ **Jangan pernah menjalankan auto-posting tanpa langkah persetujuan.** Satu konten salah yang terbit ke ribuan pengikut tidak bisa ditarik. Setiap workflow di tutorial ini punya kolom `Status` yang harus Anda ubah manual menjadi `setuju` sebelum apa pun terbit.

---

# BAGIAN A — Kalender Konten + Penulis Draft (60 menit)

## A.1 Spreadsheet sebagai Otak Kalender

Buat spreadsheet `Kalender Konten` dengan sheet `Jadwal`:

| ID | Tanggal | Jam | Platform | Pilar | Topik | Caption | Hashtag | Gambar URL | Status | Link Hasil |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2026-09-08 | 19:00 | Instagram | Edukasi | 3 cara AI bantu UMKM | | | | `draft` | |
| 2 | 2026-09-09 | 12:00 | Telegram | Promo | Kelas Builder dibuka | | | | `draft` | |

**Arti kolom Status — ini saklar pengamannya:**

| Status | Artinya |
|---|---|
| `draft` | Topik sudah ada, caption belum ditulis |
| `siap` | AI sudah menulis caption, **menunggu Anda baca** |
| `setuju` | ✅ Anda sudah membaca dan menyetujui — boleh terbit |
| `terbit` | Sudah diposting |
| `batal` | Dibatalkan |

> Hanya baris ber-status `setuju` yang akan diposting. **Perubahan `siap` → `setuju` selalu Anda lakukan manual.** Itu satu-satunya pagar antara konten Anda dan hal memalukan yang terbit sendiri.

## A.2 Workflow Penulis Draft

Workflow baru: `Konten — Tulis Draft`.

**Node 1 — Manual Trigger**

**Node 2 — Google Sheets (Get Rows)**
| Kolom | Isi |
|---|---|
| Sheet | `Jadwal` |
| Options → Filter | Column `Status`, Value `draft` |

**Node 3 — AI (Basic LLM Chain)**

```
Kamu pengelola media sosial untuk komunitas AI di Malang.

BRIEF KONTEN
Platform : {{ $json.Platform }}
Pilar    : {{ $json.Pilar }}
Topik    : {{ $json.Topik }}
Tanggal  : {{ $json.Tanggal }}

GAYA BAHASA KAMI
- Bahasa Indonesia santai tapi tidak alay
- Menyapa pembaca dengan "kamu", bukan "Anda"
- Kalimat pendek, satu ide per paragraf
- Praktis dan konkret, bukan motivasi kosong
- Tanpa emoji berlebihan: maksimal 3 per caption

TUGAS
Tulis caption untuk platform di atas, dengan struktur:
1. Hook di baris pertama — harus membuat orang berhenti menggulir
2. Isi 2–4 paragraf pendek
3. Satu ajakan bertindak yang jelas
4. 8 hashtag relevan, campuran umum dan lokal Malang

PANJANG
- Instagram : maksimal 150 kata
- Telegram  : maksimal 100 kata
- LinkedIn  : maksimal 200 kata

JANGAN
- Mengarang angka, testimoni, atau jadwal yang tidak diberikan
- Memakai kata: "di era digital ini", "tak dapat dipungkiri", "solusi terbaik"
- Menutup dengan pertanyaan basa-basi seperti "gimana menurutmu?"

KELUARKAN HANYA JSON tanpa penjelasan dan tanpa tanda ```:
{"caption":"...","hashtag":"#a #b #c ..."}
```

**Node 4 — Code**

```javascript
const hasil = [];

for (const item of $input.all()) {
  const asli = item.json;
  let teks = asli.text ?? asli.response ?? asli.output ?? asli.content ?? '';
  teks = String(teks).replace(/```json/gi, '').replace(/```/g, '').trim();

  let data;
  try {
    data = JSON.parse(teks);
  } catch (e) {
    const a = teks.indexOf('{'), b = teks.lastIndexOf('}');
    if (a === -1 || b === -1) throw new Error('AI tidak mengembalikan JSON: ' + teks.slice(0, 200));
    data = JSON.parse(teks.slice(a, b + 1));
  }

  hasil.push({ json: { caption: data.caption, hashtag: data.hashtag } });
}

return hasil;
```

**Node 5 — Google Sheets (Update)**
| Kolom | Isi |
|---|---|
| Operation | `Update Row in Sheet` |
| Column to Match On | `ID` |
| Caption | `{{ $json.caption }}` |
| Hashtag | `{{ $json.hashtag }}` |
| Status | `siap` |

> 📌 Agar node Update tahu baris mana yang diperbarui, kolom `ID` harus ikut mengalir. Cara termudah: di node Code, tambahkan `ID: asli.ID` — tetapi karena node AI memutus data aslinya, gunakan node **Merge** (mode `Combine by Position`) untuk menggabungkan kembali keluaran AI dengan baris asli dari Google Sheets sebelum masuk ke node Update.

Jalankan. Sheet terisi caption, status berubah `siap`.

**Sekarang tugas Anda:** baca semua caption. Yang bagus, ubah statusnya menjadi `setuju`. Yang kurang, perbaiki sendiri lalu `setuju`. Yang tidak cocok, `batal`.

---

# BAGIAN B — Auto-Post ke Telegram (30 menit)

Telegram dulu, karena tidak butuh izin apa pun dan bisa langsung dilihat hasilnya.

Workflow baru: `Konten — Posting Telegram`.

**Node 1 — Schedule Trigger**
| Kolom | Isi |
|---|---|
| Trigger Interval | `Minutes` |
| Minutes Between Triggers | `15` |

**Node 2 — Google Sheets (Get Rows)**
Filter: `Status` = `setuju`

**Node 3 — Code (saring yang waktunya sudah tiba)**

```javascript
const sekarang = new Date();
const tglSekarang = sekarang.toLocaleDateString('sv-SE', { timeZone: 'Asia/Jakarta' });
const jamSekarang = sekarang.toLocaleTimeString('en-GB', {
  timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit',
});

function tglBaku(v) {
  const t = String(v ?? '').trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(t)) return t.slice(0, 10);
  const m = t.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
  return m ? `${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}` : t;
}

const siap = $input.all()
  .map(i => i.json)
  .filter(r => String(r.Platform).toLowerCase() === 'telegram')
  .filter(r => {
    const tgl = tglBaku(r.Tanggal);
    const jam = String(r.Jam ?? '').slice(0, 5);
    if (tgl < tglSekarang) return true;               // terlewat, kirim sekarang
    if (tgl > tglSekarang) return false;              // belum waktunya
    return jam <= jamSekarang;                        // hari ini, jamnya sudah lewat
  })
  .map(r => ({
    json: {
      ID: r.ID,
      pesan: `${r.Caption}\n\n${r.Hashtag ?? ''}`.trim(),
    },
  }));

return siap;
```

**Node 4 — Telegram (Send Message)**
| Kolom | Isi |
|---|---|
| Chat ID | ID channel/grup Anda |
| Text | `{{ $json.pesan }}` |

**Node 5 — Google Sheets (Update)**
Match on `ID`, isi kolom `Status` dengan `terbit`.

> **Node 5 wajib ada.** Tanpa itu, workflow akan memposting konten yang sama setiap 15 menit, selamanya.

> ### 🔧 Kalau error
>
> | Gejala | Perbaikannya |
> |---|---|
> | Konten terkirim berulang | Node Update tidak jalan, atau `ID` tidak cocok. Cek sheet — status sudah berubah `terbit`? |
> | Tidak ada yang terkirim | Belum ada baris ber-status `setuju`, atau jamnya belum tiba, atau kolom Platform bukan `Telegram` |
> | `chat not found` | Bot belum ditambahkan sebagai admin di channel |
> | Format jam salah | Kolom `Jam` harus `19:00`, bukan `7 PM`. Format sel Sheets sebagai **Teks** |

---

# BAGIAN C — Auto-Post ke Instagram (90 menit) ⭐⭐⭐

## C.1 Prasyarat yang Tidak Bisa Dilewati

| # | Syarat | Cara memeriksa |
|---|---|---|
| 1 | Akun Instagram **Bisnis** atau **Creator** | IG → Pengaturan → Jenis akun |
| 2 | Terhubung ke sebuah **Halaman Facebook** | IG → Pengaturan → Akun terhubung |
| 3 | Punya **aplikasi Meta** di developers.facebook.com | Buat aplikasi tipe **Business** |
| 4 | Izin: `instagram_basic`, `instagram_content_publish`, `pages_show_list` | Graph API Explorer |
| 5 | **Gambar harus berupa URL publik** | Tidak bisa mengunggah berkas langsung |

> ❗ **Poin 5 adalah yang paling sering mengejutkan.** API Instagram tidak menerima unggahan berkas — ia hanya menerima **tautan** ke gambar yang sudah ada di internet dan bisa diakses siapa saja. Gambar di Google Drive pribadi **tidak bisa dipakai** kecuali dijadikan publik.

## C.2 Mendapatkan Token dan ID

1. Buka **Graph API Explorer** di developers.facebook.com
2. Pilih aplikasi Anda, klik **Generate Access Token**, setujui izin di poin 4
3. Cari **Instagram User ID**:
   ```
   GET /me/accounts
   ```
   → catat `id` Halaman Facebook Anda
   ```
   GET /{page-id}?fields=instagram_business_account
   ```
   → di dalamnya ada `instagram_business_account.id`. **Itulah IG User ID Anda**
4. Token dari Explorer hanya berlaku ±1 jam. Untuk pemakaian rutin, tukar menjadi **Long-Lived Token** (berlaku ±60 hari) lewat menu **Access Token Tool**

> 📌 Nomor versi API (`v21.0` di contoh berikut) berubah beberapa kali setahun. **Cek versi terbaru yang tersedia di Graph API Explorer** dan sesuaikan URL-nya.

## C.3 Posting Butuh Dua Langkah

Instagram tidak bisa memposting dalam satu panggilan. Selalu dua:

```
Langkah 1: buat wadah  →  dapat creation_id
Langkah 2: terbitkan wadah itu
```

**Node — HTTP Request (Buat Wadah)**

| Kolom | Isi |
|---|---|
| Method | `POST` |
| URL | `https://graph.facebook.com/v21.0/IG_USER_ID/media` |
| Send Query Parameters | ✅ |

Query parameters:

| Name | Value |
|---|---|
| `image_url` | `{{ $json['Gambar URL'] }}` |
| `caption` | `{{ $json.Caption }}\n\n{{ $json.Hashtag }}` |
| `access_token` | token panjang Anda |

Hasilnya: `{ "id": "17xxxxxxxxxxxxx" }` — inilah `creation_id`.

**Node — Wait**
Tambahkan node **Wait**, isi `10` detik. Instagram butuh waktu memproses gambarnya sebelum bisa diterbitkan.

**Node — HTTP Request (Terbitkan)**

| Kolom | Isi |
|---|---|
| Method | `POST` |
| URL | `https://graph.facebook.com/v21.0/IG_USER_ID/media_publish` |

Query parameters:

| Name | Value |
|---|---|
| `creation_id` | `{{ $json.id }}` |
| `access_token` | token panjang Anda |

**Node terakhir — Google Sheets (Update)** → status `terbit`.

> ### 🔧 Kalau error
>
> | Pesan error | Sebabnya | Perbaikannya |
> |---|---|---|
> | `(#100) Invalid parameter` | URL gambar tidak bisa diakses publik | Uji tautannya di jendela penyamaran. Harus langsung terbuka gambarnya |
> | `Media ID is not available` | Terlalu cepat menerbitkan | Perpanjang node Wait menjadi 20–30 detik |
> | `(#200) Permissions error` | Izin belum lengkap | Buat ulang token dengan seluruh izin di poin 4 |
> | `Application does not have permission` | Aplikasi masih mode pengembangan | Anda hanya bisa memposting ke akun yang terdaftar sebagai penguji |
> | `The access token has expired` | Token pendek habis | Tukar ke Long-Lived Token, dan pasang pengingat perpanjang tiap 50 hari |
> | Rasio gambar ditolak | Di luar 4:5 – 1.91:1 | Ubah rasio gambarnya |

## C.4 Batas yang Perlu Diketahui

| Batas | Angka |
|---|---|
| Posting per 24 jam | 25 |
| Format gambar | JPEG (PNG sering ditolak) |
| Rasio | 4:5 sampai 1.91:1 |
| Panjang caption | 2.200 karakter |
| Hashtag | maksimal 30 |

---

# BAGIAN D — Jalan Pintas: Layanan Pihak Ketiga (30 menit)

Kalau Bagian C terasa terlalu berat — dan itu wajar — ada jalan yang jauh lebih pendek.

| Layanan | Platform yang didukung | Punya API? | Biaya |
|---|---|---|---|
| Buffer | IG, FB, X, LinkedIn, TikTok | ✅ | Ada versi gratis terbatas |
| Publer | Banyak platform | ✅ | Berbayar |
| Metricool | Banyak platform | ✅ | Berbayar |

**Polanya sama, jauh lebih sederhana:**

```
Sheets[status=setuju]  →  HTTP Request ke API layanan  →  Sheets[status=terjadwal]
```

Satu panggilan HTTP, tanpa dua langkah, tanpa App Review, tanpa token yang kedaluwarsa tiap 60 hari.

> **Kapan memilih yang mana:**
> - **Layanan pihak ketiga** — kalau Anda ingin cepat jalan dan tidak keberatan biaya bulanan
> - **API langsung (Bagian C)** — kalau volumenya besar, ingin kendali penuh, atau ingin bisa menjualnya sebagai jasa ke klien
>
> Untuk peserta yang berniat menjual jasa automation, **Bagian C tetap layak dipelajari** — kemampuan memasang auto-posting langsung ke API adalah pembeda yang bisa ditagih.

---

# BAGIAN E — Pola Pengaman yang Wajib Ada

| Pengaman | Cara memasang | Kenapa penting |
|---|---|---|
| **Persetujuan manusia** | Kolom `Status` harus `setuju` | Satu konten salah tidak bisa ditarik |
| **Anti-posting ganda** | Node Update yang mengubah status jadi `terbit` | Tanpa ini, konten terkirim berulang selamanya |
| **Batas jumlah** | Node **Limit**, maksimal 5 item per eksekusi | Melindungi dari kesalahan filter yang meloloskan 200 baris |
| **Pemberitahuan gagal** | Error Trigger → kirim ke Telegram | Anda tahu duluan, bukan dari komplain pengikut |
| **Uji ke akun coba dulu** | Buat akun IG uji coba | Jangan pernah menguji di akun utama |

**Memasang pemberitahuan gagal:**
1. Buat workflow baru bernama `Notifikasi Error`
2. Node pertama: **Error Trigger**
3. Node kedua: Telegram → `⚠️ Workflow {{ $json.workflow.name }} gagal: {{ $json.execution.error.message }}`
4. Di setiap workflow posting: **Settings → Error Workflow** → pilih `Notifikasi Error`

---

# BAGIAN F — Latihan

| # | Latihan | Yang dilatih |
|---|---|---|
| 1 | Isi kalender 7 hari, jalankan penulis draft | Bagian A |
| 2 | Auto-post ke channel Telegram Anda | Bagian B |
| 3 | Pasang notifikasi error | Bagian E |
| 4 | Tambahkan node Limit maksimal 5 | Bagian E |
| 5 | Sambungkan ke Instagram **akun uji coba** | Bagian C |
| 6 | Tambahkan pengingat WhatsApp tiap Jumat: "3 konten menunggu persetujuan" | ⭐ Lanjutan |

---

## Rangkuman Satu Halaman

```
A  Sheets[draft]  →  AI tulis caption  →  Sheets[siap]
                                              ↓
                                    ANDA BACA & SETUJUI  ← satu-satunya pagar
                                              ↓
B  Schedule(15 mnt)  →  Sheets[setuju]  →  saring waktunya  →  Telegram  →  Sheets[terbit]
C  ... → buat wadah → Wait 10 dtk → terbitkan → Sheets[terbit]
```

**Tiga hal yang paling sering membuat gagal:**
1. Lupa node Update di akhir → konten terkirim berulang tiap 15 menit
2. URL gambar tidak bisa diakses publik → Instagram menolak dengan pesan yang membingungkan
3. Token Instagram kedaluwarsa diam-diam → pasang pengingat perpanjang tiap 50 hari
