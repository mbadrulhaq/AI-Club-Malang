// Deck: Modul Lengkap AI Club Malang — Beginner sampai Advanced
const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5
pres.author = 'AI Club Malang';
pres.company = 'AI Club Malang';
pres.title = 'Modul Lengkap AI Club Malang';

const W = 13.333, H = 7.5, M = 0.65;
const C = {
  dark: '04303A', deep: '013A40', teal: '028090', sea: '00A896', mint: '02C39A',
  amber: 'F2A65A', gold: 'FFB703',
  white: 'FFFFFF', paper: 'F4F7F7', line: 'DCE6E6',
  ink: '12262A', muted: '5A6E73', mutedLight: 'A9C4C6',
};
const HF = 'Cambria', BF = 'Calibri';

const T = (s, o) => Object.assign({ isTextBox: true, fontFace: BF, color: C.ink, margin: 0 }, o);

/* ---------- slide chrome ---------- */
function darkBase() {
  const s = pres.addSlide();
  s.background = { color: C.deep };
  return s;
}
function lightBase() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  return s;
}
function head(s, title, kicker, dark) {
  let y = 0.5;
  if (kicker) {
    s.addText(kicker.toUpperCase(), T(kicker, {
      x: M, y: y, w: W - 2 * M, h: 0.3, fontSize: 12, bold: true,
      color: dark ? C.mint : C.teal, charSpacing: 2,
    }));
    y += 0.36;
  }
  s.addText(title, T(title, {
    x: M, y: y, w: W - 2 * M, h: 0.75, fontSize: 34, bold: true,
    fontFace: HF, color: dark ? C.white : C.ink, valign: 'top',
  }));
  return y + 0.9;
}

/* Perkiraan jumlah baris setelah word-wrap.
   Faktor dikalibrasi dari render LibreOffice: judul tebal serif ~0.85,
   teks isi ~0.90 lebar-karakter per pt. Sengaja konservatif — kelebihan
   ruang hanya menyisakan celah, kekurangan ruang menyebabkan tumpang tindih. */
function estLines(text, widthIn, fontSize, bold) {
  const cpl = Math.max(6, Math.floor((widthIn * 96) / (fontSize * (bold ? 0.92 : 0.90))));
  let lines = 0;
  for (const para of String(text).split('\n')) {
    if (!para.trim()) { lines += 1; continue; }
    let cur = 0, n = 1;
    for (const w of para.split(/\s+/)) {
      const add = cur === 0 ? w.length : w.length + 1;
      if (cur + add > cpl && cur > 0) { n++; cur = w.length; } else { cur += add; }
    }
    lines += n;
  }
  return lines;
}
const lineH = (fs) => (fs * 1.28) / 72; // tinggi satu baris dalam inci
function foot(s, txt) {
  s.addText(txt, T(txt, {
    x: M, y: H - 0.52, w: W - 2 * M, h: 0.3, fontSize: 10,
    color: C.muted, italic: true,
  }));
}
function dot(s, x, y, d, fill, glyph, gCol) {
  s.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill } });
  if (glyph) s.addText(glyph, T(glyph, {
    x, y, w: d, h: d, fontSize: d * 22, bold: true, align: 'center',
    valign: 'middle', color: gCol || C.white, fontFace: HF,
  }));
}

/* ---------- building blocks ---------- */
// grid of cards: items = [{n, t, d}]
function cards(s, items, opt) {
  const o = Object.assign({ x: M, y: 1.7, w: W - 2 * M, cols: 3, gap: 0.28, h: 1.9,
    fill: C.paper, num: C.teal, tCol: C.ink, dCol: C.muted, tSize: 15, dSize: 12 }, opt);
  const cw = (o.w - o.gap * (o.cols - 1)) / o.cols;
  const tw = cw - 0.44;
  // ukur dulu, baru gambar: tinggi kartu seragam mengikuti isi terpanjang
  const measured = items.map(it => {
    const th = estLines(it.t, tw, o.tSize, true) * lineH(o.tSize) + 0.06;
    const dh = it.d ? estLines(it.d, tw, o.dSize, false) * lineH(o.dSize) + 0.06 : 0;
    const top = 0.22 + (it.n !== undefined ? 0.58 : 0);
    return { th, dh, need: top + th + (it.d ? 0.08 + dh : 0) + 0.18 };
  });
  const ch = Math.max(o.h, ...measured.map(m => m.need));
  const rowsN = Math.ceil(items.length / o.cols);
  const bottom = o.y + rowsN * ch + (rowsN - 1) * o.gap;
  const limit = o.maxY || (H - 0.55);
  if (bottom > limit + 0.01) FIT.push(`blok kartu "${items[0].t.slice(0, 24)}..." melewati batas ${(bottom - limit).toFixed(2)}" (bawah ${bottom.toFixed(2)}")`);

  items.forEach((it, i) => {
    const m = measured[i];
    const cx = o.x + (i % o.cols) * (cw + o.gap);
    const cy = o.y + Math.floor(i / o.cols) * (ch + o.gap);
    s.addShape(pres.ShapeType.roundRect, {
      x: cx, y: cy, w: cw, h: ch, rectRadius: 0.08, fill: { color: o.fill },
    });
    let ty = cy + 0.22;
    if (it.n !== undefined) {
      dot(s, cx + 0.22, ty, 0.42, o.num, String(it.n));
      ty += 0.58;
    }
    s.addText(it.t, T(it.t, {
      x: cx + 0.22, y: ty, w: tw, h: m.th, fontSize: o.tSize, bold: true,
      color: o.tCol, fontFace: HF, valign: 'top',
    }));
    if (it.d) s.addText(it.d, T(it.d, {
      x: cx + 0.22, y: ty + m.th + 0.08, w: tw, h: m.dh,
      fontSize: o.dSize, color: o.dCol, valign: 'top', lineSpacingMultiple: 1.05,
    }));
  });
  return bottom;
}
const FIT = [];
let CB = 0; // batas bawah blok kartu terakhir

// big stat tiles: items = [{v, l}]
function stats(s, items, opt) {
  const o = Object.assign({ x: M, y: 2.0, w: W - 2 * M, h: 1.55, vCol: C.teal,
    lCol: C.muted, vSize: 46, fill: null, gap: 0.28 }, opt);
  const cw = (o.w - o.gap * (items.length - 1)) / items.length;
  items.forEach((it, i) => {
    const cx = o.x + i * (cw + o.gap);
    if (o.fill) s.addShape(pres.ShapeType.roundRect, {
      x: cx, y: o.y, w: cw, h: o.h, rectRadius: 0.08, fill: { color: o.fill },
    });
    s.addText(it.v, T(it.v, {
      x: cx + 0.15, y: o.y + 0.14, w: cw - 0.3, h: 0.78, fontSize: o.vSize,
      bold: true, color: o.vCol, fontFace: HF, valign: 'middle',
    }));
    s.addText(it.l, T(it.l, {
      x: cx + 0.15, y: o.y + 0.94, w: cw - 0.3, h: o.h - 1.0, fontSize: 12,
      color: o.lCol, valign: 'top', lineSpacingMultiple: 1.05,
    }));
  });
}

// labelled rows: items = [{k, v, d}]
function rows(s, items, opt) {
  const o = Object.assign({ x: M, y: 1.75, w: W - 2 * M, h: 0.62, gap: 0.14,
    kw: 2.5, kCol: C.teal, fill: C.paper }, opt);
  items.forEach((it, i) => {
    const cy = o.y + i * (o.h + o.gap);
    s.addShape(pres.ShapeType.roundRect, {
      x: o.x, y: cy, w: o.w, h: o.h, rectRadius: 0.06, fill: { color: o.fill },
    });
    s.addText(it.k, T(it.k, {
      x: o.x + 0.22, y: cy, w: o.kw, h: o.h, fontSize: 14, bold: true,
      color: o.kCol, fontFace: HF, valign: 'middle',
    }));
    s.addText(it.v, T(it.v, {
      x: o.x + 0.22 + o.kw, y: cy, w: o.w - o.kw - 0.5, h: o.h, fontSize: 13,
      color: C.ink, valign: 'middle',
    }));
  });
}

function bullets(s, list, opt) {
  const o = Object.assign({ x: M, y: 1.8, w: 6.0, h: 4.5, size: 15, col: C.ink }, opt);
  s.addText(list.map((t, i) => ({
    text: t, options: { bullet: true, breakLine: i < list.length - 1 },
  })), T('', { x: o.x, y: o.y, w: o.w, h: o.h, fontSize: o.size, color: o.col,
    paraSpaceAfter: 10, valign: 'top' }));
}

function quote(s, txt, who, opt) {
  const o = Object.assign({ x: M, y: 5.3, w: W - 2 * M, h: 1.0 }, opt);
  s.addShape(pres.ShapeType.roundRect, {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.08, fill: { color: C.deep },
  });
  s.addText('"' + txt + '"', T(txt, {
    x: o.x + 0.3, y: o.y + 0.12, w: o.w - 0.6, h: o.h - 0.5, fontSize: 14,
    italic: true, color: C.white, valign: 'middle',
  }));
  s.addText(who, T(who, {
    x: o.x + 0.3, y: o.y + o.h - 0.38, w: o.w - 0.6, h: 0.28, fontSize: 10,
    color: C.mint,
  }));
}

/* ================= SLIDES ================= */

/* 1 — Title */
{
  const s = darkBase();
  s.addShape(pres.ShapeType.ellipse, { x: 9.9, y: -1.5, w: 5.6, h: 5.6, fill: { color: C.teal }, transparency: 72 });
  s.addShape(pres.ShapeType.ellipse, { x: 11.4, y: 4.3, w: 3.4, h: 3.4, fill: { color: C.mint }, transparency: 82 });
  s.addText('AI CLUB MALANG', T('', { x: M, y: 1.5, w: 9, h: 0.35, fontSize: 14, bold: true, color: C.mint, charSpacing: 3 }));
  s.addText('Modul Lengkap', T('', { x: M, y: 2.0, w: 9.2, h: 0.95, fontSize: 54, bold: true, fontFace: HF, color: C.white }));
  s.addText('Dari Beginner sampai Advanced', T('', { x: M, y: 2.95, w: 9.2, h: 0.7, fontSize: 30, fontFace: HF, color: C.mint }));
  s.addText('Lima track belajar · Kurikulum 16 minggu · Capstone project\nDisusun dari data 1.067 anggota AI Club Malang',
    T('', { x: M, y: 3.95, w: 8.5, h: 1.0, fontSize: 15, color: C.mutedLight, lineSpacingMultiple: 1.3 }));
  s.addText('Versi 1.0  ·  September 2026', T('', { x: M, y: 6.5, w: 8, h: 0.35, fontSize: 12, color: C.mutedLight }));
  s.addNotes('Pembuka. Tekankan: modul ini disusun dari data nyata anggota, bukan dari tebakan.');
}

/* 2 — Ringkasan eksekutif */
{
  const s = lightBase();
  head(s, 'Ringkasan Eksekutif', 'Sekilas');
  stats(s, [
    { v: '5', l: 'Track belajar, dari pemula sampai AI engineer' },
    { v: '16', l: 'Minggu kurikulum inti, satu sesi per minggu' },
    { v: '16', l: 'Output nyata — satu per minggu, tanpa kecuali' },
    { v: '7', l: 'Pilihan capstone project dengan pengguna nyata' },
  ], { y: 1.75, fill: C.paper, h: 1.7 });
  s.addText('Yang membedakan modul ini', T('', { x: M, y: 3.75, w: 6, h: 0.4, fontSize: 18, bold: true, fontFace: HF, color: C.ink }));
  bullets(s, [
    'Disusun dari 107 jawaban anggota tentang tujuan mereka memakai AI',
    'Urutan track ditentukan permintaan nyata, bukan urutan teori',
    'Setiap sesi wajib menghasilkan output — tidak ada kelas yang berakhir hanya dengan catatan',
    'Selaras dengan Jalur Belajar Level 1–5 aiclub.id',
  ], { y: 4.25, w: W - 2 * M, size: 14 });
  s.addNotes('Empat angka ini yang harus diingat orang setelah presentasi.');
}

