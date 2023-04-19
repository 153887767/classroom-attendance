import { ReactNode } from 'react'

/**
 * 表单必填项校验
 */
export const requiredValidator = (message: string, noSpace = false) => {
  return (
    val: string | number | Array<string | number> | undefined,
    cb: (error?: ReactNode) => void
  ) => {
    if (val === undefined) {
      cb(message)
    }
    if (typeof val === 'string' && !val.trim().length) {
      cb(message)
    }
    if (noSpace && typeof val === 'string' && val?.includes(' ')) {
      cb('不能包含空格')
    }
    if (val instanceof Array && !val.length) {
      cb(message)
    }
    cb()
  }
}
