// 状态码 校验成功 | 校验失败 | value错误 | rules参数错误
export type Status = 1000 | 1001 | 1002 | 1003

// 校验值
export type Value = Array<any> | object | string | number

// 校验规则
export type Rule = 'required' | 'email' | 'phone' | 'identity' | 'length' | 'size' | 'noEmoji'

// 状态容器
export interface StatusBox {
  checkSuccess: 1000,
  checkFail: 1001,
  valueErr: 1002,
  rulesErr: 1003,
}

// 复杂校验规则
export interface ComplexRule {
  type: Rule | null,
  msg?: string
}

// 校验元素
export interface CheckElement {
  value: Value,
  rules: Array<Rule | ComplexRule>
}

// rule返回格式
export interface RuleBack {
  res: boolean,
  expectType?: string,
  currentType?: string,
  status?: Status
}

// rule响应接口
export interface RulesResponse {
  status: Status,
  expectType?: string,
  currentType?: string
}

// validator响应接口
export interface ValidatorResponse {
  status: Status,
  expectType?: Value,
  currentType?: string,
  value?: Value,
  rule?: Rule | 'unknown',
  msg?: string,
  index?: number
}
