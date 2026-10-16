import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect"; // your mongoose connection utility
import Category from "@/module/category.module";
import connectDB from "@/lib/db/mongodb";

export async function GET(req) {
    await connectDB();
    const type = req.nextUrl.searchParams.get("type")
    if (type === "view") {
        const categoriesData = await Category.find({}).lean();
        return NextResponse.json({ success: true, data:categoriesData }, { status: 200 });
    }else if(type === "viewonly"){
        const categoriesData = await Category.find({}).lean().select("main_category")
        return NextResponse.json({ success: true, data:categoriesData }, { status: 200 });
    }
    try {

        const categoriesData = await Category.find({}).lean();

        // Transform raw DB array into the nested structural object your frontend expects
        const DATABASE = {};
        categoriesData.forEach((item) => {
            if (!DATABASE[item.main_category]) {
                DATABASE[item.main_category] = { itemCategories: {} };
            }
            DATABASE[item.main_category].itemCategories[item.item_category] = {
                genders: item.genders,
                collections: item.collections,
            };
        });

        return NextResponse.json({ success: true, DATABASE }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
export async function POST(request) {
    try {
        await connectDB();

        const rawData = await request.json();
        console.log("Raw parsed JSON:", rawData);

        // Extract the body (handles if it's nested or flat)
        let body = rawData.body || rawData.data || rawData;

        // If 'body' is a string, parse it into a real JavaScript object
        if (typeof body === "string") {
            body = JSON.parse(body);
        }

        const newCategory = await Category.create(body);
        return NextResponse.json({ success: true, data: newCategory }, { status: 201 });
    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json({
                success: false,
                error: "This item category already exists under the selected main category."
            }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}