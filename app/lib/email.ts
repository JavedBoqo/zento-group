interface EmailAttachment {
  filename: string;
  /** Base64-encoded file content for the Resend API. */
  content: string;
}

interface EmailOptions {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
  fromName?: string;
  attachments?: EmailAttachment[];
}

/** Send an admin notification using the shared, server-side Resend configuration. */
export async function sendEmail({
  subject,
  text,
  html,
  replyTo,
  fromName = "Zento Website",
  attachments,
}: EmailOptions): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const mailFrom = process.env.MAIL_FROM;
  const mailTo = process.env.MAIL_TO;

  if (!apiKey || !mailFrom || !mailTo) {
    throw new Error(
      "Missing env: RESEND_API_KEY, MAIL_FROM and MAIL_TO are required."
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${fromName} <${mailFrom}>`,
      to: [mailTo],
      reply_to: replyTo,
      subject,
      text,
      html,
      attachments,
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Resend API ${response.status}: ${await response.text()}`);
  }
}
