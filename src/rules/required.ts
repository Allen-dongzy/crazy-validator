import { isObject, isArray, getType } from '../tools/validationTypes'
import { Value, RulesResponse } from '../types'
import ruleBack from './ruleBack'

// 非空校验-严谨结果
export const required = (value: Value): RulesResponse => {
  const expectType: string = 'any'
  const currentType: string = getType(value)
  return ruleBack({
    res: isRequired(value),
    errMsg: '必填项不能为空',
    expectType,
    currentType
  })
}

// 非空校验-简单结果
export const isRequired = (value: Value, info?: string, toast?: Function): boolean => {
  let res: boolean
  if (isObject(value)) {
    res = Object.keys(value as object).length > 0
  } else if (isArray(value)) {
    res = (value as Array<any>).length > 0
  } else {
    res = !!value
  }
  if (!res && info && toast) toast(info)
  return res
}
