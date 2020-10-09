import Vue from 'vue'
import App from './App.vue'
import router from './router'
import filter from './filters/index'
<%_ if (options.sentry) { _%>
import '../utils/sentry'
<%_ } _%>
<%_ if (options.tools.includes('vuex')) { _%>
import store from './store'
<%_ } _%>
<%_ if (options.tools.includes('va-study-public-sdk')) { _%>
// 服务
import Service from './ajax'
<%_ } _%>  
<%_ if (options.ui.includes('wxui')) { _%>
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
<%_ } _%>
<%_ if (options.ui.includes('wxui')) { _%>
import wxui from 'wxui'
<%_ } _%>
<%_ if (options.ui.includes('wxui')) { _%>
Vue.use(ElementUI, { size: 'small' })
<%_ } _%>
<%_ if (options.ui.includes('wxui')) { _%>
Vue.use(wxui)
<%_ } _%>
<%_ if (options.electron) { _%>
import initElectron from '@utils/electron'
initElectron()
<%_ } _%>
<%_ if (options.tools.includes('va-study-public-sdk')) { _%>
Service.then((service) => {
  Vue.config.productionTip = false
  // 合约请求
  Vue.prototype.$api = Object.assign({}, service)
  Object.keys(filter).forEach(key => Vue.filter(key, (filter)[key]))

  new Vue({
    router,
    <%_ if (options.tools.includes("vuex")) { _%>
    store,
    <%_ } _%>
    render: h => h(App)
  }).$mount('#app')
})
<%_ } else { _%>
  Vue.config.productionTip = false
  Object.keys(filter).forEach(key => Vue.filter(key, (filter)[key]))

  new Vue({
    router,
    <%_ if (options.tools.includes('vuex')) { _%>
    store,
    <%_ } _%>
    render: h => h(App)
  }).$mount('#app')
<%_ } _%>