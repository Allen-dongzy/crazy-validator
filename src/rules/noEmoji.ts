import { SimpleCheck, ComplexCheck } from '../types'
import { isFunction, getType } from '../tools/validationTypes'
import { simpleToast } from '../tools/validationToast'
import ruleBack from './ruleBack'

// 默认错误提示
const errMsg: string = '文本不能存在emoji表情'

// 禁用emoji校验-严谨结果
export const noEmoji: ComplexCheck = (value) => {
  const expectType: string = 'string'
  const currentType: string = getType(value)
  return ruleBack({
    res: isNoEmoji(value, false),
    errMsg,
    expectType,
    currentType
  })
}

// 禁用emoji校验-简单结果
export const isNoEmoji: SimpleCheck = (value, info, toast) => {
  if (isFunction(info)) {
    toast = info as Function
    info = errMsg
  }
  const noEmojiRegExg: RegExp = /[^\u4E00-\u9FA5|\d|a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g
  const res = noEmojiRegExg.test(value as string)
  if (!res) simpleToast(info, errMsg, toast)
  return res
}
