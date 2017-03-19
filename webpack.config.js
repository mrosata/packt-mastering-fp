const autoprefixer = require('autoprefixer'),
      webpack      = require('webpack'),
      path         = require('path');

const {resolve} = path;

const BUILD_DIR = resolve(__dirname, 'build'),
      APP_DIR   = resolve(__dirname, 'app'),
      HOST_NAME = '0.0.0.0', // <-- note this will be on local network
      PORT      = 5000;

module.exports = {
  entry:     resolve(APP_DIR, 'entry.js'),
  output:    {
    path:     BUILD_DIR,
    filename: 'bundle.js'
  },
  devtool:   'source-map',
  devServer: {
    inline:      true,
    contentBase: BUILD_DIR,
    host:        HOST_NAME,
    port:        PORT
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {

    rules: [{
      test: /\.css$/,
      use:  [
        'style-loader',
        {
          loader:  'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'postcss-loader'
      ]
    }, {
      test: /\.scss$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    }, {
      test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use:  'url-loader?limit=10000',
    }, {
      test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
      use:  'file-loader',
    }, {
      test: /bootstrap-sass\/assets\/javascripts\//, use: 'imports-loader?jQuery=jquery'
    }, {
      test:    /\.jsx?$/,
      include: APP_DIR,
      exclude: /(node_modules)|(bower_components)/,
      loader:  'babel-loader'
    }]
  }

};
