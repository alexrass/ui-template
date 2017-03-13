require('babel-register');
const config = require('./config/webpack.config.babel');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

new WebpackDevServer(webpack(config), {
  compress: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: true,
  hot: true,
  https: true,
  publicPath: config.output.publicPath,
  stats: {
    assets: true,
    children: false,
    chunkModules: false,
    colors: true,
    errorDetails: true,
    errors: true,
    hash: true,
    reasons: true,
    source: true,
    timings: true,
    version: true,
    warnings: true,
  },
  watchOptions: {
    aggregateTimeout: 1500,
  },
}).listen(8000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }
});
