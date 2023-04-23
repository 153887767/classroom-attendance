/**
 * 学生考勤
 */
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { getLessonsByStudentId } from '../services/select-relation'
import { SuccessModel } from '../utils/resModel'

dayjs.extend(isBetween)

/**
 * 获取当前正在上课或开课时间小于10分钟的课程
 */
const getCurrentLesson = async (studentId: number) => {
  const { lessonList } = await getLessonsByStudentId(studentId)
  let day = dayjs().day()
  if (day === 0) {
    day = 7
  }

  const dayFormat = dayjs().format('YYYY-MM-DD')

  for (let i = 0; i < lessonList.length; i++) {
    const [startDate, endDate] = lessonList[i].dateRange.split('~')
    const [startTime, endTime] = lessonList[i].time.split('~')
    const dayArr = lessonList[i].day.split(',')
    const diffMinutes = dayjs().diff(dayFormat + startTime, 'minute')
    if (
      dayjs().isBetween(startDate, endDate, 'day', '[]') &&
      dayArr.includes(String(day)) &&
      (dayjs().isBetween(
        dayFormat + startTime,
        dayFormat + endTime,
        'minute',
        '[]'
      ) ||
        (diffMinutes <= 0 && diffMinutes >= -10))
    ) {
      // 今天在上课周期之间 && 今天的星期是上课的星期 && (现在是上课时间 || 现在是课前10分钟)
      return new SuccessModel({
        currentLesson: lessonList[i]
      })
    }
  }
  return new SuccessModel()
}

export { getCurrentLesson }
