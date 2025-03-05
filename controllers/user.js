import { users } from "../models/user.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import { validateName,validatePassword } from "../validations/user.js"
import { signUserToken } from "../Auth/user.js"
export async function handleUserSignup(req,res){

    let {name, email, password} = req.body

    //check if all the required fields are provided
    if(!name || !email || !password)
        return res.status(400).json({message:"All Fields Are Required"})
    email = email.toLowerCase()


    //Check if email Already Exist
    try{
        const isUserPresent = await users.findOne({email:email})
        if(isUserPresent)
            return res.status(400).json({message:"User Already Registered, Please Login"})
    }catch(error){
        return res.status(500).json({message:"Error Occured in section : check if email exist : ",error:`${error}`})
    }
    

    //validate name
    const nameCheck = validateName(name)
    if(!nameCheck.isValid)
        return res.status(400).send(nameCheck.message)


    //validate email
    try{
        if(!validator.isEmail(email))
            return res.status(400).json({message:"Invalid Email Format"})
    }catch(error){
        return res.status(500).json({message:'Error occured while validating email',error:`${error}`})
    }
    

    //validate password
    const passwordCheck = validatePassword(password)
    if(!passwordCheck.isValid)
        return res.status(400).json({message:`${passwordCheck.message}`})

    
    let hashPass=''
    try{
        //hash password
        hashPass=await bcrypt.hash(password,10)
    }catch(error){
        return res.status(500).json({message:"Error Occured while Hashing Password",error:`${error}`})
    }


    try{

        //storing user data in mongodb : Registeration Step
        await users.create({
            name:name,
            email:email,
            password:hashPass
        })

    }catch(error){

        return res.status(500).json({message:"Error Occured while Storing user data MongoDB : ",error:`${error}`})
        
    }

    return res.status(201).json({message:"User Created Successfully", useremail:email})
}




export async function handleUserLogin(req,res){
    let {email,password} = req.body

    //check if all the required fields are provided
    if(!email || !password)
        return res.status(400).json({message:"All Fields Are Required"})
    email = email.toLowerCase()

    try{

        //validate email
        if(!validator.isEmail(email))
            return res.status(400).json({message:"Invalid Email Format"})

    }
    catch(error){

        return res.status(500).json({message:"Error Occured while validating email",error:`${error}`})

    }



    try{

        //check if user has registered or not
        const user = await users.findOne({email:email})
        if(!user)
            return res.status(400).json({message:"User has not registered yet"})


        //check if user credentials is correct
        const isPassValid = await bcrypt.compare(password,user.password)
        if(!isPassValid){
            return res.status(400).json({message:"Invalid Password"})
        }


        //create jwt token for user and set in cookie
        const userToken = signUserToken(user,req.ip)
        res.cookie("userAuthToken",userToken,{maxAge:24*3600000*7,httpOnly:true})

        return res.status(200).json({message:"Login Successful"})

    }catch(error){
        return res.status(500).json({message:"Error occured during login",error:`${error}`})
    }
}


export async function handleResetPassword(req,res){
    const { password } = req.body
    const userDetails = req.userDetails
    
    //check if password is provided or not
    if(!password)
        return res.status(400).json({message:"Password is required"})

    //validate password
    const passwordCheck = validatePassword(password)
    if(!passwordCheck.isValid)
        return res.status(400).json({message:`${passwordCheck.message}`})

    let hashPass=''
    try{
        //hash new password
        hashPass=await bcrypt.hash(password,10)
    }catch(error){
        return res.status(500).json({message:"Error Occured while Hashing New Password",error:`${error}`})
    }

    //update password in mongoDB
    try{

        await users.findOneAndUpdate({email:userDetails.email},
            { $set:{ password:hashPass } })

    }catch(error){
        return res.status(500).json({message:`Error Occured : ${error}`})
    }
    
    //clear current cookie
    res.clearCookie('userAuthToken')
    return res.status(200).json({message:"Password Reset Successfully, Please login"})
}