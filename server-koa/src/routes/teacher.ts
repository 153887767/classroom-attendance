/**
 * 教师注册、登录、获取教师信息
 */
import { Context } from 'koa'
import Router from 'koa-router'
import { ITeacherLoginInfo } from '../typings/interfaces/teacher'
import { register, login, getInfo } from '../controller/teacher'

const router = new Router()

// 注册
router.post('/register', async (ctx) => {
  const { userName, password } = ctx.request.body as ITeacherLoginInfo
  ctx.body = await register({
    userName,
    password
  })
})

// 登录
router.post('/login', async (ctx) => {
  const { userName, password } = ctx.request.body as ITeacherLoginInfo
  ctx.body = await login(ctx, userName, password)
})

// 信息
router.get('/getInfo', async (ctx: Context) => {
  ctx.body = await getInfo(ctx.teacherInfo)
})

export default router
