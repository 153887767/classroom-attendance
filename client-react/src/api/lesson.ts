import { get, post } from '@/service/index'
import { ILesson, ILessonList } from '@/typings/interfaces/lesson'

export const addLesson = (params: ILesson) => {
  return post<object>('/api/lesson/add', params)
}

export const delLesson = (params: { id: number }) => {
  return post<object>('/api/lesson/delete', params)
}

export const getLessons = () => {
  return get<ILessonList>('/api/lesson/getList')
}
