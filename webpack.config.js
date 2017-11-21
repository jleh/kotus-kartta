var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './map.js',
//  devtool: 'source-map',
  output: {
    libraryTarget: 'window',
    library: 'KotusMap',
    filename: 'map-component.js',
    path: __dirname + '/build'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [ { loader: 'base64-inline-loader' } ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify('production') }
    })
  ]
}
