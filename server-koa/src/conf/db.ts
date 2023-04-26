import { notDev } from '../utils/env'

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'admin',
  port: '3306',
  database: 'face'
}

if (notDev) {
  MYSQL_CONF = {
    // 线上的 mysql 配置
    host: '120.77.34.222',
    user: 'face',
    password: 'F372eKNcK8wYpiEi',
    port: '3306',
    database: 'face'
  }
}

export { MYSQL_CONF }
