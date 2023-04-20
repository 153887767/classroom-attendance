import Router from 'koa-router'
import { codeToToken } from '../controller/student'

const router = new Router()

router.prefix('/api/student')

// 自动注册&登录
router.post('/login', async (ctx) => {
  const { code } = ctx.request.body as { code: string }
  ctx.body = await codeToToken(code)
})

export default router
