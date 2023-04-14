export interface ILesson {
  lessonName: string
  teacherId: number
  dateRange: string
  day: string
  time: string
  location: string
}

export interface ILessonList {
  count: number
  lessonList: ILesson & { id: number }
}
