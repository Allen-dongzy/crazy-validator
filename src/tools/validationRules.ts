import { isObject, isArray, isString, isNumber } from './validationTypes'
import { statusBox } from './validationStatus'
import { Value, Status } from '../types'

// 通用返回
const _commonBack = (res: boolean): Status => {
  if (res) {
    return statusBox.checkSuccess
  } else {
    return statusBox.checkFail
  }
}

// 非空校验
export const required = (value: Value): Status => {
  let res: boolean = false
  if (isObject(value)) {
    res = Object.keys(value as object).length > 0
  } else if (isArray(value)) {
    res = (value as Array<any>).length > 0
  } else {
    res = !!value
  }
  return _commonBack(res)
}

// 邮箱校验
export const email = (value: Value): Status => {
  if (!isString(value)) return statusBox.valueErr
  const emailRegExg: RegExp = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return _commonBack(emailRegExg.test(value as string))
}

// 手机校验
export const phone = (value: Value): Status => {
  if (isNumber(value)) value = value.toString()
  if (!isString(value)) return statusBox.valueErr
  const phoneRegExg: RegExp = /^1[34578]\d{9}$/
  return _commonBack(phoneRegExg.test(value))
}

// 身份证校验
export const identity = (value: Value): Status => {
  if (!isString(value)) return statusBox.valueErr
  const identityRegExg: RegExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return _commonBack(identityRegExg.test(value))
}
