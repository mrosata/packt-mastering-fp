const autoprefixer = require('autoprefixer'),
      webpack      = require('webpack'),
      path         = require('path');

const {resolve} = path;

const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');


const BUILD_DIR   = resolve(__dirname, 'build'),
      APP_DIR     = resolve(__dirname, 'app'),
      ASSETS_DIR  = '/assets',
      OUTPUT_FILE = 'bundle.js',
      ENTRY_FILE  = resolve(APP_DIR, 'entry.js'),
      UTILS_DIR   = resolve(__dirname, 'app', 'utils'),
      HOST_NAME   = 'localhost', // <-- will be on local network
      PORT        = 5000;

module.exports = {
  entry:     [
    'tether',
    'font-awesome-loader',
    bootstrapEntryPoints.dev,
    ENTRY_FILE,
  ],

  output:    {
    path:       BUILD_DIR,
    filename:   OUTPUT_FILE,
    publicPath: ASSETS_DIR,
  },

  devtool:   'source-map',

  devServer: {
    inline:      true,
    contentBase: BUILD_DIR,
    host:        HOST_NAME,
    port:        PORT,
  },

  resolve: {
    alias: {
      utils: UTILS_DIR,
    },
    extensions: ['.js', '.jsx'],
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
          },
        },
        'postcss-loader'
      ],
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    }, {
      test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use:  'url-loader?limit=10000',
    }, {
      test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
      use:  'file-loader',
    }, {
      test: /bootstrap-sass\/assets\/javascripts\//,
      use: 'imports-loader?jQuery=jquery'
    }, {
      test:    /\.jsx?$/,
      include: APP_DIR,
      exclude: /(node_modules)|(bower_components)/,
      loader:  'babel-loader',
    }],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      'window.Tether': 'tether',
    }),
    new webpack.LoaderOptionsPlugin({
      postcss: [autoprefixer],
    }),
  ],

};
