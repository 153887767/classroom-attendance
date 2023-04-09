import fs from 'fs'

/**
 * 获取文件base64编码
 * @param string  path 文件路径
 * @return string base64编码信息，不带文件头
 */
export function getFileContentAsBase64(path: string) {
  try {
    return fs.readFileSync(path, { encoding: 'base64' })
  } catch (err: any) {
    throw new Error(err)
  }
}
