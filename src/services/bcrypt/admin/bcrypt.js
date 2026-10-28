import bcrypt from "bcrypt"





export const hashPass = async(data)=>{
    const hash = await bcrypt.hash(data,10)
    return hash
}


export const verifyHash = async (CgPassword,hassPassword)=>{
    // console.log(CgPassword,hassPassword)
    const verifyHas = await bcrypt.compare(CgPassword,hassPassword)
    return verifyHas
}
