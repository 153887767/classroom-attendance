import { Lesson } from '../db/model'
import { ILesson } from '../typings/interfaces/lesson'

/**
 * 创建课程
 */
const createLesson = async ({
  lessonName,
  teacherId,
  dateRange,
  day,
  time,
  location
}: ILesson) => {
  const result = await Lesson.create({
    lessonName,
    teacherId,
    dateRange,
    day,
    time,
    location
  })
  return result.dataValues
}

/**
 * 删除课程
 */
const deleteLesson = async (id: number, teacherId?: number) => {
  const whereOpt = {
    id
  }
  if (teacherId) {
    Object.assign(whereOpt, { teacherId })
  }
  const result = await Lesson.destroy({
    where: whereOpt
  })
  return result > 0
}

/**
 * 根据教师ID获取所有课程
 */
const getLessonsByTeacherId = async (teacherId: number) => {
  const result = await Lesson.findAndCountAll({
    order: ['id'],
    attributes: [
      'id',
      'lessonName',
      'teacherId',
      'dateRange',
      'day',
      'time',
      'location'
    ],
    where: {
      teacherId
    }
  })
  return {
    count: result.count,
    lessonList: result.rows.map((item) => item.dataValues)
  }
}

export { createLesson, deleteLesson, getLessonsByTeacherId }
