import { createApp } from "json-server/lib/app.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const adapter = new JSONFile("db.json");
const db = new Low(adapter, {});
await db.read();

const app = createApp(db, { static: [] });

app.listen(3000, () => {
  console.log("JSON Server is running on port 3000");
});
