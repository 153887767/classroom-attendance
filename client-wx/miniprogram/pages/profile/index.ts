import { request, HttpMethod } from '../../utils/request'
import { baseUrl } from '../../config/index'

Page({
  data: {
    userName: '',
    studentNumber: '',
    avatar: '',
    faceImg: '',
    studentNumberModified: true,
    userNameModified: true
  },

  /**
   * 上传头像
   */
  handleChooseAvatar(e: WechatMiniprogram.TouchEvent) {
    const that = this
    const { avatarUrl } = e.detail
    wx.uploadFile({
      url: `${baseUrl}/api/student/upload/avatar`,
      filePath: avatarUrl,
      name: 'avatar',
      header: {
        Authorization: `Bearer ${wx.getStorageSync('token')}`
      },
      success(res) {
        try {
          const resData = JSON.parse(res.data)
          if (!resData.errno) {
            that.setData({
              avatar: resData.data.url
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
  },

  /**
   * 修改学号
   */
  changeStudentNumber() {
    const that = this
    wx.showModal({
      title: '修改学号',
      content: `学号只能修改一次，请仔细核对：${this.data.studentNumber}`,
      async success(res) {
        if (res.confirm) {
          const result: any = await request(
            '/api/student/studentNumber',
            HttpMethod.POST,
            {
              studentNumber: that.data.studentNumber
            }
          )
          if (result.data?.errno === 0) {
            wx.showToast({
              title: '修改学号成功',
              icon: 'success',
              duration: 1000
            })
            that.setData({
              studentNumberModified: true
            })
          } else {
            wx.showToast({
              title: '修改学号失败',
              icon: 'error' as any,
              duration: 1000
            })
          }
        }
      }
    })
  },

  /**
   * 修改姓名
   */
  changeUserName() {
    const that = this
    wx.showModal({
      title: '修改姓名',
      content: `姓名只能修改一次，请仔细核对：${this.data.userName}`,
      async success(res) {
        if (res.confirm) {
          const result: any = await request(
            '/api/student/userName',
            HttpMethod.POST,
            {
              userName: that.data.userName
            }
          )
          if (result.data?.errno === 0) {
            wx.showToast({
              title: '修改姓名成功',
              icon: 'success',
              duration: 1000
            })
            that.setData({
              userNameModified: true
            })
          } else {
            wx.showToast({
              title: '修改姓名失败',
              icon: 'error' as any,
              duration: 1000
            })
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    request('/api/student/getInfo', HttpMethod.GET).then((res: any) => {
      if (res.data?.errno === 0) {
        this.setData(res.data.data)
      }
    })
  }
})
