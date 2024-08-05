//PACKAGES
import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
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

app.use(express.json())
app.use(cors())
app.use(errorHandlerMiddleware)
//app.use(ClerkExpressWithAuth())
app.use('/api/v1/invoices', ClerkExpressRequireAuth(), invoiceOrbitRouter)

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
