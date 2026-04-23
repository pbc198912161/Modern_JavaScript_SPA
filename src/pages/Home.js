// src/pages/Home.js
export default async function Home() {
  return `
    <section class="hero">
      <div class="hero-eyebrow">
        <span>●</span> Frontend Development · Intermediate Course Project
      </div>
      <h1>
        <span class="line-1">Vanilla JS → Modern</span><br/>
        <span class="line-2">ES6 SPA Architecture</span>
      </h1>
      <p class="hero-sub">
        A fully refactored Single Page Application demonstrating ES6 modules,
        client-side routing via History API, async/await data fetching with
        error handling, unit tests with Jest, and Vite bundling.
      </p>
      <div class="hero-badges">
        <span class="badge badge-accent">ES6+ Modules</span>
        <span class="badge badge-cyan">History API Routing</span>
        <span class="badge badge-green">Async / Await</span>
        <span class="badge">AbortController Timeout</span>
        <span class="badge">Promise.all Parallel</span>
        <span class="badge">Jest Unit Tests</span>
        <span class="badge">Vite Bundle</span>
        <span class="badge">XSS Protection</span>
      </div>
      <div class="hero-divider"></div>
    </section>

    <div class="section-label">What was refactored</div>

    <div class="concept-grid">
      <div class="concept-card">
        <div class="concept-icon" style="background:rgba(99,102,241,0.12)">📦</div>
        <h3>ES6 Modules</h3>
        <p>Monolithic script.js broken into focused ES modules — router.js, api.js, helpers.js, and individual page files. Each exports only what it needs.</p>
        <span class="tag">import / export</span>
      </div>
      <div class="concept-card">
        <div class="concept-icon" style="background:rgba(34,211,238,0.1)">🗺️</div>
        <h3>Client-Side Routing</h3>
        <p>Custom Router class intercepts <code style="font-family:var(--mono);color:var(--cyan)">[data-link]</code> clicks, calls <code style="font-family:var(--mono);color:var(--cyan)">pushState()</code>, matches routes with regex, and renders page functions.</p>
        <span class="tag tag-cyan">History API</span>
      </div>
      <div class="concept-card">
        <div class="concept-icon" style="background:rgba(52,211,153,0.1)">⚡</div>
        <h3>Async / Await</h3>
        <p>All API calls use async/await with AbortController timeout (8s), exponential-backoff retry (2x), and Promise.all for parallel fetching.</p>
        <span class="tag tag-green">Async Patterns</span>
      </div>
      <div class="concept-card">
        <div class="concept-icon" style="background:rgba(251,191,36,0.1)">🧪</div>
        <h3>Jest Unit Tests</h3>
        <p>16 unit tests cover all 6 helper utilities — truncate, titleCase, formatDate, escapeHtml, groupBy, and getInitials. Run <code style="font-family:var(--mono);color:var(--yellow)">npm test</code>.</p>
        <span class="tag tag-yellow">16 tests passing</span>
      </div>
      <div class="concept-card">
        <div class="concept-icon" style="background:rgba(99,102,241,0.1)">🚀</div>
        <h3>Vite Bundler</h3>
        <p>Replaces manual script tags. Native ESM dev server with HMR, tree-shaking, code splitting, and minification for production builds.</p>
        <span class="tag">npm run build</span>
      </div>
      <div class="concept-card">
        <div class="concept-icon" style="background:rgba(248,113,113,0.1)">🔒</div>
        <h3>Error Handling</h3>
        <p>try/catch at every async boundary. Network errors, HTTP 4xx/5xx, timeouts, and JSON parse failures all render graceful error UI.</p>
        <span class="tag" style="color:var(--red);border-color:rgba(248,113,113,0.3);background:rgba(248,113,113,0.08)">try / catch / finally</span>
      </div>
    </div>

    <div class="section-label" style="margin-top:3rem">Quick navigation</div>
    <div class="cards-grid">
      <a href="/users" data-link style="text-decoration:none">
        <div class="card" style="cursor:pointer">
          <h3>👥 View Users →</h3>
          <p>10 users fetched live from JSONPlaceholder API. Click any user to see their posts loaded in parallel with Promise.all.</p>
          <span class="tag">GET /users</span>
        </div>
      </a>
      <a href="/posts" data-link style="text-decoration:none">
        <div class="card" style="cursor:pointer">
          <h3>📝 View Posts →</h3>
          <p>100 posts fetched and displayed with the truncate() utility. Content safe from XSS via escapeHtml().</p>
          <span class="tag">GET /posts</span>
        </div>
      </a>
      <a href="/about" data-link style="text-decoration:none">
        <div class="card" style="cursor:pointer">
          <h3>🏗️ Architecture →</h3>
          <p>Full breakdown of routing flow, module structure, async patterns, and the directory layout used in this project.</p>
          <span class="tag">Deep Dive</span>
        </div>
      </a>
    </div>
  `;
}
