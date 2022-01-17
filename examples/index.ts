import validator, { CheckElement, ValidatorResponse, limitLength, setToast } from '../src'

const value1: any = 1234567
const value2: any = '654001199702212916'
const value3: number = 22

const test = (str: string) => {
  console.log(str)
}

setToast(test)

const checkList: CheckElement[] = [{
  value: value1,
  rules: ['required', {
    type: 'length',
    min: 3,
    max: 7,
    msg: '请输入3-7位的value1'
  }]
}, {
  value: value2,
  rules: ['required', {
    type: 'identity',
    msg: '请输入正确的身份证'
  }]
}, {
  value: value3,
  rules: ['required', {
    type: 'range',
    min: 2,
    max: 12,
    msg: '请输入0到12之间的number'
  }]
}]

const checkRes: ValidatorResponse = validator(checkList)
console.log(checkRes)

console.log(limitLength({ value: value1, max: 17, min: 9 }, test))
