import { sequelize } from '../sequelize'
import { INTEGER, DATE } from '../types'

const SelectRelation = sequelize.define('selectRelation', {
  lessonId: {
    type: INTEGER,
    allowNull: false,
    comment: '课程ID'
  },
  studentId: {
    type: INTEGER,
    allowNull: false,
    comment: '学生ID'
  },
  count: {
    type: INTEGER,
    allowNull: false,
    comment: '考勤次数'
  },
  lastAttendance: {
    type: DATE,
    allowNull: true,
    comment: '最后一次考勤时间'
  }
})

export { SelectRelation }
