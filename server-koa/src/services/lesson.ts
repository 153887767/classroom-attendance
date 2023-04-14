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
const deleteLesson = async (id: number) => {
  const result = await Lesson.destroy({
    where: {
      id
    }
  })
  return result > 0
}

/**
 * 根据教师ID获取所有课程
 */
const getLessonsByTeacherId = async (teacherId: number) => {
  const result = await Lesson.findAndCountAll({
    order: ['id'],
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

// TODO 删除测试
// createLesson({
//   lessonName: '并行计算',
//   teacherId: 2,
//   dateRange: '2023-04-03~2023-06-23',
//   day: '1,3',
//   time: '17:50~18:30',
//   location: '新校'
// }).then(console.log)

// createLesson({
//   lessonName: '并行计算',
//   teacherId: 2,
//   dateRange: '2023-04-03~2023-06-23',
//   day: '1,3',
//   time: '17:50~18:30',
//   location: '新校'
// }).then(console.log)

// deleteLesson(2).then(console.log)

// getLessonsByTeacherId(1).then(console.log)
