const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const config = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: './built/statics',
    publicPath: process.env.NODE_ENV === 'production'
      ? 'https://platzi-react-sfs.now.sh'
      : 'http://localhost:3001/',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2016', 'es2017'],
          env: {
            production: {
              plugins: [
                'transform-regenerator',
                'transform-runtime',
                'transform-minify-booleans',
                'transform-remove-console',
                'transform-remove-debugger',
                'transform-undefined-to-void',
              ],
              presets: ['es2015'],
            },
            development: {
              plugins: ['transform-es2015-modules-commonjs'],
            },
          },
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules!sass'),
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.json'],
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new ExtractTextPlugin('../statics/styles.css'),
  ],
};


if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require'],
      },
    })
  );
}


module.exports = config;
