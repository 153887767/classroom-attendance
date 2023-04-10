import { ReactNode } from 'react'

/**
 * 表单必填项校验
 */
export const requiredValidator = (message: string) => {
  return (val: string | undefined, cb: (error?: ReactNode) => void) => {
    if (val === undefined || !val.trim().length) {
      cb(message)
    }
    cb()
  }
}
