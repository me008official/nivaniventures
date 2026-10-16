import connectDB from "@/lib/db/mongodb"
import Product from "@/module/product.module"
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB()

        const productData = await Product.find({ is_active: true })
            .select("uuid product_name product_slug description main_category item_category gender collection_type variants images tags is_active createdAt")
            .limit(100)
            .lean()

        return NextResponse.json({ success: true, data: productData || [] }, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ success: false, error: error.message, data: [] }, { status: 500 });
    }
}
