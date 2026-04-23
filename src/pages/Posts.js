// src/pages/Posts.js
import { api } from '../modules/api.js';
import { escapeHtml, truncate, titleCase } from '../utils/helpers.js';

export default async function Posts() {
  const posts = await api.getPosts();

  const postCards = posts.map(post => `
    <div class="card">
      <span class="post-number">POST #${post.id} &nbsp;·&nbsp; USER #${post.userId}</span>
      <h3>${escapeHtml(titleCase(truncate(post.title, 65)))}</h3>
      <p>${escapeHtml(truncate(post.body, 115))}</p>
      <span class="tag">User #${post.userId}</span>
    </div>
  `).join('');

  return `
    <div class="page-header">
      <h1>Posts</h1>
      <p>All ${posts.length} posts from JSONPlaceholder — titles formatted with <code style="font-family:var(--mono);color:var(--cyan)">titleCase()</code>, body clipped with <code style="font-family:var(--mono);color:var(--cyan)">truncate()</code></p>
      <div class="stat-row">
        <div class="stat-pill">Total <span>${posts.length}</span></div>
        <div class="stat-pill">Endpoint <span>GET /posts</span></div>
        <div class="stat-pill">Helpers used <span>titleCase · truncate · escapeHtml</span></div>
      </div>
    </div>
    <div class="cards-grid">${postCards}</div>
  `;
}
