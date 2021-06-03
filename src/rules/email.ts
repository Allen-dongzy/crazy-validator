import { isFunction, getType } from '../tools/validationTypes'
import { Value, RulesResponse } from '../types'
import ruleBack from './ruleBack'

// 默认错误提示
const errMsg: string = '邮箱格式错误'

// 邮箱校验-严谨结果
export const email = (value: Value): RulesResponse => {
  const expectType: string = 'string'
  const currentType: string = getType(value)
  return ruleBack({
    res: isEmail(value),
    errMsg,
    expectType,
    currentType
  })
}

// 邮箱校验-简单结果
export const isEmail = (value: Value, info?: string | Function, toast?: Function): boolean => {
  if (isFunction(info)) {
    toast = info as Function
    info = errMsg
  }
  const emailRegExg: RegExp = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  const res = emailRegExg.test(value as string)
  if (!res && info && toast) toast(info as string)
  return res
}
