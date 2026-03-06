// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '6px';
    cursor.style.height = '6px';
    ring.style.width = '60px';
    ring.style.height = '60px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    ring.style.width = '40px';
    ring.style.height = '40px';
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 100 * (Array.from(entry.target.parentNode.children).indexOf(entry.target) % 4));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// Counter animation
const stats = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = el.textContent;
      const num = parseInt(target.replace(/\D/g, ''));
      const suffix = target.replace(/[\d]/g, '');
      let current = 0;
      const inc = num / 50;
      const timer = setInterval(() => {
        current += inc;
        if (current >= num) {
          current = num;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
      }, 30);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

stats.forEach(el => counterObserver.observe(el));

// Carousel
const track = document.getElementById('carouselTrack');
const cards = track.querySelectorAll('.testimony-card');
const dotsContainer = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const total = cards.length;
let current = 0;
let autoTimer;

// Create dots
cards.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

function goTo(index) {
  cards[current].classList.remove('active');
  dotsContainer.children[current].classList.remove('active');
  current = (index + total) % total;
  const cardWidth = 860;
  track.style.transform = `translateX(-${current * cardWidth}px)`;
  cards[current].classList.add('active');
  dotsContainer.children[current].classList.add('active');
}

function startAuto() {
  autoTimer = setInterval(() => goTo(current + 1), 4000);
}
function stopAuto() { clearInterval(autoTimer); }

prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

// Pause on hover
track.addEventListener('mouseenter', stopAuto);
track.addEventListener('mouseleave', startAuto);

startAuto();

// Recalculate on resize
window.addEventListener('resize', () => goTo(current));
