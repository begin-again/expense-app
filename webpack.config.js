const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

switch (process.NODE_ENV) {
  case 'test':
    require('dot-env').config({ path: '.env.test' });
    break;
  case 'development':
    require('dot-env').config({ path: '.env.dev' });
    break;
  default:
    break;
}

module.exports = (env, argv) => {
  const isProd = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public/dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        })
      }]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.DATABASE_APIKEY': JSON.stringify(process.env.DATABASE_APIKEY),
        'process.env.DATABASE_AUTHDOMAIN': JSON.stringify(process.env.DATABASE_AUTHDOMAIN),
        'process.env.DATABASE_URL': JSON.stringify(process.env.DATABASE_URL),
        'process.env.DATABASE_PROJECTID': JSON.stringify(process.env.DATABASE_PROJECTID),
        'process.env.DATABASE_STORAGEBUCKET': JSON.stringify(process.env.DATABASE_STORAGEBUCKET),
        'process.env.DATABASE_MESSAGINGSENDERID': JSON.stringify(process.env.DATABASE_MESSAGINGSENDERID),
        'process.env.DATABASE_APPID': JSON.stringify(process.env.DATABASE_APPID)
      })
    ],
    devtool: isProd ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  };
};
