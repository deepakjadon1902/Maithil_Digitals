import { Schema, model } from "mongoose";
import { mediaSchema } from "./shared.js";

const teamMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    photo: { type: mediaSchema, default: {} },
    bio: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    instagram: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

export const TeamMember = model("TeamMember", teamMemberSchema);
