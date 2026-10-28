import { genrateToken } from "@/services/bcrypt/home/webtoken"
import { NextResponse } from "next/server"


export async function GET(req) {
    const agent = req.nextUrl.searchParams.get("agent")
    const date = req.nextUrl.searchParams.get("date")
    const data ={agent,date}
    // console.log(data)

    const genToken = await genrateToken(data)
    if(!genToken){
        return NextResponse.json({message: "Token not genrated so route is not work"},{status:500})
    }
    // console.log(genToken)
    return NextResponse.json({message: "token genrated",data:genToken},{status:200})
}