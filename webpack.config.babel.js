import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import WebpackBuildNotifierPlugin from 'webpack-build-notifier'
import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin'

const TARGET = process.env.npm_lifecycle_event

/*
 * js
 **************************************************/
const devPlugins = [
  new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': '"development"' } }),
  new WebpackBuildNotifierPlugin(),
];

const prdPlugins = [
  new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': '"production"' } }),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
];

const BUILD_MAP = {
  'watch': {
    plugins: devPlugins,
  },
  'build': {
    plugins: prdPlugins,
  },
};

const js = {
  entry: {
    app: `./src/js/main.js`,
  },
  output: {
    path: `./dist/js/`,
    filename: `[name].js`,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      { test: /\.(png|svg)$/i, loaders: [ 'url?name=[path][name].[ext]' ] },
    ]
  },
  plugins: []
    .concat(BUILD_MAP[TARGET].plugins)
    //.concat([ new CommonsChunkPlugin({ name: 'common' }) ])
}

/*
 * css
 **************************************************/
const css = {
  entry: {
    app: `./src/css/app.css`,
  },
  output: {
    path: `./dist/css/`,
    filename: `[name].css`,
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') },
      { test: /\.(svg)$/i, loaders: [ 'file-loader?name=./../assets/svg/[name].[ext]', 'svgo-loader' ] },
      { test: /\.(jpe?g|png|gif)$/i, loaders: [ 'file-loader?name=./../assets/img/[name].[ext]'] },
    ]
  },
  plugins: [
    new ExtractTextPlugin(`[name].css`),
    new WebpackBuildNotifierPlugin(),
  ],
  postcss: (webpack) => {
    let config = [];
    config = config.concat([
      require('postcss-import')({ addDependencyTo: webpack }),
      require('postcss-cssnext')({ browsers: [ 'last 3 versions' ]}),
      require('postcss-reporter'),
      require('stylelint'),
      require('postcss-extend'),
    ]);
    switch (TARGET) {
      case 'watch':
        return config
      case 'build':
        config.push(require('cssnano'));
        return config
    }
  }
}

export default [ js, css ]
