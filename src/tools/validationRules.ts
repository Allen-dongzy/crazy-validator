import { isObject, isArray, isString, isNumber } from './validationTypes'
import { statusBox } from './validationStatus'
import { Value, Status, RulesResponse } from '../types'

// 返回格式
interface _CommonBack {
  res: boolean,
  expectType?: string,
  currentType?: string,
  status?: Status
}

// 通用返回
const _commonBack = ({
  res,
  expectType,
  currentType,
  status
}: _CommonBack): RulesResponse => {
  if (res) {
    return {
      status: statusBox.checkSuccess
    }
  } else {
    return {
      status: status || statusBox.checkFail,
      expectType,
      currentType
    }
  }
}

// 非空校验
export const required = (value: Value): RulesResponse => {
  const objectRule = isObject(value)
  if (objectRule.value) {
    return _commonBack({
      res: Object.keys(value as object).length > 0,
      expectType: 'any',
      currentType: objectRule.currentType
    })
  }
  const arrayRule = isArray(value)
  if (arrayRule.value) {
    return _commonBack({
      res: (value as Array<any>).length > 0,
      expectType: 'any',
      currentType: objectRule.currentType
    })
  }
  return _commonBack({
    res: !!value,
    expectType: 'any',
    currentType: arrayRule.currentType
  })
}

// 邮箱校验
export const email = (value: Value): RulesResponse => {
  const stringRule = isString(value)
  if (!stringRule.value) {
    return _commonBack({
      res: false,
      expectType: stringRule.expectType,
      currentType: stringRule.currentType,
      status: statusBox.valueErr
    })
  }
  const emailRegExg: RegExp = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return _commonBack({
    res: emailRegExg.test(value as string),
    expectType: stringRule.expectType,
    currentType: stringRule.currentType
  })
}

// 手机校验
export const phone = (value: Value): RulesResponse => {
  let expectType = ''
  const numberRule = isNumber(value)
  expectType += numberRule.expectType
  if (numberRule.value) value = value.toString()
  const stringRule = isString(value)
  expectType += stringRule.expectType
  if (!stringRule.value) {
    return _commonBack({
      res: false,
      expectType: expectType,
      currentType: stringRule.currentType,
      status: statusBox.valueErr
    })
  }
  const phoneRegExg: RegExp = /^1[34578]\d{9}$/
  return _commonBack({
    res: phoneRegExg.test(value as string),
    expectType: expectType,
    currentType: stringRule.currentType
  })
}

// 身份证校验
export const identity = (value: Value): RulesResponse => {
  const stringRule = isString(value)
  if (!stringRule.value) {
    return _commonBack({
      res: false,
      expectType: stringRule.expectType,
      currentType: stringRule.currentType,
      status: statusBox.valueErr
    })
  }
  const identityRegExg: RegExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return _commonBack({
    res: identityRegExg.test(value as string),
    expectType: stringRule.expectType,
    currentType: stringRule.currentType
  })
}
