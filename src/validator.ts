import statusBox from './tools/validationStatus'
import validationToast from './tools/validationToast'
import { isObject, isArray } from './tools/validationTypes'
import { validationController } from './tools/validationController'
import { setValidationResponse, clipValidationResponse } from './tools/validationResponse'
import { CheckElement, ValidatorResponse, Rule, ComplexRule, Value, RulesResponse } from './types'

// 表单验证
const validator = (checkElement: CheckElement | CheckElement[], toast?: Function): ValidatorResponse => {
  let response: ValidatorResponse
  if (isArray(checkElement)) response = clipValidationResponse(_parseArray(checkElement as CheckElement[]))
  if (isObject(checkElement)) response = clipValidationResponse(_parseObject(checkElement as CheckElement))
  validationToast(response, toast)
  return response
}

// 解析校验元素列表
const _parseArray = (checkElements: CheckElement[]): ValidatorResponse => {
  let response: ValidatorResponse
  checkElements.some((checkElement, index) => {
    response = _parseObject(checkElement)
    if (!response.position && response.position !== 0) response.position = index as number
    else response.position = [index, response.position] as Array<number>
    return response.status !== statusBox.checkSuccess
  })
  return response
}

// 解析校验元素
const _parseObject = (checkElement: CheckElement): ValidatorResponse => {
  let response: ValidatorResponse
  if (checkElement.rules.length > 1) {
    checkElement.rules.some((rule: Rule | ComplexRule, index) => {
      response = _dispatchRuleController(checkElement.value, rule)
      response.position = index
      return response.status !== statusBox.checkSuccess
    })
  } else if (checkElement.rules.length === 1) {
    response = _dispatchRuleController(checkElement.value, checkElement.rules[0])
  } else {
    response = _dispatchRuleController(checkElement.value, checkElement.rules[0])
  }
  return response
}

// 分派规则控制器
const _dispatchRuleController = (value: Value, rule: Rule | ComplexRule): ValidatorResponse => {
  const {
    status,
    expectType,
    currentType,
    errMsg: msg
  }: RulesResponse = rule ? validationController(value, rule) : { status: statusBox.rulesErr }
  rule = isObject(rule) ? (rule as ComplexRule).type : (rule as Rule)
  const response: ValidatorResponse = { status, expectType, currentType, value, rule, msg }
  return setValidationResponse(response)
}

export default validator
