import { Teacher } from '../db/model'
import { ITeacherLoginInfo } from '../typings/interfaces/teacher'

/**
 * 查询教师信息(id和userName), 不存在则返回null
 */
const getTeacherInfo = async (userName: string, password?: string) => {
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }
  const result = await Teacher.findOne({
    attributes: ['id', 'userName'],
    where: whereOpt
  })
  if (result === null) {
    return null
  }
  return result.dataValues
}

/**
 * 创建教师
 */
const createTeacher = async ({ userName, password }: ITeacherLoginInfo) => {
  const result = await Teacher.create({
    userName,
    password
  })
  return result.dataValues
}

export { getTeacherInfo, createTeacher }
