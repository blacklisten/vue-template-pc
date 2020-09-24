declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

<%_ if (options.ui.includes('wxui')) { _%>
declare module 'wxui' {
  const WxUi: any
  export default WxUi
}
<%_ } _%>
