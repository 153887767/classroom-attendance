import { get } from '../request'
import { LOCATION_KEY } from '../conf/secretKeys'

/**
 * 地点关键词输入提示
 */
export const locationPrompt = async (keyword: string) => {
  const res = await get(
    `https://restapi.amap.com/v3/assistant/inputtips?key=${LOCATION_KEY}&keywords=${keyword}`
  )
  return res
}

/**
 * 两地距离测量, 单位为米
 */
export const getDistance = async (origins: string, destination: string) => {
  const res = await get(
    `https://restapi.amap.com/v3/distance?key=${LOCATION_KEY}&type=0&origins=${origins}&destination=${destination}`
  )
  return res
}

// 测试
// locationPrompt('中南大学新校区A座502').then(console.log)
// getDistance('112.941729,28.150296', '112.941586,28.149044').then(console.log)
