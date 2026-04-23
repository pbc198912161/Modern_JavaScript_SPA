// src/utils/helpers.js
// ============================================
//  UTILITY / HELPER FUNCTIONS
//  Pure functions — easy to unit test with Jest
// ============================================

function truncate(text, maxLength = 100) {
  if (typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '\u2026';
}

function titleCase(str) {
  if (typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatDate(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid date';
  return d.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(str).replace(/[&<>"']/g, ch => map[ch]);
}

function groupBy(array, key) {
  if (!Array.isArray(array)) return {};
  return array.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}

function getInitials(name) {
  if (typeof name !== 'string') return '?';
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

// Dual export: works in both browser (ES module) AND Jest (CommonJS)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { truncate, titleCase, formatDate, debounce, escapeHtml, groupBy, getInitials };
} else {
  // ESM export handled below
}

export { truncate, titleCase, formatDate, debounce, escapeHtml, groupBy, getInitials };
