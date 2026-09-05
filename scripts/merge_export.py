#!/usr/bin/env python3
"""Gabungkan roster grup lama + grup Reborn, lalu tulis workbook & CSV final."""
import json, re, csv
from collections import Counter
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

LAMA = json.load(open('out/roster.json'))
BARU = json.load(open('out/reborn.json'))

CONF = {'Tinggi': 3, 'Sedang': 2, 'Rendah': 1, '-': 0, None: 0, '': 0}


def key(r):
    return ('p', r['wa']) if r['wa'] else ('n', (r['nama_kontak'] or r['nama']).strip().lower())


def better(a_val, a_conf, b_val, b_conf):
    """Pilih nilai dengan keyakinan tertinggi; nilai kosong selalu kalah."""
    if not a_val:
        return b_val, b_conf
    if not b_val:
        return a_val, a_conf
    return (a_val, a_conf) if CONF[a_conf] >= CONF[b_conf] else (b_val, b_conf)


merged = {}
for src, rows in (('lama', LAMA), ('reborn', BARU)):
    for r in rows:
        k = key(r)
        m = merged.get(k)
        if m is None:
            m = merged[k] = {
                'nama': '', 'nama_kontak': '', 'nama_perkenalan': '', 'sumber_nama': 'Belum ada',
                'keyakinan_nama': '-', 'wa': '', 'gender': 'Tidak diketahui',
                'keyakinan_gender': '-', 'dasar_gender': 'hanya nomor, tidak pernah chat',
                'kota': '', 'wilayah': '', 'keyakinan_kota': '-',
                'di_lama': 'Tidak', 'status_lama': '-', 'tgl_gabung_lama': '',
                'pesan_lama': 0, 'di_reborn': 'Tidak', 'status_reborn': '-',
                'tgl_gabung_reborn': '', 'pesan_reborn': 0, 'catatan': '',
            }
        m['wa'] = m['wa'] or r['wa']
        m['nama_kontak'] = m['nama_kontak'] or r['nama_kontak']
        m['nama_perkenalan'] = m['nama_perkenalan'] or r['nama_perkenalan']

        nm, nc = better(m['nama'], m['keyakinan_nama'], r['nama'], r['keyakinan_nama'])
        m['nama'], m['keyakinan_nama'] = nm, nc
        if m['nama_kontak']:
            m['sumber_nama'] = 'Kontak HP'
        elif m['nama_perkenalan']:
            m['sumber_nama'] = 'Perkenalan di grup'

        kt, kc = better(m['kota'], m['keyakinan_kota'], r['kota'], r['keyakinan_kota'])
        if kt != m['kota']:
            m['wilayah'] = r['wilayah']
        m['kota'], m['keyakinan_kota'] = kt, kc

        if r['gender'] != 'Tidak diketahui':
            if m['gender'] == 'Tidak diketahui':
                m['gender'], m['keyakinan_gender'], m['dasar_gender'] = \
                    r['gender'], r['keyakinan_gender'], r['dasar_gender']
            elif m['gender'] != r['gender']:
                if CONF[r['keyakinan_gender']] > CONF[m['keyakinan_gender']]:
                    m['gender'], m['keyakinan_gender'], m['dasar_gender'] = \
                        r['gender'], r['keyakinan_gender'], r['dasar_gender']
                m['catatan'] = 'Gender bentrok antar sumber — cek manual'

        if src == 'lama':
            m['di_lama'] = 'Ya'
            m['status_lama'] = r['status_grup']
            m['tgl_gabung_lama'] = r['tgl_gabung']
            m['pesan_lama'] = r['jml_pesan']
        else:
            m['di_reborn'] = 'Ya'
            m['status_reborn'] = r['status_grup']
            m['tgl_gabung_reborn'] = r['tgl_gabung']
            m['pesan_reborn'] = r['jml_pesan']

ROWS = list(merged.values())

BIZ = re.compile(r'\b(travel|property|properti|digital|sale|shop|shopee|store|toko|olshop|agency|'
                 r'studio|official|jasa|catering|klinik|villa|led|telkomsel|idcloud|zest|optima|'
                 r'admin|cs|marketing|assistant|iibf|group|corp)\b', re.I)

