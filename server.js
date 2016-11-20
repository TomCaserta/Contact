
var path = require('path');
var webpack = require('webpack');
var express = require('express');
var dev = require('webpack-dev-middleware');
var hot = require('webpack-hot-middleware');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

app.use(dev(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true
}));

app.use(hot(compiler));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, "src", 'index.html'));
});

app.listen(3000, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Server Started, Listening for connections...');
});
