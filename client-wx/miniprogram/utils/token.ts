export const getToken = () => `Bearer ${wx.getStorageSync('token')}`
