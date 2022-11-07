const esbuild = require('rollup-plugin-esbuild')

export default {
  input: 'index.ts',
  output: [{
    file: 'dist/index.cjs',
    format: 'cjs'
  },
  {
    file: 'dist/index.mjs',
    format: 'esm'
  }],
  plugins: [
    esbuild({
      include: /\.[jt]sx?$/,
      exclude: /node_modules/,
      sourceMap: false, // default
      // minify: true,
      minify: false,
      target: 'es2017' // 语法风格
    })
  ]
}
