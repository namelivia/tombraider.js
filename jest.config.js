module.exports = {
  verbose: true,
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.js'],
  coverageThreshold: {
    global: {
      lines: 75,
      statements: 75,
    },
  },
  transform: {
    '^.+\\.(js|ts|tsx)$': 'esbuild-jest',
  },
}
