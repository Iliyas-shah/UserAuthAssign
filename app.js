import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './connections/user.js'
import { userRouter } from './routes/user.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000
const mongo_url = process.env.MONGO_URL

//middlewares
app.use(cookieParser())

//connect Database
connectDB(mongo_url)
.then(()=>console.log(`Database Connected`))
.catch((err)=>console.log(err))

//API for signup, login, reset Password
app.get('/',(req,res)=>{
    return res.json({message:"Backend Deployed"})
})
app.use('/api/user',userRouter)

//starting server
app.listen(port,()=>console.log(`Server Started On Port ${port}`))