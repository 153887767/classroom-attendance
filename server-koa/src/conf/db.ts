import { isProd } from '../utils/env'

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'admin',
  port: '3306',
  database: 'face'
}

if (isProd) {
  MYSQL_CONF = {
    // 线上的 mysql 配置
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: '3306',
    database: 'face'
  }
}

export { MYSQL_CONF }
