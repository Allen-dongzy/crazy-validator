import { SimpleCheck, ComplexCheck } from '../types'
import { isFunction, getType } from '../tools/validationTypes'
import { simpleToast } from '../tools/validationToast'
import ruleBack from './ruleBack'

// 默认错误提示
const errMsg: string = '邮箱格式错误'

// 邮箱校验-严谨结果
export const email: ComplexCheck = (value) => {
  const expectType: string = 'string'
  const currentType: string = getType(value)
  return ruleBack({
    res: isEmail(value, false),
    errMsg,
    expectType,
    currentType
  })
}

// 邮箱校验-简单结果
export const isEmail: SimpleCheck = (value, info, toast) => {
  if (isFunction(info)) {
    toast = info as Function
    info = errMsg
  }
  const emailRegExg: RegExp = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  const res = emailRegExg.test(value as string)
  if (!res) simpleToast(info, errMsg, toast)
  return res
}
