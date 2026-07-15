import {
  ArrowLeft,
  Mail,
  Phone,
  MessageCircle,
  CircleHelp,
  ShieldCheck,
  FileText,
  ChevronRight,
} from "lucide-react";

// type HelpSupportProps = {
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
// };

import { type ActivePage } from "../../../context/CustomerNavigationContext"; // path apne project ke hisaab se

type HelpSupportProps = {
  setActivePage: (page: ActivePage) => void;
};


const HelpSupport = ({ setActivePage }: HelpSupportProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Go Back */}
        <button
          onClick={() => setActivePage("home")}
          className="mb-8 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition cursor-pointer"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

        {/* Header */}
        <div className="bg-linear-to-r from-green-600 to-green-500 rounded-3xl text-white p-10 shadow-lg">
          <h1 className="text-4xl font-bold">
            Help & Support
          </h1>

          <p className="mt-3 text-green-100 text-lg">
            Need assistance? We're here to help you with your account,
            orders, payments, and anything else.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <Mail className="text-green-600 mb-4" size={35} />
            <h2 className="text-xl font-semibold">
              Email Support
            </h2>

            <p className="text-gray-500 mt-2">
              Contact our support team anytime.
            </p>

            <p className="mt-4 font-medium text-green-600">
              support@onlinefarmveggies.com
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <Phone className="text-green-600 mb-4" size={35} />
            <h2 className="text-xl font-semibold">
              Call Us
            </h2>

            <p className="text-gray-500 mt-2">
              Monday - Saturday
            </p>

            <p className="mt-4 font-medium text-green-600">
              +91 98765 43210
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <MessageCircle className="text-green-600 mb-4" size={35} />
            <h2 className="text-xl font-semibold">
              Live Chat
            </h2>

            <p className="text-gray-500 mt-2">
              Chat with our support team instantly.
            </p>

            <button className="mt-5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition cursor-pointer">
              Start Chat
            </button>
          </div>

        </div>

        {/* FAQ */}
        <div className="mt-12 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">

            <div className="border rounded-xl p-5 hover:bg-gray-50 cursor-pointer transition">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <CircleHelp className="text-green-600" />
                  <span className="font-medium">
                    How do I place an order?
                  </span>
                </div>

                <ChevronRight />
              </div>
            </div>

            <div className="border rounded-xl p-5 hover:bg-gray-50 cursor-pointer transition">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <FileText className="text-green-600" />
                  <span className="font-medium">
                    How can I track my order?
                  </span>
                </div>

                <ChevronRight />
              </div>
            </div>

            <div className="border rounded-xl p-5 hover:bg-gray-50 cursor-pointer transition">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <ShieldCheck className="text-green-600" />
                  <span className="font-medium">
                    Is my payment secure?
                  </span>
                </div>

                <ChevronRight />
              </div>
            </div>

            <div className="border rounded-xl p-5 hover:bg-gray-50 cursor-pointer transition">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <CircleHelp className="text-green-600" />
                  <span className="font-medium">
                    How do I update my profile?
                  </span>
                </div>

                <ChevronRight />
              </div>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 bg-green-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold">
            Still Need Help?
          </h2>

          <p className="mt-3 text-green-100">
            Our support team is available 24/7 to assist you.
          </p>

          <button className="mt-6 bg-white text-green-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition cursor-pointer">
            Contact Support
          </button>
        </div>

      </div>
    </div>
  );
};

export default HelpSupport;