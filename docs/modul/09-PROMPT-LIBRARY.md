# Prompt Library AI Club Malang

Dua belas prompt inti. Semuanya siap salin-tempel — ganti isi `[kurung siku]`.
Simpan di Notion sebagai halaman terbuka untuk seluruh anggota, dan biarkan anggota menambahkan miliknya.

---

## Cara Memakai

1. Salin prompt, ganti bagian dalam `[kurung siku]`.
2. Jalankan, lalu **perbaiki** — prompt pertama jarang langsung tepat.
3. Kalau hasilnya bagus, simpan versi itu ke Prompt Library pribadi Anda.
4. Kalau dipakai berulang, jadikan Custom GPT / Gem / Project.

**Rumus dasar semua prompt yang baik:**
> **Tujuan** + **Konteks** + **Peran** + **Format output** + **Batasan** + **Contoh**

---

## A. Kerja Harian

### Prompt 1 — Pekerjaan Harian
```
Saya ingin menyelesaikan pekerjaan berikut: [jelaskan pekerjaan].
Konteksnya: [siapa audiensnya, tujuannya, batasannya, data yang tersedia].
Format output yang saya inginkan: [tabel / checklist / draft / langkah kerja].
Gaya bahasa: [formal / santai / profesional].

Sebelum menjawab, tanyakan maksimal 3 pertanyaan bila ada informasi penting
yang belum jelas.
```

### Prompt 2 — Ringkas Dokumen Panjang
```
Berikut dokumen yang perlu saya pahami: [tempel dokumen].
Saya membacanya sebagai: [peran Anda].
Yang saya butuhkan darinya: [keputusan / ringkasan rapat / bahan presentasi].

Buatkan:
1. Ringkasan 5 kalimat
2. 3 poin paling penting bagi peran saya
3. Hal yang perlu saya waspadai atau tanyakan
4. Tindakan yang harus saya ambil
```

### Prompt 3 — Balasan Email / Pesan Sulit
```
Saya menerima pesan berikut: [tempel pesan].
Hubungan saya dengan pengirim: [atasan / klien / rekan / vendor].
Hasil yang saya inginkan: [apa yang ingin dicapai].
Yang tidak boleh saya sampaikan: [batasan].

Buat 3 versi balasan: tegas, netral, dan hangat.
Jelaskan singkat kapan sebaiknya masing-masing dipakai.
```

---

## B. Riset & Belajar

### Prompt 4 — Riset Topik
```
Saya ingin memahami topik: [topik].
Tujuan riset: [untuk keputusan / konten / proposal / presentasi].
Tingkat pemahaman saya sekarang: [pemula / menengah / mahir].

Buatkan:
1. Ringkasan utama
2. Poin pro dan kontra
3. Data/fakta penting yang perlu saya verifikasi sendiri
4. Rekomendasi langkah berikutnya
5. 5 pertanyaan lanjutan yang belum saya pikirkan

Tandai dengan jelas bagian mana yang Anda tidak yakin.
```

### Prompt 5 — Belajar Konsep Sulit
```
Jelaskan konsep [konsep] kepada saya.
Latar belakang saya: [bidang pekerjaan Anda].
Saya belajar ini karena: [alasan].

Jelaskan dalam 3 lapis:
1. Analogi dari dunia yang saya kenal
2. Penjelasan sesungguhnya
3. Satu contoh nyata dari bidang saya

Lalu ajukan 3 pertanyaan untuk menguji apakah saya benar-benar paham.
```

---

## C. Konten & Marketing

### Prompt 6 — Ide Konten
```
Buat ide konten untuk: [brand / topik / produk].
Target audiens: [audiens — sespesifik mungkin].
Tujuan konten: [edukasi / jualan / branding / interaksi].
Format: [caption / artikel / script video / carousel].
Tone: [ramah / profesional / lucu / tegas].

Buat 5 alternatif, lalu pilih 1 yang paling kuat dan jelaskan alasannya.
```

### Prompt 7 — Melatih Brand Voice
```
Berikut 3 contoh tulisan saya: [tempel 3 contoh].

Analisis gaya menulis saya: panjang kalimat, pilihan kata, tingkat formalitas,
cara membuka, cara menutup, hal yang saya hindari.

Rangkum jadi panduan brand voice yang bisa saya pakai ulang.
Lalu tulis [jenis konten] dengan gaya itu.
```

