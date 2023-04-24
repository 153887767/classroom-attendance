/**
 * 学生考勤
 */
import { Context } from 'koa'
import Router from 'koa-router'
import { getCurrentLesson } from '../controller/attendance'
import { faceRecognitionUpload } from '../middlewares/multer'
import { attendance } from '../controller/attendance'

const router = new Router()

// 获取当前正在上课或开课时间小于10分钟的课程
router.get('/currentLesson', async (ctx: Context) => {
  ctx.body = await getCurrentLesson(ctx.studentInfo.studentId)
})

/**
 * 人脸识别考勤
 */
router.post(
  '/faceRecognition',
  faceRecognitionUpload.single('faceImg'), // 请求参数为 faceImg
  async (ctx: Context) => {
    const { lessonId } = ctx.request.body as { lessonId: number }
    ctx.body = await attendance(
      ctx.studentInfo.studentId,
      lessonId,
      ctx.file.filename
    )
  }
)

export default router
