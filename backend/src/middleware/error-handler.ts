import { ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  // console.error('Error:', err)

  if (err instanceof z.ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: err.errors[0].message,
    })
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: Object.values(err.errors)
        .map((error) => error.message)
        .join(', '),
    })
  }

  if (err instanceof mongoose.Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Database Error: ${err.message}`,
    })
  }

  if (err instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message:
        process.env.NODE_ENV === 'production'
          ? 'Internal Server Error'
          : err.message,
    })
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: 'An unknown error occurred',
  })
}

export default errorHandlerMiddleware
