import { verifyUserToken } from "../Auth/user.js"

export function checkJwtToken(req,res,next){
    try{
        const userToken = req.cookies
        if(Object.keys(userToken).length === 0) //check if there is no cookies
            return res.status(404).json({message:"Jwt Token not available, Please Login"})
        if(!verifyUserToken(userToken.userAuthToken)) //check if there is an invalid jwt token
            return res.status(404).json({message:"Invalid Jwt Token,Please Login"})

        const userDetails = verifyUserToken(userToken.userAuthToken)
        if(userDetails.ipAddress!=req.ip) //check if only authenticated ip address is sending a request
            return res.status(404).json({messasge:"Authentication Failed, Please Login"})

        req.userDetails = userDetails
    }catch(error){
        return res.status(500).json({message:`Error Occured while Checkjwttoken : ${error}`})
    }
        next()
}