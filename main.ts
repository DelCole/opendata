import { createServer } from "@jhordycg/json-server";
import { resolve } from "@std/path/resolve";

const dbFile = resolve("db.json") 
const app = await createServer(dbFile);

export default { fetch: app.fetch };
