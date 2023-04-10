import { Teacher } from '../db/model'
import { TeacherInfo } from '../typings/interfaces/teacher'

/**
 * 查询教师id, 不存在则返回null
 */
const getTeacherId = async (userName: string) => {
  const result = await Teacher.findOne({
    attributes: ['id'],
    where: {
      userName
    }
  })
  if (result === null) {
    return null
  }
  return result.dataValues.id
}

/**
 * 创建教师
 */
const createTeacher = async ({ userName, password }: TeacherInfo) => {
  const result = await Teacher.create({
    userName,
    password
  })
  return result.dataValues
}

export { getTeacherId, createTeacher }
