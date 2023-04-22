/**
 * 错误信息合集
 */
type IErrorInfo = Record<
  string,
  {
    errno: number
    message: string
  }
>

const errorInfo: IErrorInfo = {
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
  },
  // token过期
  tokenFailInfo: {
    errno: 10004,
    message: 'token无效'
  },
  // 获取用户信息失败
  getUserInfoFailInfo: {
    errno: 10005,
    message: '获取用户信息失败'
  },
  // 创建课程失败
  createLessonFailInfo: {
    errno: 10006,
    message: '创建课程失败'
  },
  // 删除课程失败
  deleteLessonFailInfo: {
    errno: 10007,
    message: '删除课程失败'
  },
  // openid获取失败
  getOpenIdFailInfo: {
    errno: 10008,
    message: 'openid获取失败'
  },
  // 修改用户信息失败
  changeInfoFailInfo: {
    errno: 10009,
    message: '修改用户信息失败'
  },
  // 人脸检测不通过
  faceDetectionFailInfo: {
    errno: 10010,
    message: '未通过人脸检测'
  }
}

export { errorInfo }
