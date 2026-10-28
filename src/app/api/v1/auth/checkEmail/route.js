import connectDB from "@/lib/db/mongodb"
import Admin from "@/module/admin.module"
import { NextResponse } from "next/server"



export async function POST(request){
    await connectDB()
    const {email} = await request.json()

    if(!email){
        return NextResponse.json({message: "please give me right data"},{status:400})
    }

    const checkEmail = await Admin.find({email:email})
    if(!checkEmail){
        return NextResponse.json({message:"email not match"},{status:500})
    }
    // console.log(checkEmail)

    return NextResponse.json({message: "admin email match"},{status:200})
}
