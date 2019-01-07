require('babel-polyfill');

// Webpack config for development
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var assetsPath = path.resolve(__dirname, '../static/dist');
var autoprefixer = require('autoprefixer');
var host = (process.env.HOST || 'localhost');
var port = parseInt(process.env.PORT) + 1 || 3001;
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({size: 5});

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}


var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
delete babelLoaderQuery.env;

// Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
var reactTransform = null;
for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
  var plugin = babelLoaderQuery.plugins[i];
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin;
  }
}

if (!reactTransform) {
  reactTransform = ['react-transform', {transforms: []}];
  babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []});
}

// make sure react-transform-hmr is enabled
reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
});

module.exports = {
  context: path.resolve(__dirname, '..'),
  module: {
    loaders: [
      createSourceLoader({
        happy: {id: 'jsx'},
        test: /\.jsx?$/,
        loaders: ['babel?' + JSON.stringify(babelLoaderQuery), 'eslint-loader', 'react-map-styles'],
      }),

      createSourceLoader({
        happy: {id: 'json'},
        test: /\.json$/,
        loader: 'json-loader',
      }),

      createSourceLoader({
        happy: {id: 'less'},
        test: /\.less$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!less?outputStyle=expanded&sourceMap'
      }),

      createSourceLoader({
        happy: {id: 'sass'},
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap'
      }),
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
      {test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240'}
    ]
  },
  postcss: function () {
    return [autoprefixer({browsers: ['last 2 versions']})];
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    // hot reload
    createHappyPlugin('jsx'),
    createHappyPlugin('json'),
    createHappyPlugin('less'),
    createHappyPlugin('sass'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
    })
  ]
};

if (process.env.MAKE_DLL) {
  module.exports.entry = {
    vendor : vendorArray(),
    main: [
      'bootstrap-sass!./src/theme/bootstrap.config.js',
      './src/client.js'
    ]
  };
  module.exports.output = {
    path: assetsPath,
    filename: '[name]-dll.js',
    library: '[name]_library',
    publicPath: 'http://' + host + ':' + (port - 1) + '/dist/'
  };
  module.exports.plugins.unshift(
    new webpack.DllPlugin({
      path: path.join(assetsPath, '[name]-manifest.json'),
      name: '[name]_library'
    })
  );
  module.exports.plugins.push(
    webpackIsomorphicToolsPlugin.development()
  );
} else {
  console.log('build here!!!');
  module.exports.entry = {
    main: [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      'bootstrap-sass!./src/theme/bootstrap.config.js',
      './src/client.js'
    ]
  };
  module.exports.output = {
    path         : assetsPath,
    filename     : 'app.js',
    publicPath   : 'http://' + host + ':' + port + '/dist/'
  };
  module.exports.plugins.unshift(
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..'),
      manifest: require('../static/dist/vendor-manifest.json')
    })
  );
}

function createSourceLoader(spec) {
  return Object.keys(spec).reduce(function (x, key) {
    x[key] = spec[key];

    return x;
  }, {
    include: [path.resolve(__dirname, '../src')]
  });
}

function createHappyPlugin(id) {
  return new HappyPack({
    id: id,
    threadPool: happyThreadPool,

    // conveniently disable happy with HAPPY=0
    enabled: process.env.HAPPY !== '0',

    // disable happy caching with HAPPY_CACHE=0
    cache: process.env.HAPPY_CACHE !== '0',

    // make happy more verbose with HAPPY_VERBOSE=1
    verbose: process.env.HAPPY_VERBOSE === '1',
  });
}

function vendorArray() {
  return [
    'theme/semantic-ui/semantic.min',
    'babel-polyfill',
    'base16',
    'babel-runtime/core-js',
    'classnames',
    'crypto-js',
    'datatables',
    'dot-component',
    'g2',
    'immutable',
    'jquery',
    'lodash',
    'moment',
    'multireducer',
    'rc-tabs',
    'react',
    'react-addons-shallow-compare',
    'react-addons-update',
    'react-cookie',
    'react-custom-scrollbars',
    'react-dom',
    'react-helmet',
    'react-inline-css',
    'react-modal',
    'react-redux',
    'react-router',
    'react-router-bootstrap',
    'react-router-redux',
    'react-s-alert',
    'reactcss',
    'redux',
    "react-transform-catch-errors",
    "react-transform-hmr",
    "redbox-react",
    "redux-devtools",
    "redux-devtools-dock-monitor",
    "redux-devtools-log-monitor",
    'redux-connect',
    'redux-form',
    'scroll-behavior',
    'sweetalert-react',
    'webpack-hot-middleware',
  ];
}
