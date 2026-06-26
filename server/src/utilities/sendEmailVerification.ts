import { transporter } from "../config/mail";
export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const verificationUrl = `${process.env.SERVER_URL}/api/auth/verify-email/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
      subject: "🌱 Verify Your Email - Online Farm Veggies",
    html: `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify Email</title>
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
🥬
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
Fresh Vegetables Directly From Farmers
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
Welcome 👋
</h2>

<p
style="
font-size:17px;
color:#4b5563;
line-height:30px;
margin-top:20px;
">
Thank you for joining
<strong>Online Farm Veggies</strong>.
We're excited to have you on board!
</p>

<p
style="
font-size:17px;
color:#4b5563;
line-height:30px;
">
Before you can start shopping fresh vegetables from nearby farmers,
please verify your email address.
</p>

<!-- Button -->

<table width="100%" cellspacing="0" cellpadding="0" style="margin:40px 0;">
<tr>
<td align="center">

<a
href="${verificationUrl}"
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
✅ Verify My Email
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
🌿 Why Verify?
</h3>

<ul
style="
margin:0;
padding-left:20px;
color:#4b5563;
line-height:28px;
font-size:15px;
">
<li>Secure your account</li>
<li>Receive order updates</li>
<li>Track your deliveries</li>
<li>Access exclusive offers</li>
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
⏰ This verification link will expire in
<strong>30 minutes.</strong>
</p>

<p
style="
font-size:16px;
color:#6b7280;
line-height:28px;
">
If you didn't create this account,
you can safely ignore this email.
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
If the button above doesn't work,
copy and paste the following URL into your browser:
</p>

<p
style="
font-size:14px;
color:#16a34a;
word-break:break-word;
line-height:24px;
">
${verificationUrl}
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
Farm Fresh • Organic • Healthy Living
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
