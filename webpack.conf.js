var webpackConfig = {
  devtool: 'source-map',
  entry: {
    app: './client/app'
  },
  output: {
    path: './build',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader?optional[]=runtime']
        // loaders: ['transform/cacheable?babelify']
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: []
};
module.exports = webpackConfig;
