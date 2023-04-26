#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../dist/app')
var debug = require('debug')('demo:server')
var http = require('http')

/**
 * 配置 HTTPS
 */
const https = require('https')
const fs = require('fs')
const path = require('path')

const options = {
  key: fs.readFileSync(
    path.join(__dirname, '../ssl/attendance.qingkong.xyz.key')
  ),
  cert: fs.readFileSync(
    path.join(__dirname, '../ssl/attendance.qingkong.xyz.pem')
  )
}

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3001')
// app.set('port', port);

/**
 * Create HTTP server.
 */

// var server = http.createServer(app.callback())
let server
if (process.env.NODE_ENV !== 'dev') {
  // 线上环境创建 HTTPS 服务
  server = https.createServer(options, app.callback())
} else {
  // 开发环境创建 HTTP 服务
  server = http.createServer(app.callback())
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}