/* 3 — Kenapa beda */
{
  const s = lightBase();
  head(s, 'Modul Ini Tidak Disusun dari Tebakan', 'Dasar penyusunan');
  s.addText('Grup AI Club Malang punya template perkenalan terstruktur. Anggota mengisinya sendiri — dan itu menjadi riset pasar yang sudah jadi.',
    T('', { x: M, y: 1.62, w: W - 2 * M, h: 0.55, fontSize: 15, color: C.muted }));
  CB = cards(s, [
    { n: '107', t: 'Menulis tujuannya', d: 'Mengisi kolom "Lagi ngulik AI buat apa" — dasar penentuan bobot tiap track' },
    { n: '160', t: 'Menulis karyanya', d: 'Mengisi kolom "Punya karya/jasa/project apa" — dasar bank proyek & pencarian mentor' },
    { n: '63', t: 'Menulis tools-nya', d: 'Mengisi kolom "Tools yang sering dipakai" — dasar direktori tools resmi' },
  ], { y: 2.35, h: 2.0, num: C.teal });
  quote(s, 'Kerangka lima track yang sudah ada sudah tepat. Yang diberikan data ini bukan koreksi arah, melainkan urutan pembukaan dan bobot jam.',
    'Kesimpulan kalibrasi modul', { y: Math.max(4.75, CB + 0.4), h: 1.05 });
  s.addNotes('Poin utama: kita tidak mengarang kurikulum. Kita membaca apa yang anggota sudah tulis sendiri.');
}

/* 4 — Chart kebutuhan */
{
  const s = lightBase();
  head(s, 'Apa yang Sebenarnya Dibutuhkan Anggota', 'Temuan 1');
  s.addChart(pres.ChartType.bar, [{
    name: 'Persentase anggota',
    labels: ['Otomasi & Workflow', 'Kerja & Produktivitas', 'Marketing & Jualan',
      'Pendidikan & Riset', 'Konten & Sosmed', 'Aplikasi & Coding', 'Keuangan & Data'],
    values: [30, 21, 18, 16, 13, 12, 4],
  }], {
    x: M, y: 1.6, w: 7.6, h: 4.9, barDir: 'bar', barGapWidthPct: 45,
    chartColors: [C.teal], showTitle: false, showLegend: false,
    showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0"%"',
    dataLabelColor: C.ink, dataLabelFontSize: 12, dataLabelFontFace: BF,
    catAxisLabelColor: C.ink, catAxisLabelFontSize: 12, catAxisLabelFontFace: BF,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 10, valAxisMinVal: 0, valAxisMaxVal: 36,
    valGridLine: { color: C.line, size: 1 }, catGridLine: { style: 'none' },
  });
  s.addShape(pres.ShapeType.roundRect, { x: 8.5, y: 1.6, w: 4.2, h: 3.0, rectRadius: 0.1, fill: { color: C.deep } });
  s.addText('30%', T('', { x: 8.75, y: 1.8, w: 3.7, h: 0.9, fontSize: 52, bold: true, fontFace: HF, color: C.mint }));
  s.addText('anggota datang untuk OTOMASI — tema tunggal terbesar, di atas konten, marketing, dan riset.',
    T('', { x: 8.75, y: 2.75, w: 3.7, h: 1.6, fontSize: 14, color: C.white, lineSpacingMultiple: 1.25 }));
  s.addText('Karena itu Track Builder (automation) dibuka bersamaan dengan Track Explorer — bukan tiga bulan sesudahnya.',
    T('', { x: 8.5, y: 4.85, w: 4.2, h: 1.4, fontSize: 13, color: C.muted, lineSpacingMultiple: 1.2 }));
  foot(s, 'Dasar: 107 anggota yang mengisi kolom "Lagi ngulik AI buat apa" di grup AI Club Malang & Reborn.');
  s.addNotes('Ini slide paling penting di bagian data. Otomasi menang telak.');
}

/* 5 — Chart tools */
{
  const s = lightBase();
  head(s, 'Tools yang Benar-Benar Dipakai', 'Temuan 2');
  s.addChart(pres.ChartType.bar, [{
    name: 'Jumlah penyebutan',
    labels: ['ChatGPT', 'Claude', 'Gemini', 'DeepSeek', 'Opencode', 'n8n', 'Claude Code', 'Canva', 'Ollama'],
    values: [350, 298, 200, 68, 67, 55, 35, 13, 0],
  }], {
    x: M, y: 1.6, w: 7.6, h: 4.9, barDir: 'bar', barGapWidthPct: 45,
    chartColors: [C.sea], showTitle: false, showLegend: false,
    showValue: true, dataLabelPosition: 'outEnd', dataLabelColor: C.ink,
    dataLabelFontSize: 12, dataLabelFontFace: BF,
    catAxisLabelColor: C.ink, catAxisLabelFontSize: 12, catAxisLabelFontFace: BF,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 10, valAxisMinVal: 0, valAxisMaxVal: 400,
    valGridLine: { color: C.line, size: 1 }, catGridLine: { style: 'none' },
  });
  const box = (y, t, d, col) => {
    s.addShape(pres.ShapeType.roundRect, { x: 8.5, y, w: 4.2, h: 1.5, rectRadius: 0.1, fill: { color: C.paper } });
    const th = estLines(t, 3.7, 15, true) * lineH(15) + 0.05;
    s.addText(t, T('', { x: 8.75, y: y + 0.16, w: 3.7, h: th, fontSize: 15, bold: true, fontFace: HF, color: col }));
    s.addText(d, T('', { x: 8.75, y: y + 0.16 + th + 0.06, w: 3.7, h: 1.5 - 0.28 - th, fontSize: 12, color: C.muted, lineSpacingMultiple: 1.15 }));
  };
  box(1.6, 'Sudah multi-model', 'ChatGPT, Claude, dan Gemini dipakai berdampingan. Ini bukan komunitas pemula murni.', C.teal);
  box(3.3, 'n8n mengalahkan semua tool kreatif', 'n8n sendirian (55) hampir menyamai seluruh tool kreatif digabung, yang tersebar di 6 tool.', C.teal);
  box(5.0, 'Local AI belum dikenal', 'Ollama 0, Hugging Face 1. Bukan tidak berharga — belum ada yang tahu mereka membutuhkannya.', C.amber);
  foot(s, 'Dasar: jumlah penyebutan di seluruh percakapan grup AI Club Malang (8 Jul – 5 Sep 2026) dan grup Reborn (31 Agu – 5 Sep 2026).');
  s.addNotes('Angka Ollama = 0 penting: itu peluang, bukan kegagalan.');
}

/* 6 — Tiga kesimpulan */
{
  const s = darkBase();
  head(s, 'Tiga Kesimpulan yang Membentuk Modul', 'Temuan 3', true);
  CB = cards(s, [
    { n: '1', t: 'Malang automation-first', d: 'Bukan creative-first. Track Builder naik jadi track unggulan, dibuka bulan pertama bersama Explorer — bukan tiga bulan sesudahnya.' },
    { n: '2', t: 'Anggota sudah multi-model', d: 'Materi "kenalan dengan AI" dipangkas. Materi "model mana untuk tugas mana" diperkuat, karena ChatGPT, Claude, dan Gemini sudah dipakai berdampingan.' },
    { n: '3', t: 'AIoT punya pelanggan nyata', d: 'Penghitung lobster dan manajemen hidroponik sudah ditulis anggota sendiri. Maker Lab jadi lab berbasis proyek, bukan kelas terjadwal.' },
  ], { y: 2.1, h: 3.1, fill: '0A4A52', num: C.mint, tCol: C.white, dCol: C.mutedLight, tSize: 17, dSize: 13.5 });
  s.addText('Setiap keputusan struktur di modul ini bisa ditelusuri ke salah satu dari tiga kesimpulan di atas.',
    T('', { x: M, y: CB + 0.35, w: W - 2 * M, h: 0.5, fontSize: 15, italic: true, color: C.mint }));
  s.addNotes('Tiga kesimpulan ini adalah jembatan dari data ke desain modul.');
}

/* 7 — Visi */
{
  const s = lightBase();
  head(s, 'Arah Besar: Bukan Sekadar Tahu Tools', 'Visi');
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 1.65, w: W - 2 * M, h: 1.15, rectRadius: 0.1, fill: { color: C.deep } });
  const steps = ['AI User', 'AI Power User', 'AI Builder', 'AI Engineer'];
  const sw = (W - 2 * M - 0.6) / 4;
  steps.forEach((st, i) => {
    s.addText(st, T('', { x: M + 0.15 + i * sw, y: 1.65, w: sw - 0.3, h: 1.15, fontSize: 19, bold: true,
      fontFace: HF, color: i === 3 ? C.mint : C.white, align: 'center', valign: 'middle' }));
    if (i < 3) s.addText('→', T('', { x: M + 0.15 + (i + 1) * sw - 0.25, y: 1.65, w: 0.5, h: 1.15,
      fontSize: 20, color: C.sea, align: 'center', valign: 'middle' }));
  });
  s.addText('Anggota tidak hanya tahu nama tools, tetapi mampu:', T('', { x: M, y: 3.05, w: 8, h: 0.4, fontSize: 16, bold: true, color: C.ink }));
  const ab = [
    'memilih AI yang tepat sesuai kebutuhan',
    'membuat prompt yang jelas dan konsisten',
    'membuat konten, riset, dan alur kerja',
    'menghubungkan AI dengan aplikasi lain',
    'membuat AI assistant, agent, dan sistem berbasis data',
    'memahami AI lokal, edge AI, dan teknologi AI terbaru',
  ];
  bullets(s, ab.slice(0, 3), { x: M, y: 3.55, w: 5.9, size: 15 });
  bullets(s, ab.slice(3), { x: M + 6.3, y: 3.55, w: 5.9, size: 15 });
  quote(s, 'Bukan komunitas hobi. Anggota harus menghasilkan dari AI, bukan sekadar tahu AI.', 'Bintang Utara AI Club Malang', { y: 5.55, h: 0.85 });
  s.addNotes('Hubungkan ke Bintang Utara komunitas: anggota berpenghasilan dari AI.');
}

/* 8 — Peta 5 track */
{
  const s = lightBase();
  head(s, 'Lima Track Belajar', 'Struktur');
  const tr = [
    { n: '1', t: 'AIC Explorer', d: 'Prompting, produktivitas, riset, konten', lv: 'Level 1–2', pr: 'Buka bulan 1', col: C.teal },
    { n: '2', t: 'AIC Builder', d: 'Automation, n8n, integrasi, workflow', lv: 'Level 3', pr: 'Buka bulan 1', col: C.teal },
    { n: '3', t: 'AIC Engineer Lab', d: 'RAG, agent, API, MCP, deployment', lv: 'Level 3–5', pr: 'Buka bulan 4', col: C.sea },
    { n: '4', t: 'AIC Private Lab', d: 'Ollama, Hugging Face, local AI', lv: 'Level 4', pr: 'Bulan 7 / permintaan', col: C.amber },
    { n: '5', t: 'AIC Maker Lab', d: 'Sensor, kamera, ESP32, edge AI', lv: 'Level 5', pr: 'Bulan 7 / proyek', col: C.amber },
  ];
  const rh = 0.85, gap = 0.12, top = 1.78;
  tr.forEach((it, i) => {
    const y = top + i * (rh + gap);
    s.addShape(pres.ShapeType.roundRect, { x: M, y, w: W - 2 * M, h: rh, rectRadius: 0.07, fill: { color: C.paper } });
    dot(s, M + 0.22, y + 0.24, 0.45, it.col, it.n);
    s.addText(it.t, T('', { x: M + 0.85, y: y + 0.14, w: 3.0, h: 0.35, fontSize: 17, bold: true, fontFace: HF, color: C.ink }));
    s.addText(it.d, T('', { x: M + 0.85, y: y + 0.5, w: 4.6, h: 0.32, fontSize: 12.5, color: C.muted }));
    s.addText(it.lv, T('', { x: M + 6.2, y, w: 1.9, h: rh, fontSize: 13, bold: true, color: it.col, valign: 'middle' }));
    s.addText(it.pr, T('', { x: M + 8.3, y, w: 3.4, h: rh, fontSize: 13, color: C.ink, valign: 'middle' }));
  });
  s.addText('TRACK', T('', { x: M + 0.85, y: 1.48, w: 3, h: 0.25, fontSize: 10, bold: true, color: C.muted, charSpacing: 1.5 }));
  s.addText('LEVEL PUSAT', T('', { x: M + 6.2, y: 1.48, w: 2, h: 0.25, fontSize: 10, bold: true, color: C.muted, charSpacing: 1.5 }));
  s.addText('PRIORITAS BUKA', T('', { x: M + 8.3, y: 1.48, w: 3, h: 0.25, fontSize: 10, bold: true, color: C.muted, charSpacing: 1.5 }));
  foot(s, 'Perubahan kunci: Track 2 dibuka bersamaan Track 1 — 30% anggota datang untuk automation dan tidak akan menunggu.');
  s.addNotes('Ini peta utama. Semua slide berikutnya menjabarkan satu per satu.');
}

