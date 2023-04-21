import { post } from '../request'
import { AK, SK } from '../conf/secretKeys'

const URL = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${AK}&client_secret=${SK}`

/**
 * 百度人脸识别服务
 * 使用 AK，SK 生成鉴权签名（Access Token）
 * @return string 鉴权签名信息（Access Token）
 */
export async function getAccessToken() {
  const res = await post<{ access_token: string }>(URL)
  return res?.access_token
}
