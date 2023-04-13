import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../conf/secretKeys'

const JWT = {
  generate(value: string | object | Buffer, expires: string | number) {
    return jwt.sign(value, JWT_SECRET, { expiresIn: expires })
  },
  verify(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET)
    } catch (error) {
      return false
    }
  }
}

export { JWT }