/* 9 — Pemetaan Level pusat */
{
  const s = lightBase();
  head(s, 'Selaras dengan Jalur Belajar Pusat', 'aiclub.id/belajar');
  s.addText('Pusat memakai kerangka Level 1→5. Modul Malang harus bisa dibaca dalam bahasa itu agar selaras nasional.',
    T('', { x: M, y: 1.6, w: W - 2 * M, h: 0.4, fontSize: 15, color: C.muted }));
  const lv = [
    { n: '1', t: 'Chatbots', d: 'Track 1 · Minggu 1–4', p: '±60%', col: C.teal },
    { n: '2', t: 'Reasoners', d: 'Track 1 · Minggu 5–8', p: '±20%', col: C.teal },
    { n: '3', t: 'Agents', d: 'Track 2 penuh + Track 3 awal', p: '±12%', col: C.sea },
    { n: '4', t: 'Innovators', d: 'Track 3 + Track 4', p: '±6%', col: C.amber },
    { n: '5', t: 'Organizations', d: 'Track 3 lanjutan + Track 5', p: '±2%', col: C.amber },
  ];
  const cw = (W - 2 * M - 4 * 0.22) / 5;
  lv.forEach((it, i) => {
    const x = M + i * (cw + 0.22);
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.2, w: cw, h: 3.0, rectRadius: 0.09, fill: { color: C.paper } });
    dot(s, x + cw / 2 - 0.3, 2.42, 0.6, it.col, it.n);
    s.addText(it.t, T('', { x: x + 0.12, y: 3.15, w: cw - 0.24, h: 0.4, fontSize: 16, bold: true, fontFace: HF, color: C.ink, align: 'center' }));
    s.addText(it.d, T('', { x: x + 0.12, y: 3.58, w: cw - 0.24, h: 0.8, fontSize: 12, color: C.muted, align: 'center', lineSpacingMultiple: 1.15 }));
    s.addText(it.p, T('', { x: x + 0.12, y: 4.5, w: cw - 0.24, h: 0.45, fontSize: 22, bold: true, fontFace: HF, color: it.col, align: 'center' }));
    s.addText('anggota Malang', T('', { x: x + 0.12, y: 4.93, w: cw - 0.24, h: 0.25, fontSize: 10, color: C.muted, align: 'center' }));
  });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 5.45, w: W - 2 * M, h: 0.85, rectRadius: 0.08, fill: { color: C.deep } });
  s.addText('Aturan wajib: setiap poster, pengumuman, dan materi harus mencantumkan Level (1–5). Peserta berhak tahu kelas ini untuk siapa sebelum mereka datang.',
    T('', { x: M + 0.3, y: 5.45, w: W - 2 * M - 0.6, h: 0.85, fontSize: 14, color: C.white, valign: 'middle' }));
  s.addNotes('Ini yang membuat Malang tidak berjalan sendiri dari pusat.');
}

/* --- Section: Track 1 --- */
function sectionSlide(num, title, sub, note) {
  const s = darkBase();
  s.addShape(pres.ShapeType.ellipse, { x: 10.3, y: 1.2, w: 4.4, h: 4.4, fill: { color: C.teal }, transparency: 78 });
  s.addText('TRACK ' + num, T('', { x: M, y: 2.4, w: 8, h: 0.4, fontSize: 14, bold: true, color: C.mint, charSpacing: 3 }));
  s.addText(title, T('', { x: M, y: 2.85, w: 9, h: 0.9, fontSize: 44, bold: true, fontFace: HF, color: C.white }));
  s.addText(sub, T('', { x: M, y: 3.85, w: 9, h: 0.7, fontSize: 19, color: C.mutedLight }));
  if (note) s.addNotes(note);
  return s;
}

sectionSlide('1', 'AIC Explorer', 'Prompting, Produktivitas, Riset & Content Creation', 'Track pintu masuk. 60% anggota ada di sini.');

/* 11 — Track 1 profil */
{
  const s = lightBase();
  head(s, 'Track 1 — AIC Explorer', 'Profil track');
  rows(s, [
    { k: 'Level pusat', v: '1–2 (Chatbots → Reasoners)' },
    { k: 'Target', v: 'AI User → AI Power User' },
    { k: 'Durasi', v: '8 minggu (Minggu 1–8 kurikulum)' },
    { k: 'Prasyarat', v: 'HP/laptop + akun gratis. Tidak perlu bisa coding.' },
    { k: 'Kapasitas', v: '25–40 orang per kelas' },
    { k: 'Melayani', v: '68% kebutuhan anggota — produktivitas, marketing, riset, konten' },
    { k: 'Biaya tool', v: 'Rp 0 — seluruh materi wajib bisa diselesaikan dengan tool gratis' },
  ], { y: 1.65, h: 0.6, gap: 0.12, kw: 2.3 });
  quote(s, 'Setelah 8 minggu Anda tidak lagi bertanya "AI mana yang bagus?". Anda tahu AI mana untuk tugas apa, punya prompt sendiri yang bisa dipakai berulang, dan sudah menyelesaikan satu pekerjaan nyata dengan AI.',
    'Janji Track 1', { y: 6.05, h: 0.95 });
  s.addNotes('Tekankan Rp 0 — hambatan psikologis terbesar calon peserta adalah mengira harus langganan.');
}

/* 12 — Track 1 silabus */
{
  const s = lightBase();
  head(s, 'Silabus 8 Minggu — Explorer', 'Track 1');
  CB = cards(s, [
    { n: '1', t: 'Peta AI & Cara Memilih', d: 'Model mana untuk tugas apa. Bandingkan 3 AI.' },
    { n: '2', t: 'Prompting yang Rapi', d: 'Anatomi prompt, kesalahan umum, iterasi. Berhenti asal tanya.' },
    { n: '3', t: 'Template & AI Assistant', d: 'Prompt berparameter, SOP, Custom GPT / Gems.' },
    { n: '4', t: 'Produktivitas Kerja', d: 'Dokumen, email, spreadsheet, notulen, presentasi.' },
    { n: '5', t: 'Riset & Belajar', d: 'Perplexity, Deep Research, NotebookLM, verifikasi.' },
    { n: '6', t: 'Copywriting & Marketing', d: 'Brand voice, content plan, hilangkan "bau AI".' },
    { n: '7', t: 'Visual & Presentasi', d: 'Gambar AI, prompt visual, Canva, Gamma, hak cipta.' },
    { n: '8', t: 'Video, Audio & Demo', d: 'Veo, Kling, ElevenLabs, Suno + demo penutup track.' },
  ], { y: 1.45, cols: 4, h: 2.1, gap: 0.22, tSize: 13, dSize: 11, maxY: 6.55 });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: CB + 0.24, w: W - 2 * M, h: 0.65, rectRadius: 0.07, fill: { color: C.paper } });
  s.addText('Output wajib: Tabel Pilihan AI · Prompt Library ≥10 · 3 template · 1 Custom GPT · Mini Research Brief · 1 konten terbit',
    T('', { x: M + 0.25, y: CB + 0.24, w: W - 2 * M - 0.5, h: 0.65, fontSize: 13, color: C.ink, valign: 'middle' }));
  s.addNotes('Minggu 1-2 menentukan segalanya. Peserta bingung di dua minggu pertama tidak akan kembali.');
}

/* --- Section: Track 2 --- */
sectionSlide('2', 'AIC Builder', 'Automation Workflow & Integrasi — Track Unggulan Malang', 'Track dengan permintaan terbesar: 30% anggota.');

/* 14 — Track 2 kenapa unggulan */
{
  const s = lightBase();
  head(s, 'Kenapa Builder Jadi Track Unggulan', 'Track 2');
  stats(s, [
    { v: '30%', l: 'anggota menulis otomasi sebagai tujuan — tema tunggal terbesar' },
    { v: '55', l: 'penyebutan n8n di grup, mengalahkan seluruh tool kreatif' },
    { v: '16', l: 'penyebutan gateway WhatsApp — kanal yang benar-benar dipakai' },
  ], { y: 1.7, h: 1.6, fill: C.paper });
  s.addText('Kutipan langsung dari anggota', T('', { x: M, y: 3.55, w: 6, h: 0.4, fontSize: 17, bold: true, fontFace: HF, color: C.ink }));
  const qs = [
    'Membangun AI Agent untuk bisnis dan automasi workflow.',
    'automation, lead, crm, digital marketing',
    'lagi pengen belajar automation sekalian explore sejauh apa penerapan AI bisa dilakukan',
    'otomasi pekerjaan sederhana dan bantu brainstorm ide',
  ];
  qs.forEach((q, i) => {
    const y = 4.05 + i * 0.56;
    s.addShape(pres.ShapeType.roundRect, { x: M, y, w: W - 2 * M, h: 0.46, rectRadius: 0.05, fill: { color: C.paper } });
    s.addText('"' + q + '"', T('', { x: M + 0.25, y, w: W - 2 * M - 0.5, h: 0.46, fontSize: 13, italic: true, color: C.ink, valign: 'middle' }));
  });
  s.addText('Ini bukan permintaan yang harus diciptakan. Ini permintaan yang sudah antre.',
    T('', { x: M, y: 6.5, w: W - 2 * M, h: 0.4, fontSize: 15, bold: true, color: C.teal }));
  s.addNotes('Kutipan asli jauh lebih meyakinkan daripada grafik. Bacakan salah satunya.');
}

/* 15 — Track 2 silabus */
{
  const s = lightBase();
  head(s, 'Silabus 8 Minggu — Builder', 'Track 2');
  CB = cards(s, [
    { n: '1', t: 'Cara Berpikir Automation', d: 'Trigger → kondisi → aksi. Apa yang layak diotomasi.' },
    { n: '2', t: 'n8n Dasar', d: 'Node, credential, webhook. Form → Sheets → Telegram.' },
    { n: '3', t: 'AI di Dalam Workflow', d: 'Klasifikasi, ekstraksi JSON, biaya token, fallback.' },
    { n: '4', t: 'Integrasi Bisnis', d: 'WhatsApp gateway, Workspace, database, dashboard.' },
    { n: '5', t: 'Workflow Tahan Gangguan', d: 'Error handling, logging, monitoring, keamanan.' },
    { n: '6', t: 'Pustaka Pola', d: 'Lead capture, content pipeline, CS triage, laporan.' },
    { n: '7', t: 'Mini Project', d: 'Automation yang dipakai orang lain, bukan diri sendiri.' },
    { n: '8', t: 'Demo & Serah Terima', d: 'Demo 5 menit, dokumentasi, serah terima ke pengguna.' },
  ], { y: 1.45, cols: 4, h: 2.1, gap: 0.22, tSize: 13, dSize: 11, num: C.sea, maxY: 6.55 });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: CB + 0.24, w: W - 2 * M, h: 0.65, rectRadius: 0.07, fill: { color: C.deep } });
  s.addText('Syarat lulus: 1 automation end-to-end yang benar-benar berjalan dan dipakai minimal 1 orang selain pembuatnya.',
    T('', { x: M + 0.25, y: CB + 0.24, w: W - 2 * M - 0.5, h: 0.65, fontSize: 14, bold: true, color: C.white, valign: 'middle' }));
  s.addNotes('Minggu 2 (n8n dasar) paling rawan gugur — siapkan instance bersama.');
}

/* 16 — Track 2 risiko & penangkal */
{
  const s = lightBase();
  head(s, 'Minggu Paling Rawan & Penangkalnya', 'Track 2 · catatan mentor');
  const items = [
    { k: 'Masalah', v: 'Pemasangan n8n dan urusan credential membuat banyak peserta menyerah di minggu kedua.' },
    { k: 'Penangkal 1', v: 'Komunitas menyediakan satu instance n8n bersama. Peserta memakai itu dulu, memasang sendiri minggu berikutnya.' },
    { k: 'Penangkal 2', v: 'Praktik diperpanjang menjadi 60 menit di minggu tersebut, dengan 2 pendamping berkeliling.' },
    { k: 'Penangkal 3', v: 'Patungan VPS: satu VPS Rp 150 rb/bulan dipakai 10 peserta = Rp 15 rb per orang.' },
    { k: 'Prinsip', v: 'Selalu mulai dari proses kerja nyata peserta. Automation dari contoh fiktif tidak pernah dipakai setelah kelas selesai.' },
  ];
  rows(s, items, { y: 1.7, h: 0.82, gap: 0.16, kw: 2.2 });
  s.addText('Ajarkan menghitung penghematan sejak awal: menit × frekuensi × tarif per jam. Angka itulah yang nanti dipakai anggota untuk menjual jasa automation ke klien.',
    T('', { x: M, y: 6.55, w: W - 2 * M, h: 0.5, fontSize: 14, italic: true, color: C.teal }));
  s.addNotes('Track ini pintu monetisasi tercepat anggota.');
}

