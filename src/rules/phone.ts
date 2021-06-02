import { isNumber, isString, getType } from '../tools/validationTypes'
import { Value, RulesResponse } from '../types'
import ruleBack from './ruleBack'

// 手机号校验-严谨结果
export const phone = (value: Value): RulesResponse => {
  const expectType: string = 'number | string'
  const currentType: string = getType(value)
  return ruleBack({
    res: isPhone(value),
    expectType,
    currentType
  })
}

// 手机号校验-简单结果
export const isPhone = (value: Value): boolean => {
  if (isNumber(value)) value = value.toString()
  if (!isString(value)) return false
  const phoneRegExg: RegExp = /^1[34578]\d{9}$/
  return phoneRegExg.test(value as string)
}
