module.exports = [
  {
    name: 'tools',
    type: 'checkbox',
    message: '请选择需要的依赖:',
    choices: ['vuex', 'savml', 'va-study-public-sdk', 'wxTools', 'commitizen']
  },
  {
    name: 'ui',
    type: 'checkbox',
    message: '请选择UI框架:',
    choices: ['elementUI', 'wxui']
  },
  {
    name: `classComponent`,
    type: `confirm`,
    message: `是否使用 class-style component 语法?`,
    default: true
  },
  {
    name: `sentry`,
    type: `confirm`,
    message: `是否使用生产环境异常监控?`,
    default: true
  },
  {
    name: `electron`,
    type: `confirm`,
    message: `是否集成Electron?`,
    default: true
  },
]
