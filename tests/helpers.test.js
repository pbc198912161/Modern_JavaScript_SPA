// tests/helpers.test.js
// ============================================
//  UNIT TESTS — Jest
//  Testing pure utility functions from helpers.js
//  Run with: npm test
// ============================================

const {
  truncate,
  titleCase,
  formatDate,
  escapeHtml,
  groupBy,
  getInitials,
} = require('../src/utils/helpers.js');

// ---- truncate() ----
describe('truncate()', () => {
  test('returns the string as-is if shorter than limit', () => {
    expect(truncate('Hello', 10)).toBe('Hello');
  });

  test('truncates and adds ellipsis when over limit', () => {
    const result = truncate('Hello World', 5);
    expect(result).toBe('Hello…');
  });

  test('returns empty string for non-string input', () => {
    expect(truncate(null)).toBe('');
    expect(truncate(123)).toBe('');
  });

  test('handles exact-length string', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
  });
});

// ---- titleCase() ----
describe('titleCase()', () => {
  test('capitalises each word', () => {
    expect(titleCase('hello world')).toBe('Hello World');
  });

  test('handles already-capitalised string', () => {
    expect(titleCase('HELLO WORLD')).toBe('Hello World');
  });

  test('returns empty string for non-string input', () => {
    expect(titleCase(null)).toBe('');
  });
});

// ---- formatDate() ----
describe('formatDate()', () => {
  test('formats a valid date string', () => {
    const result = formatDate('2024-01-15');
    expect(result).toMatch(/Jan/i);
    expect(result).toMatch(/2024/);
  });

  test('returns "Invalid date" for bad input', () => {
    expect(formatDate('not-a-date')).toBe('Invalid date');
  });
});

// ---- escapeHtml() ----
describe('escapeHtml()', () => {
  test('escapes < and >', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
  });

  test('escapes ampersand', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b');
  });

  test('escapes double quotes', () => {
    expect(escapeHtml('"hello"')).toBe('&quot;hello&quot;');
  });

  test('returns safe string unchanged', () => {
    expect(escapeHtml('Hello World')).toBe('Hello World');
  });
});

// ---- groupBy() ----
describe('groupBy()', () => {
  const items = [
    { userId: 1, title: 'Post A' },
    { userId: 2, title: 'Post B' },
    { userId: 1, title: 'Post C' },
  ];

  test('groups items by key', () => {
    const result = groupBy(items, 'userId');
    expect(result[1]).toHaveLength(2);
    expect(result[2]).toHaveLength(1);
  });

  test('returns empty object for non-array input', () => {
    expect(groupBy('not an array', 'key')).toEqual({});
  });
});

// ---- getInitials() ----
describe('getInitials()', () => {
  test('returns initials for a full name', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  test('handles single name', () => {
    expect(getInitials('Cher')).toBe('C');
  });

  test('only returns 2 initials for long names', () => {
    expect(getInitials('John Michael Doe')).toBe('JM');
  });

  test('returns ? for non-string', () => {
    expect(getInitials(null)).toBe('?');
  });
});
