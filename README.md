# <p align="center">crazy-validator </p>

[![build](https://img.shields.io/badge/build-passing-brightgreen)](https://www.npmjs.com/package/crazy-validator)
[![license](https://img.shields.io/badge/license-MIT-green)](https://www.npmjs.com/package/crazy-validator)
[![npm](https://img.shields.io/badge/npm-v6.14.9-blue)](https://www.npmjs.com/package/crazy-validator)

**crazy-validator 是一款帮助前端开发人员进行表单验证的通用型插件**

## 使用方法

**安装:**

```javascript
// npm:
npm install crazy-validator
// yarn:
yarn add crazy-validator
```

**使用 esmodule:**

```javascript
import validator from "crazy-validator";
```

**使用 nodejs:**

```javascript
const validator = require("crazy-validator");
```

**实例:**

```javascript
import validator from "crazy-validator";

const email = 1234;
const checkItem = {
  value: email,
  rules: ["required", "email"], // 必填项，邮箱
};

// 校验
const checkRes = validator(checkItem);
console.log(checkRes);
```

```javascript
// checkRes的内容：
{
  currentType: "number"; // 当前类型
  expectType: "string"; // 期待类型
  msg: "邮箱格式错误"; // 报错提示
  position: 1; // 错误定位在规则数组中下标为1的那条规则[email]
  rule: "email"; // 校验错误的规则名
  status: 1001; // 状态值为1001，正确校验位1000
  value: 1234; // 传入值为1234
}
```

## 参数解析

### I. 传入值：validator(`object` | `array`, `Function`)

```javascript
validator(校验项, 错误提示函数);
```

<hr>

#### 1.校验项

- 传入值可以是校验对象也可以是校验对象数组

  ##### 1.1 校验对象：

  ```javascript
  const checkItem = {
    value: email,
    rules: ["required", "email"], // 必填项，邮箱
  };

  // 校验
  validator(checkItem);
  ```

  对 `email` 做非空和邮箱验证

  ##### 1.2 校验对象数组：

  ```javascript
  const checkList = [
    {
      value: email,
      rules: ["required", "email"], // 必填项，邮箱
    },
    {
      value: phone,
      rules: ["required", "phone"], // 必填项，手机号
    },
  ];

  // 校验
  validator(checkList);
  ```

  对 `email` 做非空和邮箱验证，对 `phone` 做非空和手机号验证

  ##### 1.3 校验对象格式：

  <table>
    <tbody>
      <tr>
        <td align="center" valign="middle">属性名</td>
        <td align="center" valign="middle">类型</td>
        <td align="center" valign="middle">默认值</td>
        <td align="center" valign="middle">解释</td>
      </tr>
      <tr>
        <td>value</td>
        <td>any</td>
        <td></td>
        <td>待校验的值</td>
      </tr>
      <tr>
        <td>rules</td>
        <td>Array[string] | Array[object]</td>
        <td></td>
        <td>校验规则数组</td>
      </tr>
    </tbody>
  </table>

  - rules 数组中可以是简单校验规则也可以是复杂校验规则
  - 简单校验规则直接将规则名传入即可
  - 复杂校验规则是规则对象，里面会包含更多的限制，常用的比如`type`、`msg`

  ##### 1.4 校验规则:

  ###### 1.4.1 简单校验规则：

  ```javascript
  const checkItem = {
    value: email,
    rules: ["required", "email"], // 必填项，邮箱
  };
  ```

  对 `email` 做非空和邮箱校验，错误时输出默认提示。<br>错误时输出：“必填项不能为空”和“邮箱格式错误”

  ###### 1.4.2 复杂校验规则：

  ```javascript
  {
    value: phone,
    rules: [{
        type: 'required',
        msg: '请输入手机号'
      }, {
        type: 'phone',
        msg: '手机号错误'
      }]
  }
  ```

  对 `phone` 做非空和手机号校验，错误时输出自定义提示<br>错误时输出：“请输入手机号”和“手机号错误”

  ###### 1.4.3 校验规则名：

  <table>
    <tbody>
      <tr>
        <td align="center" valign="middle">规则名</td>
        <td align="center" valign="middle">类型</td>
        <td align="center" valign="middle">解释</td>
      </tr>
      <tr>
        <td>required</td>
        <td>string</td>
        <td>必填项</td>
      </tr>
      <tr>
        <td>email</td>
        <td>string</td>
        <td>邮箱</td>
      </tr>
      <tr>
        <td>phone</td>
        <td>string</td>
        <td>手机号</td>
      </tr>
      <tr>
        <td>identity</td>
        <td>string</td>
        <td>身份证号</td>
      </tr>
      <tr>
        <td>noEmoji</td>
        <td>string</td>
        <td>禁用emoji的文本</td>
      </tr>
      <tr>
        <td>range</td>
        <td>string</td>
        <td>校验指定的最小值到最大值之间的数字</td>
      </tr>
      <tr>
        <td>length</td>
        <td>string</td>
        <td>校验指定的最小个数到最大个数之间的字符</td>
      </tr>
    </tbody>
  </table>

<hr>

#### 2.错误提示函数

- crazy-validator 支持自定义的 toast 提示，你可以将你当前所使用的 ui 框架中的 toast 方法传入 validator 函数

  ##### 2.1 vant：

  ```javascript
  import { Toast } from "vant";

  const checkList = [
    {
      value: email,
      rules: ["required", "email"], // 必填项，邮箱
    },
    {
      value: phone,
      rules: ["required", "phone"], // 必填项，手机号
    },
  ];

  // 校验
  validator(checkList, Toast);
  ```

  #### 2.2 element：

  ```javascript
  import { Message } from "element-ui";

  Vue.prototype.$message = Message;

  const checkList = [
    {
      value: email,
      rules: ["required", "email"], // 必填项，邮箱
    },
    {
      value: phone,
      rules: ["required", "phone"], // 必填项，手机号
    },
  ];

  // 校验
  validator(checkList, this.$message.error);
  ```

  <hr>

#### 3.简单校验项

- crazy-valisator 支持单一校验规则的导出

  ##### 3.1 简单校验的使用

  ```javascript
  // 引入vant的Toast提示
  import { Toast } from 'vant'
  // 引入非空校验，邮箱校验，手机号校验规则
  import { isRequired, isEmail, isPhone } from 'crazy-validator'

  const email = 'aa@gmail.com'
  const phone = 176231780401

  // 提交
  const submit() {
    if (!isRequired(email, '请输入邮箱', Toast)) return
    if (!isEmail(email, '请输入正确格式的邮箱', Toast)) return
    if (!isRequired(phone, '请输入手机号', Toast)) return
    if (!isPhone(phone, '请输入正确格式的手机号', Toast)) return
    // 提交到后端
  }
  ```

  `isRequired` 校验失败会弹出：请输入邮箱<br>
  `isEmail` 校验失败会弹出：请输入正确格式的邮箱<br>
  `isRequired` 校验失败会弹出：请输入手机号<br>
  `isPhone` 校验失败会弹出：请输入正确格式的手机号<br>

  单一规则校验中：

  - 第一个参数为待校验值，格式参考 1.3 中的 value
  - 第二个参数为错误提示，格式参考 1.4.1 中的 rules 中的 msg
  - 第二个参数为提示函数，格式参考 validator 函数中的第二个参数

  **提示：若只传两个参数，且参数二为提示函数，则校验失败后会自动弹出改规则的默认错误提示**

  ```javascript
  if (!isRequired(email, Toast)) return;
  if (!isEmail(email, Toast)) return;
  ```

  `isRequired` 校验失败会弹出 `isRequired` 的默认提示：必填项不能为空<br>
  `isEmail` 校验失败会弹出 `isEmail` 的默认提示：邮箱格式错误

  ##### 3.2 简单校验格式

  <table>
    <tbody>
      <tr>
        <td align="center" valign="middle">校验函数名</td>
        <td align="center" valign="middle">解释</td>
      </tr>
      <tr>
        <td>isRequired</td>
        <td>必填项</td>
      </tr>
      <tr>
        <td>isEmail</td>
        <td>邮箱</td>
      </tr>
      <tr>
        <td>isPhone</td>
        <td>手机号</td>
      </tr>
      <tr>
        <td>isIdentity</td>
        <td>身份证号</td>
      </tr>
      <tr>
        <td>isNoEmoji</td>
        <td>禁用emoji的文本</td>
      </tr>
      <tr>
        <td>limitRange</td>
        <td>校验指定的最小值到最大值之间的数字</td>
      </tr>
      <tr>
        <td>limitLength</td>
        <td>校验指定的最小个数到最大个数之间的字符</td>
      </tr>
    </tbody>
  </table>

  **引入方法：**
  ```javascript
  import {
    isRequired,
    isEmail,
    isPhone,
    isIdentity,
    isNoEmoji,
    limitRange,
    limitLength,
  } from "crazy-validator";

  // todo...
  ```

### II. 返回值：`object`

<hr>

#### 复杂校验的返回值：

<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">属性</td>
      <td align="center" valign="middle">类型</td>
      <td align="center" valign="middle">解释</td>
    </tr>
    <tr>
      <td>currentType</td>
      <td>string</td>
      <td>当前类型</td>
    </tr>
    <tr>
      <td>expectType</td>
      <td>string</td>
      <td>该规则的期望类型</td>
    </tr>
    <tr>
      <td>msg</td>
      <td>string</td>
      <td>报错提示</td>
    </tr>
    <tr>
      <td>position</td>
      <td>number | array[number]</td>
      <td>错误定位</td>
    </tr>
    <tr>
      <td>rule</td>
      <td>string</td>
      <td>校验错误的规则名</td>
    </tr>
    <tr>
      <td>status</td>
      <td>number</td>
      <td>状态值</td>
    </tr>
    <tr>
      <td>value</td>
      <td>any</td>
      <td>传入值</td>
    </tr>
  </tbody>
</table>

##### `position`：

**当使用复杂校验，并且传的是校验对象时，`position`为校验规则数组中验证出错的那个规则的下标**

```javascript
const email = 1234;
const checkItem = {
  value: email,
  rules: ["required", "email"], // 必填项，邮箱
};
```

这里非空校验通过，邮箱校验出错。出错规则是规则数组中的第二个规则，所以`position`为 1

##### `status`：

**当使用复杂校验，status 会有三种结果**

- status: 1000，验证通过
- status: 1001，验证失败
- status: 1002，规则传输错误

```javascript
const email = 1234;
const checkItem = {
  value: email,
  rules: ["required", "email", "aaa"],
  // 验证通过, 验证失败, 无效的rule
  // 1000, 1001, 1002
};
```

#### 简单校验的返回值：

- 简单校验的返回值为 boolean

```javascript
const phone = 176231780401;

console.log(isPhone(phone, Toast)); // false
```
