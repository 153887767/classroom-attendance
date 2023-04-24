/**
 * 创建 sequelize 实例
 */
import { Sequelize } from 'sequelize'
import { MYSQL_CONF } from '../conf/db'

export const sequelize = new Sequelize(
  MYSQL_CONF.database,
  MYSQL_CONF.user,
  MYSQL_CONF.password,
  {
    host: MYSQL_CONF.host,
    dialect: 'mysql',
    timezone: '+08:00' // 时区设置
  }
)
