// console.log("mail.ts Loaded")
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Error:", error);
  } else {
    console.log("SMTP Server is ready");
  }
});