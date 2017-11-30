const path = require('path')
const webpack = require('webpack')

const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
   // Replace entry file as needed
   entry: {
      bundle: './src/app.js',
      options: './src/options/options-index.js',
      background: './src/background/background.js'
   },
   node: {
      __filename: true,
      __dirname: true
   },
   output: {
      path: path.join(process.cwd(), 'dist'),
      filename: '[name].js'
   },
   resolve: {
      // Can i use these aliases with Webpack properly?
      alias: {
         '@app': path.resolve(__dirname, 'src/'),
         '@wb': path.resolve(__dirname, 'src/workbench'),
         '@opt': path.resolve(__dirname, 'src/options'),
         '@bg': path.resolve(__dirname, 'src/options'),
         '@model': path.resolve(__dirname, 'src/model')
      }
   },
   externals: {
      // Require("jquery") is external and available
      //  on the global var jQuery
      jquery: 'jQuery',
      lodash: '_',
      react: 'React',
      'react-dom': 'ReactDOM',
      // Make sure to exclude cheerio from extension bundle:
      cheerio: 'cheerio',
      chalk: 'chalk',
      // For Tabletop!
      request: 'request'
   },
   plugins: [
      new ProgressBarPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
         name: 'commons',
         // (the commons chunk name)

         filename: 'commons.js',
         // (the filename of the commons chunk)

         minChunks: 2
         // (Modules must be shared between 3 entries)

         // chunks: ["pageA", "pageB"],
         // (Only use these entries)
      })
   ],
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: [/node_modules\/localforage/, /__tests__/],
            use: ['cache-loader',
               {
                  loader: 'babel-loader',
                  options: {
                     presets: ['env'],
                     plugins: [
                        'transform-react-jsx',
                        'transform-flow-comments',
                        'transform-class-properties',
                        'transform-function-bind'
                     ]
                  }

               }]
         },
         {
            test: /\.css$/,
            use: [
               {loader: 'style-loader'},
               {
                  loader: 'css-loader',
                  options: {minimize: true}
               }
            ]
         },
         {
            test: /\.less$/,
            exclude: [/node_modules/, /__tests__/],
            use: [
               {loader: 'style-loader'},
               {loader: 'css-loader'},
               {loader: 'less-loader'}
            ]
         },
         {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: [{
               loader: 'url-loader',
               options: {
                  limit: 100000
               }
            }]
         }
      ]
   },
   watchOptions: {
      poll: 100
   },
   cache: true
}
