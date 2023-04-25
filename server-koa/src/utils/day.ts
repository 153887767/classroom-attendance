import dayjs from 'dayjs'

/**
 * 计算上课天数。
 * 参数示例：'2023-04-01', '2023-04-23', [1, 3, 7]
 */
const getClassDays = (start: string, end: string, days: number[]) => {
  const date1 = dayjs(start)
  const date2 = dayjs(end)
  if (date1.isAfter(date2)) {
    return 0
  }
  if (date1.isSame(date2)) {
    if (days.includes(date1.day()) || (date1.day() === 0 && days.includes(7))) {
      return 1
    }
    return 0
  }
  let count =
    (date2.startOf('week').diff(date1.startOf('week'), 'week') - 1) *
    days.length
  days.forEach((item) => {
    if (item === 7) {
      item = 0
    }
    if (item >= date1.day()) {
      count++
    }
    if (item <= date2.day()) {
      count++
    }
  })
  return count
}

export { getClassDays }
