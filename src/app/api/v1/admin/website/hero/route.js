
import Hero from "@/module/hero.module";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import connectDB from "@/lib/db/mongodb";

// GET: Fetch the latest Hero configuration
export async function GET() {
  try {
    await connectDB();
    // Assuming you maintain a single singleton configuration document
    let hero = await Hero.findOne().sort({ createdAt: -1 }).lean();
    
    if (!hero) {
      // Return default empty structure if none exists
      hero = {
        heroBg: "",
        titles: [],
        buttons: [],
        cards: []
      };
    }
    
    return NextResponse.json({ status: 200, data: hero }, { status: 200 });
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
    let hero = await Hero.findOne().sort({ createdAt: -1 });

    if (!hero) {
      hero = await Hero.create(body);
    } else {
      hero.heroBg = body.heroBg ?? hero.heroBg;
      hero.titles = body.titles ?? hero.titles;
      hero.buttons = body.buttons ?? hero.buttons;
      hero.cards = body.cards ?? hero.cards;
      await hero.save();
    }

    return NextResponse.json({ status: 200, message: "Hero configuration updated successfully", data: hero }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Failed to update", error: error.message }, { status: 500 });
  }
}

// Optional: DELETE route to reset configuration
export async function DELETE() {
  try {
    await connectDB();
    await Hero.deleteMany({});
    return NextResponse.json({ status: 200, message: "Hero configuration deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Delete failed", error: error.message }, { status: 500 });
  }
}