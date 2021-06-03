import { getType } from '../tools/validationTypes'
import { Value, RulesResponse } from '../types'
import ruleBack from './ruleBack'

// 手机号校验-严谨结果
export const phone = (value: Value): RulesResponse => {
  const expectType: string = 'number | string'
  const currentType: string = getType(value)
  return ruleBack({
    res: isPhone(value),
    errMsg: '手机号格式错误',
    expectType,
    currentType
  })
}

// 手机号校验-简单结果
export const isPhone = (value: Value, info?: string, toast?: Function): boolean => {
  const phoneRegExg: RegExp = /^1[34578]\d{9}$/
  const res = phoneRegExg.test(value as string)
  if (!res && info && toast) toast(info)
  return res
}
