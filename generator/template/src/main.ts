import Vue from 'vue'
import App from './App.vue'
import router from './router'
import filter from './filters/index'
<%_ if (options.sentry) { _%>
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration, CaptureConsole } from '@sentry/integrations'
import { Integrations } from '@sentry/tracing'
import { name, version} from '../package.json'

Sentry.init({
  dsn: '', // sentry中dsn
  release: `${name}@${version}`, // 版本
  integrations: [
    new VueIntegration({
      Vue,
      tracing: true
    }),
    new Integrations.BrowserTracing(),
    new CaptureConsole({
      levels: ['error']
    })
  ]
})
<%_ } _%>

<%_ if (options.vuex) { _%>
import store from './store'
<%_ } _%>
<%_ if (options['va-study-public-sdk']) { _%>
// 服务
import Service from './ajax'
<%_ } _%>  
<%_ if (options.elementUI) { _%>
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
<%_ } _%>
<%_ if (options.wxui) { _%>
import wxui from 'wxui'
<%_ } _%>

<%_ if (options.elementUI) { _%>
Vue.use(ElementUI, { size: 'small' })
<%_ } _%>
<%_ if (options.wxui) { _%>
Vue.use(wxui)
<%_ } _%>

<%_ if (options['va-study-public-sdk']) { _%>
Service.then((service) => {
  Vue.config.productionTip = false
  // 合约请求
  Vue.prototype.$api = Object.assign({}, service)
  Object.keys(filter).forEach(key => Vue.filter(key, (filter as any)[key]))

  new Vue({
    router,
    <%_ if (options.vuex) { _%>
    store,
    <%_ } _%>
    render: h => h(App)
  }).$mount('#app')
})
<%_ } else { _%>
Vue.config.productionTip = false
Object.keys(filter).forEach(key => Vue.filter(key, (filter as any)[key]))

new Vue({
  router,
  <%_ if (options.vuex) { _%>
  store,
  <%_ } _%>
  render: h => h(App)
}).$mount('#app')
<%_ } _%>