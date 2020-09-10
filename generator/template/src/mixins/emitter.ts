/**
 * Element实现的broadcast dispatch
 * @param {*} componentName 组件名称
 * @param {*} eventName 事件名称
 * @param {*} params 传递的参数
 */

import { Component, Vue } from 'vue-property-decorator'

function broadcast(this: any, componentName: any, eventName: any, params: any) {
  this.$children.forEach((child: any) => {
    const name = child.$options.name

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, ([componentName, eventName].concat([params]) as any))
    }
  })
}

@Component
export class Emitter extends Vue {
  public dispatch(componentName: string, eventName: any, params: any) {
    let parent = this.$parent || this.$root
    let name = parent.$options.name

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent

      if (parent) {
        name = parent.$options.name
      }
    }
    if (parent) {
      parent.$emit.apply(parent, ([eventName].concat(params) as any))
    }
  }

  public broadcast(componentName: any, eventName: any, params: any) {
    broadcast.call(this, componentName, eventName, params)
  }
}
