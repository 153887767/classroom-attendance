import Koa from 'koa' // 使用 import 才有类型提示，require 不行
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import json from 'koa-json'
import logger from 'koa-logger'

import index from './routes/index'
import teacherRouter from './routes/teacher'

const app = new Koa()

onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json()) // 把json字符串转为json对象
app.use(logger())

// logger
app.use(async (ctx: Koa.Context, next: Koa.Next) => {
  const start = new Date()
  await next()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ms = (new Date() as any) - (start as any)
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes())
app.use(index.allowedMethods())
app.use(teacherRouter.routes())
app.use(teacherRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
