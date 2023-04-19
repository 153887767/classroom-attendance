import {
  createLesson,
  deleteLesson,
  getLessonsByTeacherId
} from '../services/lesson'
import { ILesson } from '../typings/interfaces/lesson'
import { ErrorModel, SuccessModel } from '../utils/resModel'
import { errorInfo } from '../constants/errorInfo'

/**
 * 添加课程
 */
const addLesson = async (lessonInfo: ILesson) => {
  try {
    await createLesson(lessonInfo)
    return new SuccessModel()
  } catch (err: any) {
    console.error(err.message, err.stack)
    return new ErrorModel(errorInfo.createLessonFailInfo)
  }
}

/**
 * 删除课程
 */
const delLesson = async (id: number, teacherId: number) => {
  const result = await deleteLesson(id, teacherId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(errorInfo.deleteLessonFailInfo)
}

/**
 * 获取课程
 */
const getLessons = async (teacherId: number) => {
  const result = await getLessonsByTeacherId(teacherId)
  result.lessonList = result.lessonList.map((item) => ({
    ...item,
    day: item.day.split(',').map((i: string) => Number(i))
  }))
  return new SuccessModel(result)
}

export { addLesson, delLesson, getLessons }
