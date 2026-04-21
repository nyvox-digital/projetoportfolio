// ── NAV scroll effect
const nb = document.getElementById('navbar');
window.addEventListener('scroll', () => nb.classList.toggle('scrolled', scrollY > 50));

// ── Hamburger / mobile menu
const hb = document.getElementById('hamburger');
const mm = document.getElementById('mobile-menu');
hb.addEventListener('click', () => {
  hb.classList.toggle('open');
  mm.classList.toggle('open');
  document.body.style.overflow = mm.classList.contains('open') ? 'hidden' : '';
});
function closeMenu() {
  hb.classList.remove('open');
  mm.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Scroll reveal
const obs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
// Hero reveals immediately
setTimeout(() => {
  document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('visible'));
}, 80);

// ── Carousel (depoimentos)
const track  = document.getElementById('carTrack');
const slides = track.querySelectorAll('.tslide');
const dotsC  = document.getElementById('cDots');
let cur = 0, timer;

// Build dots
slides.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'c-dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => goTo(i));
  dotsC.appendChild(d);
});

function goTo(n) {
  cur = (n + slides.length) % slides.length;
  track.style.transform = `translateX(-${cur * 100}%)`;
  dotsC.querySelectorAll('.c-dot').forEach((d, i) => d.classList.toggle('active', i === cur));
  resetTimer();
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(() => goTo(cur + 1), 4500);
}

document.getElementById('cPrev').addEventListener('click', () => goTo(cur - 1));
document.getElementById('cNext').addEventListener('click', () => goTo(cur + 1));

// Touch swipe support
let tx = 0;
track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; });
track.addEventListener('touchend',   e => {
  const dx = tx - e.changedTouches[0].clientX;
  if (Math.abs(dx) > 40) goTo(dx > 0 ? cur + 1 : cur - 1);
});

resetTimer();