const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
      el.style.width = el.dataset.width;
      skillObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });
skillFills.forEach(el => skillObserver.observe(el));

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(sec => navObserver.observe(sec));

const fadeEls = document.querySelectorAll('.skill-card, .project-item, .stat-item, .about-photo-wrap');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = (i * 0.07) + 's';
      entry.target.classList.add('fade-in-up');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => fadeObserver.observe(el));

navAnchors.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

let lastScroll = 0;
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 80) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScroll = current;
});