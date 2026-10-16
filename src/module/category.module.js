import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    main_category: {
        type: String,
        required: true,
        enum: ["Hemp", "Bamboo", "Organic", "Traditional"],
        index: true
    },
    item_category: {
        type: String,
        required: true,
        trim: true
    },
    genders: [{
        type: String
    }],
    collections: [{
        type: String
    }],
    is_active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

categorySchema.index({ main_category: 1, item_category: 1 }, { unique: true });

// Ensure 'new' is NOT used here:
const Category = mongoose.model("Category", categorySchema);

export default Category;