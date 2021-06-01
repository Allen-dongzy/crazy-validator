const validator = require('../dist')

const value1: any = 'a@b.com'
const value2: any = '6540011997022129167'
const value3: any = '17623178041'

const checkElements = [{
  value: value1,
  rules: ['required']
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
