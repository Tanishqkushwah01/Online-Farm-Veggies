import { Mail } from "lucide-react";
import { gmailResend } from "../components/Api/authApi";

const VerifyEmail = () => {


  async function handleResend() {

    const info = JSON.parse(localStorage.getItem("userInfo")!);
    await gmailResend(info.email);

  }



  const openEmail = () => {
    window.open("https://mail.google.com/mail/u/0/#spam", "_blank");
    window.open("/page");
    window.close();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">

        <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <Mail size={40} className="text-green-600" />
        </div>

        <h1 className="text-3xl font-bold mt-6">
          Check your email
        </h1>

        <p className="text-gray-500 mt-3">
          We've sent a verification link to your email address.
          Please open your inbox and click the verification link.
        </p>

        <button
          onClick={openEmail}
          className="w-full mt-8 cursor-pointer bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Verify Email
        </button>

        <p className="text-sm text-gray-500 mt-6">
          Didn't receive the email?
        </p>

        <button
          onClick={handleResend} className="text-green-600 cursor-pointer font-semibold hover:underline mt-1">
          Resend Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;