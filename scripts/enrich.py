#!/usr/bin/env python3
"""Perkaya roster: nama dari perkenalan diri, kota/domisili, indikasi gender."""
import json, re, sys
from collections import Counter

SRC = sys.argv[1] if len(sys.argv) > 1 else 'out/roster_raw.json'
DST = sys.argv[2] if len(sys.argv) > 2 else 'out/roster.json'
R = json.load(open(SRC))

# ---------------- wilayah ----------------
MALANG = ["kota malang", "kabupaten malang", "kab malang", "kab. malang", "malang",
          "kota batu", "batu", "kepanjen", "singosari", "singasari", "lawang", "turen", "pakis",
          "dau", "gondanglegi", "bululawang", "tumpang", "karangploso", "karang ploso", "wagir",
          "pakisaji", "dampit", "ngantang", "pujon", "donomulyo", "kasembon", "poncokusumo",
          "wajak", "sumberpucung", "kromengan", "ampelgading", "tirtoyudo", "jabung", "tajinan",
          # kelurahan / kawasan Kota Malang
          "sawojajar", "blimbing", "klojen", "lowokwaru", "sukun", "kedungkandang", "tlogomas",
          "tasikmadu", "dinoyo", "merjosari", "janti", "buring", "sulfat", "bunulrejo", "arjosari",
          "cemorokandang", "oro-oro dowo", "bareng", "kasin", "araya", "soekarno hatta", "suhat",
          "sigura-gura", "betek", "ketawanggede", "mulyorejo", "wonokoyo", "kebonsari", "gadang",
          "tunggulwulung", "polehan", "purwantoro", "kotalama", "mergosono", "bandulan", "landungsari"]
LUAR = ["surabaya", "sidoarjo", "gresik", "mojokerto", "jombang", "kediri", "blitar", "tulungagung",
 "trenggalek", "nganjuk", "madiun", "ngawi", "magetan", "ponorogo", "pacitan", "bojonegoro", "tuban",
 "lamongan", "bangkalan", "sampang", "pamekasan", "sumenep", "pasuruan", "pandaan", "probolinggo",
 "lumajang", "jember", "bondowoso", "situbondo", "banyuwangi", "prigen", "bangil", "kraksaan",
 "jakarta", "bekasi", "depok", "tangerang", "bogor", "bandung", "cimahi", "sukabumi", "cirebon",
 "garut", "tasikmalaya", "karawang", "purwakarta", "subang", "indramayu", "kuningan", "majalengka",
 "sumedang", "semarang", "solo", "surakarta", "yogyakarta", "jogja", "jogjakarta", "sleman", "bantul",
 "magelang", "salatiga", "kudus", "pati", "jepara", "rembang", "blora", "grobogan", "demak", "kendal",
 "batang", "pekalongan", "pemalang", "tegal", "brebes", "purwokerto", "banyumas", "cilacap", "kebumen",
 "purworejo", "wonosobo", "temanggung", "klaten", "boyolali", "sragen", "karanganyar", "wonogiri",
 "sukoharjo", "purbalingga", "banjarnegara", "denpasar", "bali", "badung", "gianyar", "tabanan",
 "singaraja", "buleleng", "mataram", "lombok", "sumbawa", "bima", "kupang", "maumere", "ende",
 "labuan bajo", "medan", "binjai", "pematang siantar", "padang", "bukittinggi", "payakumbuh",
 "pekanbaru", "dumai", "batam", "tanjung pinang", "jambi", "palembang", "lubuklinggau", "prabumulih",
 "bengkulu", "bandar lampung", "lampung", "metro", "banda aceh", "aceh", "lhokseumawe", "langsa",
 "pangkal pinang", "pontianak", "singkawang", "banjarmasin", "banjarbaru", "palangkaraya",
 "samarinda", "balikpapan", "bontang", "tarakan", "nunukan", "ikn", "penajam", "makassar", "gowa",
 "maros", "parepare", "palopo", "bone", "bulukumba", "kendari", "baubau", "palu", "poso", "gorontalo",
 "manado", "bitung", "tomohon", "ternate", "tidore", "ambon", "sorong", "manokwari", "jayapura",
 "merauke", "timika", "nabire", "biak", "wamena", "malaysia", "singapura", "singapore", "taiwan",
 "jepang", "korea", "jeddah", "riyadh", "dubai", "hongkong", "hong kong", "australia", "jerman",
 "belanda", "filipina", "philippines", "kalimantan", "sulawesi", "sumatera", "papua"]
