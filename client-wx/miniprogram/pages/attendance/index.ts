import dayjs from 'dayjs'
import { request, HttpMethod } from '../../utils/request'
import { baseUrl } from '../../config/index'
import { getToken } from '../../utils/token'

Page({
  data: {
    currentLesson: null,
    isLocationCorrect: false,
    isAttendance: false
  },

  /**
   * 获取定位，比较和教学楼的距离
   */
  getLocation() {
    const that = this
    // 模拟器中定位模拟使用IP定位，存在较大误差，真机定位较准确
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      async success(res) {
        // 计算距离
        const result: any = await request(
          '/api/location/distance',
          HttpMethod.GET,
          {
            origins: `${res.longitude},${res.latitude}`,
            destination: (that.data.currentLesson as any)?.geocode
          }
        )
        if (result.statusCode === 200 && result.data.status === '1') {
          if (result.data.results[0].distance < 500) {
          // 500米内，可考勤
            that.setData({ isLocationCorrect: true })
            wx.showToast({
              title: '已到达教室',
              icon: 'success',
              duration: 1000
            })
          } else {
            that.setData({ isLocationCorrect: false })
            wx.showToast({
              title: '未到达教室',
              icon: 'error' as any,
              duration: 1000
            })
          }
        }
      }
    })
  },

  /**
   * 人脸识别
   */
  faceRecognition() {
    const that = this
    const lessonId = (that.data.currentLesson as any)?.id ?? 0
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera'],
      camera: 'front',
      success(res) {
        wx.uploadFile({
          url: `${baseUrl}/api/attendance/faceRecognition`,
          filePath: res.tempFiles[0].tempFilePath,
          name: 'faceImg',
          header: {
            Authorization: getToken()
          },
          formData: { lessonId },
          success(res) {
            try {
              const resData = JSON.parse(res.data)
              if (!resData.errno) {
                that.setData({ isAttendance: true })
                wx.showToast({
                  title: '考勤成功',
                  icon: 'success',
                  duration: 1000
                })
              } else {
                wx.showToast({
                  title: resData.message,
                  icon: 'error' as any,
                  duration: 1000
                })
              }
            } catch (error) {
              console.log(error)
            }
          }
        })
      }
    })
  },

  /**
   * 每次进入此页面都重新拉取数据
   */
  async onShow() {
    const res: any = await request(
      '/api/attendance/currentLesson',
      HttpMethod.GET
    )
    if (res.data?.errno === 0 && res.data.data.currentLesson) {
      const currentLesson = res.data.data.currentLesson
      this.setData({ currentLesson })
      if (dayjs().isSame(dayjs(currentLesson.lastAttendance), 'day')) {
        // 今日已考勤
        this.setData({ isLocationCorrect: true, isAttendance: true })
      }
    }
  }
})
