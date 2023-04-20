import util from 'util'
import axios from 'axios'
import { appId, appSecret, loginUrl } from '../conf/wx'
import { getStudentByOpenid, registerByOpenid } from '../services/student'
import { JWT } from '../utils/JWT'
import { ErrorModel, SuccessModel } from '../utils/resModel'
import { errorInfo } from '../constants/errorInfo'

/**
 * 通过 code 换取 openid, 并生成 token
 */
export const codeToToken = async (code: string) => {
  const url = util.format(loginUrl, appId, appSecret, code)
  const result = await axios.get(url)

  if (result.status !== 200) {
    // throw new Error('openid获取失败')
    return new ErrorModel(errorInfo.getOpenIdFailInfo)
  }
  const errcode = result.data.errcode
  if (errcode) {
    // throw new Error(`openid获取失败: ${result.data.errmsg}`)
    return new ErrorModel(errorInfo.getOpenIdFailInfo)
  }

  let student = await getStudentByOpenid(result.data.openid)
  if (!student) {
    // 如果不存在，则注册
    student = await registerByOpenid(result.data.openid)
  }

  const token = JWT.generate(
    {
      id: student.id,
      userName: student.userName
    },
    '30 days'
  )
  return new SuccessModel({ token })
}
