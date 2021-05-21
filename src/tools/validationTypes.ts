const toString = Object.prototype.toString

// val是否为Object
export const isObject = (val: any): val is Object => toString.call(val) === '[object Object]'

// val是否为Array
export const isArray = (val: any): val is Array<any> => toString.call(val) === '[object Array]'

// val是否为String
export const isString = (val: any): val is String => toString.call(val) === '[object String]'

// val是否为Number
export const isNumber = (val: any): val is Number => toString.call(val) === '[object Number]'