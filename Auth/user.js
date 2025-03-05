import jwt from 'jsonwebtoken'

export function signUserToken(user,ipAddress){
    const secretKey = process.env.SECRET_KEY

    try{
        return jwt.sign({
            _id:user._id,
            name:user.name,
            email:user.email,
            ipAddress:ipAddress,
        },secretKey,{ expiresIn:"7d"})
    }catch(error){
        return res.status(500).json({message:`Error Occured while creating jwt token : ${error}`})
    }
    
}

export function verifyUserToken(userToken){
    const secretKey = process.env.SECRET_KEY
    try{
        return jwt.verify(userToken,secretKey)
    }catch(error){
        return null
    }
}