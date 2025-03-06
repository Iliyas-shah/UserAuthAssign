import express from 'express'
import { handleUserSignup,handleUserLogin,handleResetPassword } from '../controllers/user.js'
import { checkJwtToken} from '../middlewares/user.js'
export const userRouter = express.Router()

userRouter.route('/')
.get((req,res)=>{
    return res.json({message:"Accessing User Services"})
})
userRouter.route('/signup')
.post(handleUserSignup)

userRouter.route('/login')
.get(handleUserLogin)

userRouter.route('/resetpass')
.patch(checkJwtToken,handleResetPassword)