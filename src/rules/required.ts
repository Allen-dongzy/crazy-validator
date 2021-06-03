import { isObject, isArray, isFunction, getType } from '../tools/validationTypes'
import { Value, RulesResponse } from '../types'
import ruleBack from './ruleBack'

// 默认错误提示
const errMsg: string = '必填项不能为空'

// 非空校验-严谨结果
export const required = (value: Value): RulesResponse => {
  const expectType: string = 'any'
  const currentType: string = getType(value)
  return ruleBack({
    res: isRequired(value),
    errMsg,
    expectType,
    currentType
  })
}

// 非空校验-简单结果
export const isRequired = (value: Value, info?: string | Function, toast?: Function): boolean => {
  if (isFunction(info)) {
    toast = info as Function
    info = errMsg
  }
  let res: boolean
  if (isObject(value)) {
    res = Object.keys(value as object).length > 0
  } else if (isArray(value)) {
    res = (value as Array<any>).length > 0
  } else {
    res = !!value
  }
  if (!res && info && toast) toast(info as string)
  return res
}
