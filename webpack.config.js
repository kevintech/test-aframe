const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    d3example: './src/d3example.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: "/assets/",
    compress: true,
    port: 9000
  }
};