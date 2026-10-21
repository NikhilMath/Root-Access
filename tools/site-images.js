// Builds the website's icons and link preview (user's request, 2026-10-21):
//   favicon.ico            16, 32 and 48 px, for browsers that can't use favicon.svg
//   apple-touch-icon.png   180 px, the rack on the server-room dark, for phone home screens
//   social-preview.png     1200x630, the picture LinkedIn, iMessage, Slack and
//                          the rest show when someone posts a link to the site
//
// The icons are drawn from favicon.svg. The preview is the server room at
// 3:00 a.m.: the rack with its dead unit, the alarm clock, the happy pills
// and the error box. It leaves out anything that gives away the twist.
// Rerun this after changing either (needs node, and Google Chrome or
// Microsoft Edge), then bump the ?v= on the icon links in index.html so
// browsers fetch the new ones:
//   node tools/site-images.js

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

const root = path.join(__dirname, "..");
const icon = fs.readFileSync(path.join(root, "favicon.svg"), "utf8");

const ICO_SIZES = [16, 32, 48];
const TOUCH = 180;

// The preview: 1200x630, words on the left, the server room on the right,
// everything standing on the floor line at DESK.
const OG_W = 1200, OG_H = 630, DESK = 578;

// The rack: seven units, the fifth one dead.
const RACK_X = 852, RACK_Y = 92, RACK_W = 228;
const UNIT_TOP = 120, UNIT_H = 54, UNIT_GAP = 10, DEAD = 4;
const units = Array.from({ length: 7 }, (_, i) => {
  const y = UNIT_TOP + i * (UNIT_H + UNIT_GAP);
  const dead = i === DEAD;
  const vents = [16, 25, 34].map((dy) => `<line x1="${RACK_X + 32}" y1="${y + dy}" x2="${RACK_X + 112}" y2="${y + dy}"/>`).join("");
  const light = dead ? "#ff3b3b" : "#4ade80";
  return `<rect x="${RACK_X + 16}" y="${y}" width="${RACK_W - 32}" height="${UNIT_H}" rx="5" fill="#18211c" stroke="${dead ? "#8b2323" : "#2d3b33"}" stroke-width="2"/>
<g stroke="#2b3830" stroke-width="4" stroke-linecap="round">${vents}</g>
<rect x="${RACK_X + 128}" y="${y + 14}" width="30" height="26" rx="3" fill="#0e1411"/>
<circle cx="${RACK_X + 176}" cy="${y + 27}" r="6" fill="${light}" filter="url(#led)"/>
<circle cx="${RACK_X + 196}" cy="${y + 27}" r="6" fill="${dead ? "#5a1414" : light}" ${dead ? "" : 'filter="url(#led)"'}/>`;
}).join("\n");
const deadY = UNIT_TOP + DEAD * (UNIT_H + UNIT_GAP) + 27;

// Two dim racks further back, so it reads as a server room.
const backRack = (x, h, o) => `<rect x="${x}" y="${DESK - h}" width="150" height="${h}" rx="8" fill="#111915" opacity="${o}"/>` +
  Array.from({ length: Math.floor((h - 30) / 46) }, (_, i) => `<rect x="${x + 12}" y="${DESK - h + 20 + i * 46}" width="126" height="36" rx="4" fill="#0c120f" opacity="${o}"/><circle cx="${x + 122}" cy="${DESK - h + 38 + i * 46}" r="3.5" fill="#4ade80" opacity="${o * 0.5}"/>`).join("");

