import formTest, { CheckElement } from '../src'

let value1: any = 'a@b.com'
let value2: any = '6540011997022129167'
let value3: any = '17623178041'

// const checkElements: CheckElement[] = [{
//   value: value1,
//   rules: ['required']
// }, {
//   value: value2,
//   rules: ['required', {
//     type: 'identity',
//     msg: '请输入正确的身份证'
//   }]
// }, {
//   value: value3,
//   rules: ['required', 'phone']
// }]  

let value:any = 654001199702212916

const checkElement: CheckElement = {
  value: value,
  rules: ['required', 'identity']
}

console.log(formTest(checkElement))