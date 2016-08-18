import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import WebpackBuildNotifierPlugin from 'webpack-build-notifier'
const TARGET = process.env.npm_lifecycle_event

/*
 * js build
 **************************************************/
const jsConfig = {
  entry: {
    app: './src/js/main.js',
    slider: './src/js/slider.js'
  },
  output: {
    path: './dist/js/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      }
    ]
  },
  plugins: [ new WebpackBuildNotifierPlugin() ]
};


/*
 * css build
 **************************************************/
const cssConfig = {
  entry: {
    app: `./src/css/app.css`,
    slider: `./src/css/slider.css`,
    flexbox: `./src/css/flexbox.css`,
  },
  output: {
    path: `./dist/css/`,
    filename: '[name].css',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new WebpackBuildNotifierPlugin(),
  ],
  postcss: (webpack) => {
    return [
      require('postcss-import')({
        addDependencyTo: webpack
      }),
      require('postcss-cssnext'),
      require('postcss-reporter'),
      require('cssnano')
    ];
  }
}

export default [jsConfig, cssConfig]
