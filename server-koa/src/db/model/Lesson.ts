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
  time: {
    type: STRING,
    allowNull: false,
    comment: '时间范围'
  },
  location: {
    type: STRING,
    allowNull: false,
    comment: '上课地点'
  },
  geocode: {
    type: STRING,
    allowNull: false,
    comment: '上课地点经纬度'
  }
})

export { Lesson }
