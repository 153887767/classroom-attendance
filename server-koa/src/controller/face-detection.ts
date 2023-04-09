import { post } from '../request'
import { getAccessToken } from '../utils/accessToken'

/**
 * 判断图像中是否仅存在1张人脸
 */
export const faceDetection = async (image: string, image_type = 'BASE64') => {
  const url = `https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=${await getAccessToken()}`
  const res = await post<Record<string, any>>(url, {
    image,
    image_type,
    max_face_num: 10
  })
  // 人脸数量
  const face_num: number | undefined = res?.result?.face_num
  // 人脸置信度，范围【0~1】，代表这是一张人脸的概率，0最小、1最大
  const face_probability: number | undefined =
    res?.result?.face_list?.[0]?.face_probability
  // 当且仅当人脸数量为1且人脸置信度大于0.7时，返回true
  return face_num === 1 && !!face_probability && face_probability > 0.7
}

// 测试
// import { getFileContentAsBase64 } from '../utils/base64'
// faceDetection(getFileContentAsBase64('../../images/test1.png')).then((res) =>
//   console.log('是否是人脸', res)
// )
