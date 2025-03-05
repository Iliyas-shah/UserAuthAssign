import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './connections/user.js'
import { userRouter } from './routes/user.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const port = process.env.PORT
const urlDB = process.env.URL_DB

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

connectDB(urlDB)
.then(()=>console.log(`Database Connected`))
.catch((err)=>console.log(err))


app.use('/api/user',userRouter)

app.listen(port,()=>console.log(`Server Started On Port ${port}`))