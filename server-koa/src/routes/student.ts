import { Context } from 'koa'
import Router from 'koa-router'
import {
  codeToToken,
  changeUserName,
  changeStudentNumber,
  getInfo
} from '../controller/student'

const router = new Router()

router.prefix('/api/student')

// 自动注册&登录
router.post('/login', async (ctx) => {
  const { code } = ctx.request.body as { code: string }
  ctx.body = await codeToToken(code)
})

// 修改姓名
router.post('/userName', async (ctx: Context) => {
  const { userName } = ctx.request.body as { userName: string }
  ctx.body = await changeUserName(ctx.studentInfo.studentId, userName)
})

// 修改学号
router.post('/studentNumber', async (ctx: Context) => {
  const { studentNumber } = ctx.request.body as { studentNumber: string }
  ctx.body = await changeStudentNumber(ctx.studentInfo.studentId, studentNumber)
})

// 获取学生信息
router.get('/getInfo', async (ctx: Context) => {
  ctx.body = await getInfo(ctx.studentInfo.studentId)
})

export default router
