/**
 * 教师考勤管理
 */
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

import { getLessonsByTeacherId } from '../services/lesson'
import { getStudentsByLessonId } from '../services/select-relation'
import { SuccessModel } from '../utils/resModel'

dayjs.extend(isBetween)

/**
 * 根据教师id获取当前正在上课或开课时间小于10分钟的课程
 */
export const getCurrentLesson = async (teacherId: number) => {
  const { lessonList } = await getLessonsByTeacherId(teacherId)
  let day = dayjs().day()
  if (day === 0) {
    day = 7
  }
  const dayFormat = dayjs().format('YYYY-MM-DD')
  const currentLesson = lessonList.find((item) => {
    const [startDate, endDate] = item.dateRange.split('~')
    const [startTime, endTime] = item.time.split('~')
    const dayArr = item.day.split(',')
    const diffMinutes = dayjs().diff(dayFormat + startTime, 'minute')
    // 今天在上课周期之间 && 今天的星期是上课的星期 && (现在是上课时间 || 现在是课前10分钟)
    return (
      dayjs().isBetween(startDate, endDate, 'day', '[]') &&
      dayArr.includes(String(day)) &&
      (dayjs().isBetween(
        dayFormat + startTime,
        dayFormat + endTime,
        'minute',
        '[]'
      ) ||
        (diffMinutes <= 0 && diffMinutes >= -10))
    )
  })
  // 如果当前没有课程，则currentLesson为undefined
  return new SuccessModel({ ...currentLesson })
}

/**
 * 通过课程id查找选课的学生及其考勤情况
 */
export const getAttendanceInfo = async (lessonId: number) => {
  const result = await getStudentsByLessonId(lessonId)
  return new SuccessModel(result)
}
