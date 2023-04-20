import { sequelize } from '../sequelize'
import { STRING } from '../types'

const Student = sequelize.define('student', {
  userName: {
    type: STRING,
    allowNull: false,
    comment: '姓名'
  },
  openid: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '微信openid'
  }
})

export { Student }
