import esbuild from 'rollup-plugin-esbuild'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: [{
    file: 'dist/index.cjs',
    format: 'cjs'
  },
  {
    file: 'dist/index.mjs',
    format: 'esm'
  }],
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    esbuild({
      include: /\.[jt]sx?$/,
      exclude: /node_modules/,
      minify: true,
      // minify: false,
      target: 'es2017' // 语法风格
    })
  ]
}
