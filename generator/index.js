const { sentryConfig, extendPackage, render } = require('./config')
module.exports = (api, options, rootOptions) => {
  // 安装一些基础的公共库
  if (options.vuex) {
    api.extendPackage({
      dependencies: {
        "vuex": "^3.4.0",
        "vuex-class": "^0.3.2"
      }
    })
    api.render('./vuex')
  }
  if (options.savml) {
    api.extendPackage({
      dependencies: {
        "savml": "^1.0.101"
      }
    })
    api.render('./ajax')
  }
  if (options['va-study-public-sdk']) {
    api.extendPackage({
      dependencies: {
        "va-study-public-sdk": "1.0.40",
        "savml": "^1.0.101"
      }
    })
    api.render('./ajax')
  }
  if (options.savml || options['va-study-public-sdk']) {
    api.render('./ajax')
  }

  if (options.elementUI) {
    api.extendPackage({
      dependencies: {
        "element-ui": "^2.13.2"
      }
    })
  }
  if (options.wxTools) {
    api.extendPackage({
      dependencies: {
        "wx-tools": "^0.0.7"
      }
    })
  }
  if (options.wxui) {
    api.extendPackage({
      dependencies: {
        "wxui": "^0.6.32"
      }
    })
  }

  // 设置sentry相关
  if (options.sentry) {
    render['./.sentryclirc'] = './template/_sentryclirc'
    extendPackage.devDependencies = {
      ...extendPackage.devDependencies,
      ...sentryConfig.devDependencies
    }
  }

  api.extendPackage(extendPackage)
  // 公共基础目录和文件
  api.render('./template')

  
  api.render(render)

}
