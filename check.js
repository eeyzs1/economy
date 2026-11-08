/* EconLearn 教程质检脚本
   用法: node check.js <file.html> [...]
   检查: 结构完整性 / 数量下限 / 内联脚本语法 / id 引用 / quiz 结构,
         以及 label-for、svg aria-label、标题层级、pager 方向、主题色、
         curve 类定义、跨文件链接、meta description */
const fs = require("fs");
const path = require("path");

const SPEC_BRANCH = {
  "01": "#2f6fdb", "02": "#b91c1c", "03": "#0d9488", "04": "#7c3aed",
  "05": "#b45309", "06": "#0e7490", "07": "#4d7c0f", "08": "#be185d",
  "09": "#4338ca", "10": "#e11d48", "11": "#047857", "12": "#65a30d",
  "13": "#ea580c", "14": "#db2777", "15": "#9333ea", "16": "#57534e",
  "17": "#713f12",
};

// 从共享 CSS 收集已定义的 .curve-cN, 防止页面引用未定义类导致曲线不可见
const cssPath = path.join(__dirname, "assets", "econ.css");
const curveDefined = new Set();
if (fs.existsSync(cssPath)) {
  (fs.readFileSync(cssPath, "utf8").match(/\.curve-c\d+\s*\{/g) || []).forEach((s) => {
    curveDefined.add(s.match(/\.curve-c(\d+)/)[0].slice(1));
  });
}

const dirs = fs.readdirSync(__dirname).filter((d) => /^\d\d-/.test(d)).sort();
const files = process.argv.slice(2);
let anyFail = false;

for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  const name = file.split(/[\\/]/).slice(-2).join("/");
  const baseDir = path.dirname(path.resolve(file));
  const problems = [];
  const stats = {};

  stats.bytes = Buffer.byteLength(src, "utf8");
  stats.lines = src.split("\n").length;

  if (!src.trimEnd().endsWith("</html>")) problems.push("未以 </html> 结尾");
  if (!/<html lang="zh-CN"/.test(src)) problems.push("缺少 lang=zh-CN");
  if (!/name="description"/.test(src)) problems.push("缺少 meta description");
  if (/https?:\/\//.test(src.replace(/http:\/\/www\.w3\.org/g, ""))) problems.push("含外部资源引用");

  const parts = file.split(/[\\/]/);
  const num = /^\d\d-/.test(parts[parts.length - 2]) ? parts[parts.length - 2].slice(0, 2) : null;
  const isChapter = !!num;

  // 以下为章节页专属要求（门户页是纯导航, 无教程组件）
  if (isChapter) {
    if (!/assets\/econ\.css/.test(src)) problems.push("未引用 econ.css");
    if (!/assets\/econ\.js/.test(src)) problems.push("未引用 econ.js");
  }

  const count = (re) => (src.match(re) || []).length;
  stats.quiz = count(/data-quiz/g);
  stats.correct = count(/data-correct="true"/g);
  stats.fig = count(/class="fig(?:\s|")/g);
  stats.term = count(/class="term(?:\s|")/g);
  stats.callout = count(/class="callout /g);
  stats.summary = count(/summary-card/g);
  stats.slider = count(/type="range"/g);

  if (isChapter) {
    if (stats.quiz < 8) problems.push(`quiz 数量 ${stats.quiz} < 8`);
    if (stats.correct !== stats.quiz) problems.push(`正确项 ${stats.correct} ≠ quiz ${stats.quiz}`);
    if (stats.fig < 2) problems.push(`互动 fig ${stats.fig} < 2`);
    if (stats.term < 6) problems.push(`术语卡 ${stats.term} < 6`);
    if (stats.slider < 1) problems.push("没有滑块");
  }

  // id 集合
  const ids = new Set([...src.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));

  // 侧栏锚点与章节 id 对应
  const navIds = [...src.matchAll(/<a href="#([^"]+)"/g)].map((m) => m[1]);
  for (const id of navIds) {
    if (!ids.has(id)) problems.push(`锚点 #${id} 无对应章节`);
  }

  // label[for] / output[for] 必须指向存在的 id; 同一 id 不应被多个 label 引用
  const labelFor = [...src.matchAll(/<label for="([^"]+)"/g)].map((m) => m[1]);
  const labelCount = {};
  for (const id of labelFor) {
    if (!ids.has(id)) problems.push(`label for="#${id}" 的目标不存在`);
    labelCount[id] = (labelCount[id] || 0) + 1;
  }
  for (const [id, c] of Object.entries(labelCount)) {
    if (c > 1) problems.push(`${c} 个 label 同时指向 #${id}（读数行应各自指向自己的 output）`);
  }
  for (const m of src.matchAll(/<output for="([^"]+)"/g)) {
    if (!ids.has(m[1])) problems.push(`output for="#${m[1]}" 的目标不存在`);
  }

  // 每个 svg 必须有 aria-label
  for (const m of src.matchAll(/<svg\b[^>]*>/g)) {
    if (!/aria-label=/.test(m[0])) problems.push(`svg 缺少 aria-label: ${m[0].slice(0, 60)}…`);
  }

  // 标题不跳级 (h1→h3 之类)
  let prev = 0;
  for (const m of src.matchAll(/<h([1-6])\b/g)) {
    const lv = +m[1];
    if (prev && lv - prev > 1) problems.push(`标题跳级 h${prev} → h${lv}`);
    prev = lv;
  }

  // 引用的 curve-cN 必须在共享 CSS 中有定义
  for (const m of new Set(src.match(/curve-c\d+/g) || [])) {
    if (curveDefined.size && !curveDefined.has(m)) problems.push(`使用了未定义的 ${m}（econ.css 缺该类, 曲线将不可见）`);
  }

  // 跨文件链接目标存在
  for (const m of src.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(#|https?:|mailto:|data:)/.test(u)) continue;
    const target = path.resolve(baseDir, decodeURIComponent(u.split("#")[0]));
    if (!fs.existsSync(target)) problems.push(`链接目标不存在: ${u}`);
  }

  // 章节页: 主题色与 pager 方向
  if (num) {
    const bm = src.match(/--branch:\s*(#[0-9a-fA-F]{6})/);
    if (!bm) problems.push("未找到 --branch");
    else if (bm[1].toLowerCase() !== SPEC_BRANCH[num]) problems.push(`--branch ${bm[1]} ≠ 规范 ${SPEC_BRANCH[num]}`);
    const prev = src.match(/<a href="([^"]+)"><span class="pager-dir">(?:←\s*)?上一分支<\/span>/);
    const next = src.match(/<a href="([^"]+)"><span class="pager-dir">下一分支(?:\s*→)?<\/span>/);
    const wantPrev = num === "01" ? "../index.html" : `../${dirs[+num - 2]}/index.html`;
    const wantNext = num === "17" ? "../index.html" : `../${dirs[+num]}/index.html`;
    if (!prev || prev[1] !== wantPrev) problems.push(`pager 上一分支 ${prev && prev[1]} 应为 ${wantPrev}`);
    if (!next || next[1] !== wantNext) problems.push(`pager 下一分支 ${next && next[1]} 应为 ${wantNext}`);
  }

  // 提取内联 script 并做语法检查
  const scripts = [...src.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  scripts.forEach((code, i) => {
    try {
      new Function(code);
    } catch (e) {
      problems.push(`内联脚本 #${i + 1} 语法错误: ${e.message}`);
    }
  });

  // JS 引用的 id 是否存在
  const usedIds = new Set();
  for (const code of scripts) {
    for (const m of code.matchAll(/getElementById\("([^"]+)"\)/g)) usedIds.add(m[1]);
    for (const m of code.matchAll(/\$\("#([^"]+)"\)/g)) usedIds.add(m[1]);
    for (const m of code.matchAll(/\$\("([^"]+)"\)/g)) usedIds.add(m[1]);
  }
  for (const id of usedIds) {
    if (!ids.has(id)) problems.push(`JS 引用的 #${id} 不存在`);
  }

  // quiz 结构完整
  const quizBlocks = src.split(/data-quiz/).slice(1);
  quizBlocks.forEach((b, i) => {
    const block = b.split(/<\/div>\s*<\/div>\s*(?:<div class="quiz|<section|<\/main)/)[0];
    if (!/quiz-verdict/.test(block)) problems.push(`quiz #${i + 1} 缺 verdict`);
    if (!/quiz-explain/.test(block)) problems.push(`quiz #${i + 1} 缺 explain`);
  });

  const ok = problems.length === 0;
  if (!ok) anyFail = true;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  console.log(`      ${stats.lines} 行 / ${(stats.bytes / 1024).toFixed(0)}KB | fig:${stats.fig} quiz:${stats.quiz} term:${stats.term} callout:${stats.callout} slider:${stats.slider}`);
  if (!ok) problems.forEach((p) => console.log(`      - ${p}`));
}

process.exit(anyFail ? 1 : 0);
