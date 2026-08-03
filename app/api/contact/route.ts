import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { verifyRecaptchaToken } from "@/app/lib/recaptcha-server";

interface ContactPayload {
  type?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  message?: string;
  recaptchaToken?: string;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    const fullName = String(body.fullName || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();
    const enquiryType = String(body.type || "General Enquiry").trim();

    if (!fullName || !phone || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          code: "validation",
          error: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    const recaptchaResult = await verifyRecaptchaToken(
      String(body.recaptchaToken || "").trim()
    );
    

    if (!recaptchaResult.valid) {
      return NextResponse.json(
        {
          success: false,
          code: "verification",
          error: recaptchaResult.error,
        },
        { status: 400 }
      );
    }

    const safeType = escapeHtml(enquiryType);
    const safeName = escapeHtml(fullName);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zentogroup.co.uk";
    const safeSiteUrl = escapeHtml(siteUrl.replace(/\/$/, ""));

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    await transporter.sendMail({
      from: `"Zento Website" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Care Enquiry: ${enquiryType}`,
      text: [
        `Type: ${enquiryType}`,
        `Name: ${fullName}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;color:#0f172a;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      New care enquiry received from the Zento website.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;">
            <tr>
              <td style="padding:24px 28px 14px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td align="center" style="vertical-align:middle;">
                      <img
                        src="${safeSiteUrl}/logo.svg"
                        alt="Zento Home Care"
                        width="88"
                        style="display:block;width:88px;max-width:88px;height:auto;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="vertical-align:middle;padding-top:10px;">
                      <h1 style="margin:0;font-size:22px;line-height:1.2;font-weight:700;color:#2e5aa5;">
                        New Care Enquiry
                      </h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;">Enquiry Type</td>
                    <td align="right" style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:14px;font-weight:600;color:#0f172a;">${safeType}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;">Full Name</td>
                    <td align="right" style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:14px;font-weight:600;color:#0f172a;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;">Phone</td>
                    <td align="right" style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:14px;font-weight:600;color:#0f172a;">${safePhone}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;font-size:13px;color:#64748b;">Email</td>
                    <td align="right" style="padding:10px 0;font-size:14px;font-weight:600;color:#0f172a;">${safeEmail}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 24px;">
                <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#2e5aa5;font-weight:700;">
                  Message
                </p>
                <div style="padding:14px 16px;background:#f8fafc;border-radius:8px;color:#1e293b;font-size:14px;line-height:1.7;">
                  ${safeMessage}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email received. We'll be in touch shortly.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        code: "send_failed",
        error: "Email could not be sent. Please try again.",
      },
      { status: 500 }
    );
  }
}
