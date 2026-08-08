// The .js extension is required: package.json sets "type": "module", so Vercel
// type-checks this function with node16 module resolution. TypeScript maps the
// specifier back to contactSchema.ts.
import { contactSchema } from "../src/lib/contactSchema.js";

export const config = { runtime: "edge" };

const TELEGRAM_API = "https://api.telegram.org";

/** Telegram hard-caps a message at 4096 characters. */
const TELEGRAM_MAX_LENGTH = 4096;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

/** Escape the characters that would otherwise break Telegram's HTML parse mode. */
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const buildMessage = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const text = [
    "📬 <b>New message from portfolio</b>",
    "",
    `<b>Name:</b> ${escapeHtml(data.name)}`,
    `<b>Email:</b> ${escapeHtml(data.email)}`,
    `<b>Subject:</b> ${escapeHtml(data.subject)}`,
    "",
    escapeHtml(data.message),
  ].join("\n");

  return text.length > TELEGRAM_MAX_LENGTH
    ? `${text.slice(0, TELEGRAM_MAX_LENGTH - 1)}…`
    : text;
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json(400, { ok: false, error: "Invalid JSON body" });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json(400, {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data",
    });
  }

  // A filled honeypot means a bot. Answer 200 so it does not learn anything,
  // but never forward the message.
  if (parsed.data.website) {
    return json(200, { ok: true });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error(
      "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variable"
    );
    return json(500, { ok: false, error: "Contact form is not configured" });
  }

  let telegramResponse: Response;
  try {
    telegramResponse = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildMessage(parsed.data),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
  } catch (error) {
    console.error("Telegram request failed:", error);
    return json(502, { ok: false, error: "Could not reach Telegram" });
  }

  if (!telegramResponse.ok) {
    // Log the reason for the owner, but never leak it to the visitor —
    // the body can contain the bot token or chat id.
    console.error(
      "Telegram rejected the message:",
      telegramResponse.status,
      await telegramResponse.text()
    );
    return json(502, { ok: false, error: "Could not deliver the message" });
  }

  return json(200, { ok: true });
}
