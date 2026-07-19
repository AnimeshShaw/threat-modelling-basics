# Contributing to Threat Modeling Basics Guide

Thank you for considering contributing to the **Threat Modeling Guide**! We welcome contributions from educators, security practitioners, developers, and students.

---

## 📜 Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [How Can I Contribute?](#how-can-i-contribute)
   - [Reporting Bugs](#reporting-bugs)
   - [Suggesting Content Improvements](#suggesting-content-improvements)
   - [Submitting Pull Requests](#submitting-pull-requests)
3. [Development & Design Guidelines](#development--design-guidelines)
4. [Module Content Structure](#module-content-structure)

---

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## 💡 How Can I Contribute?

### Reporting Bugs
If you find a typo, broken link, layout issue, or incorrect security advice:
1. Search existing [GitHub Issues](https://github.com/AnimeshShaw/threat-modelling-basics/issues) to avoid duplicates.
2. If no issue exists, open a new one using the **Bug Report** template.
3. Provide details on browser/OS, page URL, and steps to reproduce.

### Suggesting Content Improvements
Security best practices evolve over time. If you have an idea for a new module, exercise, or updated threat model (e.g., new AI/LLM attack patterns):
1. Open a **Feature Request** issue describing your idea.
2. Discuss the proposed changes before submitting a PR for major structural additions.

### Submitting Pull Requests
1. Fork the repository and create your feature branch:
   ```bash
   git checkout -b feature/awesome-new-topic
   ```
2. Make your changes adhering to our design and code style.
3. Test locally by opening `index.html` or running `python -m http.server`.
4. Commit with clear, descriptive commit messages:
   ```bash
   git commit -m "docs(m08): add OWASP LLM Top 10 2025 references"
   ```
5. Push to your fork and submit a Pull Request to `main`.

---

## 🎨 Development & Design Guidelines

- **Vanilla Stack**: The application uses pure HTML5, CSS3, and JavaScript without build heavy dependencies. Keep it lightweight and performant.
- **CSS Design System**: Always use CSS variables defined in `css/styles.css` (`var(--primary)`, `var(--bg-main)`, `var(--radius-lg)`, etc.). Do not hardcode ad-hoc inline styles.
- **Dark/Light Mode**: Test changes in both light mode and dark mode to ensure high contrast and readability.
- **Accessibility**: Use semantic HTML elements (`<main>`, `<aside>`, `<nav>`, `<header>`), aria-labels for buttons, and ensure contrast ratios meet WCAG AA standards.
- **Mobile Responsive**: Verify mobile layout drawer responsiveness (`max-width: 768px`).

---

## 📄 Module Content Structure

Each module file inside `modules/` follows a standardized layout:
```html
<!DOCTYPE html>
<html lang="en" data-theme="auto">
<head>
  <!-- Standard meta tags & styles -->
</head>
<body>
  <aside class="sidebar"><!-- Navigation Sidebar --></aside>
  <div class="main-wrap">
    <header class="top-bar"><!-- Header actions: Theme toggle, Search --></header>
    <main class="content">
      <!-- Page Header -->
      <!-- Learning Objectives -->
      <!-- Sections (data-title="Section Title") -->
      <!-- Interactive Exercises -->
      <!-- Summary Callout -->
      <!-- Page Navigation (Prev / Next) -->
    </main>
  </div>
  <!-- Presenter Toolbar -->
  <script src="../js/app.js"></script>
</body>
</html>
```

Thank you for helping make threat modeling education accessible to everyone! 🛡️
