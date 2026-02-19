import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to?: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: EmailOptions) {
  const recipient = to || process.env.EMAIL_TO || "info@247fba.de";
  const sender = process.env.EMAIL_FROM || "noreply@247fba.de";

  // If SMTP is not configured, log and return success (dev mode)
  if (!process.env.SMTP_USER) {
    console.log("=== Email (dev mode - SMTP not configured) ===");
    console.log("To:", recipient);
    console.log("From:", sender);
    console.log("Subject:", subject);
    console.log("Reply-To:", replyTo || "N/A");
    console.log("Body:", html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
    console.log("============================================");
    return { success: true, dev: true };
  }

  await transporter.sendMail({
    from: `"24/7 FBA Prep" <${sender}>`,
    to: recipient,
    subject,
    html,
    replyTo,
  });

  return { success: true, dev: false };
}

export function contactEmailTemplate(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #1e2d3d; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
      </div>
      <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px;">Name</td>
            <td style="padding: 8px 0; color: #1a1a2e; font-weight: 600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #e8842c;">${data.email}</a></td>
          </tr>
          ${data.company ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Company</td><td style="padding: 8px 0; color: #1a1a2e;">${data.company}</td></tr>` : ""}
          ${data.phone ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone</td><td style="padding: 8px 0; color: #1a1a2e;">${data.phone}</td></tr>` : ""}
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Subject</td>
            <td style="padding: 8px 0; color: #1a1a2e; font-weight: 600;">${data.subject}</td>
          </tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
          <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px;">Message</p>
          <p style="color: #1a1a2e; margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>
    </div>
  `;
}

export function quoteEmailTemplate(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  monthlyUnits?: string;
  message: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #e8842c; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Quote Request</h1>
      </div>
      <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 140px;">Name</td>
            <td style="padding: 8px 0; color: #1a1a2e; font-weight: 600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #e8842c;">${data.email}</a></td>
          </tr>
          ${data.company ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Company</td><td style="padding: 8px 0; color: #1a1a2e;">${data.company}</td></tr>` : ""}
          ${data.phone ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone</td><td style="padding: 8px 0; color: #1a1a2e;">${data.phone}</td></tr>` : ""}
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Service</td>
            <td style="padding: 8px 0; color: #1a1a2e; font-weight: 600;">${data.service}</td>
          </tr>
          ${data.monthlyUnits ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Monthly Units</td><td style="padding: 8px 0; color: #1a1a2e;">${data.monthlyUnits}</td></tr>` : ""}
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
          <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px;">Details</p>
          <p style="color: #1a1a2e; margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>
    </div>
  `;
}
