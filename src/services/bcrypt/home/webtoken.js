import jwt from "jsonwebtoken"

export const genrateToken = async (data) => {
    console.log(data)
    // const key = process.env.JWT_SECRET
    // console.log(key)
    const genrateTOken = await jwt.sign(data, "MY-SECRET-KEY-123-456")
    if(!genrateTOken){
        return false
    }
    return genrateTOken
}
export const verifyToken = async (data) => {
    // const key = process.env.JWT_SECRET
    // console.log(key)
    const genrateTOken = await jwt.verify(data, "MY-SECRET-KEY-123-456")
    return genrateTOken
}