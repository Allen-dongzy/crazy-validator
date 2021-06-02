import { isObject, isArray } from './tools/validationTypes'
import { validationController } from './tools/validationController'
import { setValidationResponse, clipValidationResponse } from './tools/validationResponse'
import { statusBox } from './tools/validationStatus'
import { CheckElement, ValidatorResponse, Rule, ComplexRule, Value, RulesResponse } from './types'

// 表单验证
const validator = (checkElement: CheckElement | CheckElement[]): ValidatorResponse => {
  if (isArray(checkElement)) return clipValidationResponse(_parseArray(checkElement as CheckElement[]))
  if (isObject(checkElement)) return clipValidationResponse(_parseObject(checkElement as CheckElement))
}

// 解析校验元素列表
const _parseArray = (checkElements: CheckElement[]): ValidatorResponse => {
  let response: ValidatorResponse
  checkElements.some((checkElement, index) => {
    response = _parseObject(checkElement)
    response.index = index
    return response.status !== statusBox.checkSuccess
  })
  return response
}

// 解析校验元素
const _parseObject = (checkElement: CheckElement): ValidatorResponse => {
  let response: ValidatorResponse
  if (checkElement.rules.length > 1) {
    checkElement.rules.some((rule: Rule | ComplexRule) => {
      response = _dispatchRuleController(checkElement.value, rule)
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
  let msg: string = ''
  if (isObject(rule)) {
    msg = (rule as ComplexRule).msg || ''
    rule = (rule as ComplexRule).type
  }
  rule = rule as Rule
  const {
    status,
    expectType,
    currentType
  }: RulesResponse = rule ? validationController(value, rule) : { status: statusBox.rulesErr }
  const response: ValidatorResponse = { status, expectType, currentType, value, rule, msg }
  return setValidationResponse(response)
}

export default validator
