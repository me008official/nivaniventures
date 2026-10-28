import connectDB from "@/lib/db/mongodb"
import Admin from "@/module/admin.module"
import { hashPass, verifyHash } from "@/services/bcrypt/admin/bcrypt"
import { admingenrateToken } from "@/services/bcrypt/admin/jwt"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
// import {connectDB} from "@/lib/db/mongodb"



export async function POST(request) {
    await connectDB()
    const { password, email } = await request.json()
    const cookieStore = await cookies()


    if (!password) {
        return NextResponse.json({ message: "please give me right data" }, { status: 400 })
    }

    const checkEmail = await Admin.findOne({ email: email })
    // console.log(checkEmail)
    if (!checkEmail) {
        return NextResponse.json({ message: "email not match" }, { status: 500 })
    }
    // console.log("password" + checkEmail.password)
    const isMatch = await verifyHash(password, checkEmail.password)

    if (!isMatch) {
        return NextResponse.json({ message: "password not match" }, { status: 500 })
    }

    const token = await admingenrateToken({ data: checkEmail })
    // console.log(token)
    if (!token) {
        return NextResponse.json({ message: "token not genrateed so you are not login to admin panel" })
    }

    cookieStore.set("token", token,)

    return NextResponse.json({ message: "admin password match",data:token }, { status: 200 })


}

