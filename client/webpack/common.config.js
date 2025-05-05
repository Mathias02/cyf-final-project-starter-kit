// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
// 	entry: "./client/src/index.js",
// 	module: {
// 		rules: [
// 			{
// 				test: /\.js$/,
// 				exclude: /node_modules/,
// 				use: {
// 					loader: "babel-loader",
// 					options: {
// 						cacheDirectory: true,
// 					},
// 				},
// 			},
// 			{
// 				test: /\.(png|svg|jpe?g|gif)$/,
// 				loader: "file-loader",
// 			},
// 			{
// 				test: /\.css$/,
// 				use: ["style-loader", "css-loader"],
// 			},
// 		],
// 	},
// 	output: {
// 		publicPath: "/",
// 	},
// 	plugins: [
// 		new HtmlWebpackPlugin({
// 			favicon: "./client/src/favicon.ico",
// 			template: "./client/src/index.html",
// 		}),
// 	],
// };

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: 'asset/resource', // Webpack 5 approach to handle images
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output filename
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "./client/src/favicon.ico",
      template: "./client/src/index.html",
    }),
  ],
  devtool: "source-map",  // Enable source maps for debugging
};

