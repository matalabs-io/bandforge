/**
 * BandForge waitlist -> Google Sheets
 *
 * Setup:
 * 1. Open your Google Sheet
 * 2. Extensions -> Apps Script
 * 3. Delete any existing code and paste ALL of this file
 * 4. Save (Ctrl/Cmd + S)
 * 5. Deploy -> Manage deployments -> Edit -> New version -> Deploy
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the stable /exec URL into GOOGLE_SHEETS_WEBHOOK_URL
 *
 * Test:
 * - Open /exec in the browser: {"status":"ok"}
 * - Open /exec?email=test@example.com: {"success":true}
 */

function doGet(e) {
  try {
    const email = getEmailFromRequest(e);

    if (!email) {
      return jsonResponse({ status: "ok" });
    }

    return appendEmail(email);
  } catch (error) {
    return jsonResponse({ success: false, error: String(error) });
  }
}

function doPost(e) {
  try {
    const email = getEmailFromRequest(e);
    return appendEmail(email);
  } catch (error) {
    return jsonResponse({ success: false, error: String(error) });
  }
}

function appendEmail(email) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ success: false, error: "Invalid email" });
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([email, new Date()]);

  return jsonResponse({ success: true });
}

function getEmailFromRequest(e) {
  if (e && e.parameter && e.parameter.email) {
    return String(e.parameter.email).trim().toLowerCase();
  }

  if (e && e.postData && e.postData.contents) {
    const contentType = String(e.postData.type || "").toLowerCase();

    if (contentType.indexOf("application/json") !== -1) {
      const payload = JSON.parse(e.postData.contents);
      return String(payload.email || "").trim().toLowerCase();
    }
  }

  return "";
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
