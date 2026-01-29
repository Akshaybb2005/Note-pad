export default {
  testEnvironment: "node",
  clearMocks: true,
  testMatch: ["**/tests/**/*.test.js"],
  collectCoverageFrom: [
    "**/*.js",
    "!node_modules/**",
    "!tests/**",
    "!prisma/**"
  ],
};
