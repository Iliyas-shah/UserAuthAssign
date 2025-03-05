
export function validateName(name){
    const validNameConditions = [
        { check:/\d/,message:"Name must not contain numbers" },
        { check:/[!@#$%^&*.,?<>{}\[\]]/,message:"Name must not contain special characters"}
    ]

    for(const condition of validNameConditions){
        if(condition.check.test(name))
            return { isValid:false, message:condition.message }
    }

    return { isValid:true, message:"Name is valid" }
}

export function validatePassword(password){
    const strongPassConditions = [
        { check:/[A-Z]/,message:"Password must contain atleast one Uppercase letter" },
        { check:/[a-z]/,message:"Password must contain atleast one lowercase letter" },
        { check:/\d/,message:"Password must contain atleast one number" },
        { check:/[!@#$%^&*.,?]/,message:"Password must contain atleast one special character {!@#$%^&*.,?}"},
        { check:/^.{8,15}$/, message:"Password Length must be between 8 and 15"}
    ]

    for(const condition of strongPassConditions){
        if(!condition.check.test(password))
            return { isValid:false, message:condition.message }
    }

    return { isValid:true,message:"Password is valid" }
}