# Track 4 — AIC Private Lab
### Local AI, Ollama & Hugging Face

| | |
|---|---|
| **Level pusat** | 4 (Innovators) |
| **Target peserta** | AI Builder / AI Engineer |
| **Format** | **Lab 6 sesi**, bukan kelas reguler |
| **Prasyarat** | Selesai Track 2 atau Track 3. Laptop RAM ≥ 16 GB sangat disarankan. |
| **Kapasitas** | 8–12 orang |
| **Jadwal buka** | Bulan 7 — **atau lebih cepat bila ada 8 pendaftar** |

---

## Membaca Data dengan Jujur

Di seluruh percakapan dua grup, **Ollama disebut 0 kali, Hugging Face 1 kali, LM Studio 1 kali.**

Artinya bukan track ini tidak berharga — artinya **belum ada yang tahu bahwa mereka membutuhkannya.** Kebutuhannya baru muncul saat seseorang berhadapan dengan kalimat: *"data kami tidak boleh keluar dari kantor"* atau *"tagihan API kami membengkak"*.

Karena itu track ini dijalankan sebagai **lab berbasis permintaan**, bukan kelas terjadwal. Dibuka ketika sudah ada 8 orang yang mendaftar — biasanya setelah mereka menyelesaikan Track 2 atau 3 dan mulai menghadapi klien yang mempermasalahkan privasi data.

> **Nilai jual sesungguhnya track ini:** klien di sektor kesehatan, keuangan, hukum, dan pemerintahan **tidak boleh** mengirim datanya ke cloud. Anggota yang bisa memasang AI lokal punya pasar yang tidak bisa disentuh siapa pun yang hanya menguasai ChatGPT. Ini keunggulan yang sepi peminat justru karena belum banyak yang tahu.

---

## Silabus 6 Sesi

### Sesi 4.1 — Kenapa AI Lokal
Cloud vs lokal: privasi, biaya, latency, kendali, ketersediaan. Apa itu model terbuka. Lisensi (Llama, Qwen, Mistral, Gemma) dan mana yang boleh dipakai komersial. Hitung titik impas: pada volume berapa lokal jadi lebih murah daripada API.

### Sesi 4.2 — Menjalankan Model Pertama
Ollama: pasang, tarik model, jalankan, API-nya. LM Studio untuk yang lebih suka antarmuka grafis. Open WebUI sebagai tampilan mirip ChatGPT untuk tim. llama.cpp untuk yang ingin kendali penuh. Kebutuhan perangkat keras — apa yang bisa dijalankan di laptop biasa.

### Sesi 4.3 — Memilih Model
Peta model terbuka: chat, coding, vision, embedding, translation, audio. Ukuran parameter (3B/7B/14B/70B) dan konsekuensinya. **Quantization** (Q4/Q5/Q8) — menjalankan model besar di perangkat kecil, dan apa yang dikorbankan. Membaca papan peringkat model secara kritis. Uji sendiri: bandingkan model kecil vs API berbayar untuk tugas nyata.

### Sesi 4.4 — Hugging Face
Models, Datasets, Spaces. Mencari model yang tepat. Membaca model card. Menjalankan Space sebagai demo. Memakai model embedding lokal. Dasar fine-tuning — dan **kapan sebaiknya tidak fine-tuning** (hampir selalu; prompt yang baik dan RAG lebih dulu).

### Sesi 4.5 — Local RAG (Private AI Assistant)
Dokumen internal → embedding lokal → vector DB lokal → LLM lokal → jawaban yang tidak pernah keluar dari jaringan sendiri. Rangkaian yang dipakai: Ollama + pgvector/Chroma + Open WebUI. Perbandingan kualitas dengan RAG berbasis cloud — jujur, apa adanya.

### Sesi 4.6 — Menempatkan di Lingkungan Nyata
Menjalankan di server kantor. Docker. Akses banyak pengguna. Cadangan & pembaruan model. Rangkaian hibrida: model lokal untuk data sensitif, model cloud untuk tugas berat. Menyusun penawaran "private AI" untuk klien.

---

## Output Wajib

| # | Output |
|---|---|
| 1 | Minimal 1 model lokal berjalan di perangkat sendiri |
| 2 | Tabel perbandingan 3 model (kualitas · kecepatan · kebutuhan RAM) |
| 3 | 1 prototipe private AI assistant dengan dokumen sendiri |
| 4 | Analisis biaya: lokal vs cloud untuk 1 kasus nyata |

---

## Perlengkapan

| Kebutuhan | Catatan |
|---|---|
| Laptop RAM ≥ 16 GB | RAM 8 GB masih bisa untuk model 3B |
| GPU | Opsional — sangat mempercepat, tapi tidak wajib |
| Ruang disk ≥ 50 GB | Model berukuran besar |
| Ollama + Open WebUI | Gratis |
| Akun Hugging Face | Gratis |

> **Sediakan 1 mesin lab bersama.** Satu PC dengan GPU (atau VPS ber-GPU sewa harian) yang bisa diakses semua peserta menghapus hambatan perangkat keras — hambatan terbesar track ini. Biaya patungan jauh lebih murah daripada setiap orang membeli laptop baru.
