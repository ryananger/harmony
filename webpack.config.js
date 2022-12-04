const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: "development",
  entry: "./client/src/index.jsx",
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'client/dist'),
    },
    compress: true,
    port: 3000,
  },

  plugins: [
    new Dotenv()
  ]

}