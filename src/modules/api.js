// src/modules/api.js
// ============================================
//  ASYNC DATA FETCHING MODULE
//  - Centralizes all HTTP calls
//  - Uses async/await with robust error handling
//  - Implements retry logic and timeout
// ============================================

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// ---- Core Fetch Wrapper ----

/**
 * Wraps fetch with timeout + error handling.
 * @param {string} url
 * @param {object} options - fetch options
 * @param {number} timeoutMs - abort after this many ms
 * @returns {Promise<any>} parsed JSON
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
  // AbortController lets us cancel the request if it takes too long
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    // HTTP errors (404, 500, etc.) don't throw by default — we do it manually
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText} — ${url}`);
    }

    return await response.json();

  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeoutMs}ms: ${url}`);
    }
    throw err; // Re-throw all other errors up the call stack
  } finally {
    clearTimeout(timeoutId); // Always clean up the timer
  }
}

/**
 * Retry a fetch up to `retries` times with exponential backoff.
 * @param {string} url
 * @param {number} retries
 * @returns {Promise<any>}
 */
async function fetchWithRetry(url, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fetchWithTimeout(url);
    } catch (err) {
      if (attempt === retries) throw err; // Last attempt — give up
      const delay = Math.pow(2, attempt) * 500; // 500ms, 1000ms ...
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// ---- Public API Methods ----

export const api = {

  /** Fetch all users */
  async getUsers() {
    return await fetchWithRetry(`${BASE_URL}/users`);
  },

  /** Fetch a single user by ID */
  async getUser(id) {
    return await fetchWithRetry(`${BASE_URL}/users/${id}`);
  },

  /** Fetch all posts */
  async getPosts() {
    return await fetchWithRetry(`${BASE_URL}/posts`);
  },

  /** Fetch a single post by ID */
  async getPost(id) {
    return await fetchWithRetry(`${BASE_URL}/posts/${id}`);
  },

  /** Fetch posts by a specific user */
  async getPostsByUser(userId) {
    return await fetchWithRetry(`${BASE_URL}/posts?userId=${userId}`);
  },

  /**
   * Demonstrates fetching multiple resources in PARALLEL
   * using Promise.all — much faster than sequential awaits!
   */
  async getDashboardData() {
    const [users, posts] = await Promise.all([
      this.getUsers(),
      this.getPosts(),
    ]);
    return { users, posts };
  },
};
