"use server";

import { appendEmailToGoogleSheet } from "@/lib/google-sheets";
import { createSupabaseClient } from "@/lib/supabase";

export type WaitlistResult =
  | { success: true }
  | { success: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function emailDomain(email: string): string {
  return email.split("@")[1] ?? "unknown";
}

async function syncEmailToSheet(email: string): Promise<void> {
  try {
    await appendEmailToGoogleSheet(email);
  } catch (sheetError) {
    console.error(
      `Failed to sync waitlist email to Google Sheets (domain: ${emailDomain(email)}):`,
      sheetError,
    );
  }
}

export async function joinWaitlist(formData: FormData): Promise<WaitlistResult> {
  const rawEmail = formData.get("email");
  const email =
    typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";

  if (!email) {
    return { success: false, error: "Please enter your email address." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    const supabase = createSupabaseClient();
    const { error } = await supabase.from("waitlist").insert({ email });

    const isDuplicate = error?.code === "23505";

    if (error && !isDuplicate) {
      return {
        success: false,
        error: "Something went wrong. Please try again.",
      };
    }

    // Sync for new signups and duplicates: some emails were saved to Supabase
    // while Google Sheets sync was broken, so resubmits should still backfill.
    await syncEmailToSheet(email);

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
