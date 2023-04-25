import { get } from '@/service/index'
import {
  ICurrentLesson,
  IAttendanceInfo
} from '@/typings/interfaces/statistics'

export const getCurrentLesson = () => {
  return get<ICurrentLesson>('/api/statistics/currentLesson')
}

export const getAttendanceInfo = (lessonId: number) => {
  return get<IAttendanceInfo>(`/api/statistics/attendance?lessonId=${lessonId}`)
}
