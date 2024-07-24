//password 6JSJvH76v9QtyDUD
//username ikwunzekelvin
import express, { Express } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

app.use(express.json())

const mongoURI = process.env.MONGO_URI || 'default mongodb uri'

//Connecting to database
mongoose
  .connect(mongoURI)
  .then(() => console.log('CONNECTED TO MONGODB!'))
  .catch((err) => console.error('FAILED TO CONNECT TO MONGODB!', err))

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`)
})
