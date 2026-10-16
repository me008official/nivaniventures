import mongoose from "mongoose";

const sectionSchrma = new mongoose.Schema({
    label: {
        type: String,
    },
    content: {
        type: String
    }
})
const buttonSchrma = new mongoose.Schema({
    label: {
        type: String,
    },
    btnName: {
        type: String
    },
    is_active: {
        type: Boolean,
    }
})
const cardSchrma = new mongoose.Schema({
    label: {
        type: String,
    },
    title: {
        type: String,
    },
    price: {
        type: String
    },
    feturesrc: {
        type: String
    }
})
const heroSchema = new mongoose.Schema({
    uuid: { type: String, },
    heroBg: { type: String },
    titles: [sectionSchrma],
    buttons: [buttonSchrma],
    ccards: [cardSchrma]

}, { timestamps: true })


const Hero = mongoose.model("Hero", heroSchema)

export default Hero

