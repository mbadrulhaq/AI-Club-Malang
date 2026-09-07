# Tutorial 03 — Automasi Ads
### 15 varian copy iklan + laporan performa yang menganalisis dirinya sendiri

| | |
|---|---|
| **Level** | Pemula–Menengah |
| **Durasi** | 3 jam |
| **Prasyarat** | [Tutorial 01](01-AUTOMASI-REPORT.md) selesai. Pernah pasang iklan Meta/Google, walau sekali |
| **Track / Minggu** | Track 1 Minggu 6 (copy) + Track 2 Minggu 11 (laporan) |

---

## Jujur Dulu Soal Ruang Lingkup

Tutorial ini **tidak** mengajarkan cara membuat, menyalakan, atau mematikan iklan lewat API secara otomatis. Alasannya jujur saja:

| Kenapa tidak | Penjelasan |
|---|---|
| Butuh persetujuan aplikasi | Meta Marketing API mewajibkan App Review dengan izin `ads_management` — prosesnya berminggu-minggu |
| Risikonya uang sungguhan | Satu kesalahan logika bisa menaikkan anggaran 10× dalam semalam |
| Bukan itu yang paling menghemat waktu | Menulis copy dan membuat laporan memakan jauh lebih banyak jam daripada menekan tombol on/off |

**Yang justru dikerjakan tutorial ini adalah tiga pekerjaan yang benar-benar memakan waktu Anda:**

| Bagian | Hasil | Penghematan nyata |
|---|---|---|
| **A** | 15 varian copy iklan dari 1 produk | 2–3 jam → 5 menit |
| **B** | Laporan performa harian dengan analisis | 30 menit/hari → 0 |
| **C** | Rekomendasi keputusan (dengan persetujuan Anda) | Tebak-tebakan → berbasis aturan |

> Otomasi penuh lewat API dibahas di Track 3, setelah peserta paham cara memasang pagar pengaman biaya.

---

# BAGIAN A — Pabrik Copy Iklan (60 menit)

## A.1 Hasil Akhirnya

Satu baris produk di Google Sheets → **15 varian copy siap uji**, masing-masing dengan sudut pendekatan berbeda, tersimpan rapi kembali ke Sheets.

```
Sheets            n8n            AI                     Sheets
[1 produk]  →  ambil baris  →  tulis 15 varian  →  simpan per baris
```

## A.2 Siapkan Spreadsheet

Buat spreadsheet `Ads Factory` dengan **dua sheet**.

**Sheet `Produk`:**

| Nama Produk | Harga | Target Audiens | Masalah Yang Diselesaikan | Keunggulan | Penawaran | Status |
|---|---|---|---|---|---|---|
| Kelas AI untuk UMKM | 750000 | Pemilik usaha 25–45 th di Malang | Kalah cepat dari pesaing yang sudah pakai AI | Praktik langsung, bukan teori | Diskon 20% 10 pendaftar pertama | `siap` |

**Sheet `Copy`** — cukup isi baris judulnya saja:

| Tanggal | Produk | No | Sudut | Headline | Body | CTA | Platform | Status Uji |
|---|---|---|---|---|---|---|---|---|

> Kolom **Status** di sheet Produk adalah saklarnya. Isi `siap` untuk yang mau diproses, dan `selesai` setelah diproses — supaya tidak digarap dua kali.

## A.3 Rangkai Workflow

Buat workflow baru: `Ads — Pabrik Copy`.

**Node 1 — Manual Trigger**
Cari `Manual`, pilih **Manual Trigger**. Dijalankan saat dibutuhkan, bukan terjadwal.

**Node 2 — Google Sheets (Get Rows)**
| Kolom | Isi |
|---|---|
| Document | `Ads Factory` |
| Sheet | `Produk` |
| Options → Filter | Column: `Status`, Value: `siap` |

**Node 3 — AI (Basic LLM Chain)**
Prompt-nya panjang, dan memang harus panjang. Salin utuh:

