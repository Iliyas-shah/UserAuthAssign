import jwt from 'jsonwebtoken'

export function signUserToken(user){
    const secretKey = process.env.SECRET_KEY
    
    console.log(secretKey)
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email
    },secretKey,{ expiresIn:"7d"})
}