const path = require('path')

// 修改CRA的工程化配置
module.exports = {
  webpack: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  }
}
