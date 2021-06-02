import { isString, getType } from '../tools/validationTypes'
import { Value, RulesResponse } from '../types'
import ruleBack from './ruleBack'

// 禁用emoji校验-严谨结果
export const noEmoji = (value: Value): RulesResponse => {
  const expectType: string = 'string'
  const currentType: string = getType(value)
  return ruleBack({
    res: isNoEmoji(value),
    expectType,
    currentType
  })
}

// 禁用emoji校验-简单结果
export const isNoEmoji = (value: Value): boolean => {
  if (!isString(value)) return false
  const noEmojiRegExg: RegExp = /[^\u4E00-\u9FA5|\d|a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g
  return noEmojiRegExg.test(value as string)
}
