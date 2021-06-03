import { ValidatorResponse } from '../types'
import statusBox from './validationStatus'

// 校验提示
const validationToast = (response: ValidatorResponse, toast: Function): void => {
  if (response.status !== statusBox.checkSuccess && toast) toast(response.msg)
}

export default validationToast
