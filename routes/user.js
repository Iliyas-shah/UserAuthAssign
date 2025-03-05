import express from 'express'
import { handleUserSignup,handleUserLogin,handleResetPassword } from '../controllers/user.js'

export const userRouter = express.Router()

userRouter.route('/signup')
.post(handleUserSignup)

userRouter.route('/login')
.get(handleUserLogin)

userRouter.route('/resetpass')
.get(handleResetPassword)