import { baseUrl } from '../config/index'

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST'
}

// 封装请求
export const request = (
  url: string,
  method: HttpMethod,
  data: string | object = {},
  header: Record<string, any> = {}
) => {
  const token = wx.getStorageSync('token')
  if (token) {
    header['Authorization'] = `Bearer ${token}`
  }
  wx.showNavigationBarLoading()
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      header: header,
      data: data,
      method: method,
      success(res) {
        if (res.statusCode == 401) {
          // token过期，重新登录
          reLogin()
        }
        resolve(res)
      },
      fail: reject,
      complete: () => {
        wx.hideNavigationBarLoading()
      }
    })
  })
}

// 重新登录
const reLogin = () => {
  wx.removeStorageSync('token')
  wx.showToast({
    title: '登录信息过期',
    icon: 'none',
    duration: 1000
  })
  setTimeout(() => {
    wx.showLoading({
      title: '重新登录中'
    })
    wx.login({
      success: (res) => {
        request('/api/student/login', HttpMethod.POST, {
          code: res.code
        }).then((res: any) => {
          wx.hideLoading()
          if (res.statusCode == 200) {
            const token = res.data?.data?.token
            if (token) {
              wx.setStorageSync('token', token)
            }
            wx.showToast({
              title: '登陆成功',
              icon: 'success'
            })
          }
        })
      }
    })
  }, 1000)
}
