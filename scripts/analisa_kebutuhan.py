#!/usr/bin/env python3
"""Tambang isi perkenalan anggota: mau ngulik AI buat apa + tools yang dipakai."""
import re, sys
from collections import Counter

FILES = [
    ('LAMA', '/root/.claude/uploads/5415782b-88f4-5609-83db-47506d2e9a75/896c5661-chat.md'),
    ('REBORN', '/root/.claude/uploads/5415782b-88f4-5609-83db-47506d2e9a75/f664fdd7-chat_ai_CLub_Reborn.md'),
]

F_TUJUAN = re.compile(r'(?:lagi\s+)?ngulik\s*(?:ai|al)?\s*(?:buat|untuk)\s*apa\s*[:.\-]\s*([^\n]{2,160})', re.I)
F_TOOLS = re.compile(r'tools?\s*(?:yang\s*)?(?:sering\s*)?(?:di)?pakai\s*[:.\-]\s*([^\n]{2,160})', re.I)
F_KARYA = re.compile(r'(?:punya\s*)?(?:karya|jasa|project|projek)[^:\n]{0,30}[:.\-]\s*([^\n]{2,160})', re.I)
F_BANTU = re.compile(r'(?:mau\s*)?di?bantu[^:\n]{0,40}[:.\-]\s*([^\n]{2,160})', re.I)

TOOL_LEX = {
    'ChatGPT': r'chat\s?gpt|\bgpt\b|openai', 'Gemini': r'gemini', 'Claude': r'\bclaude\b',
    'Claude Code': r'claude\s?code', 'Perplexity': r'perplexity', 'DeepSeek': r'deep\s?seek',
    'Grok': r'\bgrok\b', 'Qwen': r'\bqwen\b', 'Kimi': r'\bkimi\b', 'NotebookLM': r'notebook\s?lm',
    'Copilot': r'copilot', 'n8n': r'\bn8n\b', 'Make': r'\bmake\.com\b|\bmake\b(?!\s*sense)',
    'Zapier': r'zapier', 'Canva': r'canva', 'Midjourney': r'midjourney', 'Veo/Flow': r'\bveo\b|google\s?flow',
    'Runway': r'runway', 'Kling': r'\bkling\b', 'Sora': r'\bsora\b', 'ElevenLabs': r'eleven\s?labs',
    'Suno': r'\bsuno\b', 'Ideogram': r'ideogram', 'Firefly': r'firefly', 'Gamma': r'\bgamma\b',
    'HeyGen': r'heygen', 'CapCut': r'cap\s?cut', 'Ollama': r'ollama', 'HuggingFace': r'hugging\s?face',
    'LM Studio': r'lm\s?studio', 'Cursor': r'\bcursor\b', 'Opencode': r'open\s?code',
    'Lovable': r'lovable', 'Bolt': r'\bbolt\b', 'Replit': r'replit', 'Figma': r'figma',
    'Notion': r'notion', 'Airtable': r'airtable', 'Supabase': r'supabase', 'Python': r'\bpython\b',
    'WhatsApp API': r'wa\s?blast|fonnte|wablas|whatsapp\s?api',
}

TEMA = {
    'Konten & Sosial Media': r'konten|content|caption|posting|sosmed|social\s?media|ig\b|instagram|tiktok|threads|reels|video|desain|design|gambar|image|editing|copywrit',
    'Marketing & Jualan': r'marketing|jualan|jual|sales|closing|leads?|iklan|ads|promosi|branding|customer|olshop|toko|umkm|bisnis|omzet',
    'Otomasi & Workflow': r'automat|otomat|workflow|n8n|zapier|\bmake\b|integrasi|chatbot|bot\b|agent|api\b|webhook|scraping',
    'Kerja Kantor & Produktivitas': r'kerja|kantor|laporan|report|admin|excel|spreadsheet|dokumen|email|presentasi|notulen|meeting|efisien|produktif|leverage',
    'Aplikasi & Coding': r'aplikasi|apps?\b|software|coding|program|web\b|website|develop|sistem|erp|saas|database|backend|frontend',
    'Pendidikan & Riset': r'ngajar|mengajar|guru|dosen|pembelajaran|rpp|modul\s?ajar|soal|skripsi|tesis|jurnal|riset|research|scopus|akademik|kampus|mahasiswa|belajar\s?siswa',
    'Kesehatan & Layanan': r'klinik|dokter|pasien|apotek|kesehatan|medis',
    'Keuangan & Data': r'keuangan|finance|akuntansi|pajak|data\s?analis|analisis\s?data|dashboard|bi\b',
}

tujuan, tools_raw, karya, bantu = [], [], [], []
for label, path in FILES:
    txt = open(path, encoding='utf-8').read()
    tujuan += [(label, m.group(1).strip()) for m in F_TUJUAN.finditer(txt)]
    tools_raw += [(label, m.group(1).strip()) for m in F_TOOLS.finditer(txt)]
    karya += [(label, m.group(1).strip()) for m in F_KARYA.finditer(txt)]
    bantu += [(label, m.group(1).strip()) for m in F_BANTU.finditer(txt)]

print('JUMLAH PERKENALAN TERSTRUKTUR TERBACA')
print('  "ngulik AI buat apa" :', len(tujuan))
print('  "tools yang dipakai" :', len(tools_raw))
print('  "punya karya/project":', len(karya))
print('  "mau dibantu di"     :', len(bantu))

print('\n=== TOOLS YANG PALING SERING DISEBUT (seluruh isi chat) ===')
allrec = {}
for label, path in FILES:
    t = open(path, encoding='utf-8').read()
    for name, pat in TOOL_LEX.items():
        allrec[name] = allrec.get(name, 0) + len(re.findall(pat, t, re.I))
for name, n in sorted(allrec.items(), key=lambda x: -x[1]):
    if n:
        print('  %-16s %5d' % (name, n))

print('\n=== TEMA KEBUTUHAN dari jawaban "ngulik AI buat apa" ===')
cnt = Counter()
for _, s in tujuan:
    for tema, pat in TEMA.items():
        if re.search(pat, s, re.I):
            cnt[tema] += 1
tot = max(1, len(tujuan))
for tema, n in cnt.most_common():
    print('  %-30s %3d  (%2.0f%% dari %d responden)' % (tema, n, 100 * n / tot, tot))

print('\n=== CONTOH JAWABAN "ngulik AI buat apa" (30 pertama) ===')
for label, s in tujuan[:30]:
    print('  [%-6s] %s' % (label, s[:110]))

print('\n=== CONTOH "mau dibantu / kolaborasi di bagian mana" (20) ===')
for label, s in bantu[:20]:
    print('  [%-6s] %s' % (label, s[:110]))
