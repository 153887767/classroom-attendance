/**
 * 图片上传中间件
 */
import path from 'path'
import multer from '@koa/multer'
import { nanoid } from 'nanoid'

const getStorage = (folder: string) => {
  const storage = multer.diskStorage({
    // 文件保存路径
    destination(req: any, file: any, cb: any) {
      cb(null, path.join(__dirname, `../../upload/${folder}`))
    },
    // 文件默认没有后缀，随机生成文件名称并加上后缀
    filename(req: any, file: any, cb: any) {
      const fileFormat = file.originalname.split('.')
      cb(null, nanoid() + '.' + fileFormat[fileFormat.length - 1])
    }
  })
  return storage
}

// 文件上传限制
const limits = {
  fileSize: 5 * 1024 * 1024, // 文件大小，单位 Byte
  files: 1 // 文件数量
}

// 头像上传
const avatarUpload = multer({ storage: getStorage('avatar'), limits })

// 人脸注册图片上传
const faceUpload = multer({ storage: getStorage('faceImg'), limits })

// 人脸识别图片上传
const faceRecognitionUpload = multer({
  storage: getStorage('faceRecognition'),
  limits
})

export { avatarUpload, faceUpload, faceRecognitionUpload }
