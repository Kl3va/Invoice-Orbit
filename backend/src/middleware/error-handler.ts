import { ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'
import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: `${err.errors}` })
  } else if (err instanceof mongoose.Error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Database Error: ${err.message}` })
  } else if (err instanceof Error) {
    // This catches all other errors that are instances of the Error class
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message })
  } else {
    // This catches anything that isn't an Error instance
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'An unknown error occurred!!!' })
  }
}

export default errorHandlerMiddleware
