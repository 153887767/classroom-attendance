/**
 * 教师注册、登录、退出
 */
import Router from 'koa-router'
import { TeacherInfo } from '../typings/interfaces/teacher'
import { register, login } from '../controller/teacher'

const router = new Router()

router.prefix('/api/teacher')

// 注册
router.post('/register', async (ctx) => {
  const { userName, password } = ctx.request.body as TeacherInfo
  ctx.body = await register({
    userName,
    password
  })
})

// 登录
router.post('/login', async (ctx) => {
  const { userName, password } = ctx.request.body as TeacherInfo
  ctx.body = await login(ctx, userName, password)
})

export default router
