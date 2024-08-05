import { ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Unauthenticated User!!'})
}

export default errorHandlerMiddleware
