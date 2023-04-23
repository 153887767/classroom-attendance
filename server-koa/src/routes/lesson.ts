/**
 * 教师课程管理
 */
import { Context } from 'koa'
import Router from 'koa-router'
import { addLesson, delLesson, getLessons } from '../controller/lesson'
import { ILesson } from '../typings/interfaces/lesson'

const router = new Router()

// 添加课程
router.post('/add', async (ctx: Context) => {
  const lessonInfo = Object.assign(
    ctx.request.body as Omit<ILesson, 'teacherId'>,
    {
      teacherId: ctx.teacherInfo.id
    }
  )
  ctx.body = await addLesson(lessonInfo)
})

// 删除课程
router.post('/delete', async (ctx: Context) => {
  const { id } = ctx.request.body as { id: number }
  ctx.body = await delLesson(id, ctx.teacherInfo.id)
})

// 获取课程列表
router.get('/getList', async (ctx: Context) => {
  ctx.body = await getLessons(ctx.teacherInfo.id)
})

export default router
