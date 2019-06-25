const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/app.ts'), // 入口文件
  output: { // 导出文件
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/' // publicPath 上线时配置的是 cdn 的地址
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [ // 插件集
    new HtmlWebpackPlugin({ // 导出页面模版
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new MiniCssExtractPlugin({ // 抽离 css
      filename: 'css/[name].css'
    }),
    new CleanWebpackPlugin()
  ],
  devServer: { // 本地开发服务
    contentBase: './dist',
    port: '8080',
    host: 'localhost'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.less/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'less-loader'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.scss/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              outputPath: 'images'
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/react'],
              plugins: [
                ['@babel/plugin-proposal-decorators', {legacy: true}]
              ]
            }
          }
        ],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyWebpackPlugin({
        parallel: 4
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  }
}