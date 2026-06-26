import { transporter } from "../config/mail";

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `
      <h2>Welcome to Online Farm Veggies</h2>
      <p>Please click the button below to verify your email.</p>

      <a href="${verificationUrl}">
        Verify Email
      </a>
    `,
  });
};

