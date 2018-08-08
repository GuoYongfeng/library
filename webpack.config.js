const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const libraryName = "sparrow"; // package name
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = env => {
  let filename = env.mode == "development" ? `${libraryName}.js` : `${libraryName}.min.js`;

  return {
    mode: env.mode,
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      path: path.resolve(__dirname, './lib'),
      filename: filename,
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.css', '.json']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["babel-loader"]
        }
        // {
        //   test: /\.js$/,
        //   use: "eslint-loader",
        //   exclude: /node_modules/
        // }
      ]
    },
    plugins: [
      env.mode == "production" ? new UglifyJsPlugin({
        sourceMap: true,
        cache: true
      }): {},
      new webpack.BannerPlugin({
        banner: `
        @license Sparrow v1.0.2
          sparrow.js
        Copyright (c) 2016-present, yonyou, Inc.
        
        This source code is licensed under the MIT license found in the
        LICENSE file in the root directory of this source tree.
        
        Author: Yonyou FED 
        Date: 2018-08-08
        `
      }),
      new cleanWebpackPlugin(['lib'])
    ]
  }
}