for m in ROWS:
    if m['di_reborn'] == 'Ya' and m['status_reborn'] == 'Keluar':
        m['status_migrasi'] = 'Keluar dari Reborn'
    elif m['di_lama'] == 'Ya' and m['di_reborn'] == 'Ya':
        m['status_migrasi'] = 'Sudah pindah'
    elif m['di_lama'] == 'Ya':
        m['status_migrasi'] = 'Belum pindah'
    else:
        m['status_migrasi'] = 'Anggota baru'
    m['total_pesan'] = m['pesan_lama'] + m['pesan_reborn']
    m['keaktifan'] = ('Aktif' if m['total_pesan'] >= 10
                      else ('Pernah bicara' if m['total_pesan'] else 'Silent'))
    nm = m['nama_kontak'] or m['nama']
    if nm and BIZ.search(nm) and not m['catatan']:
        m['catatan'] = 'Cek: kemungkinan akun bisnis'

MIG_ORDER = {'Belum pindah': 0, 'Anggota baru': 1, 'Sudah pindah': 2, 'Keluar dari Reborn': 3}
ROWS.sort(key=lambda r: (MIG_ORDER[r['status_migrasi']], r['gender'] != 'Perempuan',
                         -r['total_pesan'], r['nama'] or 'zzz'))

COLS = [
    ('No', 5), ('Nama', 25), ('Nomor WA', 16), ('Status Migrasi', 18),
    ('Grup Lama', 11), ('Grup Reborn', 12), ('Gender (indikasi)', 17), ('Keyakinan', 11),
    ('Dasar Gender', 24), ('Kota / Domisili', 17), ('Wilayah', 13), ('Sumber Nama', 18),
    ('Gabung Reborn', 17), ('Pesan Lama', 11), ('Pesan Reborn', 12), ('Keaktifan', 13),
    ('Catatan', 26),
]
KEYS = ['_no', 'nama', 'wa', 'status_migrasi', 'di_lama', 'di_reborn', 'gender',
        'keyakinan_gender', 'dasar_gender', 'kota', 'wilayah', 'sumber_nama',
        'tgl_gabung_reborn', 'pesan_lama', 'pesan_reborn', 'keaktifan', 'catatan']

HDR_FILL = PatternFill('solid', fgColor='1F3864')
HDR_FONT = Font(name='Arial', size=10, bold=True, color='FFFFFF')
BODY = Font(name='Arial', size=10)
FILLS = {
    'Belum pindah': PatternFill('solid', fgColor='FFF2CC'),
    'Anggota baru': PatternFill('solid', fgColor='E2F0D9'),
    'Keluar dari Reborn': PatternFill('solid', fgColor='F2F2F2'),
}
PINK = PatternFill('solid', fgColor='FCE4EC')


def sheet(wb, title, rows, note):
    ws = wb.create_sheet(title)
    ws.cell(1, 1, note).font = Font(name='Arial', size=10, italic=True, color='555555')
    ws.merge_cells(start_row=1, start_column=1, end_row=1, end_column=len(COLS))
    top = 3
    for c, (h, w) in enumerate(COLS, 1):
        cell = ws.cell(top, c, h)
        cell.fill, cell.font = HDR_FILL, HDR_FONT
        cell.alignment = Alignment(vertical='center', wrap_text=True)
        ws.column_dimensions[get_column_letter(c)].width = w
    ws.row_dimensions[top].height = 30
    for i, r in enumerate(rows, 1):
        fill = PINK if r['gender'] == 'Perempuan' else FILLS.get(r['status_migrasi'])
        for c, k in enumerate(KEYS, 1):
            cell = ws.cell(top + i, c, i if k == '_no' else r.get(k, ''))
            cell.font = BODY
            if k == 'wa' and r.get(k):
                cell.number_format = '@'
            if fill:
                cell.fill = fill
    ws.freeze_panes = ws.cell(top + 1, 1)
    ws.auto_filter.ref = 'A%d:%s%d' % (top, get_column_letter(len(COLS)), top + len(rows))


