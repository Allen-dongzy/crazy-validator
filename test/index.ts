import validator, { CheckElement, isIdentity, limitSize, limitLength } from '../src'

const value1: any = 'a@b.com'
const value2: any = '6540011997022129161'
const value3: number = 22

const checkElements: CheckElement[] = [{
  value: value1,
  rules: ['required', 'email', {
    type: 'length',
    min: 9,
    max: 17
  }]
}, {
  value: value2,
  rules: ['required', {
    type: 'identity',
    msg: '请输入正确的身份证'
  }]
}, {
  value: value3,
  rules: ['required', 'size']
}]

const test = (str: string) => {
  console.log(str)
}
console.log(validator(checkElements))
console.log(isIdentity(value2, '请输入正确的身份证', test))
console.log(limitSize({ value: value3, max: 24, min: 23 }, '请输入正确范围的数值', test))
console.log(limitLength({ value: value1, max: 17, min: 9 }, '请输入正确个数的字符', test))
