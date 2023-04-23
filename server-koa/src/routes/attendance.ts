/**
 * 学生考勤
 */
import { Context } from 'koa'
import Router from 'koa-router'
import { getCurrentLesson } from '../controller/attendance'

const router = new Router()

// 获取当前正在上课或开课时间小于10分钟的课程
router.get('/currentLesson', async (ctx: Context) => {
  ctx.body = await getCurrentLesson(ctx.studentInfo.studentId)
})

export default router
