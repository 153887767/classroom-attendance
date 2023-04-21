import { Context, Next } from 'koa'
import { JWT } from '../utils/JWT'
import { ErrorModel } from '../utils/resModel'
import { errorInfo } from '../constants/errorInfo'

/**
 * 验证JWT的中间件
 */
const jwtVerify = (unlessPath: RegExp[]) => {
  return async (ctx: Context, next: Next) => {
    // 不校验JWT，直接放行
    for (let i = 0; i < unlessPath.length; i++) {
      if (unlessPath[i].test(ctx.url)) {
        await next()
        return
      }
    }
    const scheme = ctx.headers.authorization?.split(' ')[0]
    const token = ctx.headers.authorization?.split(' ')[1]
    const payload = JWT.verify(token || '') as any
    if (!/^Bearer$/i.test(scheme || '') || !payload) {
      // JWT校验失败
      ctx.status = 401
      ctx.body = new ErrorModel(errorInfo.tokenFailInfo)
      return
    }

    // // 校验成功，刷新JWT
    // const newToken = JWT.generate(
    //   {
    //     id: payload.id,
    //     userName: payload.userName
    //   },
    //   '1h'
    // )
    // ctx.set('Authorization', newToken)

    if ('id' in payload) {
      // 教师信息挂载到上下文
      ctx.teacherInfo = {
        id: payload.id,
        userName: payload.userName
      }
    }

    if ('studentId' in payload) {
      // 学生信息挂载到上下文
      ctx.studentInfo = {
        studentId: payload.studentId
      }
    }

    await next()
  }
}

export { jwtVerify }
