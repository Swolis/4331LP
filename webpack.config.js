const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

console.log('Webpack configuration is being used');


module.exports = {
  mode: 'none',
  entry: './src/App.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Add more rules for other file types as needed
    ],
  },
  resolve: {
    fallback: {
        async_hooks: require.resolve('async_hooks'),
        zlib: false,
        express: false,
        querystring: false,
        crypto: false,
        fs: false,
        stream: false,
        http: false,
        net: false,
    },
  },
  
  plugins: [
    new NodePolyfillPlugin()
  ]
};