/* --- Section: Track 3 --- */
sectionSlide('3', 'AIC Engineer Lab', 'Agentic AI, RAG, API & AI Engineering', 'Pesertanya sedikit, tapi merekalah yang mengeksekusi project besar.');

/* 18 — Track 3 kenapa penting */
{
  const s = lightBase();
  head(s, 'Sedikit Pesertanya, Besar Dampaknya', 'Track 3');
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 1.6, w: 6.0, h: 2.5, rectRadius: 0.1, fill: { color: C.deep } });
  s.addText('Rp 40 jt  ·  Rp 60 jt', T('', { x: M + 0.3, y: 1.85, w: 5.4, h: 0.7, fontSize: 34, bold: true, fontFace: HF, color: C.mint }));
  s.addText('Dua penawaran pembuatan software yang sudah masuk ke jaringan anggota Malang — sebelum komunitas ini punya sistem apa pun. Tanpa orang yang bisa mengerjakan, penawaran seperti itu akan terus lewat begitu saja.',
    T('', { x: M + 0.3, y: 2.6, w: 5.4, h: 1.35, fontSize: 14, color: C.white, lineSpacingMultiple: 1.25 }));
  s.addText('Anggota di level ini sudah ada', T('', { x: 7.1, y: 1.6, w: 5.6, h: 0.4, fontSize: 17, bold: true, fontFace: HF, color: C.ink }));
  bullets(s, [
    'Opencode disebut 67× · Claude Code 35×',
    'Python 15× · Cursor 8× · Supabase 6×',
    '"AI Agent workspace, Voice TTS real time, ERP AI mini"',
    '"architecture, optimize codebase Nestjs, Angular, Android"',
    '"Mencari partner untuk pengembangan AI Agent"',
  ], { x: 7.1, y: 2.1, w: 5.6, size: 13.5 });
  CB = cards(s, [
    { t: 'Blok A · Fondasi', d: 'Beda chatbot/automation/assistant/agent · API model · coding berbantuan AI' },
    { t: 'Blok B · RAG', d: 'Chunking, embedding, vector DB, retrieval, wajib menyertakan sumber' },
    { t: 'Blok C · Agent', d: 'Function calling, loop agent, memori, pagar pengaman, MCP' },
    { t: 'Blok D · Produksi', d: 'Backend, deployment, evaluasi, biaya, keamanan' },
  ], { y: 4.35, cols: 4, h: 1.85, gap: 0.24, tSize: 14, dSize: 11.5 });
  foot(s, 'Durasi 12 minggu · kapasitas 10–15 orang · prasyarat: selesai Track 2 atau sudah bisa membuat workflow sendiri.');
  s.addNotes('RAG adalah materi paling laku dijual di seluruh kurikulum.');
}

/* 19 — Track 3 catatan */
{
  const s = lightBase();
  head(s, 'Tiga Hal yang Harus Ditekankan Mentor', 'Track 3 · catatan mentor');
  CB = cards(s, [
    { n: '1', t: 'Sebagian besar masalah tidak butuh agent', d: 'Automation biasa lebih murah, lebih cepat, dan jauh lebih mudah ditebak. Mentor yang mengajarkan ini menghasilkan engineer yang dipercaya klien.' },
    { n: '2', t: 'RAG adalah materi paling laku', d: 'Setiap perusahaan punya dokumen menumpuk yang tidak ada yang membaca. Perbanyak jam di blok ini — di situ letak uangnya.' },
    { n: '3', t: 'Wajib menyertakan sumber sejak hari pertama', d: 'Jawaban tanpa sumber tidak bisa dipertanggungjawabkan ke klien, dan kebiasaan ini sulit ditambahkan belakangan.' },
  ], { y: 1.75, cols: 3, h: 2.6, gap: 0.28, tSize: 15.5, dSize: 12.5 });
  const b19 = CB + 0.3;
  s.addShape(pres.ShapeType.roundRect, { x: M, y: b19, w: W - 2 * M, h: 1.5, rectRadius: 0.09, fill: { color: C.deep } });
  s.addText('Output wajib Track 3', T('', { x: M + 0.3, y: b19 + 0.15, w: 5, h: 0.35, fontSize: 15, bold: true, fontFace: HF, color: C.mint }));
  s.addText('Skrip API dengan structured output  ·  Prototipe RAG yang menyertakan sumber  ·  Agent dengan 2 tool dan pagar pengaman  ·  1 integrasi MCP  ·  Sistem yang sudah ter-deploy  ·  Laporan evaluasi akurasi, latency, dan biaya',
    T('', { x: M + 0.3, y: b19 + 0.55, w: W - 2 * M - 0.6, h: 0.85, fontSize: 13.5, color: C.white, lineSpacingMultiple: 1.2 }));
  s.addNotes('Pasangkan yang kuat coding dengan yang kuat memahami proses bisnis.');
}

/* --- Section: Track 4 & 5 --- */
sectionSlide('4 & 5', 'Private Lab & Maker Lab', 'Local AI, Hugging Face · AIoT, Edge AI & Smart Device', 'Dua lab berbasis permintaan dan proyek nyata.');

/* 21 — Track 4 */
{
  const s = lightBase();
  head(s, 'Track 4 — AIC Private Lab', 'Local AI & Hugging Face');
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 1.6, w: 5.8, h: 2.1, rectRadius: 0.1, fill: { color: C.paper } });
  s.addText('0  ·  1  ·  1', T('', { x: M + 0.3, y: 1.8, w: 5.2, h: 0.6, fontSize: 34, bold: true, fontFace: HF, color: C.amber }));
  s.addText('Ollama · Hugging Face · LM Studio — jumlah penyebutan di seluruh percakapan dua grup. Nyaris tidak dikenal anggota.',
    T('', { x: M + 0.3, y: 2.42, w: 5.2, h: 1.05, fontSize: 13.5, color: C.muted, lineSpacingMultiple: 1.2 }));
  s.addShape(pres.ShapeType.roundRect, { x: 6.85, y: 1.6, w: 5.85, h: 2.1, rectRadius: 0.1, fill: { color: C.deep } });
  s.addText('Justru di situ peluangnya', T('', { x: 7.15, y: 1.8, w: 5.25, h: 0.4, fontSize: 18, bold: true, fontFace: HF, color: C.mint }));
  s.addText('Klien di sektor kesehatan, keuangan, hukum, dan pemerintahan tidak boleh mengirim data ke cloud. Anggota yang bisa memasang AI lokal punya pasar yang tidak tersentuh siapa pun yang hanya menguasai ChatGPT.',
    T('', { x: 7.15, y: 2.25, w: 5.25, h: 1.3, fontSize: 13.5, color: C.white, lineSpacingMultiple: 1.2 }));
  CB = cards(s, [
    { n: '1', t: 'Kenapa AI lokal', d: 'Privasi, biaya, latency, kendali. Titik impas vs API.' },
    { n: '2', t: 'Model pertama', d: 'Ollama, LM Studio, Open WebUI, llama.cpp.' },
    { n: '3', t: 'Memilih model', d: 'Ukuran parameter, quantization, uji sendiri.' },
    { n: '4', t: 'Hugging Face', d: 'Models, Datasets, Spaces, model card.' },
    { n: '5', t: 'Local RAG', d: 'Dokumen internal → jawaban yang tidak keluar jaringan.' },
    { n: '6', t: 'Ke lingkungan nyata', d: 'Server kantor, Docker, rangkaian hibrida.' },
  ], { y: 3.95, cols: 6, h: 2.0, gap: 0.16, tSize: 12.5, dSize: 10.5, num: C.amber });
  foot(s, 'Format: lab 6 sesi berbasis permintaan — dibuka ketika sudah ada 8 pendaftar, biasanya setelah peserta menghadapi klien yang mempermasalahkan privasi data.');
  s.addNotes('Sediakan 1 mesin lab bersama — hambatan terbesar track ini adalah perangkat keras.');
}

/* 22 — Track 5 */
{
  const s = lightBase();
  head(s, 'Track 5 — AIC Maker Lab', 'AIoT & Edge AI');
  s.addText('Berbeda dari track lain, Maker Lab tidak perlu mencari permintaan. Dua anggota sudah menuliskan kebutuhannya sendiri.',
    T('', { x: M, y: 1.6, w: W - 2 * M, h: 0.4, fontSize: 15, color: C.muted }));
  const two = [
    { t: 'AI IoT penghitung lobster laut', d: 'Sektor perikanan. Kamera + Jetson/Raspberry Pi + deteksi & penghitungan objek.' },
    { t: 'Manajemen hidroponik tomat cherry & kebun alpukat', d: 'Sektor pertanian. ESP32 + sensor kelembaban/EC/pH + dashboard + rekomendasi AI.' },
  ];
  two.forEach((it, i) => {
    const x = M + i * ((W - 2 * M) / 2 + 0.15);
    const cw = (W - 2 * M - 0.3) / 2;
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.15, w: cw, h: 1.55, rectRadius: 0.1, fill: { color: C.deep } });
    s.addText('"' + it.t + '"', T('', { x: x + 0.28, y: 2.32, w: cw - 0.56, h: 0.62, fontSize: 17, bold: true, italic: true, fontFace: HF, color: C.mint }));
    s.addText(it.d, T('', { x: x + 0.28, y: 2.98, w: cw - 0.56, h: 0.6, fontSize: 13, color: C.white, lineSpacingMultiple: 1.15 }));
  });
  s.addText('Bank proyek Maker Lab', T('', { x: M, y: 3.95, w: 6, h: 0.35, fontSize: 17, bold: true, fontFace: HF, color: C.ink }));
  CB = cards(s, [
    { t: 'Penghitung pengunjung', d: 'Ritel, kafe, wisata' },
    { t: 'Pemantau mesin produksi', d: 'Manufaktur, UMKM' },
    { t: 'Smart room / kelas', d: 'Pendidikan' },
    { t: 'Kamera keamanan cerdas', d: 'Umum' },
    { t: 'Pemantau kualitas udara', d: 'Kesehatan, kantor' },
    { t: 'Smart farming ternak', d: 'Peternakan Malang Raya' },
  ], { y: 4.4, cols: 6, h: 1.35, gap: 0.16, tSize: 12.5, dSize: 11, fill: C.paper });
  foot(s, 'Format: lab berbasis proyek — satu angkatan mengerjakan satu kebutuhan nyata dari nol sampai terpasang. Kit lab bersama ±Rp 3–5 juta, dipakai banyak angkatan.');
  s.addNotes('Track ini menghasilkan foto dan video paling menarik untuk media sosial komunitas.');
}

/* --- Section: Kurikulum --- */
{
  const s = darkBase();
  s.addShape(pres.ShapeType.ellipse, { x: 10.3, y: 1.2, w: 4.4, h: 4.4, fill: { color: C.sea }, transparency: 80 });
  s.addText('KURIKULUM INTI', T('', { x: M, y: 2.4, w: 8, h: 0.4, fontSize: 14, bold: true, color: C.mint, charSpacing: 3 }));
  s.addText('16 Minggu', T('', { x: M, y: 2.85, w: 9, h: 0.9, fontSize: 46, bold: true, fontFace: HF, color: C.white }));
  s.addText('Empat fase · satu sesi 135 menit per minggu · 16 output nyata', T('', { x: M, y: 3.85, w: 9, h: 0.7, fontSize: 19, color: C.mutedLight }));
  s.addNotes('Bagian operasional. Ini yang dipakai fasilitator tiap minggu.');
}

