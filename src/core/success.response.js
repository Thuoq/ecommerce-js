import { StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes'

// IN REAL PROJECT SHOULD RETURN DEV_STATUS CODE
export class SuccessResponse {
  constructor({
    message,
    statusCode = getStatusCode(getReasonPhrase(StatusCodes.OK)),
    reasonStatusCode = getReasonPhrase(StatusCodes.OK),
    metadata = {}
  }) {
    this.message = !message ? reasonStatusCode : message
    this.status = statusCode
    this.metadata = metadata
  }

  send(res, headers = {}) {
    res.set(headers)
    return res.status(this.status).json(this)
  }
}

export class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({
      message,
      metadata
    })
  }
}
export class CREATED extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.CREATED,
    reasonStatusCode = getReasonPhrase(StatusCodes.OK),
    metadata
  }) {
    super({
      message,
      statusCode,
      reasonStatusCode,
      metadata
    })
  }
}
