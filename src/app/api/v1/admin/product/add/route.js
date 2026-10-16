import { NextResponse } from "next/server";
import Product from "@/module/product.module";
import { v4 as uuidv4 } from "uuid";
import connectDB from "@/lib/db/mongodb";

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();

        const slug = body.product_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

        const newProduct = await Product.create({
            uuid: uuidv4(),
            product_name: body.product_name,
            product_slug: slug,
            description: body.description,
            main_category: body.main_category,
            item_category: body.item_category,
            gender: body.gender,
            collection_type: body.collection_type,
            variants: body.variants || [],
            images: body.images || [],
            tags: body.tags || [],
            is_active: true,
        });

        return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}