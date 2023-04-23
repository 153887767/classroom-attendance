import dayjs from 'dayjs'
import {
  isLessonSelected,
  createSelectRelation,
  getLessonsByStudentId
} from '../services/select-relation'
import { errorInfo } from '../constants/errorInfo'
import { SuccessModel, ErrorModel } from '../utils/resModel'
import { getClassDays } from '../utils/day'

/**
 * 学生选课，并返回选课列表
 */
export const selectLesson = async (studentId: number, lessonId: number) => {
  const isSelected = await isLessonSelected(studentId, lessonId)
  if (isSelected) {
    // 选过，无需再选
    return await getLessons(studentId)
  }
  try {
    await createSelectRelation(studentId, lessonId)
    return await getLessons(studentId)
  } catch (error) {
    return new ErrorModel(errorInfo.selectLessonFailInfo)
  }
}

/**
 * 查询学生选课列表
 */
export const getLessons = async (studentId: number) => {
  const result = await getLessonsByStudentId(studentId)
  result.lessonList = result.lessonList.map((item) => {
    const [start, end] = item.dateRange.split('~')
    const days = item.day.split(',')
    const totalDays = getClassDays(start, end, days)
    const teachingDays = getClassDays(start, dayjs().format('YYYY-MM-DD'), days)
    return {
      ...item,
      totalDays, // 总共需要上课的次数
      teachingDays: teachingDays <= totalDays ? teachingDays : totalDays // 已经授课的次数
    }
  })
  return new SuccessModel(result)
}
