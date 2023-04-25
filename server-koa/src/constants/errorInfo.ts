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
  },
  // 选课失败
  selectLessonFailInfo: {
    errno: 10011,
    message: '选课失败'
  },
  // 人脸匹配失败
  faceRecognitionFailInfo: {
    errno: 10012,
    message: '人脸不匹配'
  },
  // 没有上传过人脸图像
  getfaceImgFailInfo: {
    errno: 10013,
    message: '没有上传过人脸图像'
  },
  // 考勤失败
  attendanceFailInfo: {
    errno: 10014,
    message: '考勤失败'
  },
  // 不能查询其他教师的课程考勤情况
  getOthersLessonFailInfo: {
    errno: 10015,
    message: '只能查询自己的课程'
  }
}

export { errorInfo }
