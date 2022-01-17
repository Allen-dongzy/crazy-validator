import { ValidatorResponse, ToastFn } from '../types'
import { isFunction } from './validationTypes'
import statusBox from './validationStatus'

// 校验失败时的提示函数
let _toast: ToastFn

// 设置提示函数
const setToast = (toast: ToastFn) => {
  _toast = toast
}

// 简单校验提示
const simpleToast = (info: string | boolean | Function, errMsg: string, toast?: Function): void => {
  if (info === false) return
  const infoText = info || errMsg
  if (isFunction(toast)) {
    toast(infoText)
  } else if (isFunction(_toast)) {
    _toast(infoText as string)
  }
}

// 校验提示
const validationToast = (response: ValidatorResponse, toast?: Function): void => {
  if (response.status !== statusBox.checkSuccess) {
    if (isFunction(toast)) {
      toast(response.msg)
    } else if (isFunction(_toast)) {
      _toast(response.msg)
    }
  }
}

export {
  validationToast,
  simpleToast,
  setToast,
  _toast
}
