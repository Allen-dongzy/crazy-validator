import { Value, Rule, ComplexRule, RulesResponse } from '../types'
import { isObject } from './validationTypes'
import { statusBox } from './validationStatus'
import { required } from '../rules/required'
import { email } from '../rules/email'
import { phone } from '../rules/phone'
import { identity } from '../rules/identity'
import { noEmoji } from '../rules/noEmoji'
import { size } from '../rules/size'

// 校验规则控制器
export const validationController = (value: Value, rule: Rule | ComplexRule): RulesResponse => {
  let rulesResponse: RulesResponse
  const cacheRule = isObject(rule) ? (rule as ComplexRule).type : (rule as Rule)
  switch (cacheRule) {
    case 'required':
      rulesResponse = required(value)
      break
    case 'email':
      rulesResponse = email(value)
      break
    case 'phone':
      rulesResponse = phone(value)
      break
    case 'identity':
      rulesResponse = identity(value)
      break
    case 'noEmoji':
      rulesResponse = noEmoji(value)
      break
    case 'size':
      rulesResponse = size(value, (rule as ComplexRule).min, (rule as ComplexRule).max)
      break
    default:
      rulesResponse = {
        status: statusBox.rulesErr
      }
  }
  if (rulesResponse.status === statusBox.checkFail) {
    rulesResponse.errMsg = (rule as ComplexRule).msg || rulesResponse.errMsg
  }
  return rulesResponse
}
