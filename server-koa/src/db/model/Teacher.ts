import { sequelize } from '../sequelize'
import { STRING } from '../types'

const Teacher = sequelize.define('teacher', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true, // 唯一的
    comment: '用户名，唯一' // 注释
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  }
})

export { Teacher }