/* 24 — Struktur sesi */
{
  const s = lightBase();
  head(s, 'Struktur Baku Setiap Sesi', '135 menit');
  const seg = [
    { m: '0–15', t: 'AI Update', d: '3 kabar AI terbaru minggu ini. Wajib ada — ini alasan orang hadir tiap minggu.', c: C.sea },
    { m: '15–20', t: 'Recap tugas', d: '2 peserta memaparkan tugas minggu lalu. Dipilih acak.', c: C.sea },
    { m: '20–50', t: 'Materi inti', d: 'Maksimal 30 menit. Lewat itu perhatian hilang.', c: C.teal },
    { m: '50–65', t: 'Demo mentor', d: 'Layar dibagikan, kesalahan tidak ditutupi.', c: C.teal },
    { m: '65–110', t: 'Praktik peserta', d: 'Segmen terpanjang. Laptop terbuka. TIDAK BOLEH dipangkas.', c: C.amber },
    { m: '110–125', t: 'Bedah kasus', d: '2 peserta maju dengan masalahnya. Bagian yang paling diingat orang.', c: C.teal },
    { m: '125–135', t: 'Tugas & penutup', d: 'Tugas dibacakan, bukan hanya dikirim di grup.', c: C.sea },
  ];
  seg.forEach((it, i) => {
    const y = 1.55 + i * 0.68;
    s.addShape(pres.ShapeType.roundRect, { x: M, y, w: W - 2 * M, h: 0.56, rectRadius: 0.05, fill: { color: C.paper } });
    s.addText(it.m, T('', { x: M + 0.22, y, w: 1.1, h: 0.56, fontSize: 13, bold: true, color: it.c, valign: 'middle' }));
    s.addText(it.t, T('', { x: M + 1.4, y, w: 2.3, h: 0.56, fontSize: 14, bold: true, fontFace: HF, color: C.ink, valign: 'middle' }));
    s.addText(it.d, T('', { x: M + 3.8, y, w: W - 2 * M - 4.0, h: 0.56, fontSize: 12.5, color: C.muted, valign: 'middle' }));
  });
  s.addText('Empat aturan yang tidak boleh dilanggar: praktik tidak pernah dipangkas · setiap sesi menghasilkan 1 output nyata · rekaman diunggah H+1 · peserta tertinggal dibantu di Klinik, bukan dengan memperlambat kelas.',
    T('', { x: M, y: 6.4, w: W - 2 * M, h: 0.6, fontSize: 13, italic: true, color: C.teal, lineSpacingMultiple: 1.15 }));
  s.addNotes('Fasilitator dan mentor tidak boleh orang yang sama.');
}

/* 25–28 — Empat fase */
function faseSlide(fase, judul, level, minggu) {
  const s = lightBase();
  head(s, judul, 'Fase ' + fase + ' · ' + level);
  CB = cards(s, minggu, { y: 1.7, cols: 4, h: 2.5, gap: 0.24, tSize: 14.5, dSize: 12, num: C.teal });
  return s;
}

{
  const s = faseSlide('1', 'AI Foundation & Prompting', 'Level pusat 1 — Chatbots · ±60% anggota', [
    { n: '1', t: 'Orientasi AI & Peta Tools', d: 'Bandingkan 3 AI untuk 1 tugas yang sama.\n\n📦 Tabel Pilihan AI Pribadi' },
    { n: '2', t: 'Prompting Dasar', d: 'Anatomi prompt, 5 kesalahan umum, iterasi.\n\n📦 Prompt Library v1' },
    { n: '3', t: 'Template & Assistant', d: 'Pekerjaan rutin jadi template + Custom GPT.\n\n📦 3 template + 1 Custom GPT' },
    { n: '4', t: 'Produktivitas Kerja', d: 'Selesaikan 1 pekerjaan yang sedang menumpuk.\n\n📦 Workflow + hitungan waktu hemat' },
  ]);
  s.addShape(pres.ShapeType.roundRect, { x: M, y: CB + 0.3, w: W - 2 * M, h: 1.05, rectRadius: 0.08, fill: { color: C.deep } });
  s.addText('Minggu 1 paling menentukan. Peserta memutuskan lanjut atau tidak di sini. Pastikan setiap orang pulang dengan minimal satu momen "oh, ternyata begitu" — dan jangan pernah berkata "ini gampang".',
    T('', { x: M + 0.3, y: CB + 0.3, w: W - 2 * M - 0.6, h: 1.05, fontSize: 14, color: C.white, valign: 'middle', lineSpacingMultiple: 1.15 }));
  s.addText('Angka penghematan waktu di Minggu 4 adalah bahan testimoni terbaik untuk merekrut angkatan berikutnya. Kumpulkan dan simpan.',
    T('', { x: M, y: CB + 1.5, w: W - 2 * M, h: 0.5, fontSize: 13, italic: true, color: C.teal }));
  s.addNotes('Fase penentu retensi.');
}

{
  const s = faseSlide('2', 'Research, Content & Creative AI', 'Level pusat 2 — Reasoners', [
    { n: '5', t: 'Riset & Belajar', d: 'Perplexity, Deep Research, NotebookLM, verifikasi.\n\n📦 Mini Research Brief' },
    { n: '6', t: 'Copywriting & Marketing', d: 'Brand voice, content plan 7 hari, hilangkan "bau AI".\n\n📦 7 draft + 2 konten tayang' },
    { n: '7', t: 'Visual & Presentasi', d: 'Gambar AI, prompt visual, Canva, Gamma, hak cipta.\n\n📦 Aset visual siap pakai' },
    { n: '8', t: 'Video, Audio & Demo', d: 'Veo, Kling, ElevenLabs, Suno + demo penutup track.\n\n📦 Creative brief + Demo Track 1' },
  ]);
  s.addShape(pres.ShapeType.roundRect, { x: M, y: CB + 0.3, w: W - 2 * M, h: 1.05, rectRadius: 0.08, fill: { color: C.paper } });
  s.addText('Minggu 5 wajib memuat satu contoh AI yang salah dengan percaya diri. Peserta harus melihatnya sendiri, bukan sekadar diberi tahu.',
    T('', { x: M + 0.3, y: CB + 0.3, w: W - 2 * M - 0.6, h: 1.05, fontSize: 14, color: C.ink, valign: 'middle' }));
  s.addText('Undang anggota di luar cohort untuk menonton Demo Track 1 di Minggu 8. Demo peserta adalah alat rekrutmen paling meyakinkan yang dimiliki komunitas.',
    T('', { x: M, y: CB + 1.5, w: W - 2 * M, h: 0.5, fontSize: 13, italic: true, color: C.teal }));
  s.addNotes('Creative AI dipadatkan jadi 1 minggu inti sesuai data.');
}

{
  const s = faseSlide('3', 'Automation & Integration', 'Level pusat 3 — Agents · permintaan terbesar', [
    { n: '9', t: 'Cara Berpikir Automation', d: 'Gambar proses kerja sendiri jadi diagram.\n\n📦 Blueprint + hitungan penghematan' },
    { n: '10', t: 'n8n Dasar', d: 'Form → Sheets → Telegram. Praktik diperpanjang 60 menit.\n\n📦 Workflow n8n pertama' },
    { n: '11', t: 'AI di Dalam Workflow', d: 'Klasifikasi, ekstraksi JSON, biaya token, fallback.\n\n📦 AI-powered workflow' },
    { n: '12', t: 'Integrasi & Mini Project', d: 'WhatsApp gateway, database, dashboard.\n\n📦 Integrasi + mini project' },
  ]);
  s.addShape(pres.ShapeType.roundRect, { x: M, y: CB + 0.3, w: W - 2 * M, h: 1.05, rectRadius: 0.08, fill: { color: C.deep } });
  s.addText('Minggu 10 adalah minggu paling rawan gugur. Peserta memakai instance n8n bersama milik komunitas — memasang sendiri baru minggu berikutnya. Siapkan 2 pendamping di ruangan.',
    T('', { x: M + 0.3, y: CB + 0.3, w: W - 2 * M - 0.6, h: 1.05, fontSize: 14, color: C.white, valign: 'middle', lineSpacingMultiple: 1.15 }));
  s.addText('Fase ini melayani 30% anggota — porsi terbesar dari seluruh kurikulum.',
    T('', { x: M, y: CB + 1.5, w: W - 2 * M, h: 0.5, fontSize: 13, italic: true, color: C.teal }));
  s.addNotes('Fase dengan permintaan terbesar.');
}

{
  const s = faseSlide('4', 'Agentic AI, Local AI & AIoT', 'Level pusat 3–5 · kelas mengecil, kedalaman bertambah', [
    { n: '13', t: 'RAG & Knowledge Base', d: 'Chunking, embedding, vector DB, menyertakan sumber.\n\n📦 Knowledge assistant + laporan akurasi' },
    { n: '14', t: 'AI Agent, Tools & API', d: 'Function calling, memori, pagar pengaman, MCP.\n\n📦 Prototype AI agent' },
    { n: '15', t: 'Local AI & Hugging Face', d: 'Ollama, quantization, titik impas biaya.\n\n📦 Demo local AI + perbandingan' },
    { n: '16', t: 'AIoT & Capstone Demo Day', d: 'Sensor, kamera, computer vision + presentasi capstone.\n\n📦 Capstone presentation' },
  ]);
  s.addShape(pres.ShapeType.roundRect, { x: M, y: CB + 0.3, w: W - 2 * M, h: 1.05, rectRadius: 0.08, fill: { color: C.paper } });
  s.addText('Minggu 13 (RAG) adalah materi paling laku dijual di seluruh kurikulum. Setiap perusahaan punya dokumen menumpuk yang tidak ada yang membaca.',
    T('', { x: M + 0.3, y: CB + 0.3, w: W - 2 * M - 0.6, h: 1.05, fontSize: 14, color: C.ink, valign: 'middle' }));
  s.addText('Demo Day Minggu 16 dibuka untuk umum — undang kampus, media lokal, komunitas lain, dan calon peserta angkatan berikutnya.',
    T('', { x: M, y: CB + 1.5, w: W - 2 * M, h: 0.5, fontSize: 13, italic: true, color: C.teal }));
  s.addNotes('Kelas mengecil di fase ini. Itu normal dan bukan kegagalan.');
}

/* 29 — 16 output */
{
  const s = darkBase();
  s.addText('16 Minggu = 16 Output Nyata', T('', { x: M, y: 0.6, w: W - 2 * M, h: 0.8, fontSize: 36, bold: true, fontFace: HF, color: C.white }));
  s.addText('Tidak ada satu pun minggu yang berakhir hanya dengan catatan.', T('', { x: M, y: 1.4, w: W - 2 * M, h: 0.4, fontSize: 16, color: C.mint }));
  const out = [
    'Tabel Pilihan AI Pribadi', 'Prompt Library v1', '3 template + Custom GPT', 'Workflow produktivitas',
    'Mini Research Brief', 'Kalender konten + 2 tayang', 'Aset visual siap pakai', 'Creative brief + Demo',
    'Blueprint automation', 'Workflow n8n pertama', 'AI-powered workflow', 'Integrasi + mini project',
    'RAG knowledge assistant', 'AI agent + pagar pengaman', 'Demo local AI', 'CAPSTONE PROJECT',
  ];
  const cw = (W - 2 * M - 3 * 0.18) / 4, ch = 0.9;
  out.forEach((t, i) => {
    const x = M + (i % 4) * (cw + 0.18);
    const y = 2.0 + Math.floor(i / 4) * (ch + 0.18);
    const last = i === 15;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: ch, rectRadius: 0.06, fill: { color: last ? C.teal : '0A4A52' } });
    s.addText(String(i + 1), T('', { x: x + 0.18, y: y + 0.1, w: 0.6, h: 0.3, fontSize: 12, bold: true, color: last ? C.white : C.mint }));
    s.addText(t, T('', { x: x + 0.18, y: y + 0.36, w: cw - 0.36, h: 0.48, fontSize: last ? 14 : 12.5, bold: last, color: C.white, valign: 'top' }));
  });
  s.addNotes('Slide ini sering jadi yang paling difoto peserta.');
}

/* --- Section: Capstone --- */
{
  const s = darkBase();
  s.addShape(pres.ShapeType.ellipse, { x: 10.3, y: 1.2, w: 4.4, h: 4.4, fill: { color: C.mint }, transparency: 82 });
  s.addText('PENUTUP COHORT', T('', { x: M, y: 2.4, w: 8, h: 0.4, fontSize: 14, bold: true, color: C.mint, charSpacing: 3 }));
  s.addText('Capstone & Penilaian', T('', { x: M, y: 2.85, w: 9, h: 0.9, fontSize: 44, bold: true, fontFace: HF, color: C.white }));
  s.addText('Tujuh pilihan proyek · rubrik 100 poin · tiga tingkat sertifikat', T('', { x: M, y: 3.85, w: 9, h: 0.7, fontSize: 19, color: C.mutedLight }));
}

