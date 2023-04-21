import { sequelize } from '../sequelize'
import { STRING, BOOLEAN } from '../types'

const Student = sequelize.define('student', {
  userName: {
    type: STRING,
    allowNull: false,
    comment: '姓名'
  },
  studentNumber: {
    type: STRING,
    allowNull: true,
    unique: true,
    comment: '学号'
  },
  openid: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '微信openid'
  },
  avatar: {
    type: STRING,
    allowNull: true,
    comment: '头像'
  },
  userNameModified: {
    type: BOOLEAN,
    allowNull: false,
    comment: '姓名是否已修改'
  },
  studentNumberModified: {
    type: BOOLEAN,
    allowNull: false,
    comment: '学号是否已修改'
  },
  faceImg: {
    type: STRING,
    allowNull: true,
    comment: '人脸注册图片'
  }
})

export { Student }
