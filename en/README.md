# EconLearn · A Self-Study Path Through Economics

> An offline-friendly Chinese–English economics tutorial library with interactive animated demonstrations.
> Entry points: open **[index.html](index.html)** (this portal) or the `index.html` of any branch folder below. The Chinese edition lives one level up at [../index.html](../index.html) — every page has an EN / 中文 toggle in its top bar.

## Overview of the major branches of economics

The major branches follow the **JEL classification codes** (Journal of Economic Literature — the subject classification used by the American Economic Association): 17 major branches in all, each with its own folder and a complete tutorial.

### Group 1 · Core theory (start here)

| # | Branch | Folder | What it studies | A representative question |
|---|--------|--------|-----------------|---------------------------|
| 01 | **Microeconomics** | [01-microeconomics](01-microeconomics/index.html) | How individual markets and agents (consumers, firms) make decisions and how prices form | Why are concert tickets always so hard to get? |
| 02 | **Macroeconomics** | [02-macroeconomics](02-macroeconomics/index.html) | Economy-wide growth, fluctuations, inflation, and unemployment | Why are some countries rich and others poor? |
| 03 | **Econometrics** | [03-econometrics](03-econometrics/index.html) | Testing economic theory and identifying causality with data and statistics | Does the minimum wage really reduce employment — and how would you answer that with data? |
| 04 | **Game Theory & Information Economics** | [04-game-theory-and-information-economics](04-game-theory-and-information-economics/index.html) | Strategic interaction and behavior under asymmetric information | Why does the used-car market drive out good cars ("bad money drives out good")? |

### Group 2 · Money & finance

| # | Branch | Folder | What it studies | A representative question |
|---|--------|--------|-----------------|---------------------------|
| 05 | **Money & Banking** | [05-money-and-banking](05-money-and-banking/index.html) | Money, the banking system, and central-bank policy | How do banks "create" money? |
| 06 | **Financial Economics** | [06-financial-economics](06-financial-economics/index.html) | Allocating resources across time: pricing, risk, and return | Why is "don't put all your eggs in one basket" the only free lunch in finance? |

### Group 3 · Sectors & international

| # | Branch | Folder | What it studies | A representative question |
|---|--------|--------|-----------------|---------------------------|
| 07 | **International Economics** | [07-international-economics](07-international-economics/index.html) | Trade, exchange rates, and international capital flows | Why does trade benefit both sides — yet always have opponents? |
| 08 | **Public Economics** | [08-public-economics](08-public-economics/index.html) | Government revenue and spending, taxation, and public goods | Does taxing always carry a cost? How large is it? |

### Group 4 · Applied fields

| # | Branch | Folder | What it studies | A representative question |
|---|--------|--------|-----------------|---------------------------|
| 09 | **Labor Economics** | [09-labor-economics](09-labor-economics/index.html) | Wages, employment, human capital, and labor-market institutions | Why do star athletes earn a hundred times a teacher's salary? |
| 10 | **Industrial Organization** | [10-industrial-organization](10-industrial-organization/index.html) | Market structure, firm strategy, and antitrust | Why do platform economies tend toward "winner-take-all"? |
| 11 | **Development & Innovation Economics** | [11-development-and-innovation-economics](11-development-and-innovation-economics/index.html) | Poverty, growth miracles, and technological progress | Why do countries fall into "poverty traps"? |
| 12 | **Environmental & Resource Economics** | [12-environmental-and-resource-economics](12-environmental-and-resource-economics/index.html) | Environmental externalities, natural resources, and climate change | Why does putting a price on pollution actually clean it up? |
| 13 | **Urban & Regional Economics** | [13-urban-and-regional-economics](13-urban-and-regional-economics/index.html) | Agglomeration, land, housing, and regional disparities | Why is everyone in the world moving to big cities? |
| 14 | **Health & Education Economics** | [14-health-and-education-economics](14-health-and-education-economics/index.html) | Health-care markets, insurance, and human-capital investment | Just how high is the return to a college degree? |

### Group 5 · Cross-disciplinary & thought

| # | Branch | Folder | What it studies | A representative question |
|---|--------|--------|-----------------|---------------------------|
| 15 | **Behavioral Economics** | [15-behavioral-economics](15-behavioral-economics/index.html) | Where psychology meets economics: how people actually behave | Why do New Year's resolutions always fizzle out? |
| 16 | **Political Economy & Institutional Economics** | [16-political-economy-and-institutional-economics](16-political-economy-and-institutional-economics/index.html) | Institutions, property rights, the state, and collective action | How can "good institutions" turn a poor country rich? |
| 17 | **History of Economic Thought & Economic History** | [17-history-of-economic-thought-and-economic-history](17-history-of-economic-thought-and-economic-history/index.html) | The evolution of economic ideas and the long run of economic development | What question was each of Smith, Marx, and Keynes answering? |

