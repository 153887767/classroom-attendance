import Router from 'koa-router'
import { locationPrompt, getDistance } from '../controller/location'

const router = new Router()

router.prefix('/api/location')

// 地点关键词输入提示
router.get('/prompt', async (ctx) => {
  ctx.body = await locationPrompt(ctx.query.keyword as string)
})

// 两地距离测量, 单位为米
router.get('/distance', async (ctx) => {
  ctx.body = await getDistance(
    ctx.query.origins as string,
    ctx.query.destination as string
  )
})

export default router
