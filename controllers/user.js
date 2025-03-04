import { users } from "../models/user.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import { validateName,validatePassword } from "../validations/user.js"
export async function handleUserSignup(req,res){
    const {name, email, password} = req.body

    //Check if email Already Exist
    const isUserPresent = users.findOne({email:email})

    if(isUserPresent)
        return res.status(400).send("User Already Registered, Please Login")

    //validate name
    const nameCheck = validateName(name)

    if(!nameCheck.isValid)
        return res.status(400).send(nameCheck.message)

    //validate email
    if(!validator.isEmail(email))
        return res.status(400).json({message:"Invalid Email Format"})

    //validate password
    const passwordCheck = validatePassword(password)
    if(!passwordCheck.isValid)
        return res.status(400).send(passwordCheck.message)

    
    let hashPass=''
    try{
        //hash password
        hashPass=await bcrypt.hash(password,10)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Error Occured while Hashing Password",error:error})
    }

    try{
        //storing user data in mongodb : Registeration Step
        await users.create({
            name:name,
            email:email,
            password:hashPass
        })

    }catch(error){
        console.log(error)
        return res.status(400).json({message:"Error Occured with MongoDB : ",error:error})
    }

    return res.json({message:"User Created Successfully", useremail:email})
}
