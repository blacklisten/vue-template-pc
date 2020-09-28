// @ts-nocheck
const StyleLintPlugin = require('stylelint-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

<%_ if (options.sentry) { _%>
const SentryCliPlugin = require('@sentry/webpack-plugin')
const { name, version } = require('./package.json')
<%_ } _%>
<%_ if (options.electron) { _%>
const { initMain } = require('./build/electron.dev')
if (process.env.NODE_ENV !== 'production') setImmediate(initMain)
<%_ } _%>
const styeLint = new StyleLintPlugin({
  files: ['src/**/*.{vue,scss}'],
  fix: false
})
const eslint = new ESLintPlugin({
  files: ['src/**/*.{vue,scss,ts,json}'],
  fix: true
})

const outputDir = <%- options.classComponent ? '".electron-dist/web"' : '"dist"' %>
module.exports = {
  publicPath: <%- options.classComponent ? '"./"' : '"/"' %>,
  outputDir,
  assetsDir: 'static',
  // 生产环境 sourceMap
  productionSourceMap: <%= options.sentry ? 'true' : 'false' _%>,
  // 配置高于chainWebpack中关于 css loader 的配置
  css: {
    // 是否开启支持 foo.module.css 样式
    modules: false,
    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    // extract: true,
    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false
  },
   // 构建时开启多进程处理 babel 编译
  // parallel: require("os").cpus().length > 1,
  // 第三方插件配置
  pluginOptions: {},
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve('./src'))
      .set('@utils', path.resolve('./utils'))

    <%_ if (options.classComponent) { _%>
    config.resolve
    .extensions
      .prepend('.ts')
      .prepend('.tsx')
    config.entry('app')
      .clear()
      .add('./src/main.ts')
    config.module
      .rule('ts')
      .test(/\.ts$/)
      .use('ts-loader')
      .loader('ts-loader')
      .options({
        transpileOnly: true,
        appendTsSuffixTo: ['\\.vue$']
      })
    config.module
    .rule('tsx')
    .test(/\.tsx$/)
    .use('ts-loader')
    .loader('ts-loader')
    .tap(options => {
      options = Object.assign({}, options)
      delete options.appendTsSuffixTo
      options.appendTsxSuffixTo = ['\\.vue$']
      return options
    })
    <%_ } _%>
  },
  configureWebpack: config => {
    const configNew = {
      plugins: [styeLint, eslint]
    }
    if (process.env.NODE_ENV === 'production') {
      // do something for production
      <%_ if (options.sentry) { _%>
        const sentry = new SentryCliPlugin({
          include: `./${outputDir}`, // 作用的文件夹
          release: `${name}@${version}`, // 版本号，需要维护package中的name和version字段
          configFile: 'sentry.properties', // 不用改
          ignore: ['node_modules', 'webpack.config.js'],
          urlPrefix: `~${config.output.publicPath}` // 部署的js文件路径， 如www.example.com/url/prefix/xxx.js，需要填写/url/prefix
        })
        configNew.plugins.push(sentry)
      <%_ } _%>
    }
    return configNew
  }
}
