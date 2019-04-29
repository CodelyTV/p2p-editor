const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          'eslint-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new Dotenv(),
    new CopyWebpackPlugin([
        { from: 'public' }
    ])
  ],
  node: {
    fs: 'empty'
  },
  devServer: {
    host: '0.0.0.0',
    port: 3617,
    historyApiFallback: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
};
