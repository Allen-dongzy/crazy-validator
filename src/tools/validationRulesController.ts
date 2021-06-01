import { Value, Rule, ComplexRule, RulesResponse } from '../types'
import { required, email, phone, identity, banEmoji } from './validationRules'

// 校验规则控制器
export const validationRulesController = (value: Value, rule: Rule | ComplexRule): RulesResponse => {
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
    case 'banEmoji':
      rulesResponse = banEmoji(value)
      break
    default:
      rulesResponse = required(value)
  }
  return rulesResponse
}
