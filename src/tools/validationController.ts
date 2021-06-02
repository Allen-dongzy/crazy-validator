import { Value, Rule, ComplexRule, RulesResponse } from '../types'
import { required } from '../rules/required'
import { email } from '../rules/email'
import { phone } from '../rules/phone'
import { identity } from '../rules/identity'
import { noEmoji } from '../rules/noEmoji'

// 校验规则控制器
export const validationController = (value: Value, rule: Rule | ComplexRule): RulesResponse => {
  let rulesResponse: RulesResponse
  switch (rule) {
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
    default:
      rulesResponse = required(value)
  }
  return rulesResponse
}
