/**
 * 教师考勤管理
 */
import { Context } from 'koa'
import Router from 'koa-router'
import { getCurrentLesson, getAttendanceInfo } from '../controller/statistics'

const router = new Router()

// 获取当前正在上课或开课时间小于10分钟的课程
router.get('/currentLesson', async (ctx: Context) => {
  ctx.body = await getCurrentLesson(ctx.teacherInfo.id)
})

// 获取课堂考勤情况
router.get('/attendance', async (ctx: Context) => {
  ctx.body = await getAttendanceInfo(
    ctx.teacherInfo.id,
    Number(ctx.query.lessonId)
  )
})

export default router
