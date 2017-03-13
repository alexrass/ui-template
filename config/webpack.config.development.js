import _ from 'lodash';
import Config from 'webpack-config';
import crypto from 'crypto';
import FileSystem from 'fs';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import ObjectHash from 'node-object-hash';
import path from 'path';
import webpack from 'webpack';

export default new Config().extend({
  './config/webpack.config.base.js': baseConfig => {
    // Hot reload must be inserted above the base app
    const hotReload = [
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?https://localhost:8000',
      'react-hot-loader/patch',
    ];

    const apps = Object.keys(baseConfig.entry);
    apps.forEach(app => hotReload.forEach(entry => baseConfig.entry[app].unshift(entry)));

    return baseConfig;
  }
}).merge({
  bail: false,

  devtool: '#inline-source-map',

  entry: {},

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.css$/,
        use: [
          'style-loader?sourceMap=true',
          'css-loader?modules&importLoaders=1&localIdentName=[path]__[name]__[local]',
          'postcss-loader',
        ],
      },
    ]
  },

  output: {
    filename: '[name].bundle.js',
    publicPath: 'https://localhost:8000/assets/webpack/'
  },

  plugins: [
    new HardSourceWebpackPlugin({
      cacheDirectory: path.resolve('.cache/[confighash]'),
      recordsPath: path.resolve('.cache/[confighash]/records.json'),
      configHash: (webpackConfig) => ObjectHash().hash(webpackConfig),
      environmentHash: {
        directories: [
          path.resolve('./node_modules'),
        ],
        files: [
          'package.json',
        ],
      },
      environmentHash: () => new Promise((resolve, reject) => {
        FileSystem.readFile(path.resolve('./yarn.lock'), (err, src) => {
          if (err) {
            return reject(err);
          }
          resolve(crypto.createHash('md5').update(src).digest('hex'));
        });
      }),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],

  profile: false,

  watch: true,
});
