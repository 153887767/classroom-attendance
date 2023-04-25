export interface ICurrentLesson {
  id: number
  lessonName: string
  teacherId: number
  dateRange: string
  day: string
  time: string
  location: string
}

interface IStudentInfo {
  id: number
  userName: string
  studentNumber: string | null
  faceImg: string | null
  count: number
  lastAttendance: string | null
}

export interface IAttendanceInfo {
  count: number
  list: Array<IStudentInfo>
  totalDays: number
  teachingDays: number
  lessonName: string
}
