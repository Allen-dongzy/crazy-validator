import { isString, getType } from '../tools/validationTypes'
import { Value, RulesResponse } from '../types'
import ruleBack from './ruleBack'

// 形参接口
interface LimitLength {
  value: Value;
  max: number;
  min?: number;
}

// 数值大小校验-严谨结果
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

// 数值大小校验-简单结果
export const limitLength = (params: LimitLength, info?: string, toast?: Function): boolean => {
  const { value, min, max } = params
  let res: boolean
  if (!max) {
    res = false
  } else if (!isString(value)) {
    res = false
  } else {
    res = !((value as string).length < min || (value as string).length > max)
  }
  if (!res && info && toast) toast(info)
  return res
}
