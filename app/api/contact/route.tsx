// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // ensure Node runtime
export const dynamic = "force-dynamic"; // no caching of this route

// Reuse a single transporter (module-scope singleton)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, // STARTTLS
  requireTLS: true, // enforce TLS upgrade
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  pool: true, // ✅ connection pooling
  maxConnections: 5,
  maxMessages: 100,
  rateLimit: 10, // max emails per second
  // Faster failure + clearer diagnostics (doesn't fix blocked egress, but helps flakiness)
  connectionTimeout: 15_000, // default ~2min → fail fast
  greetingTimeout: 10_000,
  socketTimeout: 30_000,
  // Leave this OFF unless you absolutely need it
  // tls: { rejectUnauthorized: false },
});

async function sendEmailWithRetry(mailOptions: any, retries = 3) {
  let lastErr: any;
  for (let i = 0; i < retries; i++) {
    try {
      const result = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent:", result.messageId);
      return result;
    } catch (err: any) {
      lastErr = err;
      console.error(
        `❌ Email attempt ${i + 1} failed:`,
        err?.code || err?.message || err
      );
      // Retry only on transient network/socket failures
      const transient = ["ETIMEDOUT", "ECONNRESET", "ESOCKET"];
      if (!transient.includes(err?.code)) break;
      await new Promise((r) => setTimeout(r, Math.pow(2, i) * 1000)); // 1s, 2s, 4s
    }
  }
  throw lastErr;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, date, time, activity } = body;

    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ef4444; text-align: center;">Valentine's Day Date! 💕</h1>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h2 style="color: #333;">Date Details:</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Activity:</strong></p>
          <p style="background: white; padding: 15px; border-radius: 5px;">${activity}</p>
        </div>
        <p style="text-align: center; color: #666;">Can't wait to see you! ❤️</p>
      </div>
    `;

    const toAddress = process.env.EMAIL_TO;
    const recipients = `${toAddress}, ${email}`; // Send to both

    console.log("📨 Sending email to:", recipients);
    const result = await sendEmailWithRetry({
      from: `"Valentine's Day" <${process.env.SMTP_USER}>`,
      to: recipients,
      subject: `Valentine's Day Date Request 💕`,
      html: emailBody,
    });
    console.log("✅ Email delivery confirmed:", result.messageId);

    // Respond after send so logs appear reliably in Vercel
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Email error:", error);
    return NextResponse.json(
      { success: false, error: error.message || String(error) },
      { status: 500 }
    );
  }
}
