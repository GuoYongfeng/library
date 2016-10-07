var path = require('path')
var webpack = require('webpack')
var mode = require('yargs').argv.mode
// plugin
var uglifyPlugin = webpack.optimize.UglifyJsPlugin

var libraryName = 'sparrow'
var plugins = []
var filename = ''

// 生产环境
if(mode === 'production'){
  plugins.push(new uglifyPlugin({minimize: true}))
  filename = libraryName + '.min.js'
}
// 开发环境
else {
  filename = libraryName + '.js'
}

var config = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: filename,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  "devtool": 'cheap-source-map',
  resolve: {
    extension: ['', '.js', '.css', '.json'],
    root: path.resolve('./src')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ]
  },
  plugins: plugins
}

module.exports = config