const art = `<svg class="art" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}" xmlns="http://www.w3.org/2000/svg">
<defs>
  <filter id="led" x="-150%" y="-150%" width="400%" height="400%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="digits" x="-20%" y="-40%" width="140%" height="180%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="shadow" x="-10%" y="-10%" width="130%" height="140%">
    <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000" flood-opacity="0.55"/>
  </filter>
  <radialGradient id="greenGlow" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#2f9e61" stop-opacity="0.32"/>
    <stop offset="1" stop-color="#2f9e61" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="redGlow" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#ff3b3b" stop-opacity="0.8"/>
    <stop offset="1" stop-color="#ff3b3b" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="rackBody" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#202a24"/>
    <stop offset="0.5" stop-color="#2a3530"/>
    <stop offset="1" stop-color="#1a221e"/>
  </linearGradient>
  <linearGradient id="bottle" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#b8611a"/>
    <stop offset="0.35" stop-color="#f0a040"/>
    <stop offset="1" stop-color="#a5550f"/>
  </linearGradient>
</defs>

<!-- Server room glow -->
<ellipse cx="${RACK_X + RACK_W / 2}" cy="330" rx="360" ry="300" fill="url(#greenGlow)"/>
${backRack(676, 300, 0.9)}
${backRack(1108, 360, 0.9)}

<!-- Cables hanging off the side of the rack -->
<path d="M ${RACK_X + RACK_W - 6} 150 C ${RACK_X + RACK_W + 40} 240, ${RACK_X + RACK_W + 10} 420, ${RACK_X + RACK_W + 36} ${DESK}" fill="none" stroke="#2563eb" stroke-width="5" stroke-linecap="round"/>
<path d="M ${RACK_X + RACK_W - 6} 214 C ${RACK_X + RACK_W + 60} 300, ${RACK_X + RACK_W + 40} 470, ${RACK_X + RACK_W + 64} ${DESK}" fill="none" stroke="#ca8a04" stroke-width="5" stroke-linecap="round"/>

<!-- The rack -->
<g filter="url(#shadow)">
  <rect x="${RACK_X}" y="${RACK_Y}" width="${RACK_W}" height="${DESK - RACK_Y}" rx="10" fill="url(#rackBody)" stroke="#3f4f45" stroke-width="2"/>
</g>
<rect x="${RACK_X + 70}" y="${RACK_Y + 8}" width="88" height="16" rx="3" fill="#0e1411"/>
<text x="${RACK_X + RACK_W / 2}" y="${RACK_Y + 20}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="bold" letter-spacing="2" fill="#7f9487">SRV-01</text>
${units}
<circle cx="${RACK_X + 176}" cy="${deadY}" r="130" fill="url(#redGlow)" style="mix-blend-mode: screen"/>

<!-- The alarm clock on the floor: 3:00 -->
<g filter="url(#shadow)">
  <rect x="620" y="478" width="196" height="96" rx="16" fill="#171717" stroke="#2e2e2e" stroke-width="2"/>
</g>
<rect x="636" y="492" width="164" height="68" rx="8" fill="#070707"/>
<text x="712" y="548" text-anchor="middle" font-family="'Courier New', Courier, monospace" font-size="54" font-weight="bold" fill="#ff3b3b" filter="url(#digits)">3:00</text>
<text x="784" y="510" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="bold" fill="#ff3b3b">AM</text>
<rect x="640" y="574" width="20" height="4" rx="2" fill="#2e2e2e"/>
<rect x="776" y="574" width="20" height="4" rx="2" fill="#2e2e2e"/>

<!-- The happy pills -->
<g filter="url(#shadow)">
  <rect x="1104" y="488" width="60" height="88" rx="9" fill="url(#bottle)" opacity="0.95"/>
</g>
<rect x="1097" y="468" width="74" height="24" rx="5" fill="#f3f2ec"/>
<g stroke="#d6d4ca" stroke-width="2">
  <line x1="1106" y1="472" x2="1106" y2="488"/><line x1="1116" y1="472" x2="1116" y2="488"/><line x1="1126" y1="472" x2="1126" y2="488"/>
  <line x1="1136" y1="472" x2="1136" y2="488"/><line x1="1146" y1="472" x2="1146" y2="488"/><line x1="1156" y1="472" x2="1156" y2="488"/>
</g>
<rect x="1110" y="506" width="48" height="48" rx="3" fill="#fbfaf5"/>
<text x="1134" y="522" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="bold" fill="#1b1d1a">HAPPY</text>
<text x="1134" y="534" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="bold" fill="#1b1d1a">PILLS</text>
<text x="1134" y="547" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="6.5" fill="#62675f">TAKE 1 DAILY</text>
<ellipse cx="1088" cy="573" rx="8" ry="4.5" fill="#f3f2ec"/>
<ellipse cx="1178" cy="574" rx="8" ry="4.5" fill="#93c5fd" transform="rotate(-18 1178 574)"/>

<!-- The error box -->
<g filter="url(#shadow)">
  <rect x="584" y="150" width="324" height="150" rx="8" fill="#f4f5f1" stroke="#0f2a1c" stroke-width="2"/>
</g>
<path d="M 584 158 a 8 8 0 0 1 8 -8 h 308 a 8 8 0 0 1 8 8 v 28 h -324 z" fill="#1d7a4a"/>
<text x="600" y="174" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="bold" fill="#fff">srv01.exe</text>
<rect x="874" y="156" width="24" height="24" rx="4" fill="#dc2626"/>
<path d="M 880 162 l 12 12 M 892 162 l -12 12" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
<path d="M 620 206 l 18 32 h -36 z" fill="#facc15" stroke="#1b1d1a" stroke-width="2" stroke-linejoin="round"/>
<text x="620" y="233" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="bold" fill="#1b1d1a">!</text>
<text x="652" y="216" font-family="Arial, Helvetica, sans-serif" font-size="19" fill="#1b1d1a">Server stopped responding.</text>
<text x="652" y="240" font-family="Arial, Helvetica, sans-serif" font-size="19" fill="#1b1d1a">Again.</text>
<rect x="652" y="256" width="104" height="32" rx="5" fill="#fff" stroke="#1b1d1a" stroke-width="2"/>
<text x="704" y="277" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="bold" fill="#1b1d1a">Restart</text>
<rect x="766" y="256" width="128" height="32" rx="5" fill="#fff" stroke="#1b1d1a" stroke-width="2"/>
<text x="830" y="277" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="bold" fill="#1b1d1a">Go back to bed</text>
</svg>`;

