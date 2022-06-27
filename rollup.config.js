import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'

export default {
  input: './src/index.js',
  output: {
    file: './lib/index.js',
    format: 'cjs'
  },
  plugins: [babel(), postcss()],
  external: ['react', 'antd', 'react-draggable']
}