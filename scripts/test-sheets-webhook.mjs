#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env");
  const content = readFileSync(envPath, "utf8");

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index);
    const value = trimmed.slice(index + 1);
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function assertSuccess(text) {
  const data = JSON.parse(text);
  if (data.success === true) return;
  if (data.status === "ok") {
    throw new Error(
      'Health-check only ({"status":"ok"}). Redeploy Apps Script or use POST append.',
    );
  }
  throw new Error(data.error || `Unexpected response: ${text.slice(0, 200)}`);
}

async function appendViaPost(webhookUrl, email) {
  const initial = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ email }).toString(),
    redirect: "manual",
  });

  console.log("initial status:", initial.status);

  let response = initial;
  let text = await initial.text();

  if (initial.status >= 300 && initial.status < 400) {
    const location = initial.headers.get("location");
    if (!location) {
      throw new Error("Redirect without Location header");
    }
    response = await fetch(location, { method: "GET" });
    text = await response.text();
  }

  console.log("final status:", response.status);
  console.log("body:", text.slice(0, 200));

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${text.slice(0, 200)}`);
  }

  assertSuccess(text);
}

async function main() {
  loadEnv();

  const email = process.argv[2];
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!email) {
    console.error("Usage: node scripts/test-sheets-webhook.mjs test@example.com");
    process.exit(1);
  }

  if (!webhookUrl) {
    console.error("GOOGLE_SHEETS_WEBHOOK_URL is not set in .env");
    process.exit(1);
  }

  if (webhookUrl.includes("script.googleusercontent.com")) {
    console.error(
      "Use the stable script.google.com/macros/s/.../exec URL, not a googleusercontent redirect URL.",
    );
    process.exit(1);
  }

  await appendViaPost(webhookUrl, email);
  console.log("success: true");
}

main().catch((error) => {
  console.error("failed:", error.message);
  process.exit(1);
});
