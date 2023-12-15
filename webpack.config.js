var webpack = require("webpack");
var timers = require("timers");
var LodashModulePlugin = require('lodash-webpack-plugin');

module.exports = {
  entry: {
    "rss-parser": "./index.js"
  },
  plugins: [
    new LodashModulePlugin({
      'collections': true,
      'paths': true
    }),
  ],
  output: {
    path: __dirname,
    filename: "dist/[name].js",
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'RSSParser'
  },
  resolve: {
    extensions: ['.js'],
    fallback: {
      "fs": require.resolve("fs"),
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "url": require.resolve("url"),
      "buffer": require.resolve("buffer-browserify"),
      "timers": require.resolve("timers-browserify")
    } 
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  },
  externals: {
    xmlbuilder: 'xmlbuilder'
  },
  node: {
    global: false
  }
}
