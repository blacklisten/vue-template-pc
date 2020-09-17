const { sentryConfig, extendPackage, render, commitizenConfig } = require('./config')
module.exports = (api, options, rootOptions) => {
  const { tools } = options
  // 安装一些基础的公共库
  if (tools.includes("vuex")) {
    api.extendPackage({
      dependencies: {
        "vuex": "^3.4.0",
        "vuex-class": "^0.3.2"
      }
    })
    api.render('./vuex')
  }

  if (tools.includes("savml")) {
    api.extendPackage({
      dependencies: {
        "savml": "^1.0.101"
      }
    })
    api.render('./ajax')
  }

  if (tools.includes("va-study-public-sdk")) {
    api.extendPackage({
      dependencies: {
        "va-study-public-sdk": "1.0.40",
        "savml": "^1.0.101"
      }
    })
    api.render('./ajax')
  }
  
  if (tools.includes("savml") || tools.includes('va-study-public-sdk')) {
    api.render('./ajax')
  }

  if (tools.includes("elementUI")) {
    api.extendPackage({
      dependencies: {
        "element-ui": "^2.13.2"
      }
    })
  }

  if (tools.includes("wxTools")) {
    api.extendPackage({
      dependencies: {
        "wx-tools": "^0.0.7"
      }
    })
  }

  if (tools.includes("wxui")) {
    api.extendPackage({
      dependencies: {
        "wxui": "^0.6.32"
      }
    })
  }

  // 设置sentry相关
  if (tools.includes("sentry")) {
    render['./.sentryclirc'] = './template/_sentryclirc'
    render['./utils/sentry.ts'] = './extension/_sentry.ts.template'
    api.extendPackage({
      dependencies: sentryConfig.devDependencies
    })
  }
  
  // set devDependencies config of git cz
  if (tools.includes("commitizen")) {
    api.extendPackage(commitizenConfig)
  }

  api.extendPackage(extendPackage)
  // 公共基础目录和文件
  api.render('./template')
  
  api.render(render)

}
