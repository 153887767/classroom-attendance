import { request, HttpMethod } from '../../utils/request'

Page({
  data: {
    currentLesson: null,
    isLocationCorrect: false
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
          // TODO 模拟器环境暂时使用2万米来判定
          if (result.data.results[0].distance < 20000) {
            that.setData({ isLocationCorrect: true })
          } else {
            that.setData({ isLocationCorrect: false })
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const res: any = await request(
      '/api/attendance/currentLesson',
      HttpMethod.GET
    )
    if (res.data?.errno === 0 && res.data.data.currentLesson) {
      this.setData({
        currentLesson: res.data.data.currentLesson
      })
      console.log(this.data.currentLesson)
    }
  }
})
