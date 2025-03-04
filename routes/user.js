import express from 'express'
import { handleUserSignup } from '../controllers/user.js'

export const userRouter = express.Router()

userRouter.route('/signup')
.post(handleUserSignup)