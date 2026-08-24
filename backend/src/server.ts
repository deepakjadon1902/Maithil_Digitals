import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { app } from "./app.js";

async function start() {
  await connectDatabase();
  app.listen(env.PORT, () => {
    console.log(`Maithil Digitals API running on port ${env.PORT}`);
  });
}

start().catch((error) => {
  console.error("Server startup failed", error);
  process.exit(1);
});
