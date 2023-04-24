/**
 * 学生考勤
 */
import path from 'path'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import fse from 'fs-extra'

import { errorInfo } from '../constants/errorInfo'
import { getLessonsByStudentId, addCount } from '../services/select-relation'
import { getStudentById } from '../services/student'
import { SuccessModel, ErrorModel } from '../utils/resModel'
import { getImageBase64FromUrl, getFileContentAsBase64 } from '../utils/base64'
import { faceRecognition } from '../utils/face'

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

/**
 * 学生人脸识别考勤，对比人脸相似度
 */
const attendance = async (
  studentId: number,
  lessonId: number,
  uploadFilename: string
) => {
  const filePath = path.join(
    __dirname,
    '../../upload/faceRecognition',
    uploadFilename
  )
  const uploadFileBase64 = getFileContentAsBase64(filePath)
  // 获取图片base64后，删除上传到upload/faceRecognition的人脸图片
  await fse.remove(filePath)

  const studentInfo = await getStudentById(studentId)
  if (studentInfo === null) {
    return new ErrorModel(errorInfo.getUserInfoFailInfo)
  }
  if (!studentInfo.faceImg) {
    // 没有上传过人脸图像
    return new ErrorModel(errorInfo.getfaceImgFailInfo)
  }
  const faceImgBase64 = await getImageBase64FromUrl(studentInfo.faceImg)

  // 人脸对比
  const isSameFace = await faceRecognition(faceImgBase64, uploadFileBase64)
  if (!isSameFace) {
    // 不是同一个人脸
    return new ErrorModel(errorInfo.faceRecognitionFailInfo)
  }

  // 考勤次数+1
  const result = await addCount(studentId, lessonId)
  if (!result) {
    return new ErrorModel(errorInfo.attendanceFailInfo)
  }
  return new SuccessModel()
}

export { getCurrentLesson, attendance }
