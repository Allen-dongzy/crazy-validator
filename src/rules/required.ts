import { SimpleCheck, ComplexCheck } from '../types'
import { isObject, isArray, isFunction, getType } from '../tools/validationTypes'
import { simpleToast } from '../tools/validationToast'
import ruleBack from './ruleBack'

// 默认错误提示
const errMsg: string = '必填项不能为空'

// 非空校验-严谨结果
export const required: ComplexCheck = (value) => {
  const expectType: string = 'any'
  const currentType: string = getType(value)
  return ruleBack({
    res: isRequired(value, false),
    errMsg,
    expectType,
    currentType
  })
}

// 非空校验-简单结果
export const isRequired: SimpleCheck = (value, info, toast) => {
  if (isFunction(info)) {
    toast = info as Function
    info = errMsg
  }
  let res: boolean
  if (isObject(value)) {
    res = Object.keys(value as object).length > 0
  } else if (isArray(value)) {
    res = (value as Array<any>).length > 0
  } else {
    res = !!value
  }
  if (!res) simpleToast(info, errMsg, toast)
  return res
}
