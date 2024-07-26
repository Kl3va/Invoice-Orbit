//PACKAGES
import express, { Express } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

//ROUTES
import invoiceOrbitRouter from './routes/invoice-orbit'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

const mongoURI = process.env.MONGO_URI || 'default mongodb uri'

//Connecting to database
mongoose
  .connect(mongoURI)
  .then(() => console.log('CONNECTED TO MONGODB!'))
  .catch((err) => console.error('FAILED TO CONNECT TO MONGODB!', err))

app.use('/invoice-orbit', invoiceOrbitRouter)

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`)
})
