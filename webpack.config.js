const path = require("path");

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
    allowedHosts: ["localhost:9091"]
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
      "node_modules"
    ],
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  }
};