/* 31 — 7 capstone */
{
  const s = lightBase();
  head(s, 'Tujuh Pilihan Capstone', 'Capstone');
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 1.5, w: W - 2 * M, h: 0.95, rectRadius: 0.08, fill: { color: C.deep } });
  s.addText('Satu aturan mutlak', T('', { x: M + 0.3, y: 1.58, w: 3.2, h: 0.35, fontSize: 15, bold: true, fontFace: HF, color: C.mint }));
  s.addText('Wajib menyelesaikan masalah nyata milik seseorang, dan wajib punya 1 pengguna nyata di luar pembuatnya. Proyek yang penggunanya cuma pembuatnya sendiri selalu berhenti begitu kelas selesai.',
    T('', { x: M + 3.6, y: 1.5, w: W - 2 * M - 3.9, h: 0.95, fontSize: 13.5, color: C.white, valign: 'middle' }));
  CB = cards(s, [
    { n: '1', t: 'AI Productivity System', d: 'Prompt & alur kerja tim — karyawan, guru' },
    { n: '2', t: 'AI Content Engine', d: 'Ide → draft → visual — pemasar & kreator' },
    { n: '3', t: 'AI Research Assistant', d: 'Riset & laporan — dosen, konsultan' },
    { n: '4', t: 'AI Automation System', d: 'Automation n8n — pemilik usaha' },
    { n: '5', t: 'AI Knowledge Assistant', d: 'RAG dokumen & SOP — perusahaan, klinik' },
    { n: '6', t: 'Local AI Assistant', d: 'Assistant privat Ollama — data sensitif' },
    { n: '7', t: 'AIoT Prototype', d: 'Sensor → AI → dashboard — pertanian, ritel' },
  ], { y: 2.6, cols: 4, h: 2.0, gap: 0.24, tSize: 14, dSize: 11.5, maxY: 7.05 });
  s.addNotes('Capstone dimulai Minggu 12, dipresentasikan Minggu 16.');
}

/* 32 — Rubrik */
{
  const s = lightBase();
  head(s, 'Rubrik Penilaian Capstone', '100 poin');
  const r = [
    { k: 'Masalah nyata & jelas', b: '20', d: 'Nyata, spesifik, ada pemiliknya — bukan masalah karangan' },
    { k: 'Solusi berjalan', b: '25', d: 'Jalan penuh dan didemokan langsung, bukan slide atau rekaman' },
    { k: 'Ada pengguna nyata', b: '20', d: 'Dipakai rutin oleh orang lain, bukan hanya diuji sekali' },
    { k: 'Dampak terukur', b: '15', d: 'Angka nyata sebelum vs sesudah, bukan perkiraan kasar' },
    { k: 'Dokumentasi', b: '10', d: 'Panduan pengguna + catatan teknis' },
    { k: 'Sadar risiko', b: '10', d: 'Risiko, batasan, dan penanganannya dijelaskan' },
  ];
  r.forEach((it, i) => {
    const y = 1.65 + i * 0.72;
    s.addShape(pres.ShapeType.roundRect, { x: M, y, w: W - 2 * M, h: 0.6, rectRadius: 0.05, fill: { color: C.paper } });
    dot(s, M + 0.18, y + 0.09, 0.42, C.teal, it.b);
    s.addText(it.k, T('', { x: M + 0.78, y, w: 3.3, h: 0.6, fontSize: 14, bold: true, fontFace: HF, color: C.ink, valign: 'middle' }));
    s.addText(it.d, T('', { x: M + 4.2, y, w: W - 2 * M - 4.4, h: 0.6, fontSize: 12.5, color: C.muted, valign: 'middle' }));
  });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 6.05, w: W - 2 * M, h: 0.75, rectRadius: 0.07, fill: { color: C.deep } });
  s.addText('≥ 70 lulus   ·   55–69 revisi dengan 2 minggu tambahan   ·   < 55 mengulang di angkatan berikutnya',
    T('', { x: M + 0.3, y: 6.05, w: W - 2 * M - 0.6, h: 0.75, fontSize: 14, bold: true, color: C.white, valign: 'middle' }));
  s.addNotes('Demo langsung wajib. Yang tidak bisa didemokan dinilai belum selesai.');
}

/* 33 — Kompetensi */
{
  const s = lightBase();
  head(s, 'Standar Kompetensi Tiga Level', 'Penilaian');
  const lv = [
    { t: 'Beginner', s2: 'AI User', c: C.sea, items: [
      'Memilih model sesuai kebutuhan', 'Menulis prompt dengan tujuan & format jelas',
      'Memakai AI untuk pekerjaan harian', 'Membuat konten tulisan layak terbit',
      'Menjelaskan risiko: halusinasi, privasi', 'Memverifikasi output sebelum dipakai'] },
    { t: 'Intermediate', s2: 'Power User → Builder', c: C.teal, items: [
      'Membuat template prompt untuk orang lain', 'Riset berbasis sumber dan verifikasinya',
      'Konten multimodal: teks, gambar, audio, video', 'Membuat AI assistant sederhana',
      'Membuat automation yang benar-benar berjalan', 'Menghitung waktu & biaya yang dihemat'] },
    { t: 'Advanced', s2: 'Engineer / Innovator', c: C.amber, items: [
      'AI workflow end-to-end dengan error handling', 'RAG assistant yang menyertakan sumber',
      'Menghubungkan AI ke API dan tools', 'Menjalankan & menilai model lokal',
      'Memahami agent, MCP, AIoT, edge AI', 'Prototipe yang layak diserahkan ke klien'] },
  ];
  const cw = (W - 2 * M - 2 * 0.28) / 3;
  lv.forEach((it, i) => {
    const x = M + i * (cw + 0.28);
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.6, w: cw, h: 4.9, rectRadius: 0.1, fill: { color: C.paper } });
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.6, w: cw, h: 0.95, rectRadius: 0.1, fill: { color: it.c } });
    s.addText(it.t, T('', { x: x + 0.22, y: 1.68, w: cw - 0.44, h: 0.4, fontSize: 19, bold: true, fontFace: HF, color: C.white }));
    s.addText(it.s2, T('', { x: x + 0.22, y: 2.08, w: cw - 0.44, h: 0.35, fontSize: 12.5, color: C.white }));
    bullets(s, it.items, { x: x + 0.22, y: 2.75, w: cw - 0.44, size: 12.5 });
  });
  s.addNotes('Selisih pre-test dan post-test adalah bukti dampak program.');
}

/* 34 — Sertifikat */
{
  const s = lightBase();
  head(s, 'Sertifikat & Lencana', 'Pengakuan');
  const cert = [
    { t: 'Explorer', d: 'Hadir ≥6 dari 8 sesi Fase 1–2 + 5 dari 6 output Track 1', c: C.sea },
    { t: 'Builder', d: 'Explorer + 5 dari 6 output Track 2 + 1 automation berjalan', c: C.teal },
    { t: 'Engineer', d: 'Builder + 5 dari 6 output Track 3 + capstone ≥ 70', c: C.amber },
  ];
  const cw = (W - 2 * M - 2 * 0.28) / 3;
  cert.forEach((it, i) => {
    const x = M + i * (cw + 0.28);
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.65, w: cw, h: 1.9, rectRadius: 0.1, fill: { color: C.paper } });
    s.addText('AI CLUB MALANG', T('', { x: x + 0.25, y: 1.85, w: cw - 0.5, h: 0.28, fontSize: 10, bold: true, color: C.muted, charSpacing: 1.5 }));
    s.addText(it.t, T('', { x: x + 0.25, y: 2.12, w: cw - 0.5, h: 0.5, fontSize: 26, bold: true, fontFace: HF, color: it.c }));
    s.addText(it.d, T('', { x: x + 0.25, y: 2.68, w: cw - 0.5, h: 0.75, fontSize: 12, color: C.muted, lineSpacingMultiple: 1.15 }));
  });
  s.addText('Lencana tambahan', T('', { x: M, y: 3.85, w: 6, h: 0.35, fontSize: 17, bold: true, fontFace: HF, color: C.ink }));
  const badges = ['Prompt Master', 'Automation Builder', 'RAG Builder', 'Local AI', 'Maker', 'Mentor Muda'];
  const bw = (W - 2 * M - 5 * 0.18) / 6;
  badges.forEach((b, i) => {
    const x = M + i * (bw + 0.18);
    s.addShape(pres.ShapeType.roundRect, { x, y: 4.35, w: bw, h: 0.68, rectRadius: 0.3, fill: { color: i === 5 ? C.deep : C.paper } });
    s.addText(b, T('', { x: x + 0.1, y: 4.35, w: bw - 0.2, h: 0.68, fontSize: 12, bold: true, color: i === 5 ? C.mint : C.ink, align: 'center', valign: 'middle' }));
  });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 5.3, w: W - 2 * M, h: 1.05, rectRadius: 0.08, fill: { color: C.deep } });
  s.addText('Lencana "Mentor Muda" — diberikan kepada yang membantu ≥3 peserta lain — adalah mesin regenerasi mentor. Jogja pematerinya terpusat pada dua orang; Malang bisa menghindarinya dengan menghargai pendamping sejak angkatan pertama.',
    T('', { x: M + 0.3, y: 5.3, w: W - 2 * M - 0.6, h: 1.05, fontSize: 13.5, color: C.white, valign: 'middle', lineSpacingMultiple: 1.15 }));
  foot(s, 'Bentuk sertifikat, penomoran, dan pemakaian logo pusat perlu dikonfirmasi terlebih dahulu.');
}

/* 35 — Pre/post test */
{
  const s = lightBase();
  head(s, 'Pre-test & Post-test', 'Bukti dampak program');
  s.addText('Sepuluh pertanyaan yang sama, dijalankan di Minggu 1 dan Minggu 16. Selisihnya adalah bukti dampak program — bahan terkuat untuk proposal kampus, sponsor, dan laporan ke pusat.',
    T('', { x: M, y: 1.6, w: W - 2 * M, h: 0.5, fontSize: 15, color: C.muted }));
  const q = [
    'Model AI mana yang Anda pakai, dan untuk apa?',
    'Tuliskan prompt untuk menyusun laporan mingguan',
    'Bagaimana Anda memastikan jawaban AI benar?',
    'Data apa yang tidak boleh dimasukkan ke AI publik?',
    'Sebutkan 1 pekerjaan rutin Anda yang bisa diotomasi',
    'Apa beda chatbot, automation, dan agent?',
    'Kenapa AI tidak tahu isi dokumen perusahaan Anda?',
    'Berapa jam per minggu yang AI hemat untuk Anda?',
    'Apakah Anda sudah menghasilkan uang dari AI?',
    'Apa satu hal yang ingin Anda buat 3 bulan ke depan?',
  ];
  const cw = (W - 2 * M - 0.28) / 2;
  q.forEach((t, i) => {
    const x = M + (i % 2) * (cw + 0.28);
    const y = 2.25 + Math.floor(i / 2) * 0.72;
    const star = i === 8;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: 0.6, rectRadius: 0.05, fill: { color: star ? C.deep : C.paper } });
    dot(s, x + 0.16, y + 0.11, 0.38, star ? C.mint : C.teal, String(i + 1), star ? C.deep : C.white);
    s.addText(t, T('', { x: x + 0.68, y, w: cw - 0.85, h: 0.6, fontSize: 12.5, bold: star, color: star ? C.white : C.ink, valign: 'middle' }));
  });
  s.addText('Pertanyaan 9 adalah Bintang Utara komunitas: jumlah anggota yang menghasilkan uang dari AI.',
    T('', { x: M, y: 6.55, w: W - 2 * M, h: 0.4, fontSize: 14, italic: true, color: C.teal }));
}

/* --- Section: Fasilitator --- */
{
  const s = darkBase();
  s.addShape(pres.ShapeType.ellipse, { x: 10.3, y: 1.2, w: 4.4, h: 4.4, fill: { color: C.teal }, transparency: 78 });
  s.addText('OPERASIONAL', T('', { x: M, y: 2.4, w: 8, h: 0.4, fontSize: 14, bold: true, color: C.mint, charSpacing: 3 }));
  s.addText('Panduan Fasilitator', T('', { x: M, y: 2.85, w: 9, h: 0.9, fontSize: 44, bold: true, fontFace: HF, color: C.white }));
  s.addText('Peran · checklist · cara mengajar kelas dengan level campur', T('', { x: M, y: 3.85, w: 9, h: 0.7, fontSize: 19, color: C.mutedLight }));
}

