import util from 'util'
import axios from 'axios'
import { appId, appSecret, loginUrl } from '../conf/wx'
import {
  getStudentByOpenid,
  registerByOpenid,
  updateStudent,
  getStudentById
} from '../services/student'
import { JWT } from '../utils/JWT'
import { ErrorModel, SuccessModel } from '../utils/resModel'
import { errorInfo } from '../constants/errorInfo'
import { IFolder } from '../typings/interfaces/student'
import { put } from '../utils/oss'

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
      studentId: student.id,
      studentName: student.userName
    },
    '24h'
  )
  return new SuccessModel({ token })
}

/**
 * 修改姓名
 */
export const changeUserName = async (id: number, userName: string) => {
  const student = await getStudentById(id)
  if (student?.userNameModified) {
    // 姓名修改过，不允许再次修改
    return new ErrorModel(errorInfo.changeInfoFailInfo)
  }
  const result = await updateStudent(id, { userName })
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(errorInfo.changeInfoFailInfo)
}

/**
 * 修改学号
 */
export const changeStudentNumber = async (
  id: number,
  studentNumber: string
) => {
  const student = await getStudentById(id)
  if (student?.studentNumberModified) {
    // 学号修改过，不允许再次修改
    return new ErrorModel(errorInfo.changeInfoFailInfo)
  }
  const result = await updateStudent(id, { studentNumber })
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(errorInfo.changeInfoFailInfo)
}

/**
 * 查询学生信息
 */
export const getInfo = async (id: number) => {
  const result = await getStudentById(id)
  if (result) {
    return new SuccessModel({
      userName: result.userName,
      studentNumber: result.studentNumber ?? '',
      avatar: result.avatar ?? '',
      userNameModified: !!result.userNameModified,
      studentNumberModified: !!result.studentNumberModified,
      faceImg: result.faceImg ?? ''
    })
  }
  return new ErrorModel(errorInfo.getUserInfoFailInfo)
}

/**
 * 上传头像、人脸
 */
export const uploadImage = async (
  id: number,
  folder: IFolder,
  filename: string
) => {
  const url = await put(`/${folder}/${filename}`)
  if (url) {
    const result = await updateStudent(
      id,
      folder === 'avatar' ? { avatar: url } : { faceImg: url }
    )
    if (result) {
      return new SuccessModel({
        url
      })
    }
  }
  return new ErrorModel(errorInfo.changeInfoFailInfo)
}
