/**
 * 教师登录、注册、退出接口
 */
import { post } from '../service'
import { TeacherInfo } from '../typings/interfaces/teacher'

export const login = (params: TeacherInfo) => {
  return post<object>('/api/teacher/login', {
    userName: params.userName,
    password: params.password
  })
}

export const register = (params: TeacherInfo) => {
  return post<object>('/api/teacher/register', {
    userName: params.userName,
    password: params.password
  })
}
