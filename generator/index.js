const fs = require('fs')
const path = require('path')

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
  api.extendPackage({
    scripts: {
      "serve": "vue-cli-service serve",
      "build": "vue-cli-service build",
      "lint": "vue-cli-service lint",
      "stylelint": "stylelint \"**/*.(scss|vue)\"",
      "lint:fix": "stylelint \"**/*.(scss|vue)\" --fix",
      "jslint": "eslint --ext .tsx,.ts,.vue ./src ./utils ./vue.config.js",
      "fix:js": "eslint --ext .tsx,.ts,.vue --fix ./src ./utils ./vue.config.js"
    },
    devDependencies: {
      "css-properties-sorting": "^1.0.10",
      "lint-staged": "^9.5.0",
      "postcss-html": "^0.36.0",
      "stylelint": "^13.4.0",
      "stylelint-config-recommended-scss": "^4.2.0",
      "stylelint-config-standard": "^20.0.0",
      "stylelint-order": "^4.0.0",
      "stylelint-scss": "^3.17.2",
      "stylelint-webpack-plugin": "^2.0.0"
    },
    gitHooks: {
      "pre-commit": "lint-staged"
    },
    "lint-staged": {
      "src/**/*.{ts,tsx,vue}": [
        "npm run jslint",
        "git add"
      ],
      "*.{scss,vue}": [
        "npm run stylelint",
        "git add"
      ]
    }
  })
  // 公共基础目录和文件
  api.render('./template')

  api.render({
    './.eslintrc.js': './template/_eslintrc.js',
    './.eslintignore': './template/_eslintignore',
    './.editorconfig': './template/_editorconfig',
    './.editorconfig': './template/_editorconfig',
    './.gitignore': './template/_gitignore',
    './.prettierignore': './template/_prettierignore',
    './.prettierrc.js': './template/_prettierrc.js',
    './.stylelintignore': './template/_stylelintignore',
    './.stylelintrc.js': './template/_stylelintrc.js'
  })
}
