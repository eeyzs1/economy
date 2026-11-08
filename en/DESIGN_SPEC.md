# EconLearn Authoring Spec (DESIGN_SPEC) — English Edition

> This file is the **single authoring specification** for all branch tutorials, English edition. Read it (and `assets/econ.css`) in full before writing any tutorial. The Chinese edition's spec is [../DESIGN_SPEC.md](../DESIGN_SPEC.md); the two are maintained in parallel.

## 0. General principles

1. **Pure static, fully offline**: single-file HTML; no CDNs, external fonts, or external images. Charts are inline SVG (optionally updated by page JS); interactions use vanilla JS.
2. **Shared resources**: `<link rel="stylesheet" href="../../assets/econ.css">` and `<script src="../../assets/econ.js"></script>` (just before `</body>`) — note the `../../` prefix, because English pages live one level deeper under `en/`.
3. **Language**: body text in English; on first occurrence, key terms may also show the Chinese equivalent (e.g., opportunity cost *机会成本*). Term cards keep the Chinese original in the `term-en` slot (see §0.5).
4. **Audience**: smart adults starting from zero. Mathematics appears only in optional "Math box" asides; the body text works with intuition and graphics.
5. **Pedagogy (the same eight-part design in every chapter)**:
   1. **Opening question** — a real question that sparks curiosity ("Why …?")
   2. **The core intuition** — analogies and plain language (`callout intuition`)
   3. **Key concepts** — term cards (`.terms`)
   4. **Interactive demo** — at least one operable figure per 1–2 chapters (`.fig` + sliders/buttons), with "Try it" guidance
   5. **The real world** — real cases from China or around the globe (`callout case`)
   6. **Common pitfalls** — the mistakes learners actually make (`callout pitfall`)
   7. **Check yourself** — 2–3 multiple-choice questions (`.quiz`); explanations must say *why*
   8. **Summary** — a bullet takeaway card (`.summary-card`)
6. **Page skeleton** (strictly followed, so all 17 branches feel identical):

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Microeconomics · EconLearn Self-Study Path in Economics</title>
<link rel="stylesheet" href="../../assets/econ.css">
</head>
<body style="--branch:#2f6fdb">
<a class="skip-link" href="#main">Skip to content</a>
<header class="topbar">
  <a class="topbar-home" href="../index.html">← Home</a>
  <div class="topbar-title"><span class="topbar-num">01</span>Microeconomics</div>
  <a class="topbar-lang" href="../../01-微观经济学/index.html" hreflang="zh-CN">中文</a>
  <button class="toc-toggle" aria-expanded="false">Contents</button>
  <div class="reading-progress" aria-hidden="true"></div>
</header>
<div class="shell">
  <aside class="sidebar">
    <p class="sidebar-heading">Chapters in this track</p>
    <nav aria-label="Chapter contents">
      <a href="#overview">Overview & learning goals</a>
      <a href="#ch1">1 · Chapter title</a>
      <a href="#ch2">2 · Chapter title</a>
      …
      <a href="#path">Next steps & reading</a>
    </nav>
    <p class="sidebar-foot">EconLearn · Self-Study Path in Economics</p>
  </aside>
  <main class="main" id="main">
    <section class="chapter" id="overview">
      <div class="branch-hero">
        <span class="hero-kicker">Track 01 · Core theory</span>
        <h1>Microeconomics</h1>
        <p class="hero-en">微观经济学</p>
        <p class="hero-lead">One or two sentences: what this branch studies and why it matters.</p>
      </div>
      <div class="objectives">
        <div class="obj-title">By the end of this track, you will be able to</div>
        <ul>
          <li>4–6 objectives phrased with observable action verbs (explain / draw / compute / judge / compare)</li>
        </ul>
      </div>
      <div class="prereq">Prerequisites:
        <a class="badge" href="../01-microeconomics/index.html">None (entry-level track)</a>
      </div>
    </section>

    <section class="chapter" id="ch1">
      <h2><span class="ch-num">Chapter 1</span>Chapter title</h2>
      …eight-part content…
    </section>
    …more chapters…

    <section class="chapter" id="path">
      <h2><span class="ch-num">Wrap-up</span>Next steps & further reading</h2>
      <p>Which branches this one connects to (links to ../NN-english-slug/index.html), plus 3–5 classic textbooks (author, title, level).</p>
      <div class="reading-list">…</div>
      <nav class="pager">
        <a href="../01-microeconomics/index.html"><span class="pager-dir">Previous track</span><br><span class="pager-name">Microeconomics</span></a>
        <a href="../03-econometrics/index.html"><span class="pager-dir">Next track</span><br><span class="pager-name">Econometrics</span></a>
      </nav>
    </section>
  </main>
