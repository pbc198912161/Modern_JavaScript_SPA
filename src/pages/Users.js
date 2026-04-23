// src/pages/Users.js
import { api } from '../modules/api.js';
import { escapeHtml, getInitials } from '../utils/helpers.js';

// Avatar background colours — cycles through these
const AVATAR_COLORS = [
  ['rgba(99,102,241,0.2)','#818cf8'],
  ['rgba(34,211,238,0.15)','#22d3ee'],
  ['rgba(52,211,153,0.15)','#34d399'],
  ['rgba(251,191,36,0.15)','#fbbf24'],
  ['rgba(248,113,113,0.15)','#f87171'],
  ['rgba(167,139,250,0.15)','#a78bfa'],
];

export default async function Users() {
  const users = await api.getUsers();

  const userCards = users.map((user, i) => {
    const [bg, color] = AVATAR_COLORS[i % AVATAR_COLORS.length];
    const initials = escapeHtml(getInitials(user.name));
    return `
      <a href="/users/${user.id}" data-link style="text-decoration:none">
        <div class="user-card">
          <div class="user-card-top">
            <div class="avatar" style="background:${bg};color:${color};">${initials}</div>
            <div class="user-card-info">
              <h3>${escapeHtml(user.name)}</h3>
              <span>@${escapeHtml(user.username)}</span>
            </div>
          </div>
          <div class="user-meta">
            <div>✉️ &nbsp;${escapeHtml(user.email)}</div>
            <div>🏢 &nbsp;${escapeHtml(user.company.name)}</div>
            <div>🌐 &nbsp;${escapeHtml(user.website)}</div>
            <div>📍 &nbsp;${escapeHtml(user.address.city)}</div>
          </div>
          <div class="user-card-link">View posts <span>→</span></div>
        </div>
      </a>
    `;
  }).join('');

  return `
    <div class="page-header">
      <h1>Users</h1>
      <p>Fetched from JSONPlaceholder REST API using <code style="font-family:var(--mono);color:var(--cyan)">async/await</code> with timeout &amp; retry</p>
      <div class="stat-row">
        <div class="stat-pill">Total &nbsp;<span>${users.length}</span></div>
        <div class="stat-pill">Endpoint &nbsp;<span>GET /users</span></div>
        <div class="stat-pill">Strategy &nbsp;<span>fetchWithRetry()</span></div>
      </div>
    </div>
    <div class="cards-grid">${userCards}</div>
  `;
}
