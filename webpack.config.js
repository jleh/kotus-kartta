var path = require('path');

module.exports = {
  entry: './map.js',
  output: {
    libraryTarget: 'var',
    library: 'NadigiMap',
    filename: 'build/map-bundle.js'
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
                'file-loader'
            ]
       }
    ]
  },
  resolve: {
    // Leaflet image Alias resolutions
    alias: {
      './images/layers.png$': path.resolve(__dirname, './node_modules/leaflet/dist/images/layers.png'),
      './images/layers-2x.png$': path.resolve(__dirname, './node_modules/leaflet/dist/images/layers-2x.png'),
      './images/marker-icon.png$': path.resolve(__dirname, './node_modules/leaflet/dist/images/marker-icon.png'),
      './images/marker-icon-2x.png$': path.resolve(__dirname, './node_modules/leaflet/dist/images/marker-icon-2x.png'),
      './images/marker-shadow.png$': path.resolve(__dirname, './node_modules/leaflet/dist/images/marker-shadow.png')
    }
  }
}
