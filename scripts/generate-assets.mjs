/**
 * Generates the original placeholder artwork in /public/images.
 * Run:  node scripts/generate-assets.mjs   (needs `npx playwright install chromium` once)
 * Replace the generated files with your real images whenever you're ready.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync } from "fs";

const ACCENT = "#ccff00";
const noise = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.55'/></svg>")`;

const base = (w, h, inner, bg) => `<!doctype html><html><head><style>
*{box-sizing:border-box;margin:0}
body{width:${w}px;height:${h}px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;background:${bg};position:relative;color:#fff}
.grain{position:absolute;inset:0;background:${noise};mix-blend-mode:overlay;opacity:.5}
.phone{position:absolute;width:360px;height:730px;border-radius:56px;background:#0a0a0a;border:10px solid #1b1b1b;box-shadow:0 60px 120px rgba(0,0,0,.55), inset 0 0 0 2px #333;overflow:hidden}
.screen{position:absolute;inset:0;padding:70px 26px 26px;display:flex;flex-direction:column;gap:14px}
.notch{position:absolute;top:14px;left:50%;transform:translateX(-50%);width:110px;height:30px;border-radius:20px;background:#000}
.bubble{border-radius:18px;padding:14px 16px;font-size:15px;line-height:1.4}
.browser{position:absolute;border-radius:22px;background:#0c0c0c;box-shadow:0 60px 120px rgba(0,0,0,.5);overflow:hidden;border:1px solid rgba(255,255,255,.12)}
.bar{height:44px;display:flex;align-items:center;gap:8px;padding:0 18px;background:#151515}
.dot{width:12px;height:12px;border-radius:50%}
.word{font-weight:700;letter-spacing:-.04em}
</style></head><body>${inner}<div class="grain"></div></body></html>`;

const covers = {
  halo: base(1410, 900, `
    <div style="position:absolute;inset:0;background:radial-gradient(60% 70% at 30% 110%, ${ACCENT} 0%, rgba(204,255,0,.25) 35%, transparent 70%), #050505"></div>
    <div class="phone" style="left:560px;top:120px;transform:rotate(-8deg)">
      <div class="notch"></div>
      <div class="screen">
        <div style="display:flex;align-items:center;gap:10px"><div style="width:38px;height:38px;border-radius:12px;background:${ACCENT}"></div><div><div style="font-size:18px;font-weight:700">Halo</div><div style="font-size:12px;opacity:.6">AI assistant · online</div></div></div>
        <div class="bubble" style="background:#1a1a1a">Hi! Ask me what we build, what it costs, or which project fits you.</div>
        <div class="bubble" style="background:${ACCENT};color:#000;align-self:flex-end;max-width:80%">How fast can you launch a site?</div>
        <div class="bubble" style="background:#1a1a1a">Most projects go live in 6–12 weeks. Want me to outline the steps?</div>
        <div style="margin-top:auto;height:52px;border-radius:26px;background:#161616;display:flex;align-items:center;padding:0 20px;opacity:.7;font-size:14px">Type a question…</div>
      </div>
    </div>
    <div class="word" style="position:absolute;left:90px;top:120px;font-size:150px;color:rgba(255,255,255,.08)">HALO</div>`, "#000"),
  terra: base(1410, 900, `
    <div style="position:absolute;inset:0;background:radial-gradient(70% 80% at 70% 30%, #6b4b22 0%, #2a1a0b 50%, #0b0703 100%)"></div>
    <div style="position:absolute;left:180px;top:140px;width:170px;height:600px;border-radius:70px 70px 26px 26px;background:linear-gradient(90deg,#1d2a09,#4f6b12 40%,#93b52a 52%,#2c3c0b);box-shadow:0 50px 90px rgba(0,0,0,.6)"></div>
    <div style="position:absolute;left:228px;top:90px;width:74px;height:80px;border-radius:12px;background:#111"></div>
    <div style="position:absolute;left:200px;top:400px;width:130px;height:160px;border-radius:10px;background:#f2ead7;color:#2a1a0b;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:20px;font-weight:700">TERRA<span style="font-size:11px;font-weight:400">EXTRA VIRGIN</span></div>
    <div class="browser" style="left:470px;top:150px;width:820px;height:600px">
      <div class="bar"><span class="dot" style="background:#ff5f57"></span><span class="dot" style="background:#febc2e"></span><span class="dot" style="background:#28c840"></span></div>
      <div style="padding:60px;background:linear-gradient(160deg,#20160a,#0d0904);height:100%">
        <div style="font-size:14px;letter-spacing:.2em;color:#d7b56d">HARVEST 2025</div>
        <div class="word" style="font-size:96px;line-height:.95;margin-top:16px;color:#f2ead7">Liquid<br/>gold.</div>
        <div style="margin-top:30px;display:inline-block;padding:16px 28px;border-radius:40px;background:${ACCENT};color:#000;font-size:16px">Shop the harvest</div>
      </div>
    </div>`, "#0b0703"),
  table: base(1410, 900, `
    <div style="position:absolute;inset:0;background:linear-gradient(135deg,#ff7a1a,#ff5a1f 45%,#d63e10)"></div>
    <div style="position:absolute;left:140px;top:160px;font-size:20px;color:#fff;opacity:.85">The AI waiter</div>
    <div class="word" style="position:absolute;left:136px;top:200px;font-size:130px;color:#fff;line-height:.9">Table<br/>AI</div>
    <div class="phone" style="left:820px;top:90px">
      <div class="notch"></div>
      <div class="screen" style="background:#fff7ef;color:#2b1408">
        <div style="font-size:22px;font-weight:700">Good evening 👋</div>
        <div style="font-size:14px;opacity:.7">What are you in the mood for?</div>
        ${["Truffle risotto · 24","Burrata & figs · 16","Tiramisù · 9"].map(t=>`<div style="background:#fff;border-radius:16px;padding:16px;box-shadow:0 6px 20px rgba(0,0,0,.08);font-size:15px;display:flex;justify-content:space-between"><span>${t.split("·")[0]}</span><b>${t.split("·")[1]}</b></div>`).join("")}
        <div style="margin-top:auto;height:54px;border-radius:27px;background:#ff5a1f;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px">Order for table 7</div>
      </div>
    </div>`, "#ff5a1f"),
  fizz: base(1410, 900, `
    <div style="position:absolute;inset:0;background:radial-gradient(50% 60% at 50% 50%, #ff3d9a 0%, #8a1cff 55%, #2b0060 100%)"></div>
    ${[[260,180,-18,"#ccff00"],[560,300,8,"#00e5ff"],[860,160,22,"#ffd400"]].map(([x,y,r,c])=>`<div style="position:absolute;left:${x}px;top:${y}px;width:300px;height:420px;border-radius:40px;background:linear-gradient(160deg,${c},#ffffff55);transform:rotate(${r}deg);box-shadow:0 40px 90px rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center"><div class="word" style="font-size:72px;color:#1a0033;transform:rotate(-90deg)">FIZZ</div></div>`).join("")}`, "#2b0060"),
  solace: base(1410, 900, `
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,#e9e4dc,#cfc7ba)"></div>
    <svg style="position:absolute;left:255px;top:300px" width="900" height="320" viewBox="0 0 900 320"><g fill="none" stroke="#111" stroke-width="26"><rect x="40" y="60" width="330" height="220" rx="110"/><rect x="530" y="60" width="330" height="220" rx="110"/><path d="M370 150 q80 -60 160 0"/></g><g fill="rgba(20,20,20,.75)"><rect x="53" y="73" width="304" height="194" rx="97"/><rect x="543" y="73" width="304" height="194" rx="97"/></g></svg>
    <div class="word" style="position:absolute;left:90px;top:80px;font-size:110px;color:#111">Solace</div>
    <div style="position:absolute;right:90px;bottom:80px;padding:14px 24px;border-radius:30px;background:#111;color:${ACCENT};font-size:18px">Try on in AR</div>`, "#e9e4dc"),
};

const postPalettes = [
  ["#0a0a0a", ACCENT], ["#0b1020", "#5b8cff"], ["#120a00", "#ff9a3d"], ["#06140d", "#3dffa0"], ["#14001a", "#d36bff"],
];
const postArt = (bg, c, i) => base(1200, 750, `
  <div style="position:absolute;inset:0;background:radial-gradient(70% 90% at ${20 + i * 15}% 100%, ${c} 0%, ${c}55 30%, transparent 70%), ${bg}"></div>
  <svg style="position:absolute;inset:0" width="1200" height="750"><g fill="none" stroke="${c}" stroke-opacity=".5">${Array.from({ length: 18 }, (_, k) => `<circle cx="${850 - i * 60}" cy="330" r="${20 + k * 22}" stroke-width="1"/>`).join("")}</g></svg>`, bg);

const team = (i) => base(800, 1000, `
  <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 35%, #2a2a2a 0%, #0b0b0b 70%)"></div>
  <div style="position:absolute;left:50%;top:22%;width:300px;height:300px;margin-left:-150px;border-radius:50%;background:linear-gradient(160deg,#3a3a3a,#161616)"></div>
  <div style="position:absolute;left:50%;top:56%;width:560px;height:520px;margin-left:-280px;border-radius:280px 280px 0 0;background:linear-gradient(160deg,#333,#121212)"></div>
  <div style="position:absolute;left:40px;bottom:40px;padding:10px 18px;border-radius:24px;background:${ACCENT};color:#000;font-size:22px">Photo ${i + 1} — replace me</div>`, "#0b0b0b");

const og = base(1200, 630, `
  <div style="position:absolute;inset:0;background:radial-gradient(80% 90% at 50% 120%, ${ACCENT} 0%, rgba(204,255,0,.2) 40%, transparent 70%), #000"></div>
  <div style="position:absolute;left:80px;top:80px;font-size:26px;color:${ACCENT};font-family:monospace">INDEPENDENT DIGITAL STUDIO</div>
  <div style="position:absolute;left:76px;top:150px;font-size:96px;line-height:1.05">Websites people<br/><span style="color:${ACCENT}">can't forget.</span></div>`, "#000");

const browser = await chromium.launch();
const page = await browser.newPage();
async function render(html, w, h, out, quality = 82) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(html);
  const buf = await page.screenshot({ type: "png" });
  const img = sharp(buf);
  if (out.endsWith(".jpg")) await img.jpeg({ quality, mozjpeg: true }).toFile(out);
  else await img.webp({ quality }).toFile(out);
  console.log("✓", out);
}
mkdirSync("public/images/projects", { recursive: true });
mkdirSync("public/images/posts", { recursive: true });
mkdirSync("public/images/team", { recursive: true });
for (const [k, html] of Object.entries(covers)) await render(html, 1410, 900, `public/images/projects/${k}.webp`);
for (let i = 0; i < 5; i++) await render(postArt(postPalettes[i][0], postPalettes[i][1], i), 1200, 750, `public/images/posts/post-${i + 1}.webp`);
for (let i = 0; i < 3; i++) await render(team(i), 800, 1000, `public/images/team/member-${i + 1}.webp`);
await render(og, 1200, 630, "public/og.jpg");
await browser.close();
