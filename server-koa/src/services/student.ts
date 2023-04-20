import { Student } from '../db/model'

/**
 * 通过 openid 获取学生信息
 */
const getStudentByOpenid = async (openid: string) => {
  const result = await Student.findOne({
    where: {
      openid
    }
  })
  if (result === null) {
    return null
  }
  return result.dataValues
}

/**
 * 注册学生账号
 */
const registerByOpenid = async (openid: string) => {
  // 随机初始化用户名
  const userName = `stu_${Math.random().toString(16).substring(2, 10)}`
  const result = await Student.create({
    openid,
    userName
  })
  return result.dataValues
}

export { getStudentByOpenid, registerByOpenid }