### Prompt 8 — Menghilangkan "Bau AI"
```
Berikut tulisan yang terasa terlalu seperti AI: [tempel tulisan].

Perbaiki agar terdengar seperti manusia:
- buang frasa klise AI ("dalam dunia yang serba cepat", "tak dapat dipungkiri")
- variasikan panjang kalimat
- pakai contoh konkret, bukan pernyataan umum
- buang kata sifat yang tidak menambah makna
- pertahankan seluruh isi dan faktanya

Tunjukkan versi sebelum dan sesudah untuk 2 paragraf pertama.
```

---

## D. Automation & Sistem

### Prompt 9 — Blueprint Automation
```
Saya ingin mengotomasi proses berikut: [jelaskan prosesnya].
Input: [data / pesan / form / file].
Output yang diinginkan: [laporan / notifikasi / update database / draft].
Tools yang tersedia: [n8n / Google Sheets / Email / Telegram / WhatsApp / API].
Frekuensi: [berapa kali per hari/minggu].

Buatkan blueprint workflow berisi:
1. Trigger
2. Langkah proses berurutan
3. Di titik mana AI dibutuhkan, dan untuk apa persisnya
4. Di titik mana manusia harus menyetujui
5. Apa yang bisa gagal dan bagaimana menanganinya
6. Perkiraan waktu yang dihemat per bulan
```

### Prompt 10 — Prompt untuk di Dalam Workflow
```
Saya butuh prompt yang akan dijalankan otomatis di dalam workflow, bukan di chat.

Tugasnya: [klasifikasi / ekstraksi / ringkasan].
Input yang masuk: [contoh input nyata].
Output HARUS berupa JSON dengan struktur: [sebutkan field].

Syarat:
- keluaran hanya JSON, tanpa kalimat pembuka atau penutup
- bila input tidak sesuai harapan, kembalikan {"error": "alasan"}
- jangan pernah mengarang nilai yang tidak ada di input

Buat system prompt-nya, lalu uji dengan 3 contoh input termasuk 1 yang rusak.
```

---

## E. AI Assistant & Agent

### Prompt 11 — Merancang AI Assistant
```
Saya ingin membuat AI assistant untuk membantu: [tujuan].
Penggunanya: [siapa].
Data/referensi yang dipakai: [dokumen / SOP / FAQ / website].

Tugas utama assistant:
1. [tugas 1]
2. [tugas 2]
3. [tugas 3]

Aturan penting: [batasan, hal yang tidak boleh dijawab, gaya bahasa].
Bila tidak tahu jawabannya, assistant harus: [mengaku tidak tahu / mengarahkan ke manusia].

Buatkan system prompt lengkap dan 3 contoh percakapan awal,
termasuk 1 contoh saat assistant harus mengaku tidak tahu.
```

### Prompt 12 — Menilai Output AI
```
Berikut output AI yang perlu saya periksa: [tempel output].
Konteks pemakaian: [untuk apa ini dipakai].
Risiko bila salah: [rendah / sedang / tinggi].

Periksa dan laporkan:
1. Klaim faktual yang perlu diverifikasi ke sumber luar
2. Bagian yang kemungkinan besar hasil karangan
3. Hal penting yang justru tidak dibahas
4. Bias atau sudut pandang yang terlewat
5. Kesimpulan: layak dipakai / perlu revisi / jangan dipakai
```

---

## Aturan Keamanan Prompt

| ❌ Jangan masukkan ke AI publik | ✅ Boleh |
|---|---|
| KTP, NPWP, nomor rekening | Data yang sudah disamarkan |
| Data pelanggan berisi nama & kontak | Data contoh buatan |
| Rekam medis, data pasien | Kasus fiktif dengan pola yang sama |
| Kontrak & dokumen rahasia perusahaan | Kerangka kontrak umum |
| Kata sandi, API key, token | — |
| Data anggota AI Club Malang | — |

**Bila datanya sensitif tapi pekerjaannya tetap harus jalan → itulah gunanya Track 4 (Local AI).**
