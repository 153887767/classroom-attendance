import dayjs from 'dayjs'
import { SelectRelation, Lesson, Teacher, Student } from '../db/model'

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
      attendanceDays: item.dataValues.count, // 出勤次数
      lastAttendance: item.dataValues.lastAttendance // 最后一次考勤的时间
    }))
  }
}

/**
 * 学生考勤签到
 */
const addCount = async (studentId: number, lessonId: number) => {
  const relationInfo = await SelectRelation.findOne({
    where: {
      studentId,
      lessonId
    }
  })
  if (!relationInfo) {
    return false
  }

  const lastAttendance = relationInfo.dataValues.lastAttendance
  if (dayjs().isSame(dayjs(lastAttendance), 'day')) {
    // 今天考勤过了，不能再次考勤
    return false
  }

  const count = relationInfo.dataValues.count
  const result = await SelectRelation.update(
    {
      count: count + 1,
      lastAttendance: new Date()
    },
    {
      where: {
        studentId,
        lessonId
      }
    }
  )
  return result[0] > 0
}

/**
 * 通过课程id查找选课的学生及其考勤情况
 */
const getStudentsByLessonId = async (lessonId: number) => {
  const result = await SelectRelation.findAndCountAll({
    attributes: ['count', 'lastAttendance'],
    include: [
      {
        model: Student,
        attributes: ['id', 'userName', 'studentNumber', 'faceImg']
      }
    ],
    where: {
      lessonId
    }
  })
  return {
    count: result.count,
    list: result.rows.map((item) => {
      return {
        ...(item as any).student.dataValues,
        count: item.dataValues.count,
        lastAttendance: item.dataValues.lastAttendance
      }
    })
  }
}

export {
  createSelectRelation,
  isLessonSelected,
  getLessonsByStudentId,
  addCount,
  getStudentsByLessonId
}
