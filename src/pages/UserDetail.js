// src/pages/UserDetail.js
// Demonstrates: dynamic :id route param + Promise.all parallel fetching
import { api } from '../modules/api.js';
import { escapeHtml, getInitials, truncate } from '../utils/helpers.js';

const AVATAR_COLORS = [
  ['rgba(99,102,241,0.2)','#818cf8'],
  ['rgba(34,211,238,0.15)','#22d3ee'],
  ['rgba(52,211,153,0.15)','#34d399'],
  ['rgba(251,191,36,0.15)','#fbbf24'],
  ['rgba(248,113,113,0.15)','#f87171'],
  ['rgba(167,139,250,0.15)','#a78bfa'],
];

export default async function UserDetail({ id }) {
  // Promise.all — user info and posts load IN PARALLEL, not one-after-the-other
  const [user, posts] = await Promise.all([
    api.getUser(id),
    api.getPostsByUser(id),
  ]);

  const [bg, color] = AVATAR_COLORS[(parseInt(id) - 1) % AVATAR_COLORS.length];

  const postCards = posts.map(post => `
    <div class="card">
      <span class="post-number">POST #${post.id}</span>
      <h3>${escapeHtml(truncate(post.title, 70))}</h3>
      <p>${escapeHtml(post.body)}</p>
      <span class="tag">User #${post.userId}</span>
    </div>
  `).join('');

  return `
    <a href="/users" data-link class="back-link">← Back to all users</a>

    <div class="detail-header">
      <div class="detail-avatar" style="background:${bg};color:${color}">
        ${escapeHtml(getInitials(user.name))}
      </div>
      <div class="detail-info">
        <h1>${escapeHtml(user.name)}</h1>
        <p>@${escapeHtml(user.username)} &nbsp;·&nbsp; ${escapeHtml(user.email)}</p>
        <p>${escapeHtml(user.company.name)} &nbsp;·&nbsp; ${escapeHtml(user.address.city)}, ${escapeHtml(user.address.zipcode)}</p>
        <div class="detail-tags">
          <span class="tag">🌐 ${escapeHtml(user.website)}</span>
          <span class="tag tag-cyan">📞 ${escapeHtml(user.phone)}</span>
          <span class="tag tag-green">${posts.length} posts</span>
        </div>
      </div>
    </div>

    <div class="page-header">
      <h1>Posts by ${escapeHtml(user.name)}</h1>
      <p>User &amp; posts loaded simultaneously with <code style="font-family:var(--mono);color:var(--green)">Promise.all()</code> — two parallel requests instead of sequential</p>
      <div class="stat-row">
        <div class="stat-pill">Posts <span>${posts.length}</span></div>
        <div class="stat-pill">Strategy <span>Promise.all</span></div>
        <div class="stat-pill">Endpoint <span>GET /posts?userId=${id}</span></div>
      </div>
    </div>
    <div class="cards-grid">${postCards}</div>
  `;
}
