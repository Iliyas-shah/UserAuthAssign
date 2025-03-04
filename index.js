import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './connections/user.js'
import { userRouter } from './routes/user.js'

dotenv.config()
const app = express()
const port = process.env.PORT
const urlDB = process.env.urlDB

app.use(express.urlencoded({extended:true}))
connectDB(urlDB)
.then(()=>console.log(`Database Connected`))
.catch((err)=>console.log(err))


app.use('/api/user',userRouter)

app.listen(port,()=>console.log(`Server Started On Port ${port}`))