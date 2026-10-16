import mongoose from "mongoose";

// Sub-schema for individual cards inside a venture
const cardSchema = new mongoose.Schema({
    src: { type: String },
    alt: { type: String }
});

// Sub-schema for each venture tab item
const ventureSchema = new mongoose.Schema({
    label: { type: String },
    title: { type: String },
    description: { type: String },
    bgImage: { type: String },
    cards: [cardSchema]
},{timestamps:true});



const Service = mongoose.models.servicea || mongoose.model("servicea", ventureSchema);

export default Service;