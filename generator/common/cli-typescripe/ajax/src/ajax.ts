import Vue from 'vue'
import { v0, ContractServiceContext, ActionServiceContext } from 'savml'
// 公共登录
import LoginAuth from 'va-study-public-sdk'

const TOKENCONFIG = [
  { contractUid: '' }
]

/**
 * 根据localhost.hostname判断当前环境
 * d dev环境
 * t test环境
 */
export const getEnv = () => {
  const urlHeader = location.hostname.match(/^([\s\S]*?)-/)
  if (urlHeader && urlHeader.length > 0 && urlHeader[1]) {
    return urlHeader[1] + '-'
  }
  if (location.hostname.includes('visioneschool.com')) {
    return ''
  }
  return 'd-'
}

const factory = v0()
const env = getEnv()
const $vm = new Vue()

/**
 * 应用服务 study
 * 基础服务 basic
 */
const studyArr = ['']

/** 调用公共登陆sdk */
let TOKENS: any = {}
LoginAuth.on('error', (msg: any) => {
  if (msg === 'logout') {
    window.location.href = location.href.replace(/\/#[\s\S]*/, '')
  }
  TOKENS = {}
})
LoginAuth.on('success', (type: string, msg: any) => {
  if (type === 'token') {
    TOKENS = Object.assign(TOKENS, msg)
    // factory.use(Dict)
  }
})
LoginAuth.init({ appId: TOKENCONFIG, applicationUid: '' }, '', env)

/**
 * 初始化
 */
factory.on('contract.prepare', (ctx: ContractServiceContext) => {
  if (studyArr.includes(ctx.contract.package)) {
    Object.assign(ctx.routerOptions, {
      prefix: `//${env}study.visioneschool.com`
    })
  } else {
    Object.assign(ctx.routerOptions, {
      prefix: `//${env}basic.visioneschool.com`
    })
  }
})

/**
 * 初始化完成
 */
factory.on('contract.ready', () => {})

/**
 * 控制接口token失效请求次数， 默认获取token成功后，只请求一次，若失败，1min后方可再次请求
 * 前提：createContractToken接口不允许失败
 * 暂时按照接口进行控制(也可按照合约进行控制)
 * ajaxInterfaceDatas 存储接口的数组
 * @author blacklisten
 * @date 2020-06-20
 * @param {any} {interfaceName}:{interfaceName:string}  接口名称
 */
const ajaxInterfaceDatas: string[] = []
const ajaxInterfaceFilter = ({ interfaceName }: {interfaceName: string}) => {
  ajaxInterfaceDatas.push(interfaceName)
  const timer = setTimeout(() => {
    ajaxInterfaceDatas.splice(0, 1)
    clearTimeout(timer)
  }, 1000 * 60)
}

/**
 * 设置ajax请求的一些信息
 */
factory.on('action.prepare', ([ctx, service]: [ActionServiceContext, any]) => {
  const Authorization = `JWT ${TOKENS[ctx.package]}`
  let XVersion = ''
  XVersion = localStorage.getItem(location.host.split('.visioneschool.com')[0]) || ''
  ctx.checkRequest = false
  ctx.checkResponse = false
  const headers = new Headers({
    ...ctx.headers,
    Authorization,
    XVersion
  })
  ctx.fetch = () => fetch(ctx.url, {
    method: ctx.method,
    headers,
    body: JSON.stringify(ctx.requestData)
  }).then((res) => res.json())
  .then((res) => {
    if (res.code === 'auth.sessionInvalid.error') {
      // Notification.warning('登录失效，请重新登录')
      window.location.href = location.href.replace(/\/#[\s\S]*/, '')
      throw new Error('登陆失效！请重新登陆。')
    }
    if (res.code === 'auth.tokenInvalid.error') {
      if (!$vm.$api) {
        throw new Error('缺少必要条件$api...')
      }
      if (ajaxInterfaceDatas.includes(`${service.modalName}.${service.actionName}`)) {
        throw new Error('多次请求错误！！！')
      }
      return LoginAuth.createContractToken([{
        contractUid: ctx.package
      }]).then(() => {
        ajaxInterfaceFilter({ interfaceName: `${service.modalName}.${service.actionName}` })
        return ($vm.$api as any)[service.modalName][service.actionName](ctx.requestData || {}).then((data: any) => {
          return {
            json: () => data
          }
        })
      })
    } else if (res.code !== 'success') {
      // Notification.warning(`${res.message}`)
      throw new Error(`${res.code}, ${res.message}`)
    } else {
      if (!res.data) {
        return {
          json: () => res
        }
      }
      return {
        json: () => res.data
      }
    }
  }).catch((err) => {
    return err
  })
})

/**
 * 请求完成
 */
factory.on('action.done', () => {})

/**
 * 请求失败
 */
factory.on('action.error', () => {})

/**
 * 请求失败
 */
factory.on('action.error', () => {})

// 需要extends继承ServicesHandler
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Service {}

export default Promise.all([
])
  .then(
    (): Service => {
      return ({
      } as unknown) as Service
    }
  )
  .catch((e) => {
    console.log(e)
  })
