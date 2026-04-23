// jest.config.cjs
module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  // Tells Jest to treat these as CommonJS (no ESM issues on Windows)
  transformIgnorePatterns: [],
};
