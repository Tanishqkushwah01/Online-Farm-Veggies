// import { transporter } from "../config/mail";

// export const sendChangePasswordMail = async (
//   email: string,
//   token: string
// ) => {

//   const resetUrl =
//     `${process.env.CLIENT_URL}/reset-password/${token}`;

//   await transporter.sendMail({

//     from: process.env.EMAIL,

//     to: email,

//     subject: "Change Password",

//     html: `

//       <h2>Change Password</h2>

//       <p>Click below to change your password.</p>

//       <a href="${resetUrl}">
//           Change Password
//       </a>

//     `,
//   });
// };

import { transporter } from "../config/mail";

export const sendChangePasswordEmail = async (
  email: string,
  token: string
) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "🔒 Reset Your Password - Online Farm Veggies",
    html: `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Password</title>
</head>

<body style="margin:0;padding:0;background:#f4f7f5;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7f5;padding:40px 0;">
<tr>
<td align="center">

<table role="presentation" width="600" cellspacing="0" cellpadding="0"
style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.08);">

<!-- Header -->

<tr>
<td
style="
background:linear-gradient(135deg,#16a34a,#22c55e);
padding:45px;
text-align:center;
">

<div
style="
width:80px;
height:80px;
border-radius:50%;
background:rgba(255,255,255,.2);
display:inline-flex;
align-items:center;
justify-content:center;
font-size:42px;
">
🔒
</div>

<h1
style="
margin:20px 0 10px;
color:#ffffff;
font-size:34px;
font-weight:bold;
">
Online Farm Veggies
</h1>

<p
style="
margin:0;
color:#dcfce7;
font-size:16px;
">
Secure Your Account
</p>

</td>
</tr>

<!-- Body -->

<tr>
<td style="padding:50px;">

<h2
style="
margin:0;
font-size:30px;
color:#111827;
">
Password Reset Request 🔐
</h2>

<p
style="
font-size:17px;
color:#4b5563;
line-height:30px;
margin-top:20px;
">
We received a request to reset the password for your
<strong>Online Farm Veggies</strong> account.
</p>

<p
style="
font-size:17px;
color:#4b5563;
line-height:30px;
">
Click the button below to create a new password and regain access to your account.
</p>

<!-- Button -->

<table width="100%" cellspacing="0" cellpadding="0" style="margin:40px 0;">
<tr>
<td align="center">

<a
href="${resetUrl}"
target="_self"
rel="noopener"
style="
display:inline-block;
background:#16a34a;
color:#ffffff;
padding:18px 42px;
font-size:18px;
font-weight:bold;
text-decoration:none;
border-radius:10px;
box-shadow:0 6px 20px rgba(34,197,94,.3);
">
🔑 Change My Password
</a>

</td>
</tr>
</table>

<!-- Card -->

<table
width="100%"
cellspacing="0"
cellpadding="20"
style="
background:#f9fafb;
border:1px solid #e5e7eb;
border-radius:12px;
margin-bottom:30px;
">

<tr>
<td>

<h3
style="
margin:0 0 10px;
font-size:20px;
color:#16a34a;
">
🛡 Account Security
</h3>

<ul
style="
margin:0;
padding-left:20px;
color:#4b5563;
line-height:28px;
font-size:15px;
">
<li>Create a strong password</li>
<li>Never share your password</li>
<li>Keep your account protected</li>
<li>Continue shopping safely</li>
</ul>

</td>
</tr>

</table>

<p
style="
font-size:16px;
color:#6b7280;
line-height:28px;
">
⏰ This password reset link will expire in
<strong>30 minutes.</strong>
</p>

<p
style="
font-size:16px;
color:#6b7280;
line-height:28px;
">
If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
</p>

<hr
style="
border:none;
border-top:1px solid #e5e7eb;
margin:35px 0;
">

<p
style="
font-size:14px;
color:#6b7280;
line-height:24px;
">
If the button above doesn't work, copy and paste this URL into your browser:
</p>

<p
style="
font-size:14px;
color:#16a34a;
word-break:break-word;
line-height:24px;
">
${resetUrl}
</p>

</td>
</tr>

<!-- Footer -->

<tr>
<td
style="
background:#f9fafb;
padding:35px;
text-align:center;
">

<p
style="
margin:0;
font-size:18px;
font-weight:bold;
color:#16a34a;
">
🥕 Online Farm Veggies
</p>

<p
style="
margin:10px 0;
font-size:14px;
color:#6b7280;
">
Fresh Vegetables • Secure Shopping • Healthy Living
</p>

<div style="margin:20px 0;">
<span style="font-size:28px;">🥕</span>
<span style="font-size:28px;">🥬</span>
<span style="font-size:28px;">🍅</span>
<span style="font-size:28px;">🌽</span>
<span style="font-size:28px;">🥒</span>
</div>

<p
style="
font-size:13px;
color:#9ca3af;
margin:0;
">
© ${new Date().getFullYear()} Online Farm Veggies.
All Rights Reserved.
</p>

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
};