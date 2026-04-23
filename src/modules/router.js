// src/modules/router.js
// ============================================
//  CLIENT-SIDE ROUTER
//  - Uses the History API (pushState) so the URL
//    changes without a full page reload.
//  - Listens to link clicks [data-link] and the
//    browser back/forward buttons (popstate).
// ============================================

export class Router {
  /**
   * @param {Array<{path: string, page: Function}>} routes
   */
  constructor(routes) {
    this.routes = routes;

    // Handle browser back/forward
    window.addEventListener('popstate', () => this._handleRoute());

    // Intercept clicks on [data-link] anchors
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        this.navigateTo(link.getAttribute('href'));
      }
    });
  }

  /** Navigate programmatically */
  navigateTo(url) {
    window.history.pushState({}, '', url);
    this._handleRoute();
  }

  /** Match current URL to a route and render it */
  async _handleRoute() {
    const path = window.location.pathname;

    // Find matching route (supports :param segments)
    const match = this._matchRoute(path);

    // Update active nav link
    this._updateActiveLink(path);

    const appContent = document.getElementById('app-content');

    try {
      // Show loading state while page module loads
      appContent.innerHTML = '<div class="loading-spinner">Loading…</div>';

      // Call the matched page's render function
      const html = await match.page(match.params);
      appContent.innerHTML = html;

      // Re-trigger fade animation by cloning the node
      appContent.style.animation = 'none';
      requestAnimationFrame(() => {
        appContent.style.animation = '';
      });

    } catch (err) {
      appContent.innerHTML = `
        <div class="error-box">
          <h2>Something went wrong</h2>
          <p>${err.message}</p>
        </div>`;
    }
  }

  /** Match a pathname against registered routes */
  _matchRoute(path) {
    for (const route of this.routes) {
      const { regex, keys } = this._pathToRegex(route.path);
      const match = path.match(regex);
      if (match) {
        const params = {};
        keys.forEach((key, i) => { params[key] = match[i + 1]; });
        return { page: route.page, params };
      }
    }
    // No match — use the 404 route (last in array)
    return { page: this.routes[this.routes.length - 1].page, params: {} };
  }

  /** Convert '/users/:id' → { regex, keys: ['id'] } */
  _pathToRegex(path) {
    const keys = [];
    const regexStr = '^' +
      path.replace(/:([^/]+)/g, (_, key) => {
        keys.push(key);
        return '([^/]+)';
      }) + '$';
    return { regex: new RegExp(regexStr), keys };
  }

  /** Highlight the current nav link */
  _updateActiveLink(path) {
    document.querySelectorAll('[data-link]').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === path) {
        link.classList.add('active');
      }
    });
  }

  /** Start the router (call once on app init) */
  init() {
    this._handleRoute();
  }
}