```
Kamu copywriter iklan berpengalaman untuk pasar Indonesia.

PRODUK
Nama       : {{ $json['Nama Produk'] }}
Harga      : Rp {{ $json.Harga }}
Audiens    : {{ $json['Target Audiens'] }}
Masalah    : {{ $json['Masalah Yang Diselesaikan'] }}
Keunggulan : {{ $json.Keunggulan }}
Penawaran  : {{ $json.Penawaran }}

TUGAS
Buat TEPAT 15 varian copy iklan, masing-masing dengan sudut berbeda:
1. Masalah-Solusi        2. Sebelum-Sesudah      3. Pertanyaan langsung
4. Angka & bukti         5. Testimoni            6. Rasa takut ketinggalan
7. Rasa penasaran        8. Perbandingan         9. Cerita singkat
10. Manfaat langsung     11. Bantahan keberatan  12. Musiman/momen
13. Sapaan komunitas     14. Di balik layar      15. Penawaran tegas

ATURAN
- Bahasa Indonesia sehari-hari, bukan bahasa terjemahan
- Headline maksimal 40 karakter
- Body 2–4 kalimat, maksimal 90 kata
- CTA maksimal 4 kata
- Sebut manfaat, bukan daftar fitur
- Angka hanya boleh dari data di atas — JANGAN mengarang jumlah peserta,
  testimoni, atau persentase apa pun
- Hindari klise: "solusi terbaik", "berkualitas tinggi", "harga terjangkau"
- Untuk sudut Testimoni, tulis kerangkanya dengan tanda [___] agar
  diisi testimoni asli nanti — jangan mengarang testimoni

KELUARKAN HANYA JSON, tanpa penjelasan apa pun, tanpa tanda ```:
[
  {"no":1,"sudut":"Masalah-Solusi","headline":"...","body":"...","cta":"...","platform":"Meta"},
  ...
]
```

**Node 4 — Code (mengubah JSON menjadi 15 baris)**

```javascript
// Ambil teks hasil AI. Nama kolomnya bisa berbeda —
// lihat panel OUTPUT node AI, lalu sesuaikan urutan di bawah ini.
const item = $input.first().json;
let teks = item.text ?? item.response ?? item.output ?? item.content ?? '';

// AI kadang tetap membungkus dengan ```json ... ``` — bersihkan
teks = String(teks).replace(/```json/gi, '').replace(/```/g, '').trim();

let daftar;
try {
  daftar = JSON.parse(teks);
} catch (e) {
  // Kalau masih gagal, ambil bagian di antara [ dan ] terakhir
  const awal = teks.indexOf('[');
  const akhir = teks.lastIndexOf(']');
  if (awal === -1 || akhir === -1) {
    throw new Error('AI tidak mengembalikan JSON. Isi mentahnya: ' + teks.slice(0, 300));
  }
  daftar = JSON.parse(teks.slice(awal, akhir + 1));
}

const namaProduk = $('Google Sheets').first().json['Nama Produk'];
const hariIni = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Jakarta' });

