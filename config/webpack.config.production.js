import BundleTracker from 'webpack-bundle-tracker';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import Config from 'webpack-config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

export default new Config().extend('./config/webpack.config.base.js').merge({
  bail: true,

  devtool: 'cheap-module-source-map',

  entry: {},

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]',
            'postcss-loader',
          ],
        }),
      },
    ]
  },

  output: {
    filename: 'bundle.[chunkhash].min.js',
    path: path.resolve('../dist/assets/webpack'),
    publicPath: '/assets/webpack/',
  },

  plugins: [
    new BundleTracker({
      path: path.resolve('../dist/assets/webpack'),
      filename: 'webpack-stats.json',
    }),
    new CleanWebpackPlugin(['*'], {
      root: path.resolve('../dist/assets/webpack'),
      verbose: false,
    }),
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'bundle.[chunkhash].min.css',
      ignoreOrder: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
  ],

  profile: true,
});
