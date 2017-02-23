const handlebars = require('handlebars')
const Metalsmith = require('metalsmith')
const layouts = require('metalsmith-layouts')
const ignore = require('metalsmith-ignore')
const inPlace = require('metalsmith-in-place')
const watch = require('metalsmith-watch')
const inline = require('metalsmith-inline-source')
const htmlMinifier = require("metalsmith-html-minifier");

const TARGET = process.env.npm_lifecycle_event
const isDev = TARGET !== 'html:build'

const SRC_DIR = './src/html/www'
const DIST_DIR = './docs'

const TEMPLATE_OPTION = {
  "engine": "handlebars",
  "directory": "./src/html/templates",
  "partials": "./src/html/partials",
  "default": "default.html"
}

const WATCH_OPTION = {
  "paths": {
    "${source}/**/*": true,
    "./src/html/templates/**/*": "**/*",
    "./src/html/partials/**/*": "**/*"
  }
}

Metalsmith(__dirname)
  .clean(false)
  .source(SRC_DIR)
  .destination(DIST_DIR)
  .use(isDev ? watch(WATCH_OPTION) : ()=>{})
  .use(layouts(TEMPLATE_OPTION))
  .use(inPlace(TEMPLATE_OPTION))
  .use(inline())
  .use(isDev ? ()=>{} : htmlMinifier())
  .use(ignore())
  .build((err) => { if (err) throw err })

//////////////////////////////////////////////////

handlebars.registerHelper('for', (from, to, block) => {
  let accum = '';
  for(let i = from; i < to; i++) {
    accum += block.fn(i);
  }
  return accum;
})
