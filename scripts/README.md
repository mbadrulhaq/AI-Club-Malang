# Ekstraksi Roster WhatsApp — AI Club Malang

Mengubah export chat grup WhatsApp menjadi daftar anggota (nama, nomor, kota,
indikasi gender) untuk mengundang ulang anggota ke grup baru.

## Cara pakai

```bash
python3 scripts/parse_chat.py /path/ke/chat.md   # -> out/roster_raw.json
python3 scripts/enrich.py                        # -> out/roster.json
python3 scripts/export.py                        # -> out/*.xlsx + out/*.csv
```

Butuh `openpyxl` (`pip install openpyxl`).

## PENTING — data pribadi

Folder `out/` berisi nomor WhatsApp ~900 orang dan sudah masuk `.gitignore`.
**Jangan pernah di-commit atau diunggah ke mana pun.** Simpan lokal saja.

## Catatan akurasi

- Gender adalah **indikasi**, bukan fakta. Sumbernya: (a) cara orang menyebut
  diri di grup, (b) sapaan pada nama, (c) kamus nama Indonesia. Wajib
  diverifikasi manual sebelum dipakai.
- Cara paling akurat mendapatkan gender & kota untuk seluruh anggota adalah
  menanyakannya di form pendaftaran grup baru, bukan menebak dari chat.
- Anggota yang tersimpan di kontak HP tampil sebagai nama tanpa nomor —
  nomornya diambil manual dari kontak HP.
