import { ComplexValue, SimpleCheck, ComplexCheck } from '../types'
import { isNumber, isFunction, getType } from '../tools/validationTypes'
import { simpleToast } from '../tools/validationToast'
import ruleBack from './ruleBack'

// 默认错误提示
const errMsg: string = '数值大小不在指定范围内'

// 数值大小范围校验-严谨结果
export const range: ComplexCheck = (params: ComplexValue) => {
  const { value, max, min = 0 } = params as ComplexValue
  let errMsg = `请输入${min}-${max}之间的数值`
  if (!max) errMsg = '缺少最大值属性:max'
  const expectType: string = 'number'
  const currentType: string = getType(value)
  return ruleBack({
    res: limitRange(params, false),
    errMsg,
    expectType,
    currentType
  })
}

// 数值大小范围校验-简单结果
export const limitRange: SimpleCheck = (params, info, toast) => {
  if (isFunction(info)) {
    toast = info as Function
    info = errMsg
  }
  const { value, max, min = 0 } = params as ComplexValue
  let res: boolean
  if (!max) {
    res = false
  } else if (!isNumber(value)) {
    res = false
  } else {
    res = !(value < min || value > max)
  }
  if (!res) simpleToast(info, errMsg, toast)
  return res
}
