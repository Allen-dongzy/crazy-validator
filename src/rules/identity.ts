import { getType } from '../tools/validationTypes'
import { Value, RulesResponse } from '../types'
import ruleBack from './ruleBack'

// 身份证校验-严谨结果
export const identity = (value: Value): RulesResponse => {
  const expectType: string = 'string'
  const currentType: string = getType(value)
  return ruleBack({
    res: isIdentity(value),
    errMsg: '身份证格式错误',
    expectType,
    currentType
  })
}

// 身份证校验-简单结果
export const isIdentity = (value: Value, info?: string, toast?: Function): boolean => {
  const identityRegExg: RegExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  const res = identityRegExg.test(value as string)
  if (!res && info && toast) toast(info)
  return res
}
