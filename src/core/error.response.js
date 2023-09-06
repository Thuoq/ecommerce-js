import { StatusCodes, getReasonPhrase } from 'http-status-codes'

export class ErrorResponse extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

export class ConflictRequestError extends ErrorResponse {
  constructor(
    message = getReasonPhrase(StatusCodes.CONFLICT),
    statusCode = StatusCodes.CONFLICT
  ) {
    super(message, statusCode)
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(
    message = getReasonPhrase(StatusCodes.BAD_REQUEST),
    statusCode = StatusCodes.BAD_REQUEST
  ) {
    super(message, statusCode)
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(
    message = getReasonPhrase(StatusCodes.NOT_FOUND),
    statusCode = StatusCodes.NOT_FOUND
  ) {
    super(message, statusCode)
  }
}
