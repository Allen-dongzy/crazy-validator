import { RuleBack, RulesResponse } from '../types'
import { statusBox } from '../tools/validationStatus'

// rule返回
const ruleBack = ({
  res,
  expectType,
  currentType,
  errMsg
}: RuleBack): RulesResponse => {
  if (res) {
    return {
      status: statusBox.checkSuccess
    }
  } else {
    return {
      status: statusBox.checkFail,
      expectType,
      currentType,
      errMsg
    }
  }
}

export default ruleBack
