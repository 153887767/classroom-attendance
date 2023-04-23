import {
  isLessonSelected,
  createSelectRelation,
  getLessonsByStudentId
} from '../services/select-relation'
import { errorInfo } from '../constants/errorInfo'
import { SuccessModel, ErrorModel } from '../utils/resModel'

/**
 * 学生选课，并返回选课列表
 */
export const selectLesson = async (studentId: number, lessonId: number) => {
  const isSelected = await isLessonSelected(studentId, lessonId)
  if (isSelected) {
    // 选过，无需再选
    const lessonsList = await getLessonsByStudentId(studentId)
    return new SuccessModel(lessonsList)
  }
  try {
    await createSelectRelation(studentId, lessonId)
    const lessonsList = await getLessonsByStudentId(studentId)
    return new SuccessModel(lessonsList)
  } catch (error) {
    return new ErrorModel(errorInfo.selectLessonFailInfo)
  }
}

/**
 * 查询学生选课列表
 */
export const getLessons = async (studentId: number) => {
  const result = await getLessonsByStudentId(studentId)
  return new SuccessModel(result)
}
