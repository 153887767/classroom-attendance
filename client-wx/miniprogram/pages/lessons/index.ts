Page({
  data: {},

  handleScanCode() {
    wx.scanCode({
      scanType: ['qrCode'],
      success(res) {
        console.log(res.result)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {}
})
