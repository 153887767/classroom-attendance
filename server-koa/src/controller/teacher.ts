import { getTeacherId, createTeacher } from '../services/teacher'
import { SuccessModel, ErrorModel } from '../utils/resModel'
import { errorInfo } from '../constants/errorInfo'
import { TeacherInfo } from '../typings/interfaces/teacher'
import { md5 } from '../utils/md5'

/**
 * 注册教师用户
 */
const register = async ({ userName, password }: TeacherInfo) => {
  const id = await getTeacherId(userName)
  if (id !== null) {
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

export { register }
