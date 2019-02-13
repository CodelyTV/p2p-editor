const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: 'public' }
    ])
  ],
  node: {
    fs: 'empty'
  },
  devServer: {
    port: 8000,
    historyApiFallback: true
  }
};
