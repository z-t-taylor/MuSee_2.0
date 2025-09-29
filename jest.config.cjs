const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: [
    "<rootDir>/src/__tests__/api/",
    "<rootDir>/src/__tests__/jest.setup.ts",
  ],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}",
    "!<rootDir>/src/**/__tests__/**/jest.setup.ts",
  ],
};

module.exports = createJestConfig(customJestConfig);
