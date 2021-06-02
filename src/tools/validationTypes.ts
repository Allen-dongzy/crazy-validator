const _toString = Object.prototype.toString

// 获取类型
export const getType = (val: any): string => {
  return _toString.call(val).split(' ')[1].split(']')[0].toLowerCase()
}

// val是否为object类型
export const isObject = (val: any): boolean => {
  const expectType: string = 'object'
  const currentType: string = getType(val)
  return currentType === expectType
}

// val是否为array类型
export const isArray = (val: any): boolean => {
  const expectType: string = 'array'
  const currentType: string = getType(val)
  return currentType === expectType
}

// val是否为string类型
export const isString = (val: any): boolean => {
  const expectType: string = 'string'
  const currentType: string = getType(val)
  return currentType === expectType
}

// val是否为number类型
export const isNumber = (val: any): boolean => {
  const expectType: string = 'number'
  const currentType: string = getType(val)
  return currentType === expectType
}
