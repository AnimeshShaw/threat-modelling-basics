/* ============================================================
   THREAT MODELING GUIDE — APPLICATION JS
   Theme Switcher, Instant Search (Ctrl+K), Presentation Mode,
   Interactive Quizzes, Copy Buttons, and Mermaid Initialization
   ============================================================ */

// ── Search Index Data ──
const SEARCH_INDEX = [
  { title: 'What is Threat Modeling?', module: 'Module 01', url: 'modules/01-introduction.html', snippet: 'Thinking like an attacker, house analogy, 4 key questions, NIST bug cost curve' },
  { title: 'Core Concepts', module: 'Module 02', url: 'modules/02-core-concepts.html', snippet: 'Assets, Threats, Vulnerabilities, Risk equation, Attack surface, Trust boundaries' },
  { title: 'STRIDE Framework', module: 'Module 03', url: 'modules/03-stride.html', snippet: 'Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege' },
  { title: 'Threat Modeling Process', module: 'Module 04', url: 'modules/04-process.html', snippet: 'DFD elements, Scope, Threat enumeration, Risk scoring, Mitigation planning' },
  { title: 'Basic Applications', module: 'Module 05', url: 'modules/05-basic-apps.html', snippet: 'Monolithic authentication app, CRUD API threat modeling, session management' },
  { title: 'Web Applications & APIs', module: 'Module 06', url: 'modules/06-web-apps.html', snippet: 'Multi-tier web architecture, OAuth 2.0, OWASP Top 10, REST API security, Microservices' },
  { title: 'Cloud Architecture', module: 'Module 07', url: 'modules/07-cloud.html', snippet: 'Shared responsibility model, IAM, S3 storage threats, Containers, Kubernetes, Serverless' },
  { title: 'AI & Agentic Systems', module: 'Module 08', url: 'modules/08-agentic.html', snippet: 'LLM agents, Direct & Indirect Prompt Injection, Tool Misuse, Multi-agent trust, Defense in Depth' },
  { title: 'Risk Scoring & Mitigation', module: 'Module 09', url: 'modules/09-risk-mitigation.html', snippet: 'DREAD methodology, CVSS scores, Risk matrices, Defense in Depth, Residual risk' },
  { title: 'Capstone Exercise', module: 'Module 10', url: 'modules/10-capstone.html', snippet: 'FinTech Platform capstone threat model, Cloud + APIs + AI Agents end-to-end exercise' },
  { title: 'Threat Model Template', module: 'Reference', url: 'THREAT_MODEL_TEMPLATE.md', snippet: 'Downloadable production-grade Markdown threat model template' },
  { title: 'STRIDE Cheat Sheet', module: 'Reference', url: 'STRIDE_CHEAT_SHEET.md', snippet: 'Printable reference matrix mapping STRIDE to DFD elements and mitigations' }
];

// ── Theme Switcher ──
function initTheme() {
  const savedTheme = localStorage.getItem('tm-theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', initialTheme);
  updateThemeButtonIcon(initialTheme);

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('tm-theme', next);
      updateThemeButtonIcon(next);
    });
  }
}

function updateThemeButtonIcon(theme) {
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }
}

// ── Active Nav & Progress ──
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(el => {
    const href = el.getAttribute('href') || '';
    const match = href.split('/').pop();
    el.classList.toggle('active', match === path);
  });
}

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
    'modules/10-capstone.html'
  ];
  
  const visited = JSON.parse(localStorage.getItem('tm-visited') || '[]');
  const currentPage = window.location.pathname.split('/').slice(-2).join('/') || 'index.html';

  if (!visited.includes(currentPage)) {
    visited.push(currentPage);
    localStorage.setItem('tm-visited', JSON.stringify(visited));
  }

  const pct = Math.round((visited.length / pages.length) * 100);
  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-pct');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = pct + '%';
}

