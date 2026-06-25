type WebhookResponse = {
  success?: boolean;
  status?: string;
  error?: string;
};

function parseWebhookResponse(text: string): WebhookResponse {
  return JSON.parse(text) as WebhookResponse;
}

function assertSuccessResponse(text: string): void {
  let data: WebhookResponse;

  try {
    data = parseWebhookResponse(text);
  } catch {
    throw new Error(
      `Google Sheets webhook returned invalid JSON. Response: ${text.slice(0, 200)}`,
    );
  }

  if (data.success === true) {
    return;
  }

  if (data.status === "ok") {
    throw new Error(
      "Google Sheets webhook returned health-check only. Apps Script may need redeploy, or POST append failed.",
    );
  }

  throw new Error(
    data.error ||
      `Google Sheets webhook did not confirm success: ${text.slice(0, 200)}`,
  );
}

async function fetchWebhook(
  url: string,
  init: RequestInit,
): Promise<{ response: Response; text: string }> {
  const response = await fetch(url, init);
  const text = await response.text();
  return { response, text };
}

async function appendViaPost(webhookUrl: string, email: string): Promise<void> {
  const initial = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ email }).toString(),
    redirect: "manual",
    cache: "no-store",
  });

  let response = initial;
  let text = await initial.text();

  if (initial.status >= 300 && initial.status < 400) {
    const location = initial.headers.get("location");
    if (!location) {
      throw new Error(
        `Google Sheets webhook redirected without Location header (${initial.status})`,
      );
    }

    const redirected = await fetchWebhook(location, {
      method: "GET",
      cache: "no-store",
    });
    response = redirected.response;
    text = redirected.text;
  }

  if (!response.ok) {
    throw new Error(
      `Google Sheets webhook failed (${response.status}): ${text.slice(0, 200)}`,
    );
  }

  assertSuccessResponse(text);
}

async function appendViaGet(webhookUrl: string, email: string): Promise<void> {
  const url = new URL(webhookUrl);
  url.searchParams.set("email", email);

  const { response, text } = await fetchWebhook(url.toString(), {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Google Sheets webhook GET fallback failed (${response.status}): ${text.slice(0, 200)}`,
    );
  }

  assertSuccessResponse(text);
}

export async function appendEmailToGoogleSheet(email: string): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("GOOGLE_SHEETS_WEBHOOK_URL is not set. Skipping Google Sheets sync.");
    return;
  }

  if (webhookUrl.includes("script.googleusercontent.com")) {
    throw new Error(
      "GOOGLE_SHEETS_WEBHOOK_URL must be the stable script.google.com/macros/s/.../exec URL.",
    );
  }

  try {
    await appendViaPost(webhookUrl, email);
    return;
  } catch (postError) {
    try {
      await appendViaGet(webhookUrl, email);
      return;
    } catch {
      throw postError;
    }
  }
}
