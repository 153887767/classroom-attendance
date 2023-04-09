import { post } from '../request'
import { getAccessToken } from '../utils/accessToken'

/**
 * 判断两张图片是否是同一个人脸
 */
export const faceRecognition = async (
  image1: string,
  image2: string,
  image1_type = 'BASE64',
  image2_type = 'BASE64'
) => {
  const url = `https://aip.baidubce.com/rest/2.0/face/v3/match?access_token=${await getAccessToken()}`
  const res = await post<Record<string, any>>(
    url,
    JSON.stringify([
      {
        image: image1,
        image_type: image1_type
      },
      {
        image: image2,
        image_type: image2_type
      }
    ])
  )
  // 人脸相似度得分，推荐阈值80分
  const score: number | undefined = res?.result?.score
  return !!score && score > 80
}

// 测试
// import { getFileContentAsBase64 } from '../utils/base64'
// faceRecognition(
//   getFileContentAsBase64('../../images/test1.png'),
//   getFileContentAsBase64('../../images/test2.png')
// ).then((res) => {
//   console.log(res)
// })