return daftar.map(v => ({
  json: {
    Tanggal: hariIni,
    Produk: namaProduk,
    No: v.no,
    Sudut: v.sudut,
    Headline: v.headline,
    Body: v.body,
    CTA: v.cta,
    Platform: v.platform || 'Meta',
    'Status Uji': 'belum',
  },
}));
```

**Node 5 — Google Sheets (Append)**
| Kolom | Isi |
|---|---|
| Operation | `Append Row in Sheet` |
| Sheet | `Copy` |
| Mapping Column Mode | `Map Automatically` |

Jalankan **Execute Workflow**. Sheet `Copy` terisi 15 baris.

> ### 🔧 Kalau error
>
> | Gejala | Perbaikannya |
> |---|---|
> | `AI tidak mengembalikan JSON` | Tambahkan di akhir prompt: `Ingat: keluarkan HANYA array JSON.` |
> | Hanya 1 baris masuk ke Sheets | Node Code tidak mengembalikan array. Pastikan pakai `.map()` seperti di atas |
> | Kolom kosong semua | Nama kolom di Code tidak sama persis dengan judul di Sheets |
> | `Unexpected token` di JSON.parse | AI menyisipkan kalimat pengantar. Kode di atas sudah menanganinya — cek `teks.slice` di pesan errornya |
> | `Nama Produk` undefined | Nama node di `$('Google Sheets')` tidak sama. Sesuaikan dengan nama node Anda yang sebenarnya |

## A.4 Cara Memakai 15 Varian Itu

Jangan pasang semuanya sekaligus.

| Tahap | Yang dilakukan | Anggaran |
|---|---|---|
| 1 | Pilih **5 sudut** yang paling masuk akal untuk audiens Anda | Rp 30–50 rb/hari per sudut, 3 hari |
| 2 | Matikan yang biaya per hasilnya paling mahal, sisakan **2 pemenang** | Naikkan anggaran ke pemenang |
| 3 | Buat 5 turunan dari sudut pemenang, uji lagi | Berulang tiap 2 minggu |

> **Kesalahan mahal yang sering terjadi:** memasang 15 varian sekaligus dengan anggaran kecil. Tidak ada satu pun yang mendapat data cukup untuk disimpulkan, dan uangnya habis tanpa pelajaran.

---

# BAGIAN B — Laporan Performa Harian (60 menit)

## B.1 Mengambil Datanya

Tiga cara, dari yang paling mudah:

| Cara | Kesulitan | Cocok untuk |
|---|---|---|
| **1. Ekspor manual ke Sheets** | ⭐ Mudah | Latihan & bulan pertama |
| **2. Laporan terjadwal Meta → email → n8n** | Sedang | Pemakaian rutin |
| **3. Marketing API** | Sulit, butuh App Review | Track 3 |

**Kita pakai cara 1.** Di Ads Manager: pilih rentang tanggal → **Reports → Export → CSV** → tempel ke sheet `Performa`.

Struktur sheet `Performa`:

| Tanggal | Campaign | Ad Set | Ad | Spend | Impressions | Clicks | CTR | Results | Cost per Result |
|---|---|---|---|---|---|---|---|---|---|
| 2026-09-05 | Kelas AI Sep | Malang 25-45 | Varian 3 | 45000 | 12400 | 210 | 1.69 | 4 | 11250 |

## B.2 Workflow Laporan

Buat workflow `Ads — Laporan Harian`. Polanya sama persis dengan [Tutorial 01](01-AUTOMASI-REPORT.md), hanya kodenya berbeda.

**Node 1** — Schedule Trigger, jam 09.00
**Node 2** — Google Sheets, ambil sheet `Performa`
**Node 3** — Code:

```javascript
const semua = $input.all().map(i => i.json);
const angka = v => Number(String(v ?? '0').replace(/[^0-9.,-]/g, '').replace(',', '.')) || 0;

function tglBaku(v) {
  const t = String(v ?? '').trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(t)) return t.slice(0, 10);
  const m = t.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
  return m ? `${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}` : t;
}

const hariIni = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Jakarta' });
const kemarin = new Date(Date.now() - 864e5).toLocaleDateString('sv-SE', { timeZone: 'Asia/Jakarta' });

function ringkas(tanggal) {
  const baris = semua.filter(r => tglBaku(r.Tanggal) === tanggal);
  const spend   = baris.reduce((t, r) => t + angka(r.Spend), 0);
  const results = baris.reduce((t, r) => t + angka(r.Results), 0);
  const clicks  = baris.reduce((t, r) => t + angka(r.Clicks), 0);
  const impr    = baris.reduce((t, r) => t + angka(r.Impressions), 0);
  return {
    spend, results, clicks, impr,
    cpr: results ? Math.round(spend / results) : 0,
    ctr: impr ? +(clicks / impr * 100).toFixed(2) : 0,
    baris,
  };
}

const a = ringkas(hariIni);
const b = ringkas(kemarin);
const beda = (kini, lalu) => (lalu ? Math.round((kini - lalu) / lalu * 100) : 0);

// Peringkat iklan hari ini berdasarkan biaya per hasil (yang termurah menang)
const peringkat = a.baris
  .map(r => ({
    nama: r.Ad || r['Ad Set'] || r.Campaign || '(tanpa nama)',
    spend: angka(r.Spend),
    results: angka(r.Results),
    cpr: angka(r.Results) ? Math.round(angka(r.Spend) / angka(r.Results)) : 999999,
  }))
  .sort((x, y) => x.cpr - y.cpr);

