import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
const adminSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin"], default: "admin" },
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: Date,
    lastLoginAt: Date,
    tokenVersion: { type: Number, default: 0 }
}, { timestamps: true });
adminSchema.pre("save", async function hashPassword(next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
adminSchema.methods.comparePassword = function comparePassword(candidate) {
    return bcrypt.compare(candidate, this.password);
};
export const Admin = model("Admin", adminSchema);
