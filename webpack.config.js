const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin')
const packageJson = require('./package.json')

module.exports = {
  entry: {
    'index': './src/index.html'
  },
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: ''
  },
  plugins: [
    new GenerateJsonPlugin('config.json', {
      name: packageJson.name,
      label: packageJson.name,
      description: packageJson.description,
      version: packageJson.version,
      apiDependency: 'v2',
      includeMenuAndFooter: true,
      runtimeOptions: {
        language: 'en'
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/'),
        to: '',
        ignore: [,
          '.*'
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