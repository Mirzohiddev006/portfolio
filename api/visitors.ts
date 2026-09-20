import { Redis } from "@upstash/redis";

export const config = { runtime: "edge" };

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

const getRedis = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
};

const hashVisitor = async (request: Request, secret: string) => {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwardedFor ?? request.headers.get("x-real-ip") ?? "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const source = `${secret}:${address}:${userAgent}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(source));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "GET") return json(405, { ok: false, error: "Method not allowed" });

  const redis = getRedis();
  const secret = process.env.VISITOR_HASH_SECRET;
  if (!redis || !secret) {
    console.error("Missing Upstash Redis or VISITOR_HASH_SECRET environment variable");
    return json(503, { ok: false, error: "Visitor counter is not configured" });
  }

  try {
    const visitorKey = `portfolio:visitor:${await hashVisitor(request, secret)}`;
    const isNewVisitor = await redis.set(visitorKey, "1", { nx: true });
    const total = isNewVisitor ? await redis.incr("portfolio:visitors:total") : await redis.get<number>("portfolio:visitors:total") ?? 0;
    return json(200, { ok: true, visitors: Number(total) });
  } catch (error) {
    console.error("Visitor counter request failed:", error);
    return json(502, { ok: false, error: "Could not load visitor count" });
  }
}
