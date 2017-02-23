import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import WebpackBuildNotifierPlugin from 'webpack-build-notifier'
import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin'

const TARGET = process.env.npm_lifecycle_event
const isDev = TARGET === 'watch'

/*
 * js option
 **************************************************/

const js = jsBuildOptionTemplate({
  entry: {
    'app': './src/js/main.js',
    'vendor': ['react', 'redux', 'react-redux', 'react-dom', 'immutable'],
  },
  outputPath: './docs/js/',
})


/*
 * css option
 **************************************************/
const css = cssBuildOptionTemplate({
  entry: {
    'app': './src/css/main.css',
  },
  outputPath: './docs/css/',
  svgPath: './../../assets/svg/',
  imgPath: './../../assets/img/',
  browsers: ['last 1 versions']
})

export default [ js, css ]


//////////////////////////////////////////////////


function jsBuildOptionTemplate({entry, outputPath}) {
  return {
    devtool: 'source-map',
    entry,
    output: {
      path: outputPath,
      filename: '[name].js',
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: [/node_modules/, /sw.js/], loader: 'babel-loader' },
        { test: /\.js$/, exclude: /node_modules/, loader: "eslint-loader" },
        { test: /\.(png|svg)$/i, loaders: [ 'url-loader?name=[name].[ext]' ] },
      ]
    },
    plugins: []
      .concat(isDev ? [
        new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': '"development"' } }),
        new WebpackBuildNotifierPlugin(),
      ] : [
        new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': '"production"' } }),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      ])
      .concat([ new CommonsChunkPlugin({ name: 'vendor' }) ])
  }
}

function cssBuildOptionTemplate({entry, outputPath, svgPath, imgPath, browsers}) {
  return {
    entry: entry,
    output: {
      'path': outputPath,
      'filename': '[name].css',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use:[
              'css-loader',
              'postcss-loader',
            ]
          })
        },
        { test: /\.(svg)$/i, loaders: [ 'file-loader?name=' + svgPath + '[name].[ext]', 'svgo-loader' ] },
        { test: /\.(jpe?g|png|gif)$/i, loaders: [ 'file-loader?name=' + imgPath + '[name].[ext]'] },
      ],
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
      new WebpackBuildNotifierPlugin(),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [
            require('postcss-import'),
            require('postcss-cssnext')({
              warnForDuplicates: false,
              browsers,
            }),
            require('postcss-reporter'),
            require('stylelint'),
            require('postcss-extend'),
          ].concat(isDev ? [] : [require('cssnano')])
        }
      }),
    ],
  }
}
