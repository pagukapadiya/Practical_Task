const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: process.env.EMAILSERVICE,
  port: 587,
  secure: true,
  auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASSWORD,
  },
});

/**
 * Load static email template from JSON
 */
const loadStaticTemplate = (templateKey) => {
  try {
    const filePath = path.join(__dirname, "templates", `${templateKey}.json`);
    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error loading template: ${templateKey}`, error);
    return null;
  }
};

/**
 * Replace shortcodes like {{name}} with actual values
 */
const injectReplacements = (template, replacements) => {
  const regex = new RegExp(
    `{{(${Object.keys(replacements).join("|")}})}}`,
    "g"
  );
  return template.replace(regex, (_, key) => replacements[key] || "");
};

/**
 * Send an email using either a static template or direct HTML
 */
const sendEmail = async (emailOptions) => {
  if (!emailOptions.template && !emailOptions.html) {
    throw new Error("Please provide a template or HTML content.");
  }

  const logo = process.env.EMAIL_LOGO_URL || "#";
  const copyright =
    process.env.COPYRIGHT_TEXT ||
    "© " + new Date().getFullYear() + " " + "Practice App";

  // Load and prepare HTML content
  let htmlContent = emailOptions.html || "";
  let subject = emailOptions.subject || "";

  if (emailOptions.template) {
    const staticTemplate = loadStaticTemplate(emailOptions.template);
    if (!staticTemplate) throw new Error("Template not found");
    htmlContent = staticTemplate.content;
    subject = staticTemplate.subject;
  }

  // Apply replacements
  if (emailOptions.replacements) {
    htmlContent = injectReplacements(htmlContent, emailOptions.replacements);
  }

  const finalHtml = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body { font-family: 'Segoe UI', sans-serif; background: #f7f7f7; margin: 0; padding: 0; }
        .email-container { background: #ffffff; margin: 30px auto; max-width: 600px; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05); }
        .header { text-align: center; padding: 20px; }
        .header img { max-height: 80px; }
        .content { font-size: 16px; color: #333; line-height: 1.6; }
        .footer { text-align: center; font-size: 12px; color: #888; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <a href="#"><img src="${logo}" alt="Logo" /></a>
        </div>
        <div class="content">
          ${htmlContent}
        </div>
        <div class="footer">
          ${copyright}
        </div>
      </div>
    </body>
  </html>`;

  const emailConfig = {
    to: emailOptions.to,
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
    subject,
    html: finalHtml,
  };

  try {
    await transporter.sendMail(emailConfig);
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
};

module.exports = {
  sendEmail,
};
