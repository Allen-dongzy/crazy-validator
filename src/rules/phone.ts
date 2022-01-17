import { SimpleCheck, ComplexCheck } from '../types'
import { isFunction, getType } from '../tools/validationTypes'
import { simpleToast } from '../tools/validationToast'
import ruleBack from './ruleBack'

// 默认错误提示
const errMsg: string = '手机号格式错误'

// 手机号校验-严谨结果
export const phone: ComplexCheck = (value) => {
  const expectType: string = 'number | string'
  const currentType: string = getType(value)
  return ruleBack({
    res: isPhone(value, false),
    errMsg,
    expectType,
    currentType
  })
}

// 手机号校验-简单结果
export const isPhone: SimpleCheck = (value, info, toast) => {
  if (isFunction(info)) {
    toast = info as Function
    info = errMsg
  }
  const phoneRegExg: RegExp = /^1[3456789]\d{9}$/
  const res = phoneRegExg.test(value as string)
  if (!res) simpleToast(info, errMsg, toast)
  return res
}
