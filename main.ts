import { Hono } from "@hono/hono";
import { cache } from "@hono/hono/cache";
import { cors } from "@hono/hono/cors";
import { showRoutes } from "@hono/hono/dev";
import { etag, RETAINED_304_HEADERS } from "@hono/hono/etag";
import { jsonServerFactory } from "@jhordycg/json-server";

const factory = await jsonServerFactory("db.json");
const CACHE_CONTROL =
  "public,max-age=3153600,stale-while-revalidate=86400,immutable";
const ALLOWED_ORIGINS = Deno.env.get("APP_ALLOWED_ORIGIN")?.split(";") ?? [];

console.log(ALLOWED_ORIGINS);

const app = new Hono()
  .use(cors({ origin: ALLOWED_ORIGINS, maxAge: 3, allowMethods: ["GET"] }))
  .use(etag({ retainedHeaders: RETAINED_304_HEADERS }))
  .use(
    cache({
      wait: true,
      cacheName: "opendata-api",
      cacheControl: CACHE_CONTROL,
    }),
  )
  .use((_, next) => {
    return new Promise<void>((resolve) => {
      setTimeout(async () => {
        await next();
        resolve();
      }, 750);
    });
  })
  .route("/", factory.createApp());

showRoutes(app);

export default { fetch: app.fetch };
