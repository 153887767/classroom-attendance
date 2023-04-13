import { ReactNode } from 'react'

/**
 * 表单必填项校验
 */
export const requiredValidator = (message: string, noSpace = false) => {
  return (val: string | undefined, cb: (error?: ReactNode) => void) => {
    if (val === undefined || !val.trim().length) {
      cb(message)
    }
    if (noSpace && val?.includes(' ')) {
      cb('不能包含空格')
    }
    cb()
  }
}
