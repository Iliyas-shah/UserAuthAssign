
export function validateName(name){
    const validNameConditions = [/\d/,/[!@#$%^&*.,?<>{}\[\]]/]

    if(validNameConditions[0].test(name))
        return { "isValid":false, "message":"Name must not contain numbers"}
    if(validNameConditions[0].test(name))
        return { "isValid":false, "message":"Name must not contain special characters"}

    return { "isValid":true, "message":"Name is valid"}
}

export function validatePassword(password){
    const strongPassConditions = [/[A-Z]/,/[a-z]/,/\d/,/[!@#$%^&*.,?]/]
    if(password.length<8 || password.length>15)
        return { "isValid":false, "message":"Password length should be between 8 and 15"}
    if(!strongPassConditions[0].test(password))
        return {"isValid":false, "message":"Password must contain atleast one Uppercase letter"}
    if(!strongPassConditions[1].test(password))
        return {"isValid":false,"message":"Password must contain atleast one lowercase letter"}
    if(!strongPassConditions[2].test(password))
        return {"isValid":false,"message":"Password must contain atleast one number"}
    if(!strongPassConditions[3].test(password))
        return {"isValid":false,"message":"Password must contain atleast one special character {!@#$%^&*.,?"}

    return {"isValid":true,"message":"Password is valid"}
}