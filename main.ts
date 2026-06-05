import { createApp } from "@jhordycg/json-server";

const app = await createApp("db.json");

export default { fetch: app.fetch };
