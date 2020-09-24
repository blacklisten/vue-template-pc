const { sentryConfig, extendPackage, render, commitizenConfig, typescriptConfig } = require('./config')

module.exports = (api, options, rootOptions) => {
  const { tools, ui, classComponent, sentry } = options

  const INCLUDE_VUEX = tools.includes("vuex")
  const INCLUDE_SAVML = tools.includes("savml")
  const INCLUDE_VA_STUDY_PUBLIC_SDK = tools.includes("va-study-public-sdk")
  const INCLUDE_WX_TOOLS = tools.includes("wxTools")
  const INCLUDE_COMMITIZEN = tools.includes("commitizen")
  const INCLUDE_ELEMENT_UI = ui.includes("elementUI")
  const INCLUDE_WX_UI = ui.includes("wxui")

  if (classComponent) {
    api.extendPackage(typescriptConfig)
  } else {
    api.extendPackage({
      "devDependencies": {
        "babel-eslint": "^10.1.0"
      }
    })
  }

  // 安装一些基础的公共库
  if (INCLUDE_VUEX) {
    api.extendPackage({
      dependencies: {
        "vuex": "^3.4.0"
      }
    })
    api.render( classComponent ? './common/cli-typescripe/vuex' : './common/cli-js/vuex')
  }

  if (INCLUDE_SAVML) {
    api.extendPackage({
      dependencies: {
        "savml": "^1.0.101"
      }
    })
    api.render(classComponent ? './common/cli-typescripe/ajax' : './common/cli-js/ajax')
  }

  if (INCLUDE_VA_STUDY_PUBLIC_SDK) {
    api.extendPackage({
      dependencies: {
        "va-study-public-sdk": "1.0.40",
        "savml": "^1.0.101"
      }
    })
    api.render(classComponent ? './common/cli-typescripe/ajax' : './common/cli-js/ajax')
  }

  if (INCLUDE_ELEMENT_UI) {
    api.extendPackage({
      dependencies: {
        "element-ui": "^2.13.2"
      }
    })
  }

  if (INCLUDE_WX_TOOLS) {
    api.extendPackage({
      dependencies: {
        "wx-tools": "^0.0.7"
      }
    })
  }

  if (INCLUDE_WX_UI) {
    api.extendPackage({
      dependencies: {
        "wxui": "^0.6.32"
      }
    })
  }

  // 设置sentry相关
  if (sentry) {
    render['./.sentryclirc'] = './template/_sentryclirc'
    if (classComponent) {
      render['./utils/sentry.ts'] = './extension/_sentry.ts.template'
    } else {
      render['./utils/sentry.js'] = './extension/_sentry.ts.template'
    }
    api.extendPackage({
      dependencies: sentryConfig.devDependencies
    })
  }
  
  // set devDependencies config of git cz
  if (INCLUDE_COMMITIZEN) {
    api.extendPackage(commitizenConfig)
  }

  api.extendPackage(extendPackage)
  // 公共基础目录和文件
  
  if (classComponent) {
    api.render('./common/cli-typescripe/template', { skipLibCheck: true })
    require('./convert')(api)
  }
  else {
    api.render('./common/cli-js/template', { skipLibCheck: true })
  }

  // typescript相关
  api.render('./template', { skipLibCheck: true })


  api.render(render) 

}
