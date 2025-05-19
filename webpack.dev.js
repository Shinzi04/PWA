const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: ['src/index.html', 'src/**/*'],
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    },
    port: 8000,
  },
});
