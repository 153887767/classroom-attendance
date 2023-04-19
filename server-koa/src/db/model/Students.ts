import { sequelize } from '../sequelize'
import { STRING } from '../types'

const Student = sequelize.define('student', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一'
  }
})

export { Student }
