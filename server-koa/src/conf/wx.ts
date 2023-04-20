// 小程序 appId
const appId = 'wx6a5ef8eeb13a9d86'
// 小程序 appSecret
const appSecret = '9229ac157d9f7266270554e3a2403552'
// 小程序登录 url
const loginUrl =
  'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code '

export { appId, appSecret, loginUrl }
