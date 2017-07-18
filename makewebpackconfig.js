var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');

module.exports = function(options) {
  var entry, jsLoaders, plugins, cssLoaders;

  // If production is true
  if (options.prod) {
    // Entry
    entry = [
      path.resolve(__dirname, 'js/app.js') // Start with js/app.js...
    ];
    cssLoaders = ['file-loader?name=[path][name].[ext]', 'postcss-loader'];
    // Plugins
    plugins = [// Plugins for Webpack
      new webpack.optimize.UglifyJsPlugin({ // Optimize the JavaScript...
        compress: {
          warnings: false // ...but do not show warnings in the console (there is a lot of them)
        },
        wrap: false
      }),
      new HtmlWebpackPlugin({
        template: 'index.html', // Move the index.html file...
        minify: { // Minifying it while it is parsed using the following, self–explanatory options
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),
      new AppCachePlugin()
    ];

  // If app is in development
  } else {
    // Entry
    entry = [
      "webpack-dev-server/client?http://0.0.0.0:3000", // Needed for hot reloading
      "webpack/hot/only-dev-server", // See above
      path.resolve(__dirname, 'js/app.js') // Start with js/app.js...
    ];
    cssLoaders = ['style-loader', 'css-loader', 'postcss-loader'];
    // Only plugin is the hot module replacement plugin
    plugins = [
      new webpack.HotModuleReplacementPlugin() // Make hot loading work
    ]
  }

  return {
    entry: entry,
    output: { // Compile into js/build.js
      path: path.resolve(__dirname, 'build'),
      filename: "js/bundle.js"
    },
    resolve: {
        alias: {
            react: 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },
    module: {
      loaders: [{
          test: /\.js$/, // Transform all .js files required somewhere within an entry point...
          loader: 'babel', // ...with the specified loaders...
          exclude: path.join(__dirname, '/node_modules/') // ...except for the node_modules folder.
        }, {
          test:   /\.css$/, // Transform all .css files required somewhere within an entry point...
          loaders: cssLoaders // ...with PostCSS
        }, {
          test: /\.jpe?g$|\.gif$|\.png$/i,
          loader: "file-loader?name=[path][name].[ext]"
        }
      ]
    },
    plugins: plugins,
    postcss: function() {
      return [
        require('postcss-import')({ // Import all the css files...
          onImport: function (files) {
              files.forEach(this.addDependency); // ...and add dependecies from the main.css files to the other css files...
          }.bind(this) // ...so they get hot–reloaded when something changes...
        }),
        require('postcss-simple-vars')(), // ...then replace the variables...
        require('postcss-focus')(), // ...add a :focus to ever :hover...
        require('autoprefixer-core')({ // ...and add vendor prefixes...
          browsers: ['last 2 versions', 'IE > 8', 'iOS > 5'] // ...supporting the last 2 major browser versions and IE 8 and up...
        }),
        require('cssnano')({ // ...and minify the result.
          autoprefixer: false, // Don't run autoprefixer since we've already done that...
          comments: {
            removeAll: true // ...and remove all comments, even those marked important.
          }
        }),
        require('postcss-reporter')({ // This plugin makes sure we get warnings in the console
          clearMessages: true
        })
      ];
    },
    target: "web", // Make web variables accessible to webpack, e.g. window
    stats: false, // Don't show stats in the console
    progress: true
  }
}
