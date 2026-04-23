// src/pages/About.js
export default async function About() {
  return `
    <div class="page-header">
      <h1>Architecture Deep Dive</h1>
      <p>How a monolithic vanilla JS app was refactored into a modern ES6 SPA</p>
    </div>

    <div class="section-label">Routing Flow</div>
    <div class="arch-flow">
      <div class="arch-step">
        <div class="step-num">1</div>
        <h4>Click Link</h4>
        <p>User clicks <code style="font-family:var(--mono);font-size:0.7rem;color:var(--cyan)">[data-link]</code> anchor</p>
      </div>
      <div class="arch-step">
        <div class="step-num">2</div>
        <h4>preventDefault</h4>
        <p>Default navigation blocked — no page reload</p>
      </div>
      <div class="arch-step">
        <div class="step-num">3</div>
        <h4>pushState()</h4>
        <p>URL updates in browser bar silently</p>
      </div>
      <div class="arch-step">
        <div class="step-num">4</div>
        <h4>Match Route</h4>
        <p>Regex matches path, extracts <code style="font-family:var(--mono);font-size:0.7rem;color:var(--yellow)">:params</code></p>
      </div>
      <div class="arch-step">
        <div class="step-num">5</div>
        <h4>Render Page</h4>
        <p>Async page function called, HTML injected</p>
      </div>
    </div>

    <div class="section-label" style="margin-top:2.5rem">Module Responsibilities</div>
    <div class="cards-grid">
      <div class="card">
        <h3>📡 src/modules/router.js</h3>
        <p>Handles all SPA navigation. Listens to clicks and <code style="font-family:var(--mono);color:var(--cyan)">popstate</code> (back/forward), converts paths like <code style="font-family:var(--mono);color:var(--yellow)">/users/:id</code> to regex, extracts params, and calls the matching page function.</p>
        <div class="code-block">
<span class="kw">class</span> <span class="fn">Router</span> {<br>
&nbsp;&nbsp;<span class="fn">navigateTo</span>(url) {<br>
&nbsp;&nbsp;&nbsp;&nbsp;history.<span class="fn">pushState</span>({}, <span class="str">''</span>, url);<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">this</span>._handleRoute();<br>
&nbsp;&nbsp;}<br>
}</div>
      </div>

      <div class="card">
        <h3>🌐 src/modules/api.js</h3>
        <p>Central data layer. <code style="font-family:var(--mono);color:var(--cyan)">fetchWithTimeout()</code> wraps every call with an 8s abort via AbortController. <code style="font-family:var(--mono);color:var(--green)">fetchWithRetry()</code> retries twice with 500ms/1000ms backoff.</p>
        <div class="code-block">
<span class="cm">// Parallel fetch — much faster!</span><br>
<span class="kw">const</span> [users, posts] =<br>
&nbsp;&nbsp;<span class="kw">await</span> <span class="fn">Promise</span>.all([<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">getUsers</span>(),<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">getPosts</span>(),<br>
&nbsp;&nbsp;]);</div>
      </div>

      <div class="card">
        <h3>🔧 src/utils/helpers.js</h3>
        <p>Six pure utility functions with zero side effects — making them trivial to unit test. Includes XSS-safe <code style="font-family:var(--mono);color:var(--red)">escapeHtml()</code> which is called before every innerHTML injection.</p>
        <div class="code-block">
<span class="kw">function</span> <span class="fn">escapeHtml</span>(str) {<br>
&nbsp;&nbsp;<span class="kw">const</span> map = {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="str">'&lt;'</span>: <span class="str">'&amp;lt;'</span>, <span class="str">'&gt;'</span>: <span class="str">'&amp;gt;'</span><br>
&nbsp;&nbsp;};<br>
&nbsp;&nbsp;<span class="kw">return</span> str.<span class="fn">replace</span>(/[&lt;&gt;]/g, ...);<br>
}</div>
      </div>

      <div class="card">
        <h3>📄 src/pages/*.js</h3>
        <p>Each page is an async function that returns an HTML string. They import from api.js and helpers.js. The router calls them with route params and injects the result into <code style="font-family:var(--mono);color:var(--cyan)">#app-content</code>.</p>
        <div class="code-block">
<span class="cm">// UserDetail.js — gets :id from URL</span><br>
<span class="kw">export default async function</span> <span class="fn">UserDetail</span>({ id }) {<br>
&nbsp;&nbsp;<span class="kw">const</span> user = <span class="kw">await</span> api.<span class="fn">getUser</span>(id);<br>
&nbsp;&nbsp;<span class="kw">return</span> <span class="str">\`&lt;h1&gt;\${user.name}&lt;/h1&gt;\`</span>;<br>
}</div>
      </div>
    </div>

    <div class="section-label" style="margin-top:2.5rem">Directory Structure</div>
    <div class="card" style="grid-column:1/-1">
      <div class="code-block" style="font-size:0.82rem;line-height:2">
<span class="cm">modern-spa/</span><br>
<span class="str">├── index.html</span>          <span class="cm">← Single shell file, #app-content swaps on route</span><br>
<span class="str">├── vite.config.js</span>      <span class="cm">← Dev server (port 3000) + production build config</span><br>
<span class="str">├── package.json</span>        <span class="cm">← Scripts: dev, build, preview, test</span><br>
<span class="str">├── jest.config.cjs</span>     <span class="cm">← Jest setup with babel transform</span><br>
<span class="str">├── babel.config.cjs</span>    <span class="cm">← Transpile ES6 → CommonJS for Jest</span><br>
<span class="kw">├── src/</span><br>
<span class="str">│   ├── main.js</span>         <span class="cm">← Imports Router + all pages, defines routes array</span><br>
<span class="str">│   ├── modules/</span><br>
<span class="str">│   │   ├── router.js</span>   <span class="cm">← History API SPA router with :param support</span><br>
<span class="str">│   │   └── api.js</span>      <span class="cm">← Fetch wrapper: timeout, retry, parallel</span><br>
<span class="str">│   ├── pages/</span><br>
<span class="str">│   │   ├── Home.js</span>     <span class="cm">← / route</span><br>
<span class="str">│   │   ├── About.js</span>    <span class="cm">← /about route</span><br>
<span class="str">│   │   ├── Users.js</span>    <span class="cm">← /users route</span><br>
<span class="str">│   │   ├── UserDetail.js</span> <span class="cm">← /users/:id — parallel fetch</span><br>
<span class="str">│   │   ├── Posts.js</span>    <span class="cm">← /posts route</span><br>
<span class="str">│   │   └── NotFound.js</span> <span class="cm">← 404 fallback</span><br>
<span class="str">│   ├── utils/</span><br>
<span class="str">│   │   └── helpers.js</span>  <span class="cm">← 6 pure functions, dual ESM+CJS export</span><br>
<span class="str">│   └── styles/</span><br>
<span class="str">│       └── main.css</span>    <span class="cm">← CSS variables, dark theme, animations</span><br>
<span class="kw">└── tests/</span><br>
<span class="str">    └── helpers.test.js</span> <span class="cm">← 16 Jest unit tests</span>
      </div>
    </div>
  `;
}
