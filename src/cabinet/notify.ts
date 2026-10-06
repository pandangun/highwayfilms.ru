import "server-only";
import { after } from "next/server";
import { cabinetConfig } from "@/cabinet/config";
import { getDb } from "@/cabinet/db";
import { events } from "@/cabinet/db/schema";
import { newId } from "@/cabinet/util";

/**
 * Уведомления студии в Telegram. Пока бота нет (TELEGRAM_BOT_TOKEN и
 * TELEGRAM_CHAT_ID пустые), сообщение пишется в лог сервера.
 */
async function sendTelegram(text: string) {
  const { telegramToken, telegramChatId } = cabinetConfig;
  if (!telegramToken || !telegramChatId) {
    console.info(`[cabinet] ${text}`);
    return;
  }
  try {
    const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: telegramChatId, text, disable_web_page_preview: true }),
    });
    if (!response.ok) console.error(`[cabinet] Telegram ответил ${response.status}`);
  } catch (error) {
    console.error("[cabinet] Telegram недоступен", error);
  }
}

/**
 * Событие в ленту проекта и, если notify, сообщение студии. Сообщение
 * уходит после ответа — пара не ждёт Telegram.
 */
export async function logEvent(
  project: { id: string; code: string; title: string },
  type: string,
  text: string,
  { notify = true }: { notify?: boolean } = {},
) {
  const db = await getDb();
  await db.insert(events).values({ id: newId(), projectId: project.id, type, text });
  if (notify) {
    after(() => sendTelegram(`${project.title}: ${text}\n${cabinetConfig.baseUrl}/studio/p/${project.code}`));
  }
}
