class AppError extends Error {
  private _message: string
  private _status: number

  constructor(message: string, status = 500) {
    super(message)

    this._message = message
    this._status = status
  }

  get message() {
    return this._message
  }

  get status() {
    return this._status
  }
}

export { AppError }
