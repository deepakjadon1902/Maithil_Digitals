import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { app } from "./app.js";
import { ensureAdminAccount } from "./services/adminBootstrapService.js";
async function start() {
    await connectDatabase();
    await ensureAdminAccount();
    app.listen(env.PORT, () => {
        console.log(`Maithil Digitals API running on port ${env.PORT}`);
    });
}
start().catch((error) => {
    console.error("Server startup failed", error);
    process.exit(1);
});
