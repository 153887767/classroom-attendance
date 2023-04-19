export enum Week {
  '星期一' = 1,
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日'
}

export type WeekDay = 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface ILesson {
  lessonName: string
  dateRange: string
  day: WeekDay[]
  time: string
  location: string
  geocode: string
}

export type ILessonListItem = ILesson & { id: number }

export interface ILessonList {
  count: number
  lessonList: ILessonListItem[]
}
