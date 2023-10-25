import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import canelAuth from './canel/auth.js'
import canelCrew from './canel/crew.js'
import cors from 'cors'
dotenv.config()

const app = express()
const port = process.env.PORT
const hull = process.env.HULL

const corsOptions = {
  origin: "http://localhost:3090",
  credentials: true,
};
app.use(express.json())
app.use(cookieParser())
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3090');
//   console.log('akses ok')
//   next();
// });


mongoose.connect(hull)
  .then(() => {
    app.listen(port)
    console.log('mendengarkan hull dan port ', port)
  })
  .catch((err) => {
    console.log(err)
  })

app.get('/cookie', )
app.use(canelAuth)
app.use(canelCrew)
