import { Context } from 'koa'
import { getTeacherInfo, createTeacher } from '../services/teacher'
import { SuccessModel, ErrorModel } from '../utils/resModel'
import { errorInfo } from '../constants/errorInfo'
import { TeacherInfo } from '../typings/interfaces/teacher'
import { md5 } from '../utils/md5'
import { JWT } from '../utils/JWT'

/**
 * 注册教师用户
 */
const register = async ({ userName, password }: TeacherInfo) => {
  const info = await getTeacherInfo(userName)
  if (info !== null) {
    // 用户已存在
    return new ErrorModel(errorInfo.registerUserNameExistInfo)
  }
  try {
    await createTeacher({ userName, password: md5(password) })
    return new SuccessModel()
  } catch (err: any) {
    console.error(err.message, err.stack)
    return new ErrorModel(errorInfo.registerFailInfo)
  }
}

/**
 * 教师登录
 */
const login = async (ctx: Context, userName: string, password: string) => {
  if (!password) {
    return new ErrorModel(errorInfo.loginFailInfo)
  }
  const info = await getTeacherInfo(userName, md5(password))
  if (!info) {
    return new ErrorModel(errorInfo.loginFailInfo)
  }
  // JWT
  const token = JWT.generate(
    {
      _id: info.id,
      userName: info.userName
    },
    '6h'
  )
  ctx.set('Authorization', token)
  return new SuccessModel()
}

/**
 * 查询教师信息
 */
const getInfo = async (token?: string) => {
  const payload = JWT.verify(token || '') as any

  if (payload) {
    return new SuccessModel({
      userName: payload.userName,
      id: payload._id
    })
  } else {
    return new ErrorModel(errorInfo.tokenFailInfo)
  }
}

export { register, login, getInfo }
