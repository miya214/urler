const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  entry: `${__dirname}/src/index.tsx`,
  mode: 'development',
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/build`,
    publicPath: '/build/',
    // 出力ファイル名
    filename: 'bundle.js',
  },
  devtool: process.argv.indexOf('-p') === -1 ? 'eval-source-map' : 'source-map',
  module: {
    rules: [
      {
        // 拡張子 .ts もしくは .tsx の場合
        test: /\.(sass|less|css|tsx?)$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ['web', 'es5'],
  optimization:
    process.argv.indexOf('-p') === -1
      ? {}
      : {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                output: {
                  comments: false,
                },
              },
              extractComments: false,
            }),
          ],
        },
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /\//, to: '/404.html' }],
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
  ],
};
