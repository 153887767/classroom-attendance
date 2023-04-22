import { Teacher } from './Teacher'
import { Lesson } from './Lesson'
import { Student } from './Students'
import { SelectRelation } from './SelectRelation'

SelectRelation.belongsTo(Lesson, {
  foreignKey: 'lessonId'
})

SelectRelation.belongsTo(Student, {
  foreignKey: 'studentId'
})

Lesson.belongsTo(Teacher, {
  foreignKey: 'teacherId'
})

export { Teacher, Lesson, Student, SelectRelation }
