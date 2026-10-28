import jwt from "jsonwebtoken"

export const admingenrateToken = async (data) => {
    // console.log(data)
    const key = process.env.JWT_SECRET
    // console.log(key)
    const genrateTOken = await jwt.sign(data, key )
    if(!genrateTOken){
        return false
    }
    return genrateTOken
}
export const adminVerifyToken = async (data,key) => {
  
    const genrateTOken = await jwt.verify(data, key)
    // console.log("my verify-token"+ JSON.stringify(genrateTOken))
    return genrateTOken
}