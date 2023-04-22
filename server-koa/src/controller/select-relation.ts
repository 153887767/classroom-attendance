import {
  isLessonSelected,
  createSelectRelation,
  getLessonsByStudentId
} from '../services/select-relation'
import { errorInfo } from '../constants/errorInfo'
import { SuccessModel, ErrorModel } from '../utils/resModel'

/**
 * 学生选课
 */
export const selectLesson = async (studentId: number, lessonId: number) => {
  const isSelected = await isLessonSelected(studentId, lessonId)
  if (isSelected) {
    // 选过，无需再选
    return new SuccessModel()
  }
  try {
    await createSelectRelation(studentId, lessonId)
    return new SuccessModel()
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
