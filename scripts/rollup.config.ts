import type { InputOption, OutputOptions } from 'rollup'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import typescript from 'rollup-plugin-typescript2'
import { path } from 'zx'

export default (input: InputOption, output: OutputOptions[]) => {
  return defineConfig({
    input,
    output,
    plugins: [
      typescript({ useTsconfigDeclarationDir: true, tsconfig: path.resolve(process.cwd(), 'packages/ipc/tsconfig.json') }),
      esbuild({
        include: /\.[jt]sx?$/,
        exclude: /node_modules/,
        minify: true,
        // minify: false,
        target: 'es2017' // 语法风格
      })
    ]
  })
}
