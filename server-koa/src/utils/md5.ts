import crypto from 'crypto'
import { CRYPTO_SECRET_KEY } from '../conf/secretKeys'

/**
 * md5加密
 */
const md5 = (content: string) => {
  const hash = crypto.createHash('md5')
  const str = `content=${content}&key=${CRYPTO_SECRET_KEY}`
  return hash.update(str).digest('hex')
}

export { md5 }