belum = [r for r in ROWS if r['status_migrasi'] == 'Belum pindah' and r['wa']]
belum_all = [r for r in ROWS if r['status_migrasi'] == 'Belum pindah']
sudah = [r for r in ROWS if r['status_migrasi'] == 'Sudah pindah']
barunya = [r for r in ROWS if r['status_migrasi'] == 'Anggota baru']
reborn_now = [r for r in ROWS if r['di_reborn'] == 'Ya' and r['status_reborn'] == 'Masih di grup']
perempuan = [r for r in ROWS if r['gender'] == 'Perempuan']
malang = [r for r in ROWS if r['wilayah'] == 'Malang Raya']
bernama = [r for r in ROWS if r['nama']]

wb = Workbook()
wb.remove(wb.active)

ws = wb.create_sheet('Ringkasan')
for col, w in (('A', 48), ('B', 14), ('C', 60)):
    ws.column_dimensions[col].width = w
ws.cell(1, 1, 'AI CLUB MALANG — Roster Gabungan (Grup Lama + Reborn)').font = Font(name='Arial', size=14, bold=True)
ws.cell(2, 1, 'Grup lama: 8 Jul – 5 Sep 2026  |  Grup Reborn: 31 Agu – 5 Sep 2026').font = Font(name='Arial', size=10, italic=True, color='555555')

SUM = [
    ('METRIK', 'JUMLAH', 'CATATAN'),
    ('TOTAL kontak unik (gabungan)', len(ROWS), 'Setelah nomor & nama yang sama digabung'),
    ('', '', ''),
    ('STATUS MIGRASI', '', ''),
    ('  Sudah pindah ke Reborn', len(sudah), 'Ada di grup lama DAN grup Reborn'),
    ('  BELUM pindah', len(belum_all), 'Ada di grup lama, belum masuk Reborn — target broadcast'),
    ('     di antaranya punya nomor WA', len(belum), 'Siap diblasting lewat Fonnte'),
    ('  Anggota baru (hanya di Reborn)', len(barunya), 'Tidak pernah ada di grup lama'),
    ('  Keluar dari Reborn', sum(1 for r in ROWS if r['status_migrasi'] == 'Keluar dari Reborn'), ''),
    ('', '', ''),
    ('GRUP REBORN SAAT INI', len(reborn_now), 'Anggota aktif di grup baru'),
    ('  Tingkat migrasi dari grup lama', '%.0f%%' % (100 * len(sudah) / max(1, len(sudah) + len(belum_all))),
     'Sudah pindah / total anggota grup lama'),
    ('', '', ''),
    ('DATA YANG TERSEDIA', '', ''),
    ('  Punya nomor WA', sum(1 for r in ROWS if r['wa']), 'Bisa langsung dihubungi / diblasting'),
    ('  Tanpa nomor (ada di kontak HP Anda)', sum(1 for r in ROWS if not r['wa']), 'WhatsApp menampilkan nama, ambil nomor dari kontak HP'),
    ('  Punya nama', len(bernama), 'Dari kontak HP + perkenalan diri di grup'),
    ('  Ketahuan kota/domisili', sum(1 for r in ROWS if r['kota']), ''),
    ('     Malang Raya', len(malang), 'Prioritas kopdar offline'),
    ('     Luar Malang', sum(1 for r in ROWS if r['wilayah'] == 'Luar Malang'), 'Cocok untuk sesi online lintas kota'),
    ('', '', ''),
    ('GENDER (INDIKASI — WAJIB VERIFIKASI)', '', ''),
    ('  Perempuan', len(perempuan), 'Kandidat grup khusus perempuan'),
    ('     di antaranya sudah di Reborn', sum(1 for r in perempuan if r['di_reborn'] == 'Ya'), ''),
    ('  Laki-laki', sum(1 for r in ROWS if r['gender'] == 'Laki-laki'), ''),
    ('  Belum diketahui', sum(1 for r in ROWS if r['gender'] == 'Tidak diketahui'), 'Tanyakan lewat form pendaftaran'),
    ('', '', ''),
    ('KEAKTIFAN', '', ''),
    ('  Pernah kirim pesan', sum(1 for r in ROWS if r['total_pesan']), ''),
    ('  Aktif (>=10 pesan)', sum(1 for r in ROWS if r['total_pesan'] >= 10), 'Kolam bibit pengurus & panitia'),
]
for i, (a, b, c) in enumerate(SUM, 4):
    ws.cell(i, 1, a).font = Font(name='Arial', size=10, bold=(i == 4 or (a and a.strip() == a and a.isupper())))
    ws.cell(i, 2, b).font = Font(name='Arial', size=10, bold=(i == 4))
    ws.cell(i, 3, c).font = Font(name='Arial', size=10, color='555555')
    if i == 4:
        for cc in range(1, 4):
            ws.cell(i, cc).fill, ws.cell(i, cc).font = HDR_FILL, HDR_FONT

