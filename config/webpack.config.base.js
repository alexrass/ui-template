import BellOnBundlerErrorPlugin from 'bell-on-bundler-error-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import chalk from 'chalk';
import Config, { environment } from 'webpack-config';
import path from 'path';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import RequireNodeVersion from 'webpack-node-version';
import StylelintPlugin from 'stylelint-webpack-plugin';
import webpack from 'webpack';

console.log('Cleaning old files');
const ChildProcess = require('child_process');
ChildProcess.execSync(`rm -rf ${ path.join(__dirname, '../dist/assets/webpack') }`);
ChildProcess.execSync(`find ${ path.join(__dirname, '../.cache') } -type d -mtime +7 -maxdepth 1 | xargs rm -rf`);

export default new Config().merge({
  entry: {
    'app': [
      'regenerator-runtime/runtime',
      './src/init.js',
    ],
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        include: path.resolve('./src'),
        test: /\.js$/,
        use: [
          {
            loader: 'eslint-loader',
          },
        ]
      },
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
        test: /\.js$/,
      },
      {
        include: /node_modules/,
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'url-loader?limit=8192&name=[hash].[ext]',
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          'url-loader?limit=10000&mimetype=application/font-woff&name=[hash].[ext]',
        ],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          'file-loader?name=[hash].[ext]',
        ],
      },
    ],

    noParse: [
      /\.min\.js/
    ],
  },

  plugins: [
    new BellOnBundlerErrorPlugin(),
    new CaseSensitivePathsPlugin(),
    new ProgressBarPlugin({
      clear: false,
      format: `${ chalk.cyan(':msg') } [:bar] ${ chalk.green.bold(':percent') } (:elapsed seconds)`,
      renderThrottle: 1000,
      width: 50,
    }),
    new RequireNodeVersion({
      version: '>=6.9.1',
    }),
    new StylelintPlugin({
      files: './src/**/*.css',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      _: path.resolve('./node_modules/lodash'),
      Immutable: path.resolve('./node_modules/immutable'),
      Logger: path.resolve('./src/modules/logger'),
      moment: path.resolve('./src/modules/moment'),
      Promise: path.resolve('./src/modules/promise'),
    }),
  ],

  resolve: {
    extensions: ['.js', '.css'],
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src'),
    ],
  },

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

});
