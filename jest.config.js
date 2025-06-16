module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'jest-css-modules-transform',
    '\\.(svg|png|jpg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx|js)']
};
