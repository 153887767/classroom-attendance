import Router from 'koa-router'
const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = {
    title: 'ts + koa2'
  }
})

export default router
