import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Service from "@/module/service.module";

export async function GET() {
  try {
    await connectDB();
    const service = await Service.find().sort({ createdAt: -1 }).lean();

    // if (!service || !Array.isArray(service.ventures) || service.ventures.length === 0) {
    //   return NextResponse.json({ status: 200, data: [] }, { status: 200 });
    // }

    return NextResponse.json({ status: 200, data: service }, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ status: 500, message: "Server error", error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.ventures || !Array.isArray(body.ventures)) {
      return NextResponse.json({ status: 400, message: "Invalid payload: 'ventures' array is required" }, { status: 400 });
    }

    // Force-update or create the single settings document cleanly
    // const updatedService = await Service.findOneAndUpdate(
    //   {},
    //   { ventures: body.ventures },
    //   { new: true, upsert: true, runValidators: true }
    // );
    await Service.deleteMany({});
    const savedServices = await Service.insertMany(body.ventures);
    return NextResponse.json({
      status: 200,
      message: "Services configuration updated successfully",
      data: savedServices,
    }, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ status: 500, message: "Failed to update", error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await connectDB();
    await Service.deleteMany({});
    return NextResponse.json({ status: 200, message: "Services configuration deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Delete failed", error: error.message }, { status: 500 });
  }
}
