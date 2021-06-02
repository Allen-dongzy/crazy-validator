import { isString, getType } from '../tools/validationTypes'
import { Value, RulesResponse } from '../types'
import ruleBack from './ruleBack'

// 邮箱校验-严谨结果
export const email = (value: Value): RulesResponse => {
  const expectType: string = 'string'
  const currentType: string = getType(value)
  return ruleBack({
    res: isEmail(value),
    expectType,
    currentType
  })
}

// 邮箱校验-简单结果
export const isEmail = (value: Value): boolean => {
  if (!isString(value)) return false
  const emailRegExg: RegExp = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return emailRegExg.test(value as string)
}
