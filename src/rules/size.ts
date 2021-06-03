import { isNumber, getType } from '../tools/validationTypes'
import { Value, RulesResponse } from '../types'
import ruleBack from './ruleBack'

// 形参接口
interface LimitSizeParams {
  value: Value;
  max: number;
  min?: number;
}

// 数组大小校验-严谨结果
export const size = (value: Value, max: number, min: number = 0): RulesResponse => {
  let errMsg = '请输入正确范围内的数值'
  if (!max) errMsg = '缺少最大值属性:max'
  const expectType: string = 'number'
  const currentType: string = getType(value)
  const params: LimitSizeParams = { value, min, max }
  return ruleBack({
    res: limitSize(params),
    errMsg,
    expectType,
    currentType
  })
}

// 数值大小校验-简单结果
export const limitSize = (params: LimitSizeParams, info?: string, toast?: Function): boolean => {
  const { value, min, max } = params
  let res: boolean
  if (!max) {
    res = false
  } else if (!isNumber(value)) {
    res = false
  } else {
    res = !(value < min || value > max)
  }
  if (!res && info && toast) toast(info)
  return res
}
