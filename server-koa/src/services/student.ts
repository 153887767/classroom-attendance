import { Student } from '../db/model'
import { IStudentInfo } from '../typings/interfaces/student'

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
    userName,
    userNameModified: false,
    studentNumberModified: false
  })
  return result.dataValues
}

/**
 * 修改姓名、学号、头像、人脸
 */

const updateStudent = async (
  id: number,
  { userName, studentNumber, avatar, faceImg }: Partial<IStudentInfo>
) => {
  const updateData: Partial<IStudentInfo> = {}
  if (userName) {
    updateData.userName = userName
    updateData.userNameModified = true
  }
  if (studentNumber) {
    updateData.studentNumber = studentNumber
    updateData.studentNumberModified = true
  }
  if (avatar) {
    updateData.avatar = avatar
  }
  if (faceImg) {
    updateData.faceImg = faceImg
  }
  const result = await Student.update(updateData, {
    where: { id }
  })
  return result[0] > 0
}

/**
 * 通过 id 获取学生信息
 */
const getStudentById = async (id: number) => {
  const result = await Student.findOne({
    where: {
      id
    }
  })
  if (result === null) {
    return null
  }
  return result.dataValues
}

export { getStudentByOpenid, registerByOpenid, updateStudent, getStudentById }