ALL_LOC = MALANG + LUAR
LOC_RE = re.compile(r'\b(' + '|'.join(sorted(map(re.escape, ALL_LOC), key=len, reverse=True)) + r')\b', re.I)


def classify(loc):
    if not loc:
        return ''
    return 'Malang Raya' if loc.strip().lower() in MALANG else 'Luar Malang'


def pick_loc(text):
    """Dari sepotong teks, ambil lokasi. 'Malang' menang atas kelurahan biar seragam."""
    hits = [h.lower() for h in LOC_RE.findall(text or '')]
    if not hits:
        return None
    for h in hits:
        if h in ('malang', 'kota malang', 'kabupaten malang', 'kab malang', 'kab. malang'):
            return 'Malang'
    for h in hits:
        if h in MALANG:
            return h.title()
    return hits[0].title()


# ---------------- leksikon nama ----------------
FEM = set("""siti nur nurul dewi sri ayu rina ratna fitri fitria indah lia yuni yuli yulia wati ani anisa annisa
aisyah aisha nabila salsa salsabila rahma rahmi zahra zahro maya mega novi novia vina diah endah lilis ika
rini retno titik nining umi ummi ida ita evi eva emi emma erna elis elly ely elsa erni fani fanny farah
febby fina fira firda gita hana hani hanifah hesti hilda ines intan irma isna kartika kiki lala lastri
laila lely lena lestari lina linda lisa lulu luluk maria marlina mila mimi mira mutia nadia nadya
nani nia nita noviana nunung nurhayati putri puji rara ratih reni resti ria riri risa risma rita
rosa rosita rossa rusmini santi sari sarah selvi shinta sinta sofia sofie suci sulis sumiati susi susan
susanti syifa tari tati tia tina tuti ulfa ulfah vera veni vika vivi wahyuni widya wiwik wulan yanti
yeni yessi yulianti yunita zulfa zaskia amel amelia anggi anggita aulia ayunda bella bunga
cantika chairunnisa cinta citra clara dina dinda dita elok erika esti fadhilah fatimah fauziah gina
hesty ike ina irna jamilah jannah karina khoirun laras lidya maimunah mardiyah martha melati melinda meri
meta mona monica nabilah naila najwa nilam ningsih novita nurmala okta oktavia olivia pipit prita puspa
qonita rahayu rahmawati rani ranti rima rizka riska safira salma salwa sekar septi shafa shella
silvi suryani tania tantri tasya tiara tika titi trisna vanya verawati vinny wanda wida winda wiwin
yuliana yulis zahira zainab zulaikha yayuk nurhalimah halimah khadijah maryam mariam ainun anna arina
asri astri atika cici cindy clarissa desi desy devi dhea dhian diana dinar dini dwiyanti elin ellen elsi
endang enny erlin esther fara farida fatma febrianti fenny fera fifi fika fitriani frida gadis gayatri
hafsah hasna hastuti ifa ila ilma imas indri inggrid isti jihan juli julia junita kamila karisma kholifah
kirana kusuma laily leni lili lintang lusi lutfiah maghfiroh mahdiyah manda marisa masruroh mayang mei
melisa mia miranda mirna muslimah nadhira nafisa nanik narti nastiti nelly nikmah nilna ningrum nova
nuraini nurjannah nurlaila nurmi ovi peni permata pratiwi puput purwanti rahmadani raisa rasti
ratu rahmadhani rachma ririn robiatul rohmah romlah rosalina rukmini sabrina safitri sakinah salsabil
sandra sania sartika sasa savira sela selly septiana shanti sherly silvia siska sitti solikah sofiah
sundari suryati syafira syarifah tiwi utami vanessa velia vidya viona wardah widi wiji windy wulandari
yasmin yenny yosi yulinda yustika zahrah zulfah mulyani nurin salsabiila adis""".split())
FEM_TITLE = re.compile(r'^\s*(mbak|mba|bu|ibu|hj\.?|hajjah|ny\.?|nyonya|teh|neng|sis)\b', re.I)
MALE_TITLE = re.compile(r'^\s*(mas|pak|bapak|bang|abang|om|gus|ust(?:adz)?|kyai|h\.|mr\.?|cak|kang)\b', re.I)
MALE = set("""muhammad mochamad mohamad moh mhd ahmad achmad agus budi bambang joko slamet sugeng hendra
rizal ridwan hasan husein ibrahim ismail yusuf yahya zainal zainuddin abdul abdur syaiful saiful arif arief
irfan ilham imam iqbal khoirul mukhlis nurdin rahmat rahman ramdan reza rifqi rizky rohman samsul sholeh
sulaiman surya taufik teguh umar wahyudi wawan yudi yuda anton andi andri anwar bayu candra dedi dedy deni
denny dimas doni edi eko endra erwin fadil faisal fajar fandi farhan fauzan ferdi firman gilang
hadi hafiz haris hary heri hery ibnu ikhsan indra irwan jaka jefri kurniawan lukman mahmud maulana miftah
naufal nugroho panji prasetyo purnomo putra rendi rendy ricky rio riyan rudi rudy sandi satria septian
setiawan sigit sofyan sony sultan syahrul tegar tio tommy toni utomo vino wibowo widodo wisnu yanto
yoga yogi yusril zaki zaky zulfikar afif ananta bara haby hasyim johan ulum robby baharudin wildan rama edo
adit aditya aji akbar aldi alfian ali alif alvin amir andika angga arya asep bagas bagus bima
bintang cahyo daffa dani danu danang darma dava dewa dika dio ega fahmi farid febri ferry
fikri galih gani gede guntur hamzah hanif hari hendrik ibra ical ivan jaya kevin krisna lucky
made mahendra malik marco nanang nizar novan oka pandu pram raka rangga ravi reno
rian riki rifky ripan roni sahrul salman samuel sandy sasongko satrio sujarwo martan arip taopan
supri suryo syamsul tirta trio willy yandi yopi yudha yunus zaenal regio idin tiyo bahtiar""".split())

