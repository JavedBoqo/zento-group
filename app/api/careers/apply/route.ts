import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { verifyRecaptchaToken } from "@/app/lib/recaptcha-server";

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
    let fullName = "";
    let email = "";
    let phone = "";
    let role = "";
    let location = "";
    let rightToWork = "";
    let drivingLicence = "";
    let careExperience = "";
    let message = "";
    let recaptchaToken = "";
    let cvFile: File | null = null;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      fullName = String(formData.get("fullName") || "").trim();
      email = String(formData.get("email") || "").trim();
      phone = String(formData.get("phone") || "").trim();
      role = String(formData.get("role") || "").trim();
      location = String(formData.get("location") || "").trim();
      rightToWork = String(formData.get("rightToWork") || "").trim();
      drivingLicence = String(formData.get("drivingLicence") || "").trim();
      careExperience = String(formData.get("careExperience") || "").trim();
      message = String(formData.get("message") || "").trim();
      recaptchaToken = String(formData.get("recaptchaToken") || "").trim();
      const fileEntry = formData.get("cvFile");
      if (fileEntry instanceof File && fileEntry.size > 0) {
        cvFile = fileEntry;
      }
    } else {
      const body = await req.json();
      fullName = String(body.fullName || "").trim();
      email = String(body.email || "").trim();
      phone = String(body.phone || "").trim();
      role = String(body.role || "").trim();
      location = String(body.location || "").trim();
      rightToWork = String(body.rightToWork || "").trim();
      drivingLicence = String(body.drivingLicence || "").trim();
      careExperience = String(body.careExperience || "").trim();
      message = String(body.message || "").trim();
      recaptchaToken = String(body.recaptchaToken || "").trim();
    }

    if (!fullName || !email || !phone || !role || !rightToWork) {
      return NextResponse.json(
        {
          success: false,
          code: "validation",
          error: "Please fill in all required fields (Name, Email, Phone, Role, Right to Work).",
        },
        { status: 400 }
      );
    }

    // Optional reCAPTCHA verification if token provided or env set
    if (recaptchaToken && process.env.RECAPTCHA_SECRET_KEY) {
      const recaptchaResult = await verifyRecaptchaToken(recaptchaToken);
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
    }

    const safeName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeRole = escapeHtml(role);
    const safeLocation = escapeHtml(location || "Not specified");
    const safeRightToWork = escapeHtml(rightToWork);
    const safeDrivingLicence = escapeHtml(drivingLicence || "Not specified");
    const safeCareExperience = escapeHtml(careExperience || "Not specified");
    const safeMessage = escapeHtml(message || "No additional message provided.").replace(/\n/g, "<br/>");
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zentogroup.co.uk";
    const safeSiteUrl = escapeHtml(siteUrl.replace(/\/$/, ""));

    // Prepare attachment if CV is uploaded
    const attachments: Array<{ filename: string; content: Buffer }> = [];
    if (cvFile) {
      const arrayBuffer = await cvFile.arrayBuffer();
      attachments.push({
        filename: cvFile.name,
        content: Buffer.from(arrayBuffer),
      });
    }

    // If SMTP is configured, send email notification
    if (process.env.SMTP_USER && process.env.SMTP_HOST) {
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
        from: `"Zento Careers" <${process.env.SMTP_USER}>`,
        to: process.env.MAIL_TO || process.env.SMTP_USER,
        replyTo: email,
        subject: `New Job Application: ${safeRole} - ${safeName}`,
        text: [
          `New Job Application Received via Zento Website`,
          `-------------------------------------------`,
          `Role Applying For: ${role}`,
          `Preferred Location: ${location || "Any"}`,
          `Applicant Name: ${fullName}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Right to Work in UK: ${rightToWork}`,
          `Driving Licence: ${drivingLicence}`,
          `Care Experience: ${careExperience}`,
          `CV Attached: ${cvFile ? cvFile.name : "No file uploaded"}`,
          ``,
          `Message:`,
          message || "(None)",
        ].join("\n"),
        attachments,
        html: `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06);">
            <tr>
              <td style="padding:24px 28px;background:#0d2644;text-align:center;">
                <img
                  src="${safeSiteUrl}/logo.svg"
                  alt="Zento Group"
                  width="110"
                  style="display:inline-block;width:110px;height:auto;margin-bottom:12px;"
                />
                <h1 style="margin:0;font-size:20px;line-height:1.2;font-weight:700;color:#ffffff;">
                  New Job Application
                </h1>
                <p style="margin:6px 0 0;font-size:13px;color:#cbd5e1;">
                  ${safeRole} · ${safeLocation}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;">Full Name</td>
                    <td align="right" style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:14px;font-weight:700;color:#0f172a;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;">Email Address</td>
                    <td align="right" style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:14px;font-weight:600;color:#0f172a;"><a href="mailto:${safeEmail}" style="color:#0ea5e9;text-decoration:none;">${safeEmail}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;">Phone Number</td>
                    <td align="right" style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:14px;font-weight:600;color:#0f172a;"><a href="tel:${safePhone.replace(/\s+/g, "")}" style="color:#0f172a;text-decoration:none;">${safePhone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;">Role Applied For</td>
                    <td align="right" style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:14px;font-weight:700;color:#0f172a;">${safeRole}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;">Preferred Location</td>
                    <td align="right" style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:14px;font-weight:600;color:#0f172a;">${safeLocation}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;">Right to Work in UK</td>
                    <td align="right" style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:14px;font-weight:600;color:#0f172a;">${safeRightToWork}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;">Driving Licence</td>
                    <td align="right" style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:14px;font-weight:600;color:#0f172a;">${safeDrivingLicence}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;">Care Experience</td>
                    <td align="right" style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:14px;font-weight:600;color:#0f172a;">${safeCareExperience}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:13px;color:#64748b;">CV File</td>
                    <td align="right" style="padding:10px 0;border-bottom:1px solid #eef2f7;font-size:14px;font-weight:600;color:#0f172a;">${cvFile ? `Attached (${escapeHtml(cvFile.name)})` : "No file attached"}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 24px;">
                <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#0f172a;font-weight:700;">
                  Applicant Note / Message
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
    }

    return NextResponse.json({
      success: true,
      message: "Application received! Our recruitment team will review your details and contact you shortly.",
    });
  } catch (error) {
    console.error("Careers Apply API error:", error);
    return NextResponse.json(
      {
        success: false,
        code: "submission_failed",
        error: "Application could not be submitted. Please call our office directly.",
      },
      { status: 500 }
    );
  }
}
