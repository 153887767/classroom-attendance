import { SelectRelation, Lesson, Teacher } from '../db/model'

/**
 * 学生id绑定课程id
 */
const createSelectRelation = async (studentId: number, lessonId: number) => {
  const result = await SelectRelation.create({
    studentId,
    lessonId,
    count: 0
  })
  return result.dataValues
}

/**
 * 学生是否选过此课程
 */
const isLessonSelected = async (studentId: number, lessonId: number) => {
  const result = await SelectRelation.findOne({
    where: {
      studentId,
      lessonId
    }
  })
  return result !== null
}

/**
 * 通过学生id查询所选课程信息
 */
const getLessonsByStudentId = async (studentId: number) => {
  // 学生id => 课程id => 课程信息 => 教师id => 教师信息
  const result = await SelectRelation.findAndCountAll({
    order: [['id', 'DESC']],
    include: [
      {
        model: Lesson,
        attributes: [
          'id',
          'lessonName',
          'dateRange',
          'day',
          'time',
          'location',
          'geocode'
        ],
        include: [
          {
            model: Teacher,
            attributes: ['userName']
          }
        ]
      }
    ],
    where: {
      studentId
    }
  })
  return {
    count: result.count,
    lessonList: result.rows.map((item) => ({
      ...(item as any).lesson.dataValues,
      teacher: (item as any).lesson.teacher.dataValues.userName,
      attendanceDays: item.dataValues.count // 出勤次数
    }))
  }
}

export { createSelectRelation, isLessonSelected, getLessonsByStudentId }
