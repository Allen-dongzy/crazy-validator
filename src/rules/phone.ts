import { isFunction, getType } from '../tools/validationTypes'
import { Value, RulesResponse } from '../types'
import ruleBack from './ruleBack'

// 默认错误提示
const errMsg: string = '手机号格式错误'

// 手机号校验-严谨结果
export const phone = (value: Value): RulesResponse => {
  const expectType: string = 'number | string'
  const currentType: string = getType(value)
  return ruleBack({
    res: isPhone(value),
    errMsg,
    expectType,
    currentType
  })
}

// 手机号校验-简单结果
export const isPhone = (value: Value, info?: string | Function, toast?: Function): boolean => {
  if (isFunction(info)) {
    toast = info as Function 
    info = errMsg
  }
  const phoneRegExg: RegExp = /^1[3456789]\d{9}$/
  const res = phoneRegExg.test(value as string)
  if (!res && info && toast) toast(info as string)
  return res
}
