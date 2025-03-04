import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from './connections/user.js'

dotenv.config()
const app = express()
const port = process.env.PORT
const urlDB = process.env.urlDB

connectDB(urlDB)
.then(()=>console.log(`Database Connected`))
.catch((err)=>console.log(err))


app.listen(port,()=>console.log(`Server Started On Port ${port}`))