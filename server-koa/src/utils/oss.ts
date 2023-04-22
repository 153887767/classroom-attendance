import OSS from 'ali-oss'
import path from 'path'
import { ALI_ACCESSKEY_ID, ALI_ACCESSKEY_SECRET } from '../conf/secretKeys'

/**
 * 阿里云对象存储 OSS
 */
const client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: ALI_ACCESSKEY_ID,
  accessKeySecret: ALI_ACCESSKEY_SECRET,
  bucket: 'caizhaojie'
})

/**
 * 上传资源，返回 url
 */
async function put(filePath: string) {
  try {
    const result = await client.put(
      filePath,
      path.join(__dirname, '../../upload', filePath)
    )
    return (result.res as any)?.requestUrls?.[0]
  } catch (e) {
    console.log(e)
  }
}

/**
 * 获取资源 url
 */
async function get(filePath: string) {
  try {
    const result = await client.get(filePath)
    return (result.res as any)?.requestUrls?.[0]
  } catch (e) {
    console.log(e)
  }
}

// 测试
// put('/face/test1.png').then(console.log)
// get('/face/test1.png').then(console.log)

export { put, get }
