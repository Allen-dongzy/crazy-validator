import { RuleBack, RulesResponse } from '../types'
import { statusBox } from '../tools/validationStatus'

// rule返回
const ruleBack = ({
  res,
  expectType,
  currentType,
  status
}: RuleBack): RulesResponse => {
  if (res) {
    return {
      status: statusBox.checkSuccess
    }
  } else {
    return {
      status: status || statusBox.checkFail,
      expectType,
      currentType
    }
  }
}

export default ruleBack
