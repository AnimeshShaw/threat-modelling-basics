# 🛡️ Threat Modeling — Interactive Teaching & Reference Guide

[![Deploy to GitHub Pages](https://github.com/AnimeshShaw/threat-modelling-basics/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/AnimeshShaw/threat-modelling-basics/actions/workflows/deploy-pages.yml)
[![CI Validation](https://github.com/AnimeshShaw/threat-modelling-basics/actions/workflows/ci.yml/badge.svg)](https://github.com/AnimeshShaw/threat-modelling-basics/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Live_Site-GitHub_Pages-success?style=flat&logo=github)](https://AnimeshShaw.github.io/threat-modelling-basics/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> A modern, interactive, 10-module curriculum for learning and teaching **Threat Modeling** — from core fundamentals to **Cloud Architectures** and **AI Agentic Systems**.

---

## 🌟 Overview

**Threat Modeling** is the practice of systematically identifying, analyzing, and mitigating security threats before they become vulnerabilities in production. 

This repository contains a full, standalone web application and curriculum designed for both **self-paced learners** and **instructors teaching live workshops**.

### ✨ Features
- 📚 **10 Progressive Modules**: Covers Foundations, Application Security, Cloud Architectures, and AI Agentic Threat Modeling.
- 🎬 **Live Classroom Presentation Mode**: Turn any module into a fullscreen slide deck with a single click or keyboard shortcut (`F` or `Present` button).
- 🔍 **Instant Search (`Ctrl + K`)**: Command-palette search modal across all modules, topics, and exercises.
- 🌙 **Dark & Light Mode**: Curated dark and light themes with automatic system preference detection.
- ✏️ **Interactive Quizzes & Scenarios**: Test knowledge at every step with instant feedback.
- 📐 **30+ Architectural Diagrams**: Clear SVG and Mermaid.js diagrams illustrating data flows, trust boundaries, and attack vectors.
- 📄 **Practitioner Templates**: Ready-to-use [`THREAT_MODEL_TEMPLATE.md`](THREAT_MODEL_TEMPLATE.md) and [`STRIDE_CHEAT_SHEET.md`](STRIDE_CHEAT_SHEET.md) for your own projects.

---

## 🎓 Syllabus & Modules

| Module | Title | Level | Est. Time | Key Topics Covered |
|:---:|:---|:---:|:---:|:---|
| **01** | [**What is Threat Modeling?**](modules/01-introduction.html) | `Beginner` | ~20 min | The "why", NIST cost curve, Shostack's 4 questions, SDLC integration |
| **02** | [**Core Concepts**](modules/02-core-concepts.html) | `Beginner` | ~25 min | Assets, Threats, Vulnerabilities, Risk, Attack Surface, Trust Boundaries |
| **03** | [**STRIDE Framework**](modules/03-stride.html) | `Beginner` | ~30 min | Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation of Privilege |
| **04** | [**The TM Process**](modules/04-process.html) | `Beginner` | ~35 min | Step-by-step: Scope, Data Flow Diagrams (DFDs), Enumeration, Mitigation |
| **05** | [**Basic Applications**](modules/05-basic-apps.html) | `Beginner` | ~40 min | Threat modeling a simple authentication & CRUD application end-to-end |
| **06** | [**Web Applications & APIs**](modules/06-web-apps.html) | `Intermediate` | ~45 min | Multi-tier web apps, REST APIs, OAuth 2.0, OWASP Top 10, Microservices |
| **07** | [**Cloud Architecture**](modules/07-cloud.html) | `Intermediate` | ~50 min | Shared responsibility, AWS/GCP/Azure IAM, Serverless, Containers, Kubernetes |
| **08** | [**AI & Agentic Systems**](modules/08-agentic.html) | `Intermediate` | ~50 min | LLM agents, Direct/Indirect Prompt Injection, Tool Misuse, Multi-Agent Trust |
| **09** | [**Risk Scoring & Mitigation**](modules/09-risk-mitigation.html) | `Intermediate` | ~40 min | DREAD, CVSS, Risk Matrices, Defense-in-Depth, Residual Risk |
| **10** | [**Capstone Exercise**](modules/10-capstone.html) | `Intermediate` | ~60 min | Full hands-on threat model of a FinTech platform (Cloud + APIs + AI Agents) |

---

## 🚀 Quick Start & Running Locally

No complex build step or npm dependencies required! The app is built with standard HTML5, CSS3 (Vanilla design system), and Vanilla JS.

### Option 1: Direct File / Static Server
1. Clone the repository:
   ```bash
   git clone https://github.com/AnimeshShaw/threat-modelling-basics.git
   cd threat-modelling-basics
   ```
2. Open `index.html` in any browser, or run a local HTTP server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node npx
   npx serve .
   ```
3. Open `http://localhost:8000` in your browser.

---

## 🛠️ Practitioner Tools & Reference Sheets

This repo provides standalone reference documents for software teams:
* 📋 [**Threat Model Template (`THREAT_MODEL_TEMPLATE.md`)**](THREAT_MODEL_TEMPLATE.md): A comprehensive markdown template for threat modeling any system or feature.
* ⚡ [**STRIDE Cheat Sheet (`STRIDE_CHEAT_SHEET.md`)**](STRIDE_CHEAT_SHEET.md): Quick reference guide mapping STRIDE threat categories to security properties, examples, and standard mitigations.

---

## 🌐 Deploying to GitHub Pages

This repository includes a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) that automatically builds and deploys the site whenever changes are pushed to `main`.

### Enabling GitHub Pages on your fork:
1. Go to **Settings** > **Pages** in your GitHub repository.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` — the site will automatically deploy!

---

## 🤝 Contributing

Contributions are welcome! Whether you are fixing typos, improving diagrams, adding new security scenarios, or enhancing the UI:

1. Read our [**Contributing Guide (`CONTRIBUTING.md`)**](CONTRIBUTING.md).
2. Adhere to our [**Code of Conduct (`CODE_OF_CONDUCT.md`)**](CODE_OF_CONDUCT.md).
3. Open an issue or submit a Pull Request.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<p center align="center">
  Made with 🛡️ for security engineers, developers, and educators.
</p>
