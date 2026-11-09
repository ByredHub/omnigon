import { NextResponse } from "next/server";

const MAX = { name: 120, email: 160, company: 160, topic: 120, message: 3000 };

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // honeypot: bots fill hidden fields
  if (clean(body.website, 50)) return NextResponse.json({ ok: true });

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const company = clean(body.company, MAX.company);
  const topic = clean(body.topic, MAX.topic);
  const message = clean(body.message, MAX.message);
  const lang = clean(body.lang, 5) || "en";

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const lines = [
    `<b>Новая заявка с сайта OMNIGON</b> (${lang.toUpperCase()})`,
    ``,
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
  ];
  if (company) lines.push(`<b>Компания:</b> ${escapeHtml(company)}`);
  if (topic) lines.push(`<b>Тема:</b> ${escapeHtml(topic)}`);
  lines.push(``, `<b>Сообщение:</b>`, escapeHtml(message));
  const text = lines.join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
  });

  if (!res.ok) {
    console.error("telegram error", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "telegram" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
