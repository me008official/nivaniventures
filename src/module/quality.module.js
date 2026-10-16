import mongoose from "mongoose";

const sectionSchrma = new mongoose.Schema({
    label: {
        type: String,
    },
    description: {
        type: String
    },
    image:{
        type:String
    }
})

const QualitySchema = new mongoose.Schema({
    uuid: { type: String, },
    label: {type:String},
    labelContent:{type:String},
    labelDesc:{type:String},
    sections:[sectionSchrma]

}, { timestamps: true })


const Quality = mongoose.model("quality", QualitySchema)

export default Quality

