// ==========================================
// YAVIN - Main JavaScript
// ==========================================

// ---- Navbar Scroll Effect ----
window.addEventListener('scroll', function () {
  const nav = document.getElementById('main-nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  // Back to Top
  const btn = document.getElementById('back-to-top');
  if (btn) {
    if (window.scrollY > 400) btn.classList.add('show');
    else btn.classList.remove('show');
  }
});

// ---- Stat Counter Animation ----
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, duration / steps);
  });
}

let counted = false;
const statsSection = document.getElementById('stats');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      animateCounters();
    }
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

// ---- Active Nav on Scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#main-nav .nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ---- Contact Form Send ----
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
  sendBtn.addEventListener('click', function () {
    const inputs = document.querySelectorAll('#contact .form-control');
    let valid = true;
    inputs.forEach(i => {
      if (!i.value.trim()) {
        valid = false;
        i.style.borderColor = '#dc3545';
      } else {
        i.style.borderColor = '#4154f1';
      }
    });
    if (valid) {
      sendBtn.textContent = '✓ Message Sent!';
      sendBtn.style.background = '#28a745';
      inputs.forEach(i => { i.value = ''; i.style.borderColor = ''; });
      setTimeout(() => {
        sendBtn.textContent = 'Send';
        sendBtn.style.background = '';
      }, 3000);
    }
  });
}
