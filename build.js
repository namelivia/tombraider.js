const { build } = require('esbuild')

build({
  entryPoints: ['./src/index.ts'],
  outfile: './dist/tombraider.js-v0.0.1.min.js',
  minify: true,
  sourcemap: true,
  target: ['chrome89', 'firefox86', 'safari14', 'edge89'],
  bundle: true,
}).catch(() => process.exit(1))
