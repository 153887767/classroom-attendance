import { request, HttpMethod } from '../../utils/request'

Page({
  data: {
    count: 0, // 课程总数
    lessonList: [] // 课程列表
  },

  /**
   * 扫描课程二维码加入课程
   */
  handleScanCode() {
    const that = this
    wx.scanCode({
      scanType: ['qrCode'],
      async success(res) {
        const result: any = await request(
          '/api/student/selectLesson',
          HttpMethod.POST,
          {
            lessonId: res.result
          }
        )
        if (result.data?.errno === 0) {
          const { count, lessonList } = result.data.data
          that.setData({ count, lessonList })
          wx.showToast({
            title: '加入课程成功',
            icon: 'success',
            duration: 1000
          })
        }
      }
    })
  },

  /**
   * 请求列表数据
   */
  getLessonsList() {
    return request('/api/student/lessonsList', HttpMethod.GET).then(
      (res: any) => {
        if (res.data?.errno === 0) {
          const { count, lessonList } = res.data.data
          this.setData({ count, lessonList })
        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getLessonsList()
  },

  /**
   * 下拉刷新
   */
  async onPullDownRefresh() {
    await this.getLessonsList()
    wx.stopPullDownRefresh()
  }
})
