/* ============================================================
   THREAT MODELING GUIDE — APP JS
   Navigation, tabs, quizzes, presentation mode
   ============================================================ */

// ── Active nav highlighting ──
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(el => {
    const href = el.getAttribute('href') || '';
    const match = href.split('/').pop();
    el.classList.toggle('active', match === path);
  });
}

// ── Progress bar ──
function updateProgress() {
  const pages = [
    'index.html',
    'modules/01-introduction.html',
    'modules/02-core-concepts.html',
    'modules/03-stride.html',
    'modules/04-process.html',
    'modules/05-basic-apps.html',
    'modules/06-web-apps.html',
    'modules/07-cloud.html',
    'modules/08-agentic.html',
    'modules/09-risk-mitigation.html',
    'modules/10-capstone.html',
  ];
  const visited = JSON.parse(localStorage.getItem('tm-visited') || '[]');
  const current = window.location.pathname.split('/').slice(-2).join('/');
  const fullPath = current.includes('/') ? current : current;

  // Mark current page as visited
  const pageName = window.location.pathname.split('/').filter(Boolean).slice(-2).join('/');
  if (!visited.includes(pageName)) {
    visited.push(pageName);
    localStorage.setItem('tm-visited', JSON.stringify(visited));
  }

  const pct = Math.round((visited.length / pages.length) * 100);
  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-pct');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = pct + '%';
}

// ── Tabs ──
function initTabs() {
  document.querySelectorAll('.tab-list').forEach(list => {
    list.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        const tabsEl = btn.closest('.tabs');
        tabsEl.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        tabsEl.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        tabsEl.querySelector(`[data-panel="${target}"]`).classList.add('active');
      });
    });
  });
}

// ── Quiz / Exercises ──
function initQuizzes() {
  document.querySelectorAll('.exercise-card').forEach(card => {
    const correct = card.dataset.correct;
    const feedback = card.querySelector('.exercise-feedback');
    card.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (card.querySelector('.correct, .wrong')) return; // already answered
        const val = btn.dataset.value;
        if (val === correct) {
          btn.classList.add('correct');
          if (feedback) {
            feedback.classList.add('show', 'correct');
            feedback.innerHTML = '✅ ' + (card.dataset.feedbackCorrect || 'Correct!');
          }
        } else {
          btn.classList.add('wrong');
          card.querySelector(`[data-value="${correct}"]`)?.classList.add('correct');
          if (feedback) {
            feedback.classList.add('show', 'wrong');
            feedback.innerHTML = '❌ ' + (card.dataset.feedbackWrong || 'Not quite — see the highlighted answer.');
          }
        }
      });
    });
  });
}

// ── Checklist ──
function initChecklists() {
  document.querySelectorAll('.checklist li').forEach(li => {
    li.addEventListener('click', () => li.classList.toggle('checked'));
  });
}

// ── Presentation Mode ──
let presentMode = false;
const sections = [];
let currentSection = 0;

function collectSections() {
  sections.length = 0;
  document.querySelectorAll('.section').forEach((s, i) => {
    sections.push(s);
    s.dataset.sectionIdx = i;
  });
}

function showSection(idx) {
  sections.forEach((s, i) => {
    s.style.display = (i === idx) ? '' : 'none';
  });
  currentSection = idx;
  const counter = document.getElementById('slide-counter');
  if (counter) counter.textContent = `${idx + 1} / ${sections.length}`;

  // Re-render mermaid if needed
  if (window.mermaid) {
    window.mermaid.init(undefined, document.querySelectorAll('.section:not([style*="none"]) .mermaid'));
  }
}

function enterPresent() {
  presentMode = true;
  document.body.classList.add('present-mode');
  collectSections();
  showSection(0);
  window.scrollTo(0, 0);

  const btn = document.getElementById('btn-present');
  if (btn) btn.innerHTML = '✕ Exit';

  // Show live badge
  const badge = document.getElementById('live-badge');
  if (badge) badge.style.display = 'inline-flex';
}

function exitPresent() {
  presentMode = false;
  document.body.classList.remove('present-mode');
  sections.forEach(s => (s.style.display = ''));
  const btn = document.getElementById('btn-present');
  if (btn) btn.innerHTML = '🎬 Present';
  const badge = document.getElementById('live-badge');
  if (badge) badge.style.display = 'none';
}

function togglePresent() {
  presentMode ? exitPresent() : enterPresent();
}

function initPresentation() {
  const btn = document.getElementById('btn-present');
  if (btn) btn.addEventListener('click', togglePresent);

  document.getElementById('prev-slide')?.addEventListener('click', () => {
    if (currentSection > 0) showSection(currentSection - 1);
  });
  document.getElementById('next-slide')?.addEventListener('click', () => {
    if (currentSection < sections.length - 1) showSection(currentSection + 1);
  });
  document.getElementById('exit-present')?.addEventListener('click', exitPresent);

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!presentMode) return;
    if (e.key === 'ArrowRight' || e.key === ' ') showSection(Math.min(currentSection + 1, sections.length - 1));
    if (e.key === 'ArrowLeft') showSection(Math.max(currentSection - 1, 0));
    if (e.key === 'Escape') exitPresent();
  });
}

// ── Mobile sidebar ──
function initMobile() {
  const ham = document.getElementById('hamburger');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:99;display:none;';
  document.body.appendChild(overlay);

  ham?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
  });
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.style.display = 'none';
  });
}

// ── Smooth scroll for anchor links ──
function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Animate on scroll ──
function initAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate-in'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.card, .callout, .step, .threat-item').forEach(el => {
    observer.observe(el);
  });
}

// ── Init all ──
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  updateProgress();
  initTabs();
  initQuizzes();
  initChecklists();
  initPresentation();
  initMobile();
  initAnchors();
  initAnimations();
});
