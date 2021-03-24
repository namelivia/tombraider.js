module.exports = {
  moduleFileExtensions: ["ts", "js"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts|js}"],
  transform: {
    "^.+\\.(js|ts|tsx)$": "esbuild-jest"
  }
};
