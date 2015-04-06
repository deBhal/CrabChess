var webpack = require( 'webpack' );

// https://github.com/webpack/react-starter/blob/97f85c76f9bb7100a0fbe8b961dd18e006ed9d46/make-webpack-config.js
var stylesheetLoaders = {
  "css": "css-loader"
};

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server',
    './scripts/index'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [ 'react-hot', 'babel' ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};