# kata yang jelas bukan nama orang
NOT_NAME = set("""saya aku kami kita nama panggil izin ijin gabung salam kenal semuanya mohon terima kasih
dari dan yang untuk ini itu ada mau ingin belajar baru masih lagi sudah bisa juga yang sya newbie orang
warga sedang seorang pengen coba mencoba disini udah dah baru pemula suka pernah pakai pake punya buat
kerja kerjanya guru dosen mahasiswa pelajar karyawan pengusaha freelancer developer designer marketer
afiliator affiliator programmer content creator owner founder admin pns swasta wiraswasta ibu bapak
tidak bukan belum sangat cuma hanya lebih kurang banyak sedikit kalau kalo jadi tapi karena biar
ngulik nyoba ikut ikutan nimbrung bergabung hadir absen setuju siap oke okey nggak enggak gak
tinggal domisili lokasi alamat asal kota kabupaten daerah rumah kantor sekolah kampus
bingung pengin penasaran tertarik senang seneng cari mencari butuh perlu minta tolong bantu
biasa lama sering jarang kadang selalu semoga insyaallah alhamdulillah bismillah assalamualaikum
halo hai hello hi rek guys teman temen rekan kawan sahabat semua""".split())

FEM_SELF = re.compile(
    r'(?:\b(?:saya|sy|aku|ak|gw|gue)\b[^.!?\n]{0,25}\b(?:cewe|cewek|cew|wanita|perempuan|ibu|emak|mamah|bunda)\b)'
    r'|(?:\bkopdar\s+cewe\b)|(?:\bmau\s+gabung\s+cew\b)'
    r'|(?:\b(?:ibu\s+rumah\s+tangga|irt)\b)|(?:\bsuami\s+saya\b)|(?:\banakq\b)', re.I)
