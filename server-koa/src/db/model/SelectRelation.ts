import { sequelize } from '../sequelize'
import { INTEGER } from '../types'

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
  }
})

export { SelectRelation }
