"use server";

import { Resend } from "resend";
import { supabase } from "./supabase";
import { cookies, headers } from "next/headers";
import crypto from "crypto";

// Helper to sanitize inputs and prevent HTML/script injection
function sanitize(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Helper to get user's IP address and return a secure SHA-256 hash for privacy
async function getClientIpHash(): Promise<string> {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const realIp = headerList.get("x-real-ip");
  
  // Use first IP if behind a proxy, fallback to real-ip, localhost, or unknown
  const ip = forwardedFor 
    ? forwardedFor.split(",")[0].trim() 
    : (realIp || "127.0.0.1");

  return crypto.createHash("sha256").update(ip).digest("hex");
}

// Helper function to check if the session is currently authenticated
async function checkIsAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("mail_access_key");
  
  if (!cookie || !cookie.value) {
    return false;
  }

  const { data: isValid } = await supabase.rpc("verify_mail_access_key", {
    input_key: cookie.value,
  });

  return !!isValid;
}

/**
 * Validates access key and sets a secure HttpOnly cookie if correct
 */
export async function verifyAccessKeyAction(key: string) {
  if (!key || key.trim() === "") {
    return { success: false, error: "Access key is required" };
  }

  try {
    const { data: isValid, error } = await supabase.rpc("verify_mail_access_key", {
      input_key: key,
    });

    if (error) {
      console.error("Supabase RPC error:", error);
      return { success: false, error: "Failed to connect to database" };
    }

    if (isValid) {
      const cookieStore = await cookies();
      cookieStore.set("mail_access_key", key, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });
      return { success: true };
    }

    return { success: false, error: "Invalid access key" };
  } catch (err) {
    console.error("verifyAccessKeyAction exception:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}

/**
 * Removes the secure authentication cookie
 */
export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("mail_access_key");
    return { success: true };
  } catch (err) {
    console.error("logoutAction exception:", err);
    return { success: false, error: "Failed to log out" };
  }
}

/**
 * Securely sends an email using Resend, with input sanitization, 
 * format validation, authentication check, and database rate-limiting
 */
export async function sendEmailAction(formData: {
  to: string;
  subject: string;
  message: string;
}) {
  // 1. Authenticate user
  const isAuthorized = await checkIsAuthorized();
  if (!isAuthorized) {
    return { success: false, error: "Unauthorized. Please enter a valid access key." };
  }

  const { to, subject, message } = formData;

  // 2. Validate fields are present
  if (!to || !subject || !message) {
    return { success: false, error: "All fields are required" };
  }

  // 3. Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    return { success: false, error: "Please provide a valid recipient email address" };
  }

  // 4. Sanitize inputs to prevent script injections
  const sanitizedTo = sanitize(to.trim());
  const sanitizedSubject = sanitize(subject.trim());
  const sanitizedMessage = sanitize(message.trim());

  try {
    // 5. Rate Limit Verification
    const ipHash = await getClientIpHash();
    const { data: sentCount, error: countError } = await supabase.rpc("check_mail_rate_limit", {
      input_ip_hash: ipHash,
    });

    if (countError) {
      console.error("Rate limit check db error:", countError);
      return { success: false, error: "Failed to process rate limit check" };
    }

    if (sentCount !== null && sentCount >= 5) {
      return { 
        success: false, 
        error: "Rate limit exceeded. Maximum 5 emails per hour allowed." 
      };
    }

    // 6. Send email using Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return { success: false, error: "Resend API key is not configured" };
    }

    const resend = new Resend(resendApiKey);

    // Format the email html with a professional dark/gradient theme matches the web styling
    const emailHtml = `
      <div style="font-family: sans-serif; background-color: #0c0d1c; color: #f8f9ff; padding: 40px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 12px 40px rgba(0,0,0,0.6);">
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 20px; margin-bottom: 25px;">
          <h2 style="margin: 0; color: #00d2ff; font-weight: 700; font-size: 24px; letter-spacing: -0.02em;">Abdullah Shaimy Portfolio</h2>
          <p style="margin: 5px 0 0 0; color: #b4bada; font-size: 14px;">Secure Direct Mail System</p>
        </div>
        <div style="margin-bottom: 25px;">
          <p style="font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 5px 0;">Subject</p>
          <p style="font-size: 16px; font-weight: bold; color: #f8f9ff; margin: 0;">${sanitizedSubject}</p>
        </div>
        <div style="background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.03); border-radius: 12px; padding: 20px; margin-bottom: 25px;">
          <p style="font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 10px 0;">Message</p>
          <p style="font-size: 15px; color: #b4bada; white-space: pre-wrap; line-height: 1.6; margin: 0;">${sanitizedMessage}</p>
        </div>
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 15px; font-size: 12px; color: #6b7280; text-align: center;">
          Sent securely from portfolio control center to <strong>${sanitizedTo}</strong>.
        </div>
      </div>
    `;

    const sendResult = await resend.emails.send({
      from: "dev@abdullahshaimy.lk",
      to: sanitizedTo,
      subject: sanitizedSubject,
      text: sanitizedMessage, // Plain text fallback
      html: emailHtml,
    });

    if (sendResult.error) {
      console.error("Resend API error response:", sendResult.error);
      return { success: false, error: sendResult.error.message || "Failed to dispatch email" };
    }

    // 7. Log attempt to database on success
    const { error: logError } = await supabase
      .from("mail_logs")
      .insert({ ip_hash: ipHash });

    if (logError) {
      // Just log locally, do not block success return since email has sent
      console.error("Failed to log sent email to db:", logError);
    }

    return { success: true };
  } catch (err: any) {
    console.error("sendEmailAction exception:", err);
    return { success: false, error: err.message || "An unexpected error occurred while sending email" };
  }
}
