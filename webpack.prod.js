const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      }
    ]
  },
  optimization: {
      minimizer: [
        new OptimizeCssAssetsPlugin(),
        new TerserPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            minify:{
                removeAttributeQuotes: true,
                removeComments: true,
                collapseWhitespace: true
            }
          })
      ]
  },
  output: {
    filename: "[name].[contentHash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })
  ]
});
