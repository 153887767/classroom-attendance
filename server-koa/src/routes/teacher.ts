/**
 * 教师注册、登录、退出
 */
import Router from 'koa-router'
import { register } from '../controller/teacher'
import { TeacherInfo } from '../typings/interfaces/teacher'

const router = new Router()

router.prefix('/api/teacher')

router.post('/register', async (ctx) => {
  const { userName, password } = ctx.request.body as TeacherInfo
  ctx.body = await register({
    userName,
    password
  })
})

export default router