MALE_SELF = re.compile(r'\b(?:saya|sy|aku|ak)\b[^.!?\n]{0,25}\b(?:cowo|cowok|laki|pria|bapak\s+dari)\b'
                       r'|\bistri\s+saya\b', re.I)

# ---------------- ekstraksi ----------------
FIELD_NAMA = re.compile(r'(?:^|\n)\s*[-*•·>\s]*nama\s*(?:lengkap|panggilan)?\s*[:.\-]\s*([^\n|]{2,60})', re.I)
FIELD_LOC = re.compile(r'(?:^|\n)\s*[-*•·>\s]*(?:domisili|lokasi|kota|asal|alamat|tinggal|based)\s*[:.\-]\s*([^\n|]{2,60})', re.I)
LOOSE_NAME = re.compile(
    r'\b(?:perkenalkan(?:\s+nama)?|kenalkan|panggil)\s+(?:saya|aku|nama\s*saya)?\s*[:,]?\s*([A-Za-z][A-Za-z\']{2,15}(?:\s+[A-Za-z][A-Za-z\']{2,15}){0,2})'
    r'|\b(?:saya|sy|sya|aku)\s+([A-Za-z][A-Za-z\']{2,15}(?:\s+[A-Z][A-Za-z\']{2,15}){0,2})\s*[,.]', re.I)
LOOSE_LOC = re.compile(r'\b(?:domisili|berdomisili|tinggal\s+di|asal|dari|warga|orang|di\s+kota|area|wilayah)\s+([A-Za-z ,.\'-]{3,45})', re.I)


def clean(t):
    t = re.sub(r'https?://\S+', ' ', t or '')
    return '\n'.join(l for l in t.split('\n') if not l.strip().startswith('>'))


def sane_name(cand):
    cand = re.sub(r'[^A-Za-z\' ]', ' ', cand or '').strip()
    toks = [w for w in cand.split() if len(w) >= 2]
    if not toks:
        return None
    if toks[0].lower() in NOT_NAME:
        return None
    toks = [w for w in toks if w.lower() not in NOT_NAME][:3]
    if not toks or len(toks[0]) < 3:
        return None
    return ' '.join(toks).title()


def extract(texts):
    """-> (nama, keyakinan_nama, lokasi, keyakinan_lokasi)"""
    nama = nk = loc = lk = None
    for t in texts:
        c = clean(t)
        if nama is None:
            m = FIELD_NAMA.search(c)
            if m:
                s = sane_name(m.group(1))
                if s:
                    nama, nk = s, 'Tinggi'
        if loc is None:
            m = FIELD_LOC.search(c)
            if m:
                p = pick_loc(m.group(1))
                if p:
                    loc, lk = p, 'Tinggi'
        if nama and loc:
            return nama, nk, loc, lk
    for t in texts[:12]:
        c = clean(t)
        if nama is None:
            for m in LOOSE_NAME.finditer(c):
                s = sane_name(m.group(1) or m.group(2))
                if s:
                    nama, nk = s, 'Sedang'
                    break
        if loc is None:
            for m in LOOSE_LOC.finditer(c):
                p = pick_loc(m.group(1))
                if p:
                    loc, lk = p, 'Sedang'
                    break
            if loc is None:
                p = pick_loc(c)
                if p:
                    loc, lk = p, 'Rendah'
    return nama, nk, loc, lk


