module.exports = {
  verbose: true,
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.js'],
  coverageThreshold: {
    global: {
      lines: 90,
      statements: 90,
    },
  },
  transform: {
    '^.+\\.(js|ts|tsx)$': 'esbuild-jest',
  },
}
