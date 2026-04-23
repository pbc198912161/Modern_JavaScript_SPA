# ⚡ Modern JavaScript SPA

A fully refactored vanilla JS Single Page Application built with ES6 modules,
client-side routing, async/await data fetching, Jest unit tests, and Vite.

---

## 📁 Directory Structure

```
modern-spa/
│
├── index.html              ← Single HTML file (the "shell")
├── vite.config.js          ← Vite bundler config
├── package.json            ← Dependencies & scripts
├── babel.config.cjs        ← Babel config (for Jest)
├── jest.config.cjs         ← Jest config
│
├── src/
│   ├── main.js             ← App entry point — boots the router
│   │
│   ├── modules/
│   │   ├── router.js       ← Client-side SPA router
│   │   └── api.js          ← All async API calls (fetch + error handling)
│   │
│   ├── pages/
│   │   ├── Home.js         ← / route
│   │   ├── About.js        ← /about route
│   │   ├── Users.js        ← /users route
│   │   ├── UserDetail.js   ← /users/:id route (dynamic)
│   │   ├── Posts.js        ← /posts route
│   │   └── NotFound.js     ← 404 fallback
│   │
│   ├── utils/
│   │   └── helpers.js      ← Pure utility functions (tested with Jest)
│   │
│   └── styles/
│       └── main.css        ← Global styles with CSS variables
│
└── tests/
    └── helpers.test.js     ← Jest unit tests for helpers.js
```

---

## 🚀 How to Run — Step by Step

### Step 1 — Install Node.js
Download from https://nodejs.org (use LTS version)

### Step 2 — Install dependencies
Open your terminal, navigate to this folder, and run:
```bash
npm install
```

### Step 3 — Start the development server
```bash
npm run dev
```
Open http://localhost:3000 in your browser. Hot-reload is enabled — any change you save instantly updates the browser.

### Step 4 — Run unit tests
```bash
npm test
```
You should see all tests pass with green checkmarks.

### Step 5 — Build for production
```bash
npm run build
```
This creates an optimised `dist/` folder ready to deploy. Vite will:
- Bundle and minify all JS
- Tree-shake unused code
- Optimise CSS
- Generate hashed filenames for caching

### Step 6 — Preview the production build
```bash
npm run preview
```

---

## 🧠 Key Concepts Explained

### ES6 Modules
Every file uses `import` / `export` instead of `<script>` tags.
This keeps code organised and avoids name collisions.

### Client-Side Routing
The Router class intercepts link clicks, updates the URL with
`history.pushState()`, and swaps only the content — no page reload.

### Async/Await
All data fetching uses `async/await` with:
- `AbortController` for timeout
- Retry with exponential backoff
- `Promise.all` for parallel fetches
- `try/catch/finally` for error handling

### Unit Testing
Helper functions are pure (no side effects), making them trivial to test.
Run `npm test` to execute all tests in `tests/`.

### Vite
Replaces webpack. Near-instant dev server using native ES modules.
`npm run build` produces an optimised production bundle.