/* 37 — Peran */
{
  const s = lightBase();
  head(s, 'Lima Peran dalam Satu Sesi', 'Fasilitator');
  CB = cards(s, [
    { t: 'Fasilitator', d: 'Menjaga waktu, membuka & menutup, memandu AI Update dan bedah kasus.' },
    { t: 'Mentor materi', d: 'Menyampaikan materi inti dan demo langsung.' },
    { t: 'Pendamping (1–2)', d: 'Berkeliling saat praktik, membantu peserta yang tertinggal.' },
    { t: 'Dokumentasi', d: 'Rekaman, foto, potongan konten untuk media sosial.' },
    { t: 'Notulis', d: 'Catatan sesi, pertanyaan yang belum terjawab, daftar tindak lanjut.' },
  ], { y: 1.7, cols: 5, h: 1.9, gap: 0.2, tSize: 14, dSize: 11.5 });
  const b37 = CB + 0.28;
  s.addShape(pres.ShapeType.roundRect, { x: M, y: b37, w: W - 2 * M, h: 0.9, rectRadius: 0.08, fill: { color: C.deep } });
  s.addText('Fasilitator dan mentor tidak boleh orang yang sama. Orang yang sedang menerangkan tidak bisa sekaligus menjaga waktu — dan sesi yang molor adalah keluhan nomor satu peserta di komunitas mana pun.',
    T('', { x: M + 0.3, y: b37, w: W - 2 * M - 0.6, h: 0.9, fontSize: 14, color: C.white, valign: 'middle' }));
  s.addText('Mengajar kelas dengan level campur', T('', { x: M, y: b37 + 1.15, w: 7, h: 0.35, fontSize: 17, bold: true, fontFace: HF, color: C.ink }));
  bullets(s, [
    'Ada yang jauh tertinggal → pendamping menemani, jangan memperlambat kelas',
    'Ada yang jauh di depan → jadikan pendamping dadakan, beri lencana Mentor Muda',
    'Pertanyaan terlalu teknis → dicatat dan dibahas di Lab Day, jangan menguasai sesi',
    'Peserta minder → beri tugas kecil yang pasti berhasil dalam 5 menit pertama praktik',
  ], { x: M, y: b37 + 1.6, w: W - 2 * M, size: 13.5 });
  s.addNotes('Aturan emas: kecepatan kelas mengikuti peserta di tengah.');
}

/* 38 — Kalimat dilarang */
{
  const s = lightBase();
  head(s, 'Kalimat yang Dilarang & Penggantinya', 'Fasilitator');
  const pairs = [
    ['"Ini gampang kok"', '"Ini bagian yang biasanya butuh 2–3 kali coba"'],
    ['"Pasti sudah pada tahu"', '"Kalau ada yang belum pernah, ini kesempatan bagus"'],
    ['"Kok belum bisa sih"', '"Coba tunjukkan layarnya, kita lihat bareng"'],
    ['"Nanti saja tanyanya"', '"Saya catat, kita bahas di menit ke-110"'],
    ['"Pokoknya ikuti saja"', '"Alasannya begini, supaya nanti bisa dikembangkan sendiri"'],
  ];
  s.addText('JANGAN', T('', { x: M + 0.25, y: 1.55, w: 3, h: 0.28, fontSize: 11, bold: true, color: 'B4553F', charSpacing: 1.5 }));
  s.addText('GANTI DENGAN', T('', { x: M + 5.9, y: 1.55, w: 3, h: 0.28, fontSize: 11, bold: true, color: C.teal, charSpacing: 1.5 }));
  pairs.forEach((p, i) => {
    const y = 1.9 + i * 0.78;
    s.addShape(pres.ShapeType.roundRect, { x: M, y, w: 5.6, h: 0.62, rectRadius: 0.05, fill: { color: 'F7ECE8' } });
    s.addText(p[0], T('', { x: M + 0.25, y, w: 5.1, h: 0.62, fontSize: 13.5, color: '8C4231', valign: 'middle' }));
    s.addText('→', T('', { x: M + 5.62, y, w: 0.4, h: 0.62, fontSize: 15, color: C.muted, align: 'center', valign: 'middle' }));
    s.addShape(pres.ShapeType.roundRect, { x: M + 5.9, y, w: W - 2 * M - 5.9, h: 0.62, rectRadius: 0.05, fill: { color: C.paper } });
    s.addText(p[1], T('', { x: M + 6.15, y, w: W - 2 * M - 6.4, h: 0.62, fontSize: 13.5, color: C.ink, valign: 'middle' }));
  });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 5.95, w: W - 2 * M, h: 1.0, rectRadius: 0.08, fill: { color: C.deep } });
  s.addText('Dasar aturan ini bukan teori. Ketua AI Club Malang sendiri pernah mengikuti webinar berulang kali tanpa paham dan baru mengerti 3–4 bulan kemudian — bukan karena materinya salah, tapi karena disampaikan seolah semua orang sudah tahu. Pengalaman itu adalah aset kurikulum komunitas ini.',
    T('', { x: M + 0.3, y: 5.95, w: W - 2 * M - 0.6, h: 1.0, fontSize: 13, color: C.white, valign: 'middle', lineSpacingMultiple: 1.15 }));
  s.addNotes('Wajib dibacakan di briefing setiap mentor baru.');
}

/* 39 — Format bulanan */
{
  const s = lightBase();
  head(s, 'Enam Format Kegiatan Bulanan', 'Komunitas');
  CB = cards(s, [
    { t: 'AI Show & Tell', d: 'Anggota memaparkan hasil eksperimennya, 5 menit per orang. · 90 menit' },
    { t: 'Tool Battle', d: 'Beberapa AI diadu untuk kasus yang sama, peserta memilih pemenang. · 60 menit' },
    { t: 'Prompt Review', d: 'Prompt anggota dibedah di depan kelas dan diperbaiki bersama. · 60 menit' },
    { t: 'Automation Clinic', d: 'Anggota datang dengan workflow yang macet, dibetulkan bersama. · 120 menit' },
    { t: 'AI Lab Day', d: 'Eksperimen bebas: local AI, agent, IoT, creative AI. · 180 menit' },
    { t: 'Demo Day', d: 'Presentasi capstone, terbuka untuk umum. · 180 menit' },
  ], { y: 1.7, cols: 3, h: 1.7, gap: 0.28, tSize: 15.5, dSize: 12 });
  const b39 = CB + 0.3;
  s.addShape(pres.ShapeType.roundRect, { x: M, y: b39, w: W - 2 * M, h: 1.15, rectRadius: 0.08, fill: { color: C.deep } });
  s.addText('Automation Clinic adalah format bernilai tertinggi untuk Malang', T('', { x: M + 0.3, y: b39 + 0.12, w: W - 2 * M - 0.6, h: 0.35, fontSize: 15, bold: true, fontFace: HF, color: C.mint }));
  s.addText('30% anggota datang untuk automation, dan mereka akan macet. Klinik yang memperbaiki workflow orang secara langsung menciptakan loyalitas yang tidak bisa dibeli dengan materi apa pun.',
    T('', { x: M + 0.3, y: b39 + 0.48, w: W - 2 * M - 0.6, h: 0.6, fontSize: 13.5, color: C.white, lineSpacingMultiple: 1.15 }));
}

/* --- Section: Model bisnis --- */
{
  const s = darkBase();
  s.addShape(pres.ShapeType.ellipse, { x: 10.3, y: 1.2, w: 4.4, h: 4.4, fill: { color: C.amber }, transparency: 84 });
  s.addText('KEBERLANJUTAN', T('', { x: M, y: 2.4, w: 8, h: 0.4, fontSize: 14, bold: true, color: C.gold, charSpacing: 3 }));
  s.addText('Model Bisnis Modul', T('', { x: M, y: 2.85, w: 9, h: 0.9, fontSize: 44, bold: true, fontFace: HF, color: C.white }));
  s.addText('Tiga lapis · paket harga · simulasi tahun pertama', T('', { x: M, y: 3.85, w: 9, h: 0.7, fontSize: 19, color: C.mutedLight }));
  s.addText('Seluruh angka di bagian ini adalah usulan dan perlu dikonfirmasi ke pusat sebelum diumumkan.',
    T('', { x: M, y: 5.4, w: 8.5, h: 0.4, fontSize: 13, italic: true, color: C.gold }));
}

/* 41 — Tiga lapis */
{
  const s = lightBase();
  head(s, 'Tiga Lapis — Selaras dengan Prinsip Pusat', 'Model bisnis');
  s.addText('Pusat menyatakan komunitas gratis selamanya. Modul berbayar tidak boleh melanggar itu. Penyelesaiannya sederhana:',
    T('', { x: M, y: 1.6, w: W - 2 * M, h: 0.4, fontSize: 15, color: C.muted }));
  const lp = [
    { t: 'Lapis 1 — Gratis selamanya', d: 'Kopdar bulanan · sesi online mingguan · grup WA · Prompt Library · akses aiclub.id', p: 'Rp 0', c: C.sea },
    { t: 'Lapis 2 — Kelas intensif', d: 'Cohort 16 minggu terstruktur, pendampingan, sertifikat', p: 'Berbayar', c: C.teal },
    { t: 'Lapis 3 — Korporat & project', d: 'Pelatihan in-house, implementasi, konsultasi', p: 'Berbayar', c: C.amber },
  ];
  lp.forEach((it, i) => {
    const y = 2.2 + i * 1.05;
    s.addShape(pres.ShapeType.roundRect, { x: M, y, w: W - 2 * M, h: 0.9, rectRadius: 0.07, fill: { color: C.paper } });
    s.addText(it.t, T('', { x: M + 0.25, y: y + 0.13, w: 5.2, h: 0.35, fontSize: 16, bold: true, fontFace: HF, color: it.c }));
    s.addText(it.d, T('', { x: M + 0.25, y: y + 0.48, w: 8.5, h: 0.35, fontSize: 12.5, color: C.muted }));
    s.addText(it.p, T('', { x: W - M - 2.4, y, w: 2.2, h: 0.9, fontSize: 18, bold: true, fontFace: HF, color: it.c, align: 'right', valign: 'middle' }));
  });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 5.55, w: W - 2 * M, h: 1.15, rectRadius: 0.08, fill: { color: C.deep } });
  s.addText('Yang dijual bukan ilmunya — ilmunya tetap tersedia gratis.', T('', { x: M + 0.3, y: 5.67, w: W - 2 * M - 0.6, h: 0.35, fontSize: 16, bold: true, fontFace: HF, color: C.mint }));
  s.addText('Yang dijual adalah struktur, pendampingan, dan akuntabilitas. Orang membayar untuk diselesaikan, bukan untuk diberi tahu.',
    T('', { x: M + 0.3, y: 6.03, w: W - 2 * M - 0.6, h: 0.55, fontSize: 14, color: C.white }));
}

