import { env } from "../config/env.js";
import { Admin } from "../models/Admin.js";
export async function ensureAdminAccount() {
    const email = env.ADMIN_EMAIL.toLowerCase();
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
        await Admin.create({ email, password: env.ADMIN_PASSWORD, role: "admin" });
        console.log(`Admin account created for ${email}`);
        return;
    }
    const passwordMatches = await admin.comparePassword(env.ADMIN_PASSWORD);
    if (passwordMatches)
        return;
    admin.password = env.ADMIN_PASSWORD;
    admin.tokenVersion += 1;
    await admin.save();
    console.log(`Admin account password updated for ${email}`);
}
