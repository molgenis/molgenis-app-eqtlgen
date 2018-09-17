const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const packageJson = require('./package.json')

module.exports = {
  entry: [
    './src/index.html'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/plugin/app/' + packageJson.name + '/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.html/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ]
  },
  plugins: [
    new GenerateJsonPlugin('config.json', {
      name: packageJson.name,
      label: packageJson.name,
      description: packageJson.description,
      version: packageJson.version,
      apiDependency: "v2",
      includeMenuAndFooter: true,
      runtimeOptions: {
        language: "en"
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/'),
        to: '',
        ignore: [,
          '.gitignore'
        ]
      }
    ]),
    new ZipPlugin({
      filename: packageJson.name + '.zip'
    })
  ],
  performance: {
    hints: false
  }
}