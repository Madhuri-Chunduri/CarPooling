const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// var cors = require('cors')

const port = process.env.PORT || 3007;
var host = process.env.HOST || '0.0.0.0';

// var cors_proxy = require('cors-anywhere');
// cors_proxy.createServer({
//     originWhitelist: [], // Allow all origins
//     requireHeader: ['origin', 'x-requested-with'],
//     removeHeaders: ['cookie', 'cookie2']
// }).listen(port, host, function() {
//     console.log('Running CORS Anywhere on ' + host + ':' + port);
// });

module.exports = {
 
  mode: 'development',
  entry: './src/index.tsx',
 
  output: {
    filename: 'bundle.js'
  },

  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        use: [ 'style-loader','css-loader']
      },

      {
        test: /\.s[ac]ss$/i,
        loaders : ['style-loader','css-loader','sass-loader']
      },

      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000' }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      // "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      // styles : 'public/index.css',
      favicon: 'public/car-pooling-icon2.png'
    })
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true,
    hot: true
  }
};