/**
 * 模型同步到数据库
 */
import { sequelize } from './sequelize'
import './model'

// 测试连接
;(async function () {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()

// force: 创建表，如果表已经存在则先删除
sequelize.sync({ force: true }).then(() => {
  console.log('所有模型均已成功同步')
  process.exit()
})
