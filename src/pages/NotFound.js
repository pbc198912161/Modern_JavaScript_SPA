// src/pages/NotFound.js
export default async function NotFound() {
  const path = window.location.pathname;
  return `
    <div class="not-found">
      <div class="big-404">404</div>
      <h2>Page Not Found</h2>
      <p>No route matched <code style="font-family:var(--mono);color:var(--accent2)">${path}</code></p>
      <p style="color:var(--muted);font-size:0.85rem;margin-bottom:2rem">
        The Router checked all registered paths and found no match.<br/>
        This is the fallback 404 page — the last route in the routes array.
      </p>
      <a href="/" data-link class="btn">← Back to Home</a>
    </div>
  `;
}
