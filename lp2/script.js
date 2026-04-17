  // Navbar scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // Stats animation
  const statCards = document.querySelectorAll('.stat-card');
  setTimeout(() => {
    statCards.forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), 800 + i * 200);
    });
  }, 400);

  // Counter animation
  function animateCounter(el, target, suffix = '') {
    const isPercent = suffix === '%';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = (isPercent ? Math.floor(current) : Math.floor(current).toLocaleString('pt-BR')) + suffix;
    }, 16);
  }

  const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.sobre-metric-n, .stat-num');
        nums.forEach(num => {
          const text = num.textContent;
          if (text.includes('%')) animateCounter(num, parseInt(text), '%');
          else if (text.includes('+')) {
            const val = parseInt(text.replace(/\D/g, ''));
            animateCounter(num, val, '+');
          }
        });
        metricObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('#sobre, #hero').forEach(el => metricObserver.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
