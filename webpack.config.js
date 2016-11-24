const path = require('path');
const webpack = require('webpack'); //eslint-disable-line
const ExtractText = require('extract-text-webpack-plugin'); //eslint-disable-line

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './src/js/main',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractText('styles.css', {
      allChunks: true,
    }),
  ],
  resolve: {
    alias: {
      flags: path.join(__dirname, 'node_modules', 'country-flags', 'svg'),
    },
    extensions: ['', '.js', '.jsx', '.svg'],
  },
  module: {
    loaders: [{
      test: /\.json$/,
      loaders: ['json'],
    },
    {
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src'),
    },
    {
      test: /\.scss$/,
      loader:
          ExtractText.extract('style', 'css!sass'),
    },
      { test: /\.svg/, loaders: ['file-loader?name=[path][name].[ext]'] },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file' },
    ],
  },
};