const terbaik = peringkat.slice(0, 3)
  .map(p => `${p.nama}: Rp ${p.cpr.toLocaleString('id-ID')}/hasil (${p.results} hasil)`)
  .join('\n') || 'belum ada data';

const terburuk = peringkat.filter(p => p.cpr < 999999).slice(-2)
  .map(p => `${p.nama}: Rp ${p.cpr.toLocaleString('id-ID')}/hasil, habis Rp ${p.spend.toLocaleString('id-ID')}`)
  .join('\n') || 'belum ada data';

// Iklan yang menghabiskan uang tanpa hasil sama sekali
const nolHasil = peringkat.filter(p => p.results === 0 && p.spend > 20000)
  .map(p => `${p.nama} (Rp ${p.spend.toLocaleString('id-ID')})`)
  .join(', ') || 'tidak ada';

return [{ json: {
  tanggal: hariIni,
  spend: a.spend, results: a.results, cpr: a.cpr, ctr: a.ctr,
  bedaSpend: beda(a.spend, b.spend),
  bedaResults: beda(a.results, b.results),
  bedaCpr: beda(a.cpr, b.cpr),
  terbaik, terburuk, nolHasil,
  adaData: a.baris.length > 0,
}}];
```

**Node 4** — AI:

```
Kamu analis iklan digital untuk UMKM Indonesia.

DATA IKLAN {{ $json.tanggal }}
Belanja        : Rp {{ $json.spend }}  ({{ $json.bedaSpend }}% vs kemarin)
Hasil          : {{ $json.results }}   ({{ $json.bedaResults }}% vs kemarin)
Biaya/hasil    : Rp {{ $json.cpr }}    ({{ $json.bedaCpr }}% vs kemarin)
CTR            : {{ $json.ctr }}%

TIGA IKLAN TERBAIK
{{ $json.terbaik }}

DUA IKLAN TERBOROS
{{ $json.terburuk }}

IKLAN YANG BELANJA TAPI NOL HASIL
{{ $json.nolHasil }}

Tulis laporan untuk WhatsApp:
1. Judul dengan emoji dan tanggal
2. Satu kalimat: hari ini lebih baik atau lebih buruk dari kemarin, dan kenapa
3. "✅ Pertahankan:" — iklan yang layak dinaikkan anggarannya
4. "⚠️ Perhatikan:" — iklan yang perlu dimatikan atau diperbaiki
5. "👉 Aksi besok:" — satu tindakan konkret saja

ATURAN
- Bahasa Indonesia santai, seperti menjelaskan ke teman pemilik usaha
- Maksimal 150 kata
- Rupiah dengan titik ribuan
- JANGAN mengarang angka di luar data di atas
- Pada biaya per hasil, TURUN itu bagus dan NAIK itu buruk — jangan terbalik
- Kalau belanja di bawah Rp 100.000, ingatkan bahwa datanya belum cukup
  untuk disimpulkan
```

**Node 5** — kirim ke Telegram / Fonnte, persis seperti Tutorial 01.

> ### 🔧 Kalau error
>
> | Gejala | Perbaikannya |
> |---|---|
> | Semua angka nol | Kolom CSV hasil ekspor bernama lain (mis. `Amount spent`). Sesuaikan nama di Code |
> | `bedaCpr` bernilai aneh | Data kemarin kosong. Wajar di hari pertama |
> | AI bilang "membaik" padahal biaya naik | Baris aturan "TURUN itu bagus" hilang dari prompt |
> | Angka desimal jadi kacau | CSV Indonesia memakai koma. Fungsi `angka()` di atas sudah menanganinya |

---

# BAGIAN C — Rekomendasi Keputusan dengan Persetujuan Manusia (40 menit)

Bagian paling bernilai — dan paling perlu hati-hati.

## C.1 Aturan Keputusan

Tulis dulu aturannya sebagai **angka**, bukan perasaan:

| Kondisi | Rekomendasi |
|---|---|
| Biaya/hasil < 70% target **dan** hasil ≥ 3 | 🟢 Naikkan anggaran 20% |
| Biaya/hasil 70–130% target | ⚪ Biarkan |
| Biaya/hasil > 130% target **dan** belanja > Rp 100 rb | 🟡 Turunkan anggaran 30% |
| Belanja > Rp 150 rb **dan** hasil = 0 | 🔴 Matikan |
| Belanja < Rp 100 rb | ⏸️ Data belum cukup, jangan diapa-apakan |

Tambahkan di Code (ganti `TARGET_CPR` dengan angka Anda sendiri):

```javascript
const TARGET_CPR = 15000; // biaya per hasil yang Anda anggap wajar

