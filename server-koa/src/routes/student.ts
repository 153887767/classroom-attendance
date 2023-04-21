import { Context } from 'koa'
import Router from 'koa-router'
import {
  codeToToken,
  changeUserName,
  changeStudentNumber
} from '../controller/student'

const router = new Router()

router.prefix('/api/student')

// 自动注册&登录
router.post('/login', async (ctx) => {
  const { code } = ctx.request.body as { code: string }
  ctx.body = await codeToToken(code)
})

// 修改姓名
router.post('/username', async (ctx: Context) => {
  const { username } = ctx.request.body as { username: string }
  ctx.body = await changeUserName(ctx.studentInfo.studentId, username)
})

// 修改学号
router.post('/studentNumber', async (ctx: Context) => {
  const { studentNumber } = ctx.request.body as { studentNumber: string }
  ctx.body = await changeStudentNumber(ctx.studentInfo.studentId, studentNumber)
})

export default router
