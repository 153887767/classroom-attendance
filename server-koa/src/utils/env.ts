const ENV = process.env.NODE_ENV

const isDev = ENV === 'dev'
const notDev = ENV !== 'dev'
const isProd = ENV === 'production'
const notProd = ENV !== 'production'

export { isDev, notDev, isProd, notProd }