/* 42 — Paket harga */
{
  const s = lightBase();
  head(s, 'Paket Harga Usulan', 'Lapis 2 & 3');
  const pk = [
    ['Workshop 1 hari', '1 topik, 5 jam, praktik', 'Rp 175 rb', '60 orang'],
    ['Explorer Cohort', '8 minggu, Track 1, sertifikat', 'Rp 750 rb', '30 orang'],
    ['Builder Cohort', '8 minggu, Track 2, pendampingan', 'Rp 1,2 jt', '20 orang'],
    ['Engineer Lab', '12 minggu, Track 3', 'Rp 2,5 jt', '12 orang'],
    ['Private / Maker Lab', '6–8 sesi', 'Rp 1,5 jt', '10 orang'],
    ['Kelas privat mentor', '1-on-1, model Makassar', 'Rp 5–7 jt', 'per mentor'],
  ];
  s.addText('PAKET', T('', { x: M + 0.25, y: 1.55, w: 3, h: 0.25, fontSize: 10, bold: true, color: C.muted, charSpacing: 1.5 }));
  s.addText('HARGA', T('', { x: 8.4, y: 1.55, w: 2, h: 0.25, fontSize: 10, bold: true, color: C.muted, charSpacing: 1.5 }));
  s.addText('KAPASITAS', T('', { x: 10.8, y: 1.55, w: 2, h: 0.25, fontSize: 10, bold: true, color: C.muted, charSpacing: 1.5 }));
  pk.forEach((p, i) => {
    const y = 1.85 + i * 0.62;
    s.addShape(pres.ShapeType.roundRect, { x: M, y, w: W - 2 * M, h: 0.52, rectRadius: 0.05, fill: { color: C.paper } });
    s.addText(p[0], T('', { x: M + 0.25, y, w: 3.0, h: 0.52, fontSize: 14, bold: true, fontFace: HF, color: C.ink, valign: 'middle' }));
    s.addText(p[1], T('', { x: M + 3.4, y, w: 4.3, h: 0.52, fontSize: 12.5, color: C.muted, valign: 'middle' }));
    s.addText(p[2], T('', { x: 8.4, y, w: 2.2, h: 0.52, fontSize: 14, bold: true, color: C.teal, valign: 'middle' }));
    s.addText(p[3], T('', { x: 10.8, y, w: 1.9, h: 0.52, fontSize: 12.5, color: C.ink, valign: 'middle' }));
  });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 5.7, w: 6.1, h: 1.0, rectRadius: 0.07, fill: { color: C.deep } });
  s.addText('Bagi hasil kelas berbayar', T('', { x: M + 0.25, y: 5.8, w: 5.6, h: 0.3, fontSize: 13, bold: true, color: C.mint }));
  s.addText('Mentor 40%  ·  Panitia 20%  ·  Kas Malang 30%  ·  Pos iklan 10%', T('', { x: M + 0.25, y: 6.12, w: 5.6, h: 0.45, fontSize: 13, color: C.white }));
  s.addShape(pres.ShapeType.roundRect, { x: 7.1, y: 5.7, w: W - M - 7.1, h: 1.0, rectRadius: 0.07, fill: { color: C.paper } });
  s.addText('Diskon', T('', { x: 7.35, y: 5.8, w: 5.2, h: 0.3, fontSize: 13, bold: true, color: C.teal }));
  s.addText('Pengurus & mentor gratis · anggota aktif ≥6 bulan −20% · pelajar & mahasiswa −40% · daftar berdua −15%',
    T('', { x: 7.35, y: 6.12, w: 5.2, h: 0.5, fontSize: 12, color: C.ink, lineSpacingMultiple: 1.1 }));
  foot(s, 'Harga workshop mengacu benchmark AI Club Makassar: Rp 175 rb dengan ±60 tiket terjual.');
}

/* 43 — Simulasi pendapatan */
{
  const s = lightBase();
  head(s, 'Simulasi Pendapatan Tahun Pertama', 'Skenario konservatif');
  s.addChart(pres.ChartType.bar, [{
    name: 'Pendapatan kotor (juta rupiah)',
    labels: ['Workshop 1 hari (6×)', 'Builder Cohort (2×)', 'Explorer Cohort (2×)',
      'Pelatihan korporat (3×)', 'Project implementasi', 'Engineer Lab (1×)'],
    values: [52.5, 43.2, 37.5, 30, 30, 25],
  }], {
    x: M, y: 1.6, w: 7.5, h: 4.4, barDir: 'bar', barGapWidthPct: 45,
    chartColors: [C.teal], showTitle: false, showLegend: false,
    showValue: true, dataLabelPosition: 'outEnd', dataLabelColor: C.ink,
    dataLabelFontSize: 12, dataLabelFontFace: BF,
    catAxisLabelColor: C.ink, catAxisLabelFontSize: 12, catAxisLabelFontFace: BF,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 10, valAxisMinVal: 0, valAxisMaxVal: 62,
    valGridLine: { color: C.line, size: 1 }, catGridLine: { style: 'none' },
  });
  s.addShape(pres.ShapeType.roundRect, { x: 8.4, y: 1.6, w: 4.3, h: 1.7, rectRadius: 0.1, fill: { color: C.deep } });
  s.addText('±Rp 218 jt', T('', { x: 8.65, y: 1.8, w: 3.8, h: 0.7, fontSize: 36, bold: true, fontFace: HF, color: C.mint }));
  s.addText('pendapatan kotor tahun pertama, hanya dari program yang sudah terbukti diminati.',
    T('', { x: 8.65, y: 2.5, w: 3.8, h: 0.7, fontSize: 13, color: C.white, lineSpacingMultiple: 1.15 }));
  s.addShape(pres.ShapeType.roundRect, { x: 8.4, y: 3.45, w: 4.3, h: 1.5, rectRadius: 0.1, fill: { color: C.paper } });
  s.addText('±Rp 55–60 jt', T('', { x: 8.65, y: 3.62, w: 3.8, h: 0.5, fontSize: 26, bold: true, fontFace: HF, color: C.teal }));
  s.addText('masuk kas AI Club Malang — cukup membiayai kit AIoT, mesin lab, iklan, dan merchandise.',
    T('', { x: 8.65, y: 4.12, w: 3.8, h: 0.75, fontSize: 12.5, color: C.muted, lineSpacingMultiple: 1.15 }));
  s.addText('Komunitas ini bisa membiayai dirinya sendiri dari programnya. Legalitas bisa menyusul saat arus kasnya sudah rutin, bukan sebelumnya.',
    T('', { x: 8.4, y: 5.15, w: 4.3, h: 0.9, fontSize: 13, italic: true, color: C.teal, lineSpacingMultiple: 1.2 }));
  foot(s, 'Skenario konservatif. Angka Lapis 3 berdasar penawaran nyata yang sudah masuk ke jaringan anggota Malang: Rp 40 juta dan Rp 60 juta untuk pembuatan software.');
}

/* 44 — Roadmap */
{
  const s = lightBase();
  head(s, 'Urutan Buka Program — 12 Bulan', 'Roadmap');
  const rm = [
    { b: 'Bulan 1', t: 'Explorer Cohort #1 + Builder Cohort #1 (paralel)', d: 'Target 25 + 18 peserta · kopdar gratis tetap jalan', c: C.teal, hi: true },
    { b: 'Bulan 2', t: 'Workshop 1 hari #1 + sesi online mingguan', d: 'Target 50 peserta', c: C.sea },
    { b: 'Bulan 3', t: 'Automation Clinic + AI Show & Tell', d: 'Target 30 peserta', c: C.sea },
    { b: 'Bulan 4', t: 'Engineer Lab #1 + Workshop #2', d: 'Target 10 + 50 peserta', c: C.teal, hi: true },
    { b: 'Bulan 5', t: 'Explorer Cohort #2 + pelatihan korporat pertama', d: 'Target 25 peserta + 1 klien', c: C.sea },
    { b: 'Bulan 6', t: 'Demo Day publik + Workshop #3', d: 'Terbuka umum — undang kampus & media', c: C.sea },
    { b: 'Bulan 7', t: 'Private Lab + Maker Lab (bila kuorum)', d: 'Target 10 + 8 peserta', c: C.amber, hi: true },
    { b: 'Bulan 8–12', t: 'Cohort berulang + project korporat + kolaborasi kampus', d: 'Skala & keberlanjutan', c: C.sea },
  ];
  rm.forEach((it, i) => {
    const y = 1.55 + i * 0.63;
    s.addShape(pres.ShapeType.roundRect, { x: M, y, w: W - 2 * M, h: 0.53, rectRadius: 0.05, fill: { color: it.hi ? C.deep : C.paper } });
    s.addText(it.b, T('', { x: M + 0.22, y, w: 1.25, h: 0.53, fontSize: 13, bold: true, color: it.hi ? C.mint : it.c, valign: 'middle' }));
    s.addText(it.t, T('', { x: M + 1.6, y, w: 6.4, h: 0.53, fontSize: 13.5, bold: true, fontFace: HF, color: it.hi ? C.white : C.ink, valign: 'middle' }));
    s.addText(it.d, T('', { x: M + 8.1, y, w: W - 2 * M - 8.3, h: 0.53, fontSize: 12, color: it.hi ? C.mutedLight : C.muted, valign: 'middle' }));
  });
  s.addText('Perubahan kunci: Builder Cohort dibuka bulan 1, bukan bulan 4. 30% anggota datang untuk automation — bila menunggu terlalu lama, mereka akan belajar di tempat lain.',
    T('', { x: M, y: 6.7, w: W - 2 * M, h: 0.5, fontSize: 13.5, italic: true, color: C.teal }));
}

/* 45 — Konfirmasi pusat */
{
  const s = lightBase();
  head(s, 'Lima Hal yang Perlu Dikonfirmasi ke Pusat', 'Sebelum diumumkan');
  const q = [
    'Apakah kelas berbayar dengan struktur tiga lapis ini sesuai dengan prinsip "gratis selamanya"?',
    'Berapa persen kas pusat dari kelas berbayar yang diselenggarakan kota?',
    'Bolehkah menerbitkan sertifikat dengan nama dan logo AI Club?',
    'Bolehkah mentor menjual kelas privat lewat profil, seperti yang dilakukan di Makassar?',
    'Apakah pelatihan korporat B2B boleh memakai nama AI Club, atau harus atas nama pribadi mentor?',
  ];
  q.forEach((t, i) => {
    const y = 1.75 + i * 0.85;
    s.addShape(pres.ShapeType.roundRect, { x: M, y, w: W - 2 * M, h: 0.72, rectRadius: 0.06, fill: { color: C.paper } });
    dot(s, M + 0.22, y + 0.14, 0.44, C.amber, String(i + 1));
    s.addText(t, T('', { x: M + 0.85, y, w: W - 2 * M - 1.1, h: 0.72, fontSize: 14, color: C.ink, valign: 'middle' }));
  });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 6.1, w: W - 2 * M, h: 0.85, rectRadius: 0.08, fill: { color: C.deep } });
  s.addText('Seluruh isi modul di luar lima poin ini bisa dijalankan sekarang tanpa menunggu jawaban.',
    T('', { x: M + 0.3, y: 6.1, w: W - 2 * M - 0.6, h: 0.85, fontSize: 14, bold: true, color: C.white, valign: 'middle' }));
}

/* 46 — Penutup */
{
  const s = darkBase();
  s.addShape(pres.ShapeType.ellipse, { x: 9.6, y: -1.2, w: 5.8, h: 5.8, fill: { color: C.teal }, transparency: 76 });
  s.addShape(pres.ShapeType.ellipse, { x: 11.2, y: 4.6, w: 3.2, h: 3.2, fill: { color: C.mint }, transparency: 84 });
  s.addText('LANGKAH BERIKUTNYA', T('', { x: M, y: 1.2, w: 8, h: 0.4, fontSize: 14, bold: true, color: C.mint, charSpacing: 3 }));
  s.addText('Modul sudah siap.\nTinggal dijalankan.', T('', { x: M, y: 1.7, w: 8.6, h: 1.5, fontSize: 40, bold: true, fontFace: HF, color: C.white, lineSpacingMultiple: 1.1 }));
  const nx = [
    { n: '1', t: 'Konfirmasi 5 poin ke pusat', d: 'Kirim minggu ini' },
    { n: '2', t: 'Tetapkan mentor Track 1 & 2', d: 'Dua track dibuka paralel bulan pertama' },
    { n: '3', t: 'Buka pendaftaran cohort #1', d: 'Target 25 Explorer + 18 Builder' },
  ];
  nx.forEach((it, i) => {
    const y = 3.5 + i * 0.85;
    s.addShape(pres.ShapeType.roundRect, { x: M, y, w: 8.6, h: 0.72, rectRadius: 0.06, fill: { color: '0A4A52' } });
    dot(s, M + 0.2, y + 0.14, 0.44, C.mint, it.n, C.deep);
    s.addText(it.t, T('', { x: M + 0.82, y, w: 4.6, h: 0.72, fontSize: 14.5, bold: true, fontFace: HF, color: C.white, valign: 'middle' }));
    s.addText(it.d, T('', { x: M + 5.5, y, w: 3.0, h: 0.72, fontSize: 12.5, color: C.mutedLight, valign: 'middle' }));
  });
  s.addText('AI Club Malang  ·  bagian dari AIClub Indonesia  ·  aiclub.id', T('', { x: M, y: 6.6, w: 9, h: 0.35, fontSize: 12, color: C.mutedLight }));
  s.addNotes('Tutup dengan tiga langkah konkret, bukan dengan terima kasih.');
}

if (FIT.length) {
  console.log('PERINGATAN muat teks (' + FIT.length + '):');
  FIT.forEach(w => console.log('  - ' + w));
} else {
  console.log('Muat teks kartu: OK, tidak ada yang melebihi kotaknya.');
}
pres.writeFile({ fileName: 'out/Modul_AI_Club_Malang.pptx' })
  .then(f => console.log('OK ->', f));
