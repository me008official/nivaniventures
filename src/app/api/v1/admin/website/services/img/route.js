import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ status: 400, message: "No file provided" }, { status: 400 });
        }

        // Convert Next.js file to Buffer then Base64 for ImgBB
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = buffer.toString("base64");

        // Prepare payload for ImgBB API
        const imgbbFormData = new FormData();
        imgbbFormData.append("key", process.env.IMGBB_API_KEY || "ffa11c8b3cc12e8c3b84c0d7d8f52b6e"); // Put your key in .env.local
        imgbbFormData.append("image", base64Image);

        // Upload to ImageBB
        const imgbbRes = await axios.post("https://api.imgbb.com/1/upload", imgbbFormData, {
            headers: {
                ...imgbbFormData.getHeaders(),
            },
        });

        const imageUrl = imgbbRes.data.data.url;

        return NextResponse.json({ status: 200, url: imageUrl }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { status: 500, message: "Image upload failed", error: error.response?.data || error.message },
            { status: 500 }
        );
    }
}