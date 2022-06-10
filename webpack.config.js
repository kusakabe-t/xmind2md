const path = require('path')

module.exports = {
  mode: 'production',
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /(node_modules|browser_components)/,
        use: {
          loader: 'swc-loader'
        }
      },
    ]
  },
  resolve: {
    alias: {
      './lib/mdSyntax': path.resolve(__dirname, 'lib/mdSyntax.ts'),
      './lib/writeFileSyncRecursive': path.resolve(__dirname, 'lib/writeFileSyncRecursive.ts'),
    }
  },
  plugins: []
}
