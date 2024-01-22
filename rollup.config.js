import path from 'node:path'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { defineConfig } from 'rollup'

const input = path.join(__dirname, './lib/index.js')

const plugins = [
  nodeResolve({
    preferBuiltins: true,
  }),
  commonjs(),
]

const commonConfig = {
  input,
  treeshake: 'smallest',
}

const outputs = env => [{
  dir: 'dist',
  format: 'esm',
  entryFileNames: `[name]${env ? `.${env}` : ''}.mjs`,
}, {
  dir: 'dist',
  format: 'cjs',
  entryFileNames: `[name]${env ? `.${env}` : ''}.cjs`,
}]

export default () => defineConfig([
  {
    ...commonConfig,
    output: outputs(),
    plugins: [
      ...plugins,
    ],
  },
])
