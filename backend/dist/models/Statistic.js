import { Schema, model } from "mongoose";
const statisticSchema = new Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true }
}, { timestamps: true });
export const Statistic = model("Statistic", statisticSchema);
