/**
 * 错误信息合集
 */

const errorInfo = {
  // 用户名已存在
  registerUserNameExistInfo: {
    errno: 10001,
    message: '用户名已存在'
  },
  // 注册失败
  registerFailInfo: {
    errno: 10002,
    message: '注册失败，请重试'
  },
  // 登录失败
  loginFailInfo: {
    errno: 10003,
    message: '登录失败，用户名或密码错误'
  }
}

export { errorInfo }
