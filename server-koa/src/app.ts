import Koa from 'koa' // 使用 import 才有类型提示，require 不行
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import json from 'koa-json'
import logger from 'koa-logger'
import cors from 'koa2-cors'

import { jwtVerify } from './middlewares/jwtVerify'

import index from './routes/index'
import teacherRouter from './routes/teacher'
import lessonRouter from './routes/lesson'
import locationRouter from './routes/location'
import studentRouter from './routes/student'
import attendanceRouter from './routes/attendance'

const app = new Koa()

onerror(app)

// middlewares
app.use(
  cors({
    origin: function (ctx) {
      return 'http://localhost:3000'
    },
    // maxAge指定本次预请求的有效期，单位为秒 (Access-Control-Max-Age)
    // 由于跨域，如果不设置maxAge, 前端每次都会发两个请求，其中一个是预请求，请求类型是options
    // 设置了maxAge, 只有过期了才需要重新发送预请求
    maxAge: 3600,
    // Access-Control-Expose-Headers, 自定义响应头
    // 允许服务器指示那些响应头可以暴露给浏览器中运行的脚本，以响应跨源请求
    // 没配置的话，前端axios response.headers 里没有 Authorization
    exposeHeaders: ['Authorization']
  })
)
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

app.use(
  jwtVerify([
    /^\/api\/teacher\/login$/,
    /^\/api\/teacher\/register$/,
    /^\/api\/student\/login$/
  ])
)

// routes
app.use(index.routes())
app.use(index.allowedMethods())
app.use(teacherRouter.routes())
app.use(teacherRouter.allowedMethods())
app.use(lessonRouter.routes())
app.use(lessonRouter.allowedMethods())
app.use(locationRouter.routes())
app.use(locationRouter.allowedMethods())
app.use(studentRouter.routes())
app.use(studentRouter.allowedMethods())
app.use(attendanceRouter.routes())
app.use(attendanceRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