</div>
<script src="../../assets/econ.js"></script>
<script>/* this page's figure interactions */</script>
</body>
</html>
```

7. **Quiz markup** (auto-wired by `econ.js`; UI feedback strings are language-aware via `lang`):

```html
<div class="quiz" data-quiz>
  <div class="quiz-q"><span class="quiz-tag">Quiz 1.1</span>Question text?</div>
  <div class="quiz-opts">
    <button class="quiz-opt"><span class="opt-key">A</span>Option one</button>
    <button class="quiz-opt" data-correct="true"><span class="opt-key">B</span>Option two</button>
    <button class="quiz-opt"><span class="opt-key">C</span>Option three</button>
  </div>
  <div class="quiz-verdict" role="status" aria-live="polite"></div>
  <div class="quiz-explain"><strong>Explanation:</strong>Say why the right answer is right and where the others go wrong.</div>
</div>
```
Note: `data-correct="true"` sits only on the correct option; every `data-quiz` block contains exactly one `.quiz-verdict` and one `.quiz-explain`.

8. **Interactive figure markup**:

```html
<figure class="fig">
  <div class="fig-title">Figure 1-1 · Supply and demand</div>
  <p class="fig-sub">Drag the slider and watch the equilibrium move.</p>
  <figure class="fig-canvas">
    <svg viewBox="0 0 640 400" role="img" aria-label="Short text describing the chart and its current state">
      <!-- axes use class="axis"; gridlines class="gridline"; curves class="curve curve-c1" -->
      <!-- give ids to elements updated dynamically; page scripts update their d/x/y/text -->
    </svg>
  </figure>
  <div class="fig-controls">
    <div class="ctrl"><label for="s1">Demand shift</label>
      <input type="range" id="s1" min="-80" max="80" value="0" step="1">
      <output id="o1" for="s1">0</output></div>
  </div>
  <figcaption>How to read this figure: …</figcaption>
