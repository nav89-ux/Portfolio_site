document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu on link click (mobile)
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.length <= 1) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const caseStudyModal = document.getElementById('debateDashCaseStudy');
  const caseStudyOpeners = document.querySelectorAll('[data-case-study-open]');
  const caseStudyClosers = document.querySelectorAll('[data-case-study-close]');
  let caseStudyTrigger = null;

  const closeCaseStudy = () => {
    if (!caseStudyModal) return;
    caseStudyModal.classList.remove('is-open');
    caseStudyModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (caseStudyTrigger) caseStudyTrigger.focus();
  };

  caseStudyOpeners.forEach((opener) => {
    opener.addEventListener('click', () => {
      if (!caseStudyModal) return;
      caseStudyTrigger = opener;
      caseStudyModal.classList.add('is-open');
      caseStudyModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      caseStudyModal.querySelector('.case-study-modal__close').focus();
    });
  });

  caseStudyClosers.forEach((closer) => closer.addEventListener('click', closeCaseStudy));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && caseStudyModal && caseStudyModal.classList.contains('is-open')) closeCaseStudy();
  });
});
