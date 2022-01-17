import { ComplexValue, SimpleCheck, ComplexCheck } from '../types'
import { isString, isNumber, isFunction, getType } from '../tools/validationTypes'
import { simpleToast } from '../tools/validationToast'
import ruleBack from './ruleBack'

// 默认错误提示
const errMsg: string = '内容不在指定范围内'

// 长度校验-严谨结果
export const length: ComplexCheck = (params) => {
  const { value, max, min = 0 } = params as ComplexValue
  let errMsg = `请输入${min}-${max}位字符`
  if (!max) errMsg = '缺少最大值属性:max'
  const expectType: string = 'number'
  const currentType: string = getType(value)
  return ruleBack({
    res: limitLength(params, false),
    errMsg,
    expectType,
    currentType
  })
}

// 长度校验-简单结果
export const limitLength: SimpleCheck = (params, info, toast) => {
  if (isFunction(info)) {
    toast = info as Function
    info = errMsg
  }
  const { value, max, min = 0 } = params as ComplexValue
  let res: boolean
  if (!max) {
    res = false
  } else if (!isString(value) && !isNumber(value)) {
    res = false
  } else {
    res = !(String(value).length < min || String(value).length > max)
  }
  if (!res) simpleToast(info, errMsg, toast)
  return res
}
