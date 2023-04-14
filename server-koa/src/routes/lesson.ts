import { Context } from 'koa'
import Router from 'koa-router'
import { addLesson, delLesson, getLessons } from '../controller/lesson'
import { ILesson } from '../typings/interfaces/lesson'

const router = new Router()

router.prefix('/api/lesson')

// 添加课程
router.post('/add', async (ctx) => {
  const lessonInfo = ctx.request.body as ILesson
  ctx.body = await addLesson(lessonInfo)
})

// 删除课程
router.post('/delete', async (ctx) => {
  const { id } = ctx.request.body as { id: number }
  ctx.body = await delLesson(id)
})

// 获取课程列表
router.get('/getList', async (ctx: Context) => {
  ctx.body = await getLessons(ctx.teacherInfo.id)
})

export default router
