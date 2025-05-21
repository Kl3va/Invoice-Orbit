import { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

export const getHealth = async (req: Request, res: Response) => {
  res.status(StatusCodes.NO_CONTENT).end()
}