const rekomendasi = peringkat.map(p => {
  if (p.spend < 100000)                      return `⏸️ ${p.nama} — data belum cukup`;
  if (p.results === 0)                       return `🔴 ${p.nama} — MATIKAN, Rp ${p.spend.toLocaleString('id-ID')} tanpa hasil`;
  if (p.cpr < TARGET_CPR * 0.7 && p.results >= 3)
                                             return `🟢 ${p.nama} — NAIKKAN 20%, Rp ${p.cpr.toLocaleString('id-ID')}/hasil`;
  if (p.cpr > TARGET_CPR * 1.3)              return `🟡 ${p.nama} — TURUNKAN 30%, Rp ${p.cpr.toLocaleString('id-ID')}/hasil`;
  return `⚪ ${p.nama} — biarkan`;
}).join('\n');
```

Masukkan `rekomendasi` ke objek `json` yang dikembalikan, lalu tambahkan ke prompt AI:

```
REKOMENDASI SISTEM (berdasarkan aturan angka, bukan tebakan)
{{ $json.rekomendasi }}

Tampilkan daftar ini apa adanya di bagian akhir laporan, tanpa mengubah
isinya. Kamu boleh menambahkan satu kalimat penjelasan singkat di bawahnya.
```

## C.2 Kenapa Berhenti di "Rekomendasi", Bukan "Eksekusi"

| Alasan | Penjelasan |
|---|---|
| **Uang sungguhan** | Satu kesalahan logika bisa menghabiskan anggaran sebulan dalam semalam |
| **Konteks yang tak terlihat sistem** | Hari libur, stok habis, ada kampanye pesaing — sistem tidak tahu |
| **Belajar lebih cepat** | Anda membaca rekomendasi tiap pagi dan menilai betul atau tidak. Setelah 2–3 minggu, Anda tahu aturan mana yang perlu disetel ulang |

> **Aturan emas automasi iklan:** otomatiskan **analisisnya**, jangan otomatiskan **keputusannya** — sampai Anda punya tiga bulan data yang membuktikan aturan Anda benar.

---

# BAGIAN D — Latihan

| # | Latihan | Yang dilatih |
|---|---|---|
| 1 | Jalankan pabrik copy untuk produk Anda sendiri | Bagian A |
| 2 | Pasang 5 varian, laporkan hasilnya minggu depan | Disiplin uji |
| 3 | Sambungkan laporan harian ke WhatsApp Anda | Bagian B |
| 4 | Setel `TARGET_CPR` sesuai angka usaha Anda | Bagian C |
| 5 | Tambahkan laporan mingguan tiap Senin: sudut mana yang paling sering menang | ⭐ Lanjutan |

---

## Rangkuman Satu Halaman

```
BAGIAN A   Sheets[produk]  →  AI  →  15 varian copy  →  Sheets[copy]
BAGIAN B   Sheets[performa]  →  Code[hitung]  →  AI[analisis]  →  WhatsApp
BAGIAN C   Code[aturan angka]  →  rekomendasi  →  ANDA yang memutuskan
```

**Tiga hal yang paling sering membuat gagal:**
1. Nama kolom hasil ekspor Ads Manager tidak sama dengan yang ditulis di Code
2. AI membungkus JSON dengan ` ```json ` — kode di Bagian A sudah menanganinya
3. Menyimpulkan pemenang dari belanja di bawah Rp 100 rb — datanya belum cukup
