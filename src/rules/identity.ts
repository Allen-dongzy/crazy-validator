import { SimpleCheck, ComplexCheck } from '../types'
import { isFunction, getType } from '../tools/validationTypes'
import { simpleToast } from '../tools/validationToast'
import ruleBack from './ruleBack'

// 默认错误提示
const errMsg: string = '身份证格式错误'

// 身份证校验-严谨结果
export const identity: ComplexCheck = (value) => {
  const expectType: string = 'string'
  const currentType: string = getType(value)
  return ruleBack({
    res: isIdentity(value, false),
    errMsg,
    expectType,
    currentType
  })
}

// 身份证校验-简单结果
export const isIdentity: SimpleCheck = (value, info, toast) => {
  if (isFunction(info)) {
    toast = info as Function
    info = errMsg
  }
  const identityRegExg: RegExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  const res = identityRegExg.test(value as string)
  if (!res) simpleToast(info, errMsg, toast)
  return res
}
