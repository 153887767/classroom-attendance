const pathToDesc: Record<string, { name: string; menuKey: string }> = {
  '/lesson/list': {
    name: '课程列表',
    menuKey: '0_0'
  },
  '/lesson/config': {
    name: '课程设置',
    menuKey: '0_1'
  },
  '/statistics/current': {
    name: '当前课程',
    menuKey: '1_0'
  },
  '/statistics/all': {
    name: '考勤统计',
    menuKey: '1_1'
  }
}

export { pathToDesc }
