#!/usr/bin/env python3
"""Ekstrak roster anggota (nama + nomor WA) dari export chat WhatsApp AI Club Malang."""
import re, sys, json, unicodedata
from collections import OrderedDict, defaultdict

SRC = sys.argv[1]

TIME = r'\[\d{1,2}:\d{2}\s*[AP]M\]'
RE_DATE   = re.compile(r'^##\s+(.+?)\s*$')
RE_SYS    = re.compile(r'^\s*' + TIME + r'\s*__(.+?)__\s*$')
RE_MSG    = re.compile(r'^\s*' + TIME + r'\s*\*\*(.+?):\*\*\s*(.*)$')

RE_JOIN   = re.compile(r'^(.+?)\s+joined via invite link$')
RE_ADDED  = re.compile(r'^(.+?)\s+added\s+(.+)$')
RE_LEFT   = re.compile(r'^(.+?)\s+left$')
RE_REMOVED= re.compile(r'^(.+?)\s+removed\s+(.+)$')

PHONE = re.compile(r'^\+\d[\d\s\-]{6,}$')

def norm_phone(s):
    d = re.sub(r'\D', '', s)
    if not d: return None
    if d.startswith('0'):  d = '62' + d[1:]
    if d.startswith('8'):  d = '62' + d
    return d

def is_phone(s):
    return bool(PHONE.match(s.strip()))

def key_of(ident):
    ident = ident.strip()
    if is_phone(ident):
        p = norm_phone(ident)
        return ('phone', p), p, None
    return ('name', ident.lower()), None, ident

# ---------------- pass 1: roster ----------------
members = OrderedDict()   # key -> record

def touch(ident, date, event):
    ident = ident.strip()
    if not ident or ident in ('You', 'Someone', 'System notification'):
        return None
    k, phone, name = key_of(ident)
    r = members.get(k)
    if r is None:
        r = {'key': k, 'phone': phone, 'name': name, 'raw': ident,
             'join_date': None, 'left': False, 'left_date': None,
             'msgs': 0, 'first_msg_date': None, 'texts': []}
        members[k] = r
    if event in ('join', 'added') and r['join_date'] is None:
        r['join_date'] = date
    if event == 'left':
        r['left'] = True; r['left_date'] = date
    if event == 'removed':
        r['left'] = True; r['left_date'] = date
    return r

cur_date = None
lines = open(SRC, encoding='utf-8').read().split('\n')
i = 0
events = defaultdict(int)
while i < len(lines):
    ln = lines[i]
    m = RE_DATE.match(ln)
    if m:
        cur_date = m.group(1); i += 1; continue
    m = RE_SYS.match(ln)
    if m:
        body = m.group(1).strip()
        mm = RE_JOIN.match(body)
        if mm: touch(mm.group(1), cur_date, 'join'); events['join'] += 1; i += 1; continue
        mm = RE_ADDED.match(body)
        if mm:
            touch(mm.group(1), cur_date, 'seen')
            touch(mm.group(2), cur_date, 'added'); events['added'] += 1; i += 1; continue
        mm = RE_REMOVED.match(body)
        if mm: touch(mm.group(2), cur_date, 'removed'); events['removed'] += 1; i += 1; continue
        mm = RE_LEFT.match(body)
        if mm: touch(mm.group(1), cur_date, 'left'); events['left'] += 1; i += 1; continue
        events['other:' + body[:40]] += 1
        i += 1; continue
    m = RE_MSG.match(ln)
    if m:
        sender, text = m.group(1).strip(), m.group(2)
        # kumpulkan baris lanjutan (multi-line message)
        j = i + 1
        buf = [text]
        while j < len(lines) and not RE_MSG.match(lines[j]) and not RE_SYS.match(lines[j]) \
              and not RE_DATE.match(lines[j]) and lines[j].strip() != '---':
            buf.append(lines[j]); j += 1
        full = '\n'.join(buf).strip()
        r = touch(sender, cur_date, 'seen')
        if r is not None:
            r['msgs'] += 1
            if r['first_msg_date'] is None: r['first_msg_date'] = cur_date
            if len(r['texts']) < 60: r['texts'].append(full)
        i = j; continue
    i += 1

print(json.dumps({'events': dict(events), 'members': len(members)}, indent=2, ensure_ascii=False)[:2500])
json.dump([{k: v for k, v in r.items() if k != 'key'} for r in members.values()],
          open('out/roster_raw.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
