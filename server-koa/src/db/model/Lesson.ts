import { sequelize } from '../sequelize'
import { STRING, INTEGER } from '../types'

const Lesson = sequelize.define('lesson', {
  lessonName: {
    type: STRING,
    allowNull: false,
    comment: '课程名称'
  },
  teacherId: {
    type: INTEGER,
    allowNull: false,
    comment: '教师ID'
  },
  dateRange: {
    type: STRING,
    allowNull: false,
    comment: '日期范围'
  },
  day: {
    type: STRING,
    allowNull: false,
    comment: '星期几'
  },
  location: {
    type: STRING,
    allowNull: false,
    comment: '上课地点'
  }
})

export { Lesson }
