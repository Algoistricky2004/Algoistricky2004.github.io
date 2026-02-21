# chiragchawla-portfolio

Personal portfolio website for **Chirag Chawla** — AI Researcher at IIT (BHU) Varanasi.

Built with **Vite + React + Tailwind CSS**. Deploys to GitHub Pages.

🌐 **Live**: https://algoistricky2004.github.io  
📄 **Papers**: AlignTune (2026), PERCS (2025)

---

## ✨ Features

- 🧠 Auto-populated publications from `data/publications.json`
- 🕸 **Interactive co-author force graph** (D3.js)
- 🚗 **Car dashboard Easter egg** (click the 🚗 button!)
- ✍️ Typewriter effect, particle background, animated hero
- 📱 Fully responsive, dark mode, keyboard navigable
- ⚡ CI/CD via GitHub Actions → GitHub Pages
- 🔍 SEO: Open Graph, Twitter Cards, JSON-LD Person schema

---

## 🚀 Local Development

```bash
# 1. Clone
git clone https://github.com/Algoistricky2004/chiragchawla-portfolio.git
cd chiragchawla-portfolio

# 2. Install
npm install

# 3. Dev server
npm run dev
# → http://localhost:5173
```

---

## 🏗 Build & Deploy

```bash
# Build static files
npm run build        # → ./dist

# Preview built site
npm run preview
```

**Auto-deploy**: Push to `main` branch → GitHub Actions builds & deploys to Pages.

### GitHub Pages Setup
1. Go to repo **Settings → Pages**
2. Set **Source** to `GitHub Actions`
3. Push to `main` — the workflow handles the rest

---

## 📂 Project Structure

```
chiragchawla-portfolio/
├── src/
│   ├── App.tsx                   # Root layout + dashboard mode
│   ├── index.css                 # Global styles + Tailwind
│   └── components/
│       ├── Navbar.tsx
│       ├── Hero.tsx              # Particle bg, typewriter, rotating cards
│       ├── About.tsx
│       ├── Publications.tsx      # Loads from data/publications.json
│       ├── CoauthorGraph.tsx     # D3 force-directed co-author graph 🕸
│       ├── Projects.tsx          # Project cards with filter
│       ├── Experience.tsx        # Expandable timeline
│       ├── CarDashboard.tsx      # 🚗 Easter egg dashboard mode
│       ├── DashboardToggle.tsx   # Floating 🚗 button
│       ├── Contact.tsx
│       └── Footer.tsx
├── data/
│   ├── resume.json               # Structured resume data (edit here!)
│   └── publications.json         # Publications list (edit here!)
├── public/
│   ├── photos/
│   │   ├── portrait.jpg          # ← ADD YOUR PHOTO HERE
│   │   └── hero.jpg              # ← ADD HERO IMAGE HERE
│   └── static/
│       └── CV_Chirag_Chawla.pdf  # ← ADD YOUR CV PDF HERE
├── scripts/
│   ├── parse_resume.py           # PDF → JSON parser
│   └── sync_scholar.py           # Auto-sync from Google Scholar
└── .github/workflows/
    ├── deploy.yml                # Build & deploy to GitHub Pages
    └── sync-scholar.yml          # Weekly Scholar sync
```

---

## 📝 Updating Content

### Add a new publication
Edit `data/publications.json`:
```json
{
  "id": "your-paper-id",
  "title": "Paper Title",
  "authors": ["Author 1", "Chirag Chawla", "Author 3"],
  "venue": "arXiv preprint arXiv:XXXX.XXXXX",
  "year": 2026,
  "url": "https://arxiv.org/abs/...",
  "citations": 0,
  "tags": ["Tag1", "Tag2"],
  "abstract": "Brief abstract...",
  "note": "Co-first author"  
}
```

### Add a new project
Edit `data/resume.json` → `projects` array.

### Add your photo
Copy `portrait.jpg` to `public/photos/portrait.jpg`

### Add your CV
Copy your CV PDF to `public/static/CV_Chirag_Chawla.pdf`

---

## 🔑 Environment Variables

| Variable | Purpose | Where |
|----------|---------|-------|
| `VITE_GITHUB_TOKEN` | GitHub API (optional, higher rate limit) | GitHub Secrets |
| `SCHOLAR_USER_ID` | Google Scholar user ID for sync | GitHub Secrets |

Add secrets: **Settings → Secrets and variables → Actions → New repository secret**

---

## 🕸 Sync Google Scholar (Manual)

```bash
pip install scholarly
python scripts/sync_scholar.py
```

Or trigger **Actions → Sync Google Scholar Publications → Run workflow**

---

## 🚗 Easter Eggs

- Click the 🚗 floating button (bottom-right) for Car Dashboard mode
- Speedometer reacts to your hovered navigation gear
- Each section has a unique color and RPM

---

## 🤝 Contributing / Updating

1. Edit `data/resume.json` or `data/publications.json` for content
2. Edit components in `src/components/` for UI changes
3. Push to `main` → site auto-deploys

---

*Built with ❤️ and too much caffeine. I break models for breakfast, tune them over lunch, and debug for dessert.*
