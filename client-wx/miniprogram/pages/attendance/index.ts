import { request, HttpMethod } from '../../utils/request'

Page({
  data: {
    currentLesson: null
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
      console.log(res)
      this.setData({
        currentLesson: res.data.data.currentLesson
      })
    }
  }
})
