//PACKAGES
import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
const xssSanitizer = require('express-xss-sanitizer')
import rateLimit from 'express-rate-limit'
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'

//Database Connection
import connectDB from './db/connect'

//ROUTES
import invoiceOrbitRouter from './routes/invoice-orbit'

//Middleware
//import errorHandler from './middleware/error-handler'
import errorHandlerMiddleware from './middleware/error-handler'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

app.set('trust proxy', 1)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: 'Too many requests from this IP, please try again later.',
    // store: ... , // Redis, Memcached, etc. See below.
  })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xssSanitizer())

app.use('/api/v1/invoices', ClerkExpressRequireAuth(), invoiceOrbitRouter)

app.use(errorHandlerMiddleware)

const mongoURI = process.env.MONGO_URI || 'default mongodb uri'

//Connect to db and spin server
const spin = async () => {
  try {
    await connectDB(mongoURI)
    app.listen(port, () => {
      console.log(`Server Running on Port ${port}...`)
    })
  } catch (err) {
    console.error('FAILED TO CONNECT TO MONGODB!', err)
  }
}

spin()