const preview = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
html, body { margin: 0; width: ${OG_W}px; height: ${OG_H}px; overflow: hidden; }
body {
  position: relative;
  background:
    linear-gradient(180deg, #2c3d33, #1b2620) 0 ${DESK}px / 100% 4px no-repeat,
    linear-gradient(180deg, #111814 0%, #070a08 100%) 0 ${DESK}px / 100% ${OG_H - DESK}px no-repeat,
    linear-gradient(180deg, #13201a 0%, #0d1612 60%, #0a110d 100%);
  color: #f2efe6;
  font-family: Georgia, serif;
}
.art { position: absolute; left: 0; top: 0; }
.words { position: absolute; left: 72px; top: 84px; width: 500px; }
.kicker { margin: 0 0 18px; font: bold 17px Arial, Helvetica, sans-serif; letter-spacing: 0.24em; color: #8fa597; }
h1 { margin: 0; font-size: 150px; line-height: 0.9; letter-spacing: -4px; font-weight: bold; }
h1 em { display: block; font-size: 112px; letter-spacing: -2px; color: #4ade80; }
.tagline { margin: 26px 0 0; font-size: 30px; line-height: 1.25; font-style: italic; color: #cfd8d1; }
.byline { position: absolute; left: 72px; top: ${DESK + 16}px; margin: 0; font: bold 15px Arial, Helvetica, sans-serif; letter-spacing: 0.24em; color: #6f8577; }
</style>
</head>
<body>
${art}
<div class="words">
<p class="kicker">AN R-RATED PICK-YOUR-PATH COMEDY</p>
<h1>Root <em>Access</em></h1>
<p class="tagline">Six weeks on happy pills.<br>One server that dies at<br>3:00 a.m. every night.</p>
</div>
<p class="byline">PLAY FREE IN YOUR BROWSER · MADE BY NIKHILMATH.COM</p>
</body>
</html>
`;

// The icons are drawn onto canvases in the page, which then prints each one
// as a PNG data URL for --dump-dom to hand back.
const icons = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body>
<pre id="out"></pre>
<script>
const img = new Image();
img.onload = () => {
  const out = {};
  for (const size of ${JSON.stringify(ICO_SIZES)}) {
    const c = Object.assign(document.createElement("canvas"), { width: size, height: size });
    c.getContext("2d").drawImage(img, 0, 0, size, size);
    out[size] = c.toDataURL("image/png");
  }
  // Phones crop home-screen icons to their own rounded shape and fill any
  // clear corners with black, so this one gets the server-room dark behind it.
  const c = Object.assign(document.createElement("canvas"), { width: ${TOUCH}, height: ${TOUCH} });
  const g = c.getContext("2d");
  const bg = g.createLinearGradient(0, 0, 0, ${TOUCH});
  bg.addColorStop(0, "#1b2a22");
  bg.addColorStop(1, "#0a110d");
  g.fillStyle = bg;
  g.fillRect(0, 0, ${TOUCH}, ${TOUCH});
  const inset = ${TOUCH} * 0.16;
  g.drawImage(img, inset, inset, ${TOUCH} - 2 * inset, ${TOUCH} - 2 * inset);
  out.touch = c.toDataURL("image/png");
  document.getElementById("out").textContent = JSON.stringify(out);
};
img.src = "data:image/svg+xml;base64,${Buffer.from(icon).toString("base64")}";
</script>
</body>
</html>
`;

// An .ico file is a small header, one entry per size, then each size's PNG.
function ico(pngs) {
  const header = Buffer.alloc(6 + 16 * pngs.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach(({ size, data }, i) => {
    const at = 6 + 16 * i;
    header.writeUInt8(size % 256, at);
    header.writeUInt8(size % 256, at + 1);
    header.writeUInt16LE(1, at + 4);
    header.writeUInt16LE(32, at + 6);
    header.writeUInt32LE(data.length, at + 8);
    header.writeUInt32LE(offset, at + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...pngs.map((p) => p.data)]);
}

const browser = ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"].find(fs.existsSync);
if (!browser) throw new Error("Needs Google Chrome or Microsoft Edge to draw the site images");
const work = fs.mkdtempSync(path.join(os.tmpdir(), "root-access-site-"));
fs.writeFileSync(path.join(work, "preview.html"), preview);
fs.writeFileSync(path.join(work, "icons.html"), icons);
const run = (args, done) => {
  let stdout = "";
  const child = spawn(browser, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--hide-scrollbars",
    "--user-data-dir=" + path.join(work, "profile"), ...args], { stdio: ["ignore", "pipe", "ignore"] });
  child.stdout.on("data", (d) => (stdout += d));
  child.on("exit", () => done(stdout));
};
const fromDataUrl = (url) => Buffer.from(url.split(",")[1], "base64");

const og = path.join(root, "social-preview.png");
fs.rmSync(og, { force: true });
run([`--window-size=${OG_W},${OG_H}`, "--force-device-scale-factor=1", "--screenshot=" + og, "file://" + path.join(work, "preview.html")], () => {
  console.log(fs.existsSync(og) ? `Wrote social-preview.png: ${OG_W} x ${OG_H}.` : "The browser did not write " + og);
  run(["--virtual-time-budget=5000", "--dump-dom", "file://" + path.join(work, "icons.html")], (dom) => {
    fs.rmSync(work, { recursive: true, force: true });
    const json = (dom.match(/<pre id="out">([\s\S]*?)<\/pre>/) || [])[1];
    if (!json) { console.error("The browser did not draw the icons"); process.exit(1); }
    const out = JSON.parse(json.replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
    fs.writeFileSync(path.join(root, "favicon.ico"), ico(ICO_SIZES.map((size) => ({ size, data: fromDataUrl(out[size]) }))));
    fs.writeFileSync(path.join(root, "apple-touch-icon.png"), fromDataUrl(out.touch));
    console.log(`Wrote favicon.ico: ${ICO_SIZES.join(", ")} px. Wrote apple-touch-icon.png: ${TOUCH} x ${TOUCH}.`);
  });
});
