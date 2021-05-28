import { ValidatorResponse } from '../types'
import { statusBox } from './validationStatus'

// 设置检验体
export const setValidationResponse = (response: ValidatorResponse): ValidatorResponse => {
  return _setValidationResponseMsg(response)
}

// 优化检验返回格式-裁剪
export const clipValidationResponse = (response: ValidatorResponse): ValidatorResponse => {
  if (response.status === statusBox.rulesErr) {
    delete response.expectType
    delete response.currentType
    response.rule = 'unknown'
  }
  if (response.status === statusBox.checkSuccess) {
    delete response.expectType
    delete response.currentType
    delete response.value
    delete response.rule
    delete response.index
  }
  return response
}

// 设置检验返回提示
const _setValidationResponseMsg = (response: ValidatorResponse): ValidatorResponse => {
  if (response.status === statusBox.checkSuccess) response.msg = '校验通过'
  if (response.status === statusBox.valueErr) response.msg = '请传入正确格式的value'
  if (response.status === statusBox.rulesErr) response.msg = '请传入正确格式的rules'
  if (response.status === statusBox.checkFail && !response.msg) {
    switch (response.rule) {
      case 'required':
        response.msg = '必填项不能为空'
        break
      case 'email':
        response.msg = '邮箱格式错误'
        break
      case 'phone':
        response.msg = '手机号格式错误'
        break
      case 'identity':
        response.msg = '身份证格式错误'
        break
      default:
        response.msg = '未知的规则'
    }
  }
  return response
}
