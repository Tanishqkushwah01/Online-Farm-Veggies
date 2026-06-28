import { transporter } from "../config/mail";

export const sendChangePasswordMail = async (
  email: string,
  token: string
) => {

  const resetUrl =
    `${process.env.CLIENT_URL}/change-password/${token}`;

  await transporter.sendMail({

    from: process.env.EMAIL,

    to: email,

    subject: "Change Password",

    html: `

      <h2>Change Password</h2>

      <p>Click below to change your password.</p>

      <a href="${resetUrl}">
          Change Password
      </a>

    `,
  });
};