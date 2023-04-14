/**
 * 教师注册、登录、获取教师信息
 */
import Router from 'koa-router'
import { TeacherInfo } from '../typings/interfaces/teacher'
import { register, login, getInfo } from '../controller/teacher'

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

// 信息
router.get('/getInfo', async (ctx) => {
  const token = ctx.headers.authorization?.split(' ')[1]
  ctx.body = await getInfo(token)
})

export default router
