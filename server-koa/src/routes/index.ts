import Router from 'koa-router'
import teacherRouter from './teacher'
import lessonRouter from './lesson'
import locationRouter from './location'
import studentRouter from './student'
import attendanceRouter from './attendance'
import statisticsRouter from './statistics'

const router = new Router()

router.prefix('/api')

router.use('/teacher', teacherRouter.routes(), teacherRouter.allowedMethods())
router.use('/lesson', lessonRouter.routes(), lessonRouter.allowedMethods())
router.use(
  '/location',
  locationRouter.routes(),
  locationRouter.allowedMethods()
)
router.use('/student', studentRouter.routes(), studentRouter.allowedMethods())
router.use(
  '/attendance',
  attendanceRouter.routes(),
  attendanceRouter.allowedMethods()
)
router.use(
  '/statistics',
  statisticsRouter.routes(),
  statisticsRouter.allowedMethods()
)

export default router
