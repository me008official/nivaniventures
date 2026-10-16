
// import QualitySchema from "@/module/quality.module";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import connectDB from "@/lib/db/mongodb";
import Quality from "@/module/quality.module";

// GET: Fetch the latest Hero configuration
export async function GET() {
  try {
    await connectDB();
    // Assuming you maintain a single singleton configuration document
    let quality = await Quality.findOne().sort({ createdAt: -1 }).lean();

    if (!quality) {
      // Return default empty structure if none exists
      quality = {
        label: "",
        labelContent: "",
        labelDesc: "",
        sections: []
      };
    }

    return NextResponse.json({ status: 200, data: quality }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error", error: error.message }, { status: 500 });
  }
}

// POST / PUT / PATCH: Update or Create the Hero configuration & Handle Images
export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Upsert or update the latest document
    let quality = await Quality.findOne().sort({ createdAt: -1 });

    if (!quality) {
      quality = await Quality.create(body);
    } else {
      quality.label = body.label ?? quality.label;
      quality.labelContent = body.labelContent ?? quality.labelContent;
      quality.labelDesc = body.labelDesc ?? quality.labelDesc;
      quality.sections = body.sections ?? quality.sections;
      await quality.save();
    }

    return NextResponse.json({ status: 200, message: "Hero configuration updated successfully", data: quality }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Failed to update", error: error.message }, { status: 500 });
  }
}

// Optional: DELETE route to reset configuration
export async function DELETE() {
  try {
    await connectDB();
    await Quality.deleteMany({});
    return NextResponse.json({ status: 200, message: "Hero configuration deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Delete failed", error: error.message }, { status: 500 });
  }
}