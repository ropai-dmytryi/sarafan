const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: path.join(
    __dirname,
    "src",
    "main",
    "resources",
    "static",
    "js",
    "main.tsx"
  ),
  devServer: {
    contentBase: "./dist",
    compress: true,
    port: 8000,
    allowedHosts: ["localhost:9090"]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.tsx?$/,
        loader: "tslint-loader"
      },
      {
        test: /\.tsx?$/,
        use: ["awesome-typescript-loader"]
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, "src", "main", "resources", "static", "js"),
      path.join(__dirname, "node_modules")
    ],
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  plugins: [new HtmlWebpackPlugin()]
};
