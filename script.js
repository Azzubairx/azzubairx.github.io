/* ================================================================
   script.js — عزوبير حسين | Freelance Language Services
   ================================================================
   الوظائف:
   1. تبديل قائمة الجوال (Mobile nav toggle)
   2. تظليل رابط التنقل النشط (Active nav link)
   3. تأثير التمرير للـ Header (Sticky header shadow)
   4. زر العودة للأعلى (Scroll-to-top)
   5. عداد الأرقام المتحركة (Counter animation)
   6. أشرطة المهارات المتحركة (Skill bars animation)
   7. التحقق من نموذج الاتصال (Form validation)
   8. تحديث السنة في الفوتر (Footer year)
   9. تأثير الظهور عند التمرير (Scroll reveal)
================================================================ */

'use strict';

/* ----------------------------------------------------------------
   1. MOBILE NAV TOGGLE
---------------------------------------------------------------- */
const navToggle = document.getElementById('navToggle');
const navList   = document.getElementById('navList');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.innerHTML = isOpen
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
    navToggle.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');
  });

  // إغلاق القائمة عند النقر على أي رابط
  navList.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // إغلاق القائمة عند النقر خارجها
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove('open');
      navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
}

/* ----------------------------------------------------------------
   2. ACTIVE NAV LINK ON SCROLL
   ⚙️ لتعديل الإزاحة: غيّر قيمة OFFSET أدناه (بالبكسل)
---------------------------------------------------------------- */
const OFFSET = 90;
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav__link');

function updateActiveLink() {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top    = section.offsetTop - OFFSET;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav__link[href="#${section.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

/* ----------------------------------------------------------------
   3. STICKY HEADER SHADOW
---------------------------------------------------------------- */
const header = document.getElementById('header');

function handleScroll() {
  const y = window.scrollY;

  // Header shadow
  if (header) header.classList.toggle('scrolled', y > 50);

  // Scroll-to-top button
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', y > 400);

  // Active nav
  updateActiveLink();
}

window.addEventListener('scroll', handleScroll, { passive: true });

/* ----------------------------------------------------------------
   4. SCROLL-TO-TOP BUTTON
---------------------------------------------------------------- */
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ----------------------------------------------------------------
   5. COUNTER ANIMATION
   ⚙️ لتعديل سرعة العداد: غيّر قيمة DURATION (بالمللي ثانية)
---------------------------------------------------------------- */
const DURATION = 2000;

function animateCounter(el) {
  const target  = parseInt(el.getAttribute('data-target'), 10);
  const step    = target / (DURATION / 16);
  let current   = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

/* ----------------------------------------------------------------
   6. SKILL BARS ANIMATION
---------------------------------------------------------------- */
function animateSkillBars() {
  document.querySelectorAll('.skill__fill').forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = (width || 0) + '%';
  });
}

/* ----------------------------------------------------------------
   7. INTERSECTION OBSERVER — triggers counters, skill bars, reveal
---------------------------------------------------------------- */
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Counter numbers
    if (entry.target.classList.contains('hero__stats')) {
      entry.target.querySelectorAll('.stat__number').forEach(animateCounter);
      observer.unobserve(entry.target);
    }

    // Skill bars
    if (entry.target.classList.contains('about__skills')) {
      animateSkillBars();
      observer.unobserve(entry.target);
    }

    // Reveal animation
    if (entry.target.classList.contains('reveal')) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe targets
const heroStats  = document.querySelector('.hero__stats');
const aboutSkills = document.querySelector('.about__skills');

if (heroStats)   observer.observe(heroStats);
if (aboutSkills) observer.observe(aboutSkills);

// Observe reveal elements
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ----------------------------------------------------------------
   8. FORM VALIDATION
   ⚙️ لتغيير وجهة الإرسال: عدّل دالة handleFormSubmit
---------------------------------------------------------------- */
const form = document.getElementById('contactForm');

function showError(inputId, errorId, show) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (!input || !error) return;
  input.classList.toggle('error', show);
  error.classList.toggle('visible', show);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleFormSubmit(e) {
  e.preventDefault();

  const name    = document.getElementById('name');
  const email   = document.getElementById('email');
  const message = document.getElementById('message');
  const success = document.getElementById('formSuccess');

  let valid = true;

  // Validate name
  if (!name || name.value.trim().length < 2) {
    showError('name', 'nameError', true);
    valid = false;
  } else {
    showError('name', 'nameError', false);
  }

  // Validate email
  if (!email || !validateEmail(email.value.trim())) {
    showError('email', 'emailError', true);
    valid = false;
  } else {
    showError('email', 'emailError', false);
  }

  // Validate message
  if (!message || message.value.trim().length < 10) {
    showError('message', 'messageError', true);
    valid = false;
  } else {
    showError('message', 'messageError', false);
  }

  if (!valid) return;

  // ⚙️ هنا يمكنك إرسال البيانات إلى خادمك أو خدمة مثل Formspree:
  // مثال مع Formspree:
  // fetch('https://formspree.io/f/YOUR_FORM_ID', {
  //   method: 'POST',
  //   body: new FormData(form),
  //   headers: { 'Accept': 'application/json' }
  // })

  // محاكاة الإرسال
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال الرسالة';
    submitBtn.disabled  = false;
    form.reset();
    if (success) {
      success.classList.add('visible');
      setTimeout(() => success.classList.remove('visible'), 5000);
    }
  }, 1500);
}

if (form) form.addEventListener('submit', handleFormSubmit);

// Real-time validation feedback
['name', 'email', 'message'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const errEl = document.getElementById(`${id}Error`);
      if (errEl) errEl.classList.remove('visible');
    });
  }
});

/* ----------------------------------------------------------------
   9. FOOTER CURRENT YEAR
---------------------------------------------------------------- */
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ----------------------------------------------------------------
   10. SMOOTH SCROLL for anchor links
---------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ----------------------------------------------------------------
   11. ADD REVEAL CLASS TO CARDS FOR SCROLL ANIMATION
   (يضيف فئة reveal لبطاقات الخدمات والدفع عند التحميل)
---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = [
    '.service-card',
    '.payment-card',
    '.terms-col',
    '.terms-extra-card',
    '.cert-card'
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  // Re-observe after adding classes
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