</figure>
```
Text inside SVG uses `class="chart-label"`; tick numbers are optional, but **axes must be named** (e.g., Quantity Q / Price P). Curves must be labeled directly (e.g., D, S) — never by color alone.

9. **Accessibility & motion (hard requirements)** (from ui-ux-pro-max; violations must be fixed):
   - Body-text contrast ≥ 4.5:1; never use pure red/green pairs alone to convey right/wrong (components already carry ✓/✗ text marks).
   - Every `<svg>` has `role="img"` + `aria-label`; every slider has a `<label for>`; touch targets ≥ 44px (components guarantee this).
   - Animations use transform/opacity only, 150–300 ms; `prefers-reduced-motion` is handled by the shared CSS.
   - No horizontal scrolling on mobile (SVGs scale to width via viewBox).
   - Heading levels h1→h2→h3 with no skips.
10. **Length**: each branch is a single page of roughly 900–1500 lines of HTML (including inline JS/SVG). Content beats length: better one chapter thoroughly taught than padding to hit a quota.

## 1. Branch list, folder names, and theme colors

The English edition mirrors the Chinese edition page for page under `en/`, with English folder names. The two editions cross-link through the `topbar-lang` toggle in every top bar (`EN` on Chinese pages, `中文` on English pages).

| # | Folder (en/) | Branch | --branch color | Group |
|---|--------------|--------|------------|-------|
| 01 | `en/01-microeconomics` | Microeconomics | `#2f6fdb` | Core theory |
| 02 | `en/02-macroeconomics` | Macroeconomics | `#b91c1c` | Core theory |
| 03 | `en/03-econometrics` | Econometrics | `#0d9488` | Core theory |
| 04 | `en/04-game-theory-and-information-economics` | Game Theory & Information Economics | `#7c3aed` | Core theory |
| 05 | `en/05-money-and-banking` | Money & Banking | `#b45309` | Money & finance |
| 06 | `en/06-financial-economics` | Financial Economics | `#0e7490` | Money & finance |
| 07 | `en/07-international-economics` | International Economics | `#4d7c0f` | Sectors & international |
| 08 | `en/08-public-economics` | Public Economics | `#be185d` | Sectors & international |
| 09 | `en/09-labor-economics` | Labor Economics | `#4338ca` | Applied fields |
| 10 | `en/10-industrial-organization` | Industrial Organization | `#e11d48` | Applied fields |
| 11 | `en/11-development-and-innovation-economics` | Development & Innovation Economics | `#047857` | Applied fields |
| 12 | `en/12-environmental-and-resource-economics` | Environmental & Resource Economics | `#65a30d` | Applied fields |
| 13 | `en/13-urban-and-regional-economics` | Urban & Regional Economics | `#ea580c` | Applied fields |
| 14 | `en/14-health-and-education-economics` | Health & Education Economics | `#db2777` | Applied fields |
| 15 | `en/15-behavioral-economics` | Behavioral Economics | `#9333ea` | Cross-disciplinary & thought |
| 16 | `en/16-political-economy-and-institutional-economics` | Political Economy & Institutional Economics | `#57534e` | Cross-disciplinary & thought |
| 17 | `en/17-history-of-economic-thought-and-economic-history` | History of Economic Thought & Economic History | `#713f12` | Cross-disciplinary & thought |

Pager navigation runs in numeric order 01→02→…→17→back to `../index.html` (the English portal). `check.js` resolves pager directions against each edition's own sibling folders, and accepts `lang="zh-CN"` or `lang="en"`; the shared `econ.js` switches its quiz UI strings and number locale on `lang="en"`.

## 2. Syllabus per branch (chapters = the branch's main subfields)

Under each chapter title, the parentheses list required coverage. Aim for at least **2–3** interactive demos per branch (better ideas welcome).

### 01 Microeconomics (prereq: none; leads to 02, 03, 04)
1. Scarcity, choice, and opportunity cost (PPF, marginal analysis, positive vs. normative)
2. Supply, demand, and market equilibrium (shift vs. movement along, elasticity, price controls)
3. Consumer theory (utility, indifference curves, budget line, consumer optimum, income/substitution effects)
4. Producer theory (production function, diminishing marginal returns, cost curves, economies of scale)
5. Market structure (perfect competition, monopoly, monopolistic competition, oligopoly; price discrimination)
6. Market failure (externalities, public goods, asymmetric information, the trade-offs of intervention)
7. General equilibrium and welfare economics (Edgeworth box, Pareto efficiency, the two welfare theorems, equity vs. efficiency)
- Demo ideas: ① draggable PPF point showing opportunity cost; ② supply/demand shift sliders moving the equilibrium; ③ monopoly vs. perfect competition deadweight loss (DWL triangle changing with elasticity); ④ budget line–indifference curve tangency (income/price sliders).

