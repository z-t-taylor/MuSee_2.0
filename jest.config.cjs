module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: [
    "<rootDir>/src/tests/api/", // ignore Vitest tests
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Next.js absolute imports
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"], // <- add this
};
