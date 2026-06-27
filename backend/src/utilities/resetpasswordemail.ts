import { transporter } from "../config/mail";

export const sendResetPasswordEmail = async (
  email: string,
  token: string
) => {

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Your Password",
    html: `
      <h2>Reset Password</h2>

      <p>Click the button below to reset your password.</p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>This link will expire in 15 minutes.</p>
    `,
  });
};