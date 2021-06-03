const validator = require('../dist').default
const { isIdentity, limitRange, limitLength } = require('../dist')

const value1 = 'a@b.com'
const value2 = '6540011997022129161'
const value3 = 22

const checkElements = [{
  value: value1,
  rules: ['required', 'email', {
    type: 'length',
    min: 9,
    max: 17,
    msg: '请输入9-17位的value1'
  }]
}, {
  value: value2,
  rules: ['required', {
    type: 'identity',
    msg: '请输入正确的身份证'
  }]
}, {
  value: value3,
  rules: ['required', 'range']
}]

const test = (str) => {
  console.log(str)
}
console.log(validator(checkElements, test))
console.log(isIdentity(value2, test))
console.log(limitRange({ value: value3, max: 24, min: 23 }, test))
console.log(limitLength({ value: value1, max: 17, min: 9 }, test))
