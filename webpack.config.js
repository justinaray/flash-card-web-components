/* eslint-env node */
const packageDef = require('./package.json');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: './src/app.ts',
  },
  output: {
    library: `${packageDef.name}_[name]`,
    libraryTarget: 'umd',
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {watch: true}),
    new CopyWebpackPlugin([{from: 'public', to: '.'}])
  ],
  devServer: {
    contentBase: __dirname + '/dist'
  }
};