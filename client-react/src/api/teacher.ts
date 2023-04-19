/**
 * 教师登录、注册、获取信息
 */
import { post, get } from '@/service'
import { ITeacherInfo, ITeacherLoginInfo } from '@/typings/interfaces/teacher'

export const login = (params: ITeacherLoginInfo) => {
  return post<object>('/api/teacher/login', {
    userName: params.userName,
    password: params.password
  })
}

export const register = (params: ITeacherLoginInfo) => {
  return post<object>('/api/teacher/register', {
    userName: params.userName,
    password: params.password
  })
}

export const getUserInfo = () => {
  return get<ITeacherInfo>('/api/teacher/getInfo')
}
