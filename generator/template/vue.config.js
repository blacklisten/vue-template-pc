// @ts-nocheck
const StyleLintPlugin = require('stylelint-webpack-plugin')
const path = require('path')

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // 生产环境 sourceMap
  productionSourceMap: false,
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
  },
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ['src/**/*.{vue,scss}'],
        fix: false
      }),
    ],
  }
}
