import { ErrorInfo } from '@/service'

/**
 * 自定义守卫，判断请求结果是否失败
 */
const isError = (res: any): res is ErrorInfo | undefined => {
  return !res || 'errno' in res
}

export { isError }
