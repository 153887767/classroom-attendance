import { request, HttpMethod } from './utils/request'

App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 获取code, 并登录
    wx.login({
      success({ code }) {
        request('/api/student/login', HttpMethod.POST, { code }).then(
          (res: any) => {
            const token = res.data?.data?.token
            if (token) {
              wx.setStorageSync('token', token)
            }
          }
        )
      }
    })
  }
})
