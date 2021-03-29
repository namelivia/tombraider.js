const { build } = require('esbuild')

build({
  entryPoints: ['./src/TombRaiderMenu.ts'],
  outfile: './dist/tombraider.js-v0.0.1.min.js',
  minify: true,
  bundle: true,
}).catch(() => process.exit(1))