sheet(wb, 'Belum Pindah ke Reborn', belum,
      'PRIORITAS UTAMA. Ada di grup lama, punya nomor WA, tapi belum masuk grup Reborn. Kirim undangan bertahap maks 100 nomor/jam lewat Fonnte.')
sheet(wb, 'Semua Anggota', ROWS,
      'Gabungan grup lama + Reborn. Kuning = belum pindah, hijau = anggota baru, merah muda = indikasi perempuan, abu-abu = keluar dari Reborn.')
sheet(wb, 'Anggota Reborn', reborn_now,
      'Anggota grup Reborn saat ini.')
sheet(wb, 'Anggota Baru', barunya,
      'Bergabung langsung di grup Reborn, tidak pernah ada di grup lama. Sambut khusus — mereka belum kenal siapa-siapa.')
sheet(wb, 'Kandidat Grup Perempuan', perempuan,
      'Indikasi perempuan dari cara menyebut diri di grup dan dari nama. WAJIB dicek satu per satu — japri konfirmasi dulu, jangan langsung di-add ke grup.')
sheet(wb, 'Malang Raya', malang,
      'Menyebutkan domisili di Malang Raya. Prioritas undangan kopdar offline.')
sheet(wb, 'Sudah Bernama', bernama,
      'Namanya sudah diketahui — dari kontak HP Anda atau dari perkenalan diri di grup.')

wb.save('out/AICM_Roster_WhatsApp.xlsx')


def dump(path, rows, cols):
    with open(path, 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f)
        w.writerow([c[0] for c in cols])
        for r in rows:
            w.writerow([r.get(c[1], '') for c in cols])


dump('out/fonnte_belum_pindah.csv', belum,
     [('name', 'nama'), ('phone', 'wa'), ('kota', 'kota'), ('gender', 'gender')])
dump('out/fonnte_grup_perempuan.csv', [r for r in perempuan if r['wa']],
     [('name', 'nama'), ('phone', 'wa'), ('kota', 'kota'), ('di_reborn', 'di_reborn'),
      ('keyakinan', 'keyakinan_gender'), ('dasar', 'dasar_gender')])
dump('out/roster_lengkap.csv', ROWS, [(h, k) for (h, _), k in zip(COLS[1:], KEYS[1:])])

print('TOTAL gabungan      :', len(ROWS))
print('  Sudah pindah      :', len(sudah))
print('  Belum pindah      :', len(belum_all), '(%d punya nomor)' % len(belum))
print('  Anggota baru      :', len(barunya))
print('  Keluar dari Reborn:', sum(1 for r in ROWS if r['status_migrasi'] == 'Keluar dari Reborn'))
print('Grup Reborn saat ini:', len(reborn_now))
print('Tingkat migrasi     : %.0f%%' % (100 * len(sudah) / max(1, len(sudah) + len(belum_all))))
print('Perempuan (indikasi):', len(perempuan), '| sudah di Reborn:',
      sum(1 for r in perempuan if r['di_reborn'] == 'Ya'))
print('Malang Raya         :', len(malang))
