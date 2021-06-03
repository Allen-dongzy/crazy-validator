import validator from './validator'
import { isRequired } from './rules/required'
import { isEmail } from './rules/email'
import { isPhone } from './rules/phone'
import { isIdentity } from './rules/identity'
import { isNoEmoji } from './rules/noEmoji'
import { limitSize } from './rules/size'

// 导出简单验证方法
export {
  isRequired,
  isEmail,
  isPhone,
  isIdentity,
  isNoEmoji,
  limitSize
}

// 导出类型
export * from './types'

// 导出入口函数
export default validator