// ── Search Modal (Ctrl + K) ──
function initSearchModal() {
  const modalHTML = `
    <div class="search-modal-overlay" id="search-modal-overlay">
      <div class="search-modal">
        <div class="search-input-header">
          <span>🔍</span>
          <input type="text" id="search-input" placeholder="Search modules, concepts, STRIDE, threats... (Esc to close)" />
        </div>
        <div class="search-results-list" id="search-results-list"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const overlay = document.getElementById('search-modal-overlay');
  const input = document.getElementById('search-input');
  const resultsList = document.getElementById('search-results-list');
  const searchTriggers = document.querySelectorAll('#search-trigger, .search-trigger-btn');

  function openSearch() {
    overlay.classList.add('open');
    input.value = '';
    input.focus();
    renderSearchResults('');
  }

  function closeSearch() {
    overlay.classList.remove('open');
  }

  searchTriggers.forEach(btn => btn.addEventListener('click', openSearch));

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      overlay.classList.contains('open') ? closeSearch() : openSearch();
    }
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeSearch();
    }
  });

  input.addEventListener('input', e => renderSearchResults(e.target.value.trim().toLowerCase()));

  function renderSearchResults(query) {
    resultsList.innerHTML = '';
    const isModuleDir = window.location.pathname.includes('/modules/');
    const prefix = isModuleDir ? '../' : '';

    const filtered = SEARCH_INDEX.filter(item => 
      !query || 
      item.title.toLowerCase().includes(query) || 
      item.snippet.toLowerCase().includes(query) ||
      item.module.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      resultsList.innerHTML = `<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:14px;">No results found for "${query}"</div>`;
      return;
    }

    filtered.forEach(item => {
      const href = prefix + item.url;
      const el = document.createElement('a');
      el.className = 'search-result-item';
      el.href = href;
      el.innerHTML = `
        <div class="res-module">${item.module}</div>
        <div class="res-title">${item.title}</div>
        <div class="res-snippet">${item.snippet}</div>
      `;
      el.addEventListener('click', closeSearch);
      resultsList.appendChild(el);
    });
  }
}

// ── Copy to Clipboard for Code Blocks ──
function initCopyButtons() {
  document.querySelectorAll('pre').forEach(pre => {
    const wrapper = document.createElement('div');
    wrapper.className = 'code-container';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.innerHTML = '📋 Copy';
    wrapper.appendChild(btn);

    btn.addEventListener('click', () => {
      const code = pre.querySelector('code')?.innerText || pre.innerText;
      navigator.clipboard.writeText(code).then(() => {
        btn.innerHTML = '✅ Copied!';
        setTimeout(() => (btn.innerHTML = '📋 Copy'), 2000);
      });
    });
  });
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
        tabsEl.querySelector(`[data-panel="${target}"]`)?.classList.add('active');
      });
    });
  });
}

// ── Quizzes / Exercises ──
function initQuizzes() {
  document.querySelectorAll('.exercise-card').forEach(card => {
    const correct = card.dataset.correct;
    const feedback = card.querySelector('.exercise-feedback');
    card.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (card.querySelector('.correct, .wrong')) return;
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
            feedback.innerHTML = '❌ ' + (card.dataset.feedbackWrong || 'Incorrect. See the highlighted answer.');
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
    s.style.display = i === idx ? '' : 'none';
  });
  currentSection = idx;
  const counter = document.getElementById('slide-counter');
  if (counter) counter.textContent = `${idx + 1} / ${sections.length}`;
}

function enterPresent() {
  presentMode = true;
  document.body.classList.add('present-mode');
  collectSections();
  showSection(0);
  window.scrollTo(0, 0);

  const btn = document.getElementById('btn-present');
  if (btn) btn.innerHTML = '✕ Exit';
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

  document.addEventListener('keydown', e => {
    if (e.key === 'f' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
      togglePresent();
    }
    if (!presentMode) return;
    if (e.key === 'ArrowRight' || e.key === ' ') showSection(Math.min(currentSection + 1, sections.length - 1));
    if (e.key === 'ArrowLeft') showSection(Math.max(currentSection - 1, 0));
    if (e.key === 'Escape') exitPresent();
  });
}

// ── Mobile Sidebar ──
function initMobile() {
  const ham = document.getElementById('hamburger');
  const sidebar = document.querySelector('.sidebar');
  if (!ham || !sidebar) return;

  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99;display:none;';
  document.body.appendChild(overlay);

  ham.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.style.display = 'none';
  });
}

// ── Init All ──
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setActiveNav();
  updateProgress();
  initSearchModal();
  initCopyButtons();
  initTabs();
  initQuizzes();
  initChecklists();
  initPresentation();
  initMobile();
});