> **JEL cross-reference**: D (micro/game theory/information), E (macro/money), C (mathematical & quantitative methods), F (international), G (finance), H (public), I (health, education & welfare), J (labor), L (industrial organization), O (development & innovation), Q (agriculture & natural resources), R (urban & regional), B/N (history of thought & economic history), P (economic systems/political economy). Finer specialties are covered inside the matching branch (agriculture in 12; law & economics in 08/16).

## Recommended study path

```
Stage 1 (foundations)   Stage 2 (money & intl)   Stage 3 (applications, pick any)   Stage 4 (horizons)
01 Micro ──┬── 02 Macro ── 05 Money ──┐    09 Labor     12 Env & Resources   15 Behavioral
           ├── 03 Econometrics ─ 06 Finance ─┼─ 10 Industry  13 Urban & Regional  16 Political Econ & Institutions
           └── 04 Game Theory ─ 07 Intl ──┘    11 Development 14 Health & Education 17 History of Thought (read anytime)
                                 08 Public
```

- **Total beginner**: start with 01 Microeconomics — it is the map for everything else.
- **Just want to understand the news**: 01 → 02 → 05 → 07.
- **Want to do data analysis**: learn 03 Econometrics early, alongside the empirical cases in 09/11/14.
- **Read anytime**: 17 History of Economic Thought is a "museum" — rewarding at any stage.

## The unified structure of every tutorial

Every branch follows the same eight-part design (worked-example teaching plus retrieval practice):

1. **Opening question** — a real-world curiosity hook
2. **The core intuition** — analogies and plain language: understand "why" before "what"
3. **Key concepts** — term cards (English–Chinese)
4. **Interactive demo** — drag sliders, click buttons, and "play" your way to the conclusion
5. **The real world** — cases from China and around the globe
6. **Common pitfalls** — defusing the usual mistakes in advance
7. **Check yourself** — multiple-choice questions with instant feedback and full explanations
8. **Summary** — a takeaways card

## Using it locally

- Every page is **plain static HTML** — no server needed, fully offline: double-click `index.html` to begin.
- The shared design system lives in `../assets/econ.css` and `../assets/econ.js`; deleting them breaks styling and interaction.
- The authoring spec for the tutorials is [DESIGN_SPEC.md](DESIGN_SPEC.md) (also used to extend the library with new branches).
- **Two editions**: this English edition mirrors the Chinese edition page for page. Folders here use English names (`01-microeconomics`, …); the Chinese originals sit in the numbered folders at the repository root. The top bar of every page toggles between EN and 中文.
- **Browser requirements**: theme colors use `color-mix()` (Chrome/Edge 111+, Safari 16.2+, Firefox 113+). Older browsers remain readable, but card tints, themed borders, and the frosted top bar degrade to light/transparent.

## Development & quality checks

- Quality gate: `node ../check.js <files…>` (or pass every page at once). It checks: page-structure integrity; minimum counts of quizzes/term cards/interactive figures; inline-script syntax; element ids referenced by JS; label↔slider/output wiring; an aria-label for every SVG; heading hierarchy without skips; pager link directions; theme colors against the spec; that every `curve-cN` class is defined in the shared CSS (guards against "invisible curves"); that cross-file link targets exist; meta description; and more. Everything must PASS before commit.
- After changing the shared CSS/JS under `../assets/`, spot-check 1–2 branch pages in a browser (private window): top bar, scrollspy highlight, quiz feedback, and the mobile drawer.
- `check.js` validates both editions: `lang="zh-CN"` or `lang="en"`, and pager directions resolve against each edition's own sibling folders (root for Chinese, `en/` for English).

## Further reading (by level)

| Level | Book | Note |
|-------|------|------|
| Introductory | Mankiw, *Principles of Economics* (micro + macro volumes) | The friendliest first book |
| Intermediate | Pindyck & Rubinfeld, *Microeconomics*; Blanchard, *Macroeconomics* | Standard intermediate texts |
| Toolkit | Wooldridge, *Introductory Econometrics* | The empirical-methods staple |
| Perspective | Heyne et al., *The Economic Way of Thinking*; Levitt & Dubner, *Freakonomics* | Building economic intuition |
| Classics | Smith, *The Wealth of Nations*; Keynes, *The General Theory* | Best read alongside branch 17 |
