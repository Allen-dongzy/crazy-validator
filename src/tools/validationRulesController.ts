import { Value, Rule, ComplexRule, Status } from '../types'
import { required, email, phone, identity } from './validationRules'

// 校验规则控制器
export const validationRulesController = (value: Value, rule: Rule | ComplexRule): Status => {
  let status: Status
  switch (rule) {
    case 'required':
      status = required(value)
      break
    case 'email':
      status = email(value)
      break
    case 'phone':
      status = phone(value)
      break
    case 'identity':
      status = identity(value)
      break
    default:
      status = required(value)
  }
  return status
}