### 02 Macroeconomics (prereq: 01; leads to 05, 07, 11)
1. The macroeconomy and GDP (circular flow, three ways to measure GDP, nominal vs. real, CPI/GDP deflator)
2. Economic growth (growth accounting, the Solow model, capital accumulation and the steady state, convergence)
3. Fluctuations: aggregate demand and supply (AD-AS, the multiplier, recessions and overheating)
4. Money, inflation, and unemployment (CPI, the Phillips curve, the natural rate, Okun's law)
5. The open economy (exchange rates, the balance of payments, Mundell–Fleming in brief)
6. Macroeconomic policy (fiscal and monetary policy, lags, rules vs. discretion; the Great Depression and 2008 as cases)
- Demo ideas: ① animated multiplier chain (MPC slider); ② AD-AS shifts; ③ Solow steady state (savings-rate slider moving capital/output per person); ④ short-run/long-run Phillips curve toggle.

### 03 Econometrics (prereq: 01; leads to all applied branches)
1. Let the data speak: correlation ≠ causation (scatter plots, confounders, Simpson's paradox, the counterfactual framework)
2. Simple linear regression (OLS fitting, residuals, R², least-squares intuition)
3. Multiple regression and controls (what a partial regression coefficient means, "holding other things equal")
4. Uncertainty and inference (standard errors, confidence intervals, reading significance tests correctly, p-value pitfalls)
5. Endogeneity and identification (omitted variables, reverse causality, selection bias)
6. The causal-inference toolbox (RCTs, difference-in-differences, regression discontinuity, instrumental variables — each with a classic case)
- Demo ideas: ① scatter + draggable β regression line with squared-residual bars; ② Simpson's paradox group toggle; ③ omitted-variable bias (coefficient change after adding a control); ④ RCT simulation (random assignment vs. self-selection).

### 04 Game Theory & Information Economics (prereq: 01; leads to 10, 16)
1. The language of games (payoff matrices, game trees, rationality and common knowledge, dominant strategies)
2. Nash equilibrium (best responses, multiple equilibria, coordination games, a taste of mixed strategies)
3. Classic games and applications (Prisoner's Dilemma, tragedy of the commons, repeated games and cooperation, commitment problems)
4. Asymmetric information (adverse selection — the market for lemons; moral hazard; principal–agent)
5. Signaling and screening (education as a signal, warranties, screening mechanisms)
6. Mechanism design (auction types and the revenue-equivalence intuition, matching markets)
- Demo ideas: ① clickable Prisoner's Dilemma matrix showing both payoffs; ② best-response highlighting to find Nash equilibria; ③ lemons-market quality slider watching the market collapse; ④ second-price auction bidding simulation.

### 05 Money & Banking (prereq: 02; leads to 06, 07)
1. What money is (functions, commodity money → fiat, aggregates M0/M1/M2)
2. Banks and money creation (fractional reserves, the money multiplier, the balance-sheet view)
3. Central banks and monetary policy (the interest-rate corridor, open-market operations, reserve requirements, quantitative easing)
4. Interest rates and transmission (policy rate → market rates → investment/consumption → prices, and the lags)
5. Inflation (MV=PQ, demand-pull vs. cost-push, the costs of inflation, the deflation trap)
6. Financial stability and crises (bank runs, deposit insurance, lender of last resort, 2008 and the Minsky moment)
- Demo ideas: ① round-by-round money-multiplier animation (reserve-ratio slider); ② interactive MV=PQ; ③ step-by-step policy transmission animation; ④ the run game (first-come-first-served queue simulation).

### 06 Financial Economics (prereq: 01, 05; leads to 07)
1. The time value of money (present value, future value, compounding, annuities; the NPV decision rule)
2. Risk and return (risk aversion, expected value vs. variance, the risk premium)
3. Diversification and portfolio choice (correlation, the efficient frontier, "the only free lunch")
4. The Capital Asset Pricing Model (beta, the security market line, systematic vs. idiosyncratic risk)
5. Market efficiency (the three forms, bubbles and anomalies, active vs. passive)
6. Corporate finance and derivatives: a first look (capital structure, the Modigliani–Miller intuition, option payoff diagrams)
- Demo ideas: ① compounding/discounting calculator (rate and years sliders); ② two-asset correlation slider showing portfolio risk; ③ option payoff diagram (strike/premium sliders); ④ beta–return security market line.

### 07 International Economics (prereq: 02, 05; leads to 11, 13)
1. Why trade (absolute vs. comparative advantage, opportunity cost and the gains from trade, terms of trade)
2. Winners and losers from trade (the Stolper–Samuelson intuition, a Heckscher–Ohlin overview)
3. Trade policy (welfare analysis of tariffs/quotas/export subsidies; nominal rate of protection)
4. Exchange rates and the FX market (supply-and-demand determination, purchasing power parity, the real exchange rate)
5. The balance of payments (current account, capital account, the BOP identity, global imbalances)
6. Policy in the open economy (the impossible trinity, currency crises, trade-war cases)
- Demo ideas: ① two-country PPF + trade expands the consumption set (specialization slider); ② tariff welfare diagram (tariff-rate slider moving DWL and government revenue); ③ FX supply-demand equilibrium (interest-differential slider); ④ trilemma vertex selector.

### 08 Public Economics (prereq: 01; leads to 14, 16)
1. Why government (a tour of market failures, government failure, the size of the public sector)
2. The economics of taxation (deadweight loss, elasticity and tax incidence, the Laffer curve)
3. Tax design (progressive/regressive, efficiency vs. equity, optimal-tax intuition, comparing tax types)
4. Public spending and transfers (social security, Okun's leaky bucket, the negative income tax)
5. Public choice (the voting paradox, the median voter, Arrow's impossibility theorem, rent-seeking)
6. Cost–benefit analysis (the social discount rate, shadow prices, evaluating public projects)
- Demo ideas: ① tax DWL varying with elasticity (elasticity slider); ② Laffer curve (tax-rate slider); ③ cyclical-majority voting demo; ④ redistribution leaky bucket (tax-rate/labor-supply slider).

### 09 Labor Economics (prereq: 01; leads to 14)
1. Labor supply (the labor–leisure choice, income vs. substitution effects of a wage rise, labor force participation)
2. Human capital (returns to education and training, the Mincer equation, signaling vs. human capital)
3. Wage differences (compensating differentials, efficiency wages, the economics of superstars, measuring discrimination)
4. The minimum wage and employment (competitive vs. monopsony labor markets; the Card & Krueger controversy)
5. Unemployment (frictional/structural/cyclical, the natural rate, reservation wages and search models)
6. Institutions and policy (unions, employment protection, the flexibility–security trade-off)
- Demo ideas: ① labor supply as wages rise (animated income/substitution decomposition); ② education–earnings scatter + Mincer-return slider; ③ minimum wage under competition vs. monopsony side by side; ④ reservation-wage search simulation.

### 10 Industrial Organization (prereq: 01, 04; leads to 15)
1. Market power and its measurement (the Lerner index, HHI, concentration, markups)
2. Oligopoly rivalry (Cournot quantity vs. Bertrand price competition, the Bertrand paradox)
3. Collusion and repeated games (punishment strategies, cartel instability, the OPEC case)
4. Price discrimination (first/second/third degree, versioning, big data and personalized pricing)
5. Entry barriers and antitrust (structural barriers, predatory pricing, platform antitrust cases)
6. Network effects and platform economics (two-sided markets, critical mass, winner-take-all, zero-price markets)
- Demo ideas: ① Cournot vs. Bertrand reaction functions (firm-count slider driving price toward the competitive level); ② network-effects critical-mass chart (user-count slider crossing the tipping point); ③ HHI calculator (market-share slider bank); ④ third-degree price discrimination across two markets with different elasticities.

### 11 Development & Innovation Economics (prereq: 02; leads to 12, 16)
1. What development is (beyond GDP: HDI, poverty lines, gender and development, development vs. growth)
2. The determinants of growth (capital deepening vs. TFP, endogenous-growth ideas, convergence and divergence)
3. Poverty traps (coordination failure, the Big Push, microcredit and RCT poverty experiments)
4. Institutions and development (property rights, corruption, the geography/institutions/culture debate)
5. The economics of innovation (Schumpeterian creative destruction, R&D races, the patent dilemma, the S-curve of diffusion)
6. Population and structural transformation (the demographic transition, the Lewis turning point, agriculture → industry → services)
- Demo ideas: ① poverty-trap S-curve (current-income → next-generation-income map with an investment slider to jump the trap); ② growth-accounting calculator (capital/labor/TFP decomposition); ③ technology-diffusion S-curve animation; ④ demographic-transition stage chart (birth/death rates across four stages).

### 12 Environmental & Resource Economics (prereq: 01, 08; leads to 13)
1. The economic nature of environmental problems (externalities, social vs. private cost, market failure)
2. Pigouvian taxes and subsidies (internalizing external costs, the double dividend, tax = marginal damage)
3. Property rights and the Coase theorem (transaction costs, assigning rights, tradable quotas)
4. The tragedy of the commons and public goods (open access, congestion, the failure of voluntary provision)
5. Renewable and nonrenewable resources (the fisheries model, the Hotelling rule, optimal harvest timing)
6. The economics of climate change (the social cost of carbon, the discount-rate debate, mitigation vs. adaptation, global cooperation)
- Demo ideas: ① Pigouvian-tax diagram (tax slider steering output to the social optimum); ② commons-tragedy simulation (boats independently choosing fishing effort); ③ fish-stock dynamics (growth curve + harvest line; effort slider driving collapse); ④ discount-rate slider moving the social cost of carbon.

### 13 Urban & Regional Economics (prereq: 01, 07; leads to 11)
1. Why cities exist (agglomeration economies: sharing, matching, learning; increasing returns to scale)
2. The internal structure of cities (bid-rent curves, central place theory, land-use patterns, the commuting trade-off)
3. Housing markets (supply elasticity, price-to-income ratios, speculation and bubbles, the effects of rent control)
4. Congestion and urban problems (negative externalities, congestion charges, the spatial impact of pollution)
5. Regional growth and gaps (initial endowments, path dependence, the shadow of agglomeration, flying-geese patterns)
6. Urban policy (public transit, zoning, urban renewal; China's urbanization as a case)
- Demo ideas: ① bid-rent curves (distance–CBD rent gradient; a transport-cost slider flattening it); ② agglomeration benefits vs. congestion costs as cities grow (the optimal city size); ③ housing supply elasticity compared (regulation steepens supply → price volatility); ④ congestion-charge welfare analysis.

### 14 Health & Education Economics (prereq: 01, 03, 09; leads to 08)
1. The economic view of health (health as human capital; the health production function)
2. What makes health-care markets special (asymmetric information, third-party payment, supplier-induced demand)
3. Health insurance (risk sharing, moral hazard, the RAND experiment, deductibles and copayments)
4. Comparing health systems (NHS/social insurance/market-based; China's reforms; the cost-control puzzle)
5. The economics of education (human capital vs. signaling, estimating returns to education and causal identification, externalities)
6. The welfare state and redistribution (measuring poverty, transfer design, the UBI debate)
- Demo ideas: ① moral-hazard demo (copay slider → visits); ② causal identification of education returns (visualizing RCT/DID designs); ③ Lorenz curves and Gini coefficients before/after redistribution; ④ health-spending simulations (health–income over the life cycle).

### 15 Behavioral Economics (prereq: 01; leads to 10, 14)
1. Bounded rationality and heuristics (System 1/System 2, anchoring, availability, representativeness)
2. Prospect theory (reference points, loss aversion, the value function, probability weighting)
3. Intertemporal choice (inconsistent discounting, present bias, commitment devices)
4. Social preferences (fairness, reciprocity, altruism; the ultimatum and dictator games)
5. Nudges and choice architecture (default options, framing effects, Save More Tomorrow)
6. The limits of behavioral economics (the ethics of scaling up, the replication crisis, when the standard model still wins)
- Demo ideas: ① value-function plotter (loss-aversion λ slider); ② exponential vs. hyperbolic discounting (a choose-your-delayed-reward simulation); ③ ultimatum-game simulation (offer-share slider against acceptance rates); ④ default-option participation animation.

### 16 Political Economy & Institutional Economics (prereq: 01, 04; leads to 11, 17)
1. What institutions are (formal/informal institutions, property rights, contract enforcement, transaction costs)
2. Transaction costs and Coase (the boundaries of the firm, why firms exist — Coase/Williamson)
3. Institutional change (the North framework, path dependence, institutional drift and critical junctures)
4. Collective action and rent-seeking (Olson's logic, interest groups, the social costs of competing for rents)
5. Politics and economic performance (voting and policy bias, political business cycles, state capacity)
6. Comparing systems (the planning-vs.-market debate and transition experience; inclusive vs. extractive institutions)
- Demo ideas: ① collective-action game (player-count slider and free-riding); ② transaction-cost slider setting the market-vs.-firm boundary; ③ rent-seeking competition and social waste diagram; ④ 2×2 institutional matrix (the North–Wallis–Weingast social orders).

### 17 History of Economic Thought & Economic History (prereq: none; leads everywhere)
1. Before the classics (mercantilism, the Physiocrats, moral philosophy before Smith)
2. Classical political economy (Smith's invisible hand, Ricardo's comparative advantage, the Malthusian trap, Mill's synthesis)
3. Marx and the marginal revolution (the labor theory of value, the marginal-utility revolution, the Marshallian synthesis)
4. The Keynesian revolution and the monetarist counter-revolution (the Great Depression, the IS-LM debates, Friedman, the Lucas critique)
5. The contemporary schools (neoclassical, New Keynesian, behavioral, evolutionary, institutionalist — a map)
6. Big questions of economic history (the Great Divergence, industrialization, the end of the gold anchor, growth's turning points; rendered with `.timeline`)
- Demo ideas: ① interactive history-of-thought timeline (clickable thinker cards expanding their core ideas); ② the long per-capita GDP curve since year 1 (a Great-Divergence sketch with hover readouts); ③ school-vs-topic comparison matrix.

## 3. Quality self-check (verify item by item before finishing)

- [ ] File saved as `F:\economy\en\NN-english-slug\index.html` (UTF-8)
- [ ] The `--branch` on `body` matches §1; `lang="en"`; assets referenced as `../../assets/…`
- [ ] Sidebar links map one-to-one onto actual chapter ids; `#overview` and `#path` exist
- [ ] Every chapter carries the eight-part design (at minimum: opening question, term cards, a real-world case, pitfalls, quiz, summary; demos distributed per the density requirement)
- [ ] At least 2 working `.fig` interactives page-wide (real sliders or buttons), at least 8 `.quiz` blocks cumulative, at least 6 `.term` cards cumulative
- [ ] Every `.quiz` is structurally complete (verdict + explain; the correct option carries `data-correct="true"`)
- [ ] Inline JS has no syntax errors (run every function's edge cases in your head; SVG updates via `document.getElementById`)
- [ ] Page title follows `Branch name · EconLearn Self-Study Path in Economics`; topbar, hero, and pager are all present; the topbar carries the 中文 toggle pointing at the Chinese counterpart
- [ ] The pager points to the correct neighbors (01's previous → `../index.html`; 17's next → `../index.html`)
- [ ] No external resources; no emoji icons (use ✓/✗/→/↑/↓ characters or SVG)
- [ ] English punctuation throughout; the only Chinese text on the page is the term-card annotations (`term-en`) and the 中文 toggle label
- [ ] `node check.js en/NN-english-slug/index.html` prints PASS
