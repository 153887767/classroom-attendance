/**
 * 接口返回值数据模型
 */

interface IModel {
  errno: number
  data?: Record<string, any>
  message?: string
}

class BaseModel {
  errno
  data
  message
  constructor({ errno, data, message }: IModel) {
    this.errno = errno
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data
    })
  }
}

class ErrorModel extends BaseModel {
  constructor({ errno, message }: Omit<Required<IModel>, 'data'>) {
    super({
      errno,
      message
    })
  }
}

export { SuccessModel, ErrorModel }
