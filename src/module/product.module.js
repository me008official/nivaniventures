import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    sku: { type: String, required: true, unique: true },
    size: { type: String, default: "Standard" },
    color: { type: String, default: "Default" },
    price: { type: Number, required: true, min: 0 },
    compare_at_price: { type: Number, min: 0 },
    stock: { type: Number, required: true, default: 0, min: 0 },
    image: { type: String }
}, { _id: true });

const productSchema = new mongoose.Schema({
    uuid: { type: String, required: true, unique: true, index: true },
    product_name: { type: String, required: true, trim: true },
    product_slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, trim: true },

    // --- Copied from Category Table for Lightning-Fast Filtering ---
    main_category: { type: String, required: true, index: true }, // e.g., "Hemp"
    item_category: { type: String, required: true, index: true }, // e.g., "Cloth"
    gender: { type: String, required: true, index: true },        // e.g., "Male"
    collection_type: { type: String, required: true, index: true },// e.g., "Shirt"

    variants: [variantSchema],
    images: [{ type: String, required: true }],
    tags: [{ type: String, lowercase: true, index: true }],
    is_active: { type: Boolean, default: true, index: true }
}, { timestamps: true });

// --- Performance Indexes ---
productSchema.index({ product_name: "text", description: "text", tags: "text" });
productSchema.index({ main_category: 1, item_category: 1, gender: 1, collection_type: 1, is_active: 1 });

export default mongoose.model("Product", productSchema);