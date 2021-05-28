import { TypeResponse } from '../types'
const _toString = Object.prototype.toString

// 获取类型
const _getType = (val: any): string => _toString.call(val).split(' ')[1].split(']')[0].toLowerCase()

// val是否为object类型
export const isObject = (val: any): TypeResponse => {
  const expectType: string = 'object'
  const currentType: string = _getType(val)
  return {
    value: currentType === expectType,
    currentType,
    expectType
  }
}

// val是否为array类型
export const isArray = (val: any): TypeResponse => {
  const expectType: string = 'array'
  const currentType: string = _getType(val)
  return {
    value: currentType === expectType,
    currentType,
    expectType
  }
}

// val是否为string类型
export const isString = (val: any): TypeResponse => {
  const expectType: string = 'string'
  const currentType: string = _getType(val)
  return {
    value: currentType === expectType,
    currentType,
    expectType
  }
}

// val是否为number类型
export const isNumber = (val: any): TypeResponse => {
  const expectType: string = 'number'
  const currentType: string = _getType(val)
  return {
    value: currentType === expectType,
    currentType,
    expectType
  }
}
