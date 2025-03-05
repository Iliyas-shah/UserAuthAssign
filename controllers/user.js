import { users } from "../models/user.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import { validateName,validatePassword } from "../validations/user.js"
import { signUserToken } from "../Auth/user.js"
export async function handleUserSignup(req,res){

    let {name, email, password} = req.body

    //check if all the required fields are provided
    if(!name || !email || !password)
        return res.status(400).send("All Fields Are Required")
    email = email.toLowerCase()
    console.log(`Name:${name}, Email:${email}, Password:${password}`)


    //Check if email Already Exist
    try{
        const isUserPresent = await users.findOne({email:email})
        if(isUserPresent)
            return res.status(400).send("User Already Registered, Please Login")
    }catch(error){
        console.log("Error occured while checking existing user from mongodb")
        res.status(500).json({message:"Error Occured with mongodb",error:error})
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
        console.log("Error occured while validating email")
        return res.status(500).send("Error occured while validating email")
    }
    

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
        return res.status(500).json({message:"Error Occured with MongoDB : ",error:error})
        
    }

    return res.status(201).json({message:"User Created Successfully", useremail:email})
}




export async function handleUserLogin(req,res){
    let {email,password} = req.body

    //check if all the required fields are provided
    if(!email || !password)
        return res.status(400).send("All Fields Are Required")
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
            return res.status(400).send("User has not registered yet")


        //check if user credentials is correct
        const isPassValid = await bcrypt.compare(password,user.password)
        if(!isPassValid){
            return res.status(400).send("Invalid Password")
        }


        //create jwt token for user and set in cookie
        const userToken = signUserToken(user)
        res.cookie("userAuthToken",userToken,{maxAge:24*3600000*7,httpOnly:true})


        return res.status(200).send("Login Successful")

    }catch(error){

        return res.status(500).json({message:"Error occured during login",error:`${error}`})

    }
}


export async function handleResetPassword(req,res){
    
}