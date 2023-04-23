import { Context } from 'koa'
import Router from 'koa-router'
import {
  codeToToken,
  changeUserName,
  changeStudentNumber,
  getInfo,
  uploadImage
} from '../controller/student'
import { selectLesson, getLessons } from '../controller/select-relation'
import { avatarUpload, faceUpload } from '../middlewares/multer'

const router = new Router()

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

// 上传头像
router.post(
  '/upload/avatar',
  avatarUpload.single('avatar'), // 接口参数key
  async (ctx: Context) => {
    ctx.body = await uploadImage(
      ctx.studentInfo.studentId,
      'avatar',
      ctx.file.filename
    )
  }
)

// 上传人脸图像（人脸注册）
router.post(
  '/upload/faceImg',
  faceUpload.single('faceImg'),
  async (ctx: Context) => {
    ctx.body = await uploadImage(
      ctx.studentInfo.studentId,
      'faceImg',
      ctx.file.filename
    )
  }
)

/**
 * 学生选课
 */
router.post('/selectLesson', async (ctx: Context) => {
  const { lessonId } = ctx.request.body as { lessonId: number }
  ctx.body = await selectLesson(ctx.studentInfo.studentId, lessonId)
})

/**
 * 学生选课列表
 */
router.get('/lessonsList', async (ctx: Context) => {
  ctx.body = await getLessons(ctx.studentInfo.studentId)
})

export default router
