export const dynamic = "force-dynamic"; // defaults to auto

import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.zeptomail.in",
  port: 587,
  auth: {
    user: process.env.ZEPTO_MAIL,
    pass: process.env.ZEPTO_MAIL_PASS,
  },
});

export async function POST(request) {
  try {
    // Check if environment variables are set correctly
    if (!process.env.ZEPTO_MAIL || !process.env.ZEPTO_MAIL_PASS) {
      throw new Error("Missing environment variables: ZEPTO_MAIL or ZEPTO_MAIL_PASS");
    }

    const body = await request.json();

    const mailOptions = {
      from: '"Basic Funda" <noreply@basicfunda.letsnailthis.guru>',
      to: body.email,
      subject: body.subject,
      html: body.message,
    };

    // Send the email
    await transport.sendMail(mailOptions);
    console.log("Mail Sent Successfully");

    return new Response(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error sending mail:", error);
    return new Response(JSON.stringify({ status: "error", error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
