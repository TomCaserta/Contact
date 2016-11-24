const path = require('path');
const webpack = require('webpack'); //eslint-disable-line
const ExtractText = require('extract-text-webpack-plugin'); //eslint-disable-line
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-maps',
  entry: [
    './src/js/main',
  ],
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'js/bundle.min.js',
    publicPath: '',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractText('css/styles.css', {
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new FaviconsWebpackPlugin({
      logo: './src/images/logo.svg',
      prefix: 'icons/',
    }),
    new HtmlWebpackPlugin({
      title: "Contact",
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
      exclude: /(node_modules|bower_components)/,
      include: path.join(__dirname, 'src'),
    },
    {
      test: /\.scss$/,
      loader:
          ExtractText.extract('style', 'css!sass!postcss-loader'),
    },
      { test: /\.svg/, loaders: ['file-loader?name=images/svg/[name].[ext]'] },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=images/[name].[ext]' },
    ],
  },
  postcss: [require('autoprefixer')],
};
