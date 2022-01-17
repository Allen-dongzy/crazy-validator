import { isString, isNumber, isFunction, getType } from '../tools/validationTypes'
import { Value, RulesResponse } from '../types'
import ruleBack from './ruleBack'

// 形参接口
interface LimitLength {
  value: Value;
  max: number;
  min?: number;
}

// 默认错误提示
const errMsg: string = '字符不在指定范围内'

// 长度校验-严谨结果
export const length = (value: Value, max: number, min: number = 0): RulesResponse => {
  let errMsg = `请输入${min}-${max}位字符`
  if (!max) errMsg = '缺少最大值属性:max'
  const expectType: string = 'number'
  const currentType: string = getType(value)
  const params: LimitLength = { value, min, max }
  return ruleBack({
    res: limitLength(params),
    errMsg,
    expectType,
    currentType
  })
}

// 长度校验-简单结果
export const limitLength = (params: LimitLength, info?: string | Function, toast?: Function): boolean => {
  if (isFunction(info)) {
    toast = info as Function
    info = errMsg
  }
  const { value, min, max } = params
  let res: boolean
  if (!max) {
    res = false
  } else if (!isString(value) && !isNumber(value)) {
    res = false
  } else {
    res = !(String(value).length < min || String(value).length > max)
  }
  if (!res && info && toast) toast(info as string)
  return res
}
