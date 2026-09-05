#!/usr/bin/env python3
"""Cek isi workbook hasil export."""
from openpyxl import load_workbook

wb = load_workbook('out/AICM_Roster_WhatsApp.xlsx')
print('SHEET DALAM WORKBOOK')
for ws in wb:
    print('  %-26s %5d baris x %2d kolom  filter=%s' % (
        ws.title, ws.max_row, ws.max_column, bool(ws.auto_filter.ref)))

print('\nCONTOH ISI — sheet "Undang ke Grup Baru" (5 baris pertama)')
ws = wb['Undang ke Grup Baru']
hdr = [c.value for c in ws[3]]
print('  ' + ' | '.join(str(h)[:16] for h in hdr[:8]))
for row in ws.iter_rows(min_row=4, max_row=8, max_col=8, values_only=True):
    print('  ' + ' | '.join(str(v)[:16] if v is not None else '' for v in row))

print('\nCONTOH ISI — sheet "Kandidat Grup Perempuan"')
ws = wb['Kandidat Grup Perempuan']
for row in ws.iter_rows(min_row=4, max_row=ws.max_row, max_col=8, values_only=True):
    print('  ' + ' | '.join(str(v)[:18] if v is not None else '-' for v in row))