def gender(display, guessed, texts):
    hay = ' '.join(clean(t) for t in texts[:25])
    if FEM_SELF.search(hay):
        return 'Perempuan', 'Tinggi', 'menyebut diri perempuan'
    if MALE_SELF.search(hay):
        return 'Laki-laki', 'Tinggi', 'menyebut diri laki-laki'
    for src in (display, guessed):
        if not src:
            continue
        if FEM_TITLE.match(src):
            return 'Perempuan', 'Tinggi', 'sapaan di nama'
        if MALE_TITLE.match(src):
            return 'Laki-laki', 'Tinggi', 'sapaan di nama'
    toks = []
    for src in (guessed, display):
        toks += [re.sub(r'[^a-z]', '', w.lower()) for w in (src or '').split()]
    toks = [t for t in toks if t]
    for lvl, sl in (('Sedang', toks[:2]), ('Rendah', toks)):
        for t in sl:
            if t in FEM and t not in MALE:
                return 'Perempuan', lvl, 'nama "%s"' % t
            if t in MALE and t not in FEM:
                return 'Laki-laki', lvl, 'nama "%s"' % t
    if (guessed or display):
        return 'Tidak diketahui', '-', 'nama tidak dikenali kamus'
    return 'Tidak diketahui', '-', 'hanya nomor, tidak pernah chat'


out = []
for r in R:
    disp = r['name'] or ''
    nama_p, nk, loc, lk = extract(r['texts']) if r['msgs'] else (None, None, None, None)
    if loc is None:
        loc, lk = pick_loc(disp), 'Rendah'
    if nama_p and disp and nama_p.lower() == disp.lower():
        nama_p = None
    g, gk, why = gender(disp, nama_p, r['texts'])
    out.append({
        'nama': disp or (nama_p or ''),
        'nama_kontak': disp,
        'nama_perkenalan': nama_p or '',
        'sumber_nama': 'Kontak HP' if disp else ('Perkenalan di grup' if nama_p else 'Belum ada'),
        'keyakinan_nama': 'Tinggi' if disp else (nk or '-'),
        'wa': r['phone'] or '',
        'gender': g, 'keyakinan_gender': gk, 'dasar_gender': why,
        'kota': loc or '',
        'wilayah': classify(loc),
        'keyakinan_kota': lk if loc else '-',
        'status_grup': 'Keluar' if r['left'] else 'Masih di grup',
        'tgl_gabung': r['join_date'] or '',
        'jml_pesan': r['msgs'],
        'keaktifan': 'Aktif' if r['msgs'] >= 10 else ('Pernah bicara' if r['msgs'] else 'Silent'),
    })

json.dump(out, open(DST, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

print('TOTAL kontak unik :', len(out))
print('punya nomor WA    :', sum(1 for x in out if x['wa']))
print('hanya nama kontak :', sum(1 for x in out if not x['wa']))
print('punya nama        :', sum(1 for x in out if x['nama']))
print('punya kota        :', sum(1 for x in out if x['kota']))
print('  - Malang Raya   :', sum(1 for x in out if x['wilayah'] == 'Malang Raya'))
print('  - Luar Malang   :', sum(1 for x in out if x['wilayah'] == 'Luar Malang'))
print('masih di grup     :', sum(1 for x in out if x['status_grup'] == 'Masih di grup'))
print('gender            :', dict(Counter(x['gender'] for x in out)))
print()
print('KANDIDAT GRUP PEREMPUAN')
for x in sorted(out, key=lambda y: {'Tinggi': 0, 'Sedang': 1, 'Rendah': 2}.get(y['keyakinan_gender'], 3)):
    if x['gender'] == 'Perempuan':
        print('  %-7s | %-24s | %-14s | %-14s | %s' % (
            x['keyakinan_gender'], (x['nama'] or '(tanpa nama)')[:24], x['wa'] or '(di kontak HP)',
            (x['kota'] or '-')[:14], x['dasar_gender']))
