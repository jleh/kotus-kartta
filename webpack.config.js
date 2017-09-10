var path = require('path');

module.exports = {
  entry: './map.js',
  output: {
    libraryTarget: 'window',
    library: 'KotusMap',
    filename: 'build/map-component.js'
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
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './build/'
            }
          }
        ]
      }
    ]
  }
}
