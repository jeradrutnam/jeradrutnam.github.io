// ── NAV SCROLL + ACTIVE HASH HIGHLIGHT ──
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
}, { passive: true });

function updateActiveNav() {
  const sections = ['hero', 'about', 'expertise', 'speaking', 'connect'];
  let current = 'hero';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 120) current = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

updateActiveNav();

// ── CANVAS PARTICLES ──
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let W, H, pts, mouse = { x: -999, y: -999 };

function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }

function Pt() {
  this.x = Math.random() * W; this.y = Math.random() * H;
  this.vx = (Math.random() - .5) * .35; this.vy = (Math.random() - .5) * .35;
  this.r = Math.random() * 1.2 + .4;
  this.c = ['#8B2FFF', '#00CFFF', '#FF2D6B', '#5A1AB0'][0 | (Math.random() * 4)];
  this.a = Math.random() * .55 + .1;
}

Pt.prototype.tick = function () {
  this.x += this.vx; this.y += this.vy;
  if (this.x < 0) this.x = W; if (this.x > W) this.x = 0;
  if (this.y < 0) this.y = H; if (this.y > H) this.y = 0;
};

function initPts() { pts = Array.from({ length: 100 }, () => new Pt()); }

function drawPts() {
  ctx.clearRect(0, 0, W, H);
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
      if (d < 130) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(139,47,255,${.1 * (1 - d / 130)})`;
        ctx.lineWidth = .4;
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.stroke();
      }
    }
    const mdx = pts[i].x - mouse.x, mdy = pts[i].y - mouse.y, md = Math.sqrt(mdx * mdx + mdy * mdy);
    if (md < 150) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(0,207,255,${.22 * (1 - md / 150)})`;
      ctx.lineWidth = .6;
      ctx.moveTo(pts[i].x, pts[i].y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
    pts[i].tick();
    ctx.beginPath();
    ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2);
    ctx.fillStyle = pts[i].c;
    ctx.globalAlpha = pts[i].a;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  requestAnimationFrame(drawPts);
}

window.addEventListener('resize', () => { resize(); initPts(); }, { passive: true });
document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
resize();
initPts();
drawPts();

// ── PARALLAX ──
const pEls = [
  { el: document.getElementById('orb1'), d: .05 },
  { el: document.getElementById('orb2'), d: .08 },
  { el: document.getElementById('orb3'), d: .03 },
  { el: document.getElementById('gridplane'), d: .14 },
  { el: document.getElementById('photowrap'), d: .04 },
];

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const sy = window.scrollY;
      pEls.forEach(p => { if (p.el) p.el.style.transform = `translateY(${sy * p.d}px)`; });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// ── TYPEWRITER ──
const roles = ['UI/UX Specialist', 'Frontend Engineer', 'Design Systems Architect', 'Open Source Contributor', 'Conference Speaker'];
let ri = 0, ci = 0, del = false;
const tw = document.getElementById('tw');

function type() {
  const cur = roles[ri];
  if (!del) {
    tw.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) { del = true; setTimeout(type, 1600); return; }
    setTimeout(type, 70);
  } else {
    tw.textContent = cur.slice(0, --ci);
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; setTimeout(type, 280); return; }
    setTimeout(type, 38);
  }
}
type();

// ── SCROLL REVEALS ──
const revEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revEls.forEach(el => io.observe(el));
