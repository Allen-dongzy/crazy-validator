import validator, { CheckElement } from '../src'

const value1: any = 'a@b.com'
const value2: any = '654001199702212916'
const value3: any = 17623178041

const checkElements: CheckElement[] = [{
  value: value1,
  rules: ['required', 'email']
}, {
  value: value2,
  rules: ['required', {
    type: 'identity',
    msg: '请输入正确的身份证'
  }]
}, {
  value: value3,
  rules: ['required', 'phone']
}]

console.log(validator(checkElements))
