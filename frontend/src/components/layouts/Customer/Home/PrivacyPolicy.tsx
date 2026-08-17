// import {
//   ArrowLeft,
//   ShieldCheck,
//   Lock,
//   Cookie,
//   UserCheck,
//   Mail,
//   Globe,
// } from "lucide-react";


// import { type ActivePage } from "../../../context/CustomerNavigationContext"; // path apne project ke hisaab se

// type PrivacyPolicyProps = {
//   setActivePage: (page: ActivePage) => void;
// };

// const PrivacyPolicy = ({ setActivePage }: PrivacyPolicyProps) => {
//   return (
//     <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50 px-6 py-8">
//       <div className="max-w-6xl mx-auto">
//         <button
//           onClick={() => setActivePage("home")}
//           className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-green-700 font-semibold shadow-md border border-green-100 hover:bg-green-600 hover:text-white transition cursor-pointer"
//         >
//           <ArrowLeft size={18} />
//           Go Back
//         </button>

//         <div className="overflow-hidden rounded-4xl bg-white shadow-2xl border border-green-100">
//           <div className="relative bg-linear-to-r from-green-700 via-green-600 to-emerald-500 px-8 md:px-14 py-14 text-white">
//             <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-white/10 blur-sm" />
//             <div className="absolute right-28 bottom-8 h-16 w-16 rounded-full bg-white/10" />

//             <div className="relative z-10 max-w-3xl">
//               <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">
//                 <ShieldCheck size={18} />
//                 Farm Veggies Privacy Center
//               </div>

//               <h1 className="text-4xl md:text-6xl font-extrabold">
//                 Privacy Policy
//               </h1>

//               <p className="mt-5 text-green-50 text-lg leading-8">
//                 We protect your personal information and use it only to provide
//                 fresh fruits, vegetables, order updates, delivery support, and a
//                 better shopping experience.
//               </p>

//               <p className="mt-6 text-sm text-green-100">
//                 Last Updated: July 3, 2026
//               </p>
//             </div>
//           </div>

//           <div className="p-6 md:p-12">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
//               <div className="rounded-3xl border border-green-100 bg-green-50 p-6">
//                 <Lock className="text-green-700 mb-4" size={30} />
//                 <h3 className="font-bold text-lg">Secure Data</h3>
//                 <p className="mt-2 text-gray-600 leading-7">
//                   Your details are protected with reasonable security measures.
//                 </p>
//               </div>

//               <div className="rounded-3xl border border-green-100 bg-green-50 p-6">
//                 <UserCheck className="text-green-700 mb-4" size={30} />
//                 <h3 className="font-bold text-lg">User Control</h3>
//                 <p className="mt-2 text-gray-600 leading-7">
//                   You can update your profile or request account deletion.
//                 </p>
//               </div>

//               <div className="rounded-3xl border border-green-100 bg-green-50 p-6">
//                 <Cookie className="text-green-700 mb-4" size={30} />
//                 <h3 className="font-bold text-lg">Simple Cookies</h3>
//                 <p className="mt-2 text-gray-600 leading-7">
//                   Cookies help us improve your browsing experience.
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-12">
//               <PolicySection title="1. Introduction">
//                 Welcome to Farm Veggies. Your privacy is important to us. This
//                 Privacy Policy explains how we collect, use, store, and protect
//                 your personal information when you use our website and services.
//               </PolicySection>

//               <section>
//                 <Title>2. Information We Collect</Title>

//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {[
//                     "Full Name",
//                     "Email Address",
//                     "Phone Number",
//                     "Profile Picture",
//                     "Delivery Address",
//                     "Order History",
//                     "Payment Status",
//                     "Account Information",
//                     "Support Messages",
//                   ].map((item) => (
//                     <div
//                       key={item}
//                       className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 font-medium text-gray-700"
//                     >
//                       {item}
//                     </div>
//                   ))}
//                 </div>

//                 <p className="mt-5 text-gray-600 leading-8">
//                   We do not store your card, UPI PIN, CVV, or sensitive payment
//                   details.
//                 </p>
//               </section>

//               <PolicySection title="3. How We Use Your Information">
//                 We use your information to process orders, deliver products,
//                 send order updates, provide customer support, improve our
//                 services, and maintain account security.
//               </PolicySection>

//               <PolicySection title="4. Sharing Your Information">
//                 We do not sell or rent your personal information. We may share
//                 necessary details only with trusted delivery partners, payment
//                 providers, or service providers required to complete your order.
//               </PolicySection>

//               <PolicySection title="5. Data Security">
//                 We use reasonable protection methods to reduce unauthorized
//                 access, disclosure, alteration, or misuse of your personal
//                 information. However, no online system can guarantee complete
//                 security.
//               </PolicySection>

//               <PolicySection title="6. Cookies">
//                 Our website may use cookies to remember preferences, improve
//                 performance, and understand how users interact with our platform.
//               </PolicySection>

//               <PolicySection title="7. Your Rights">
//                 You can update your profile, change your password, request
//                 account deletion, or contact us about your personal data.
//               </PolicySection>

//               <PolicySection title="8. Third-Party Services">
//                 We may use third-party services such as payment gateways, cloud
//                 storage, analytics tools, and delivery partners. These services
//                 may follow their own privacy policies.
//               </PolicySection>

//               <PolicySection title="9. Changes to This Policy">
//                 We may update this Privacy Policy from time to time. Updated
//                 changes will be shown on this page with the latest revision
//                 date.
//               </PolicySection>

//               <section className="rounded-[28px] bg-linear-to-r from-green-700 to-emerald-500 p-8 text-white">
//                 <h2 className="text-3xl font-bold mb-4">10. Contact Us</h2>

//                 <p className="text-green-50 leading-8 mb-6">
//                   If you have any questions about this Privacy Policy, you can
//                   contact us anytime.
//                 </p>

//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div className="rounded-2xl bg-white/15 border border-white/20 p-5">
//                     <Mail size={24} className="mb-3" />
//                     <p className="text-sm text-green-100">Email</p>
//                     <p className="font-bold">support@farmveggies.com</p>
//                   </div>

//                   <div className="rounded-2xl bg-white/15 border border-white/20 p-5">
//                     <Globe size={24} className="mb-3" />
//                     <p className="text-sm text-green-100">Website</p>
//                     <p className="font-bold">Farm Veggies</p>
//                   </div>
//                 </div>
//               </section>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Title = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <h2 className="mb-4 text-2xl md:text-3xl font-bold text-gray-900">
//       {children}
//     </h2>
//   );
// };

// const PolicySection = ({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) => {
//   return (
//     <section className="border-b border-gray-200 pb-10 last:border-b-0">
//       <Title>{title}</Title>
//       <p className="text-gray-600 leading-8 text-[16px]">{children}</p>
//     </section>
//   );
// };

// export default PrivacyPolicy;


import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Cookie,
  UserCheck,
  Mail,
  Globe,
} from "lucide-react";

import { type ActivePage } from "../../../context/CustomerNavigationContext";

type PrivacyPolicyProps = {
  setActivePage: (page: ActivePage) => void;
};

const PrivacyPolicy = ({ setActivePage }: PrivacyPolicyProps) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50 px-4 py-6 transition-colors duration-200 sm:px-6 sm:py-8 dark:from-[#0f171f] dark:via-[#111a21] dark:to-[#0f171f]">
      <div className="mx-auto w-full max-w-6xl">
        <button
          onClick={() => setActivePage("home")}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-100 bg-white px-5 py-3 font-semibold text-green-700 shadow-md transition hover:bg-green-600 hover:text-white cursor-pointer dark:border-[#29343c] dark:bg-[#141c23] dark:text-[#00c767] dark:hover:bg-green-600 dark:hover:text-white"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

        <div className="overflow-hidden rounded-4xl border border-green-100 bg-white shadow-2xl transition-colors duration-200 dark:border-[#29343c] dark:bg-[#141c23]">
          {/* Hero */}
          <div className="relative bg-linear-to-r from-green-700 via-green-600 to-emerald-500 px-6 py-10 text-white sm:px-8 sm:py-12 md:px-14 md:py-14">
            <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-white/10 blur-sm" />
            <div className="absolute bottom-8 right-28 h-16 w-16 rounded-full bg-white/10" />

            <div className="relative z-10 max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">
                <ShieldCheck size={18} />
                Farm Veggies Privacy Center
              </div>

              <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                Privacy Policy
              </h1>

              <p className="mt-5 break-words text-lg leading-8 text-green-50">
                We protect your personal information and use it only to
                provide fresh fruits, vegetables, order updates, delivery
                support, and a better shopping experience.
              </p>

              <p className="mt-6 text-sm text-green-100">
                Last Updated: July 3, 2026
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-8 md:p-12">
            <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="rounded-3xl border border-green-100 bg-green-50 p-6 transition-colors duration-200 dark:border-[#24533d] dark:bg-[#123126]">
                <Lock
                  className="mb-4 text-green-700 dark:text-[#00c767]"
                  size={30}
                />

                <h3 className="text-lg font-bold text-gray-900 dark:text-[#f5f7f8]">
                  Secure Data
                </h3>

                <p className="mt-2 leading-7 text-gray-600 dark:text-[#9aa7b1]">
                  Your details are protected with reasonable security
                  measures.
                </p>
              </div>

              <div className="rounded-3xl border border-green-100 bg-green-50 p-6 transition-colors duration-200 dark:border-[#24533d] dark:bg-[#123126]">
                <UserCheck
                  className="mb-4 text-green-700 dark:text-[#00c767]"
                  size={30}
                />

                <h3 className="text-lg font-bold text-gray-900 dark:text-[#f5f7f8]">
                  User Control
                </h3>

                <p className="mt-2 leading-7 text-gray-600 dark:text-[#9aa7b1]">
                  You can update your profile or request account deletion.
                </p>
              </div>

              <div className="rounded-3xl border border-green-100 bg-green-50 p-6 transition-colors duration-200 dark:border-[#24533d] dark:bg-[#123126]">
                <Cookie
                  className="mb-4 text-green-700 dark:text-[#00c767]"
                  size={30}
                />

                <h3 className="text-lg font-bold text-gray-900 dark:text-[#f5f7f8]">
                  Simple Cookies
                </h3>

                <p className="mt-2 leading-7 text-gray-600 dark:text-[#9aa7b1]">
                  Cookies help us improve your browsing experience.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <PolicySection title="1. Introduction">
                Welcome to Farm Veggies. Your privacy is important to us. This
                Privacy Policy explains how we collect, use, store, and protect
                your personal information when you use our website and services.
              </PolicySection>

              <section>
                <Title>2. Information We Collect</Title>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    "Full Name",
                    "Email Address",
                    "Phone Number",
                    "Profile Picture",
                    "Delivery Address",
                    "Order History",
                    "Payment Status",
                    "Account Information",
                    "Support Messages",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 font-medium text-gray-700 transition-colors duration-200 dark:border-[#29343c] dark:bg-[#192128] dark:text-[#f5f7f8]"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <p className="mt-5 leading-8 text-gray-600 dark:text-[#9aa7b1]">
                  We do not store your card, UPI PIN, CVV, or sensitive
                  payment details.
                </p>
              </section>

              <PolicySection title="3. How We Use Your Information">
                We use your information to process orders, deliver products,
                send order updates, provide customer support, improve our
                services, and maintain account security.
              </PolicySection>

              <PolicySection title="4. Sharing Your Information">
                We do not sell or rent your personal information. We may share
                necessary details only with trusted delivery partners, payment
                providers, or service providers required to complete your
                order.
              </PolicySection>

              <PolicySection title="5. Data Security">
                We use reasonable protection methods to reduce unauthorized
                access, disclosure, alteration, or misuse of your personal
                information. However, no online system can guarantee complete
                security.
              </PolicySection>

              <PolicySection title="6. Cookies">
                Our website may use cookies to remember preferences, improve
                performance, and understand how users interact with our
                platform.
              </PolicySection>

              <PolicySection title="7. Your Rights">
                You can update your profile, change your password, request
                account deletion, or contact us about your personal data.
              </PolicySection>

              <PolicySection title="8. Third-Party Services">
                We may use third-party services such as payment gateways,
                cloud storage, analytics tools, and delivery partners. These
                services may follow their own privacy policies.
              </PolicySection>

              <PolicySection title="9. Changes to This Policy">
                We may update this Privacy Policy from time to time. Updated
                changes will be shown on this page with the latest revision
                date.
              </PolicySection>

              {/* Contact */}
              <section className="rounded-[28px] bg-linear-to-r from-green-700 to-emerald-500 p-6 text-white sm:p-8">
                <h2 className="mb-4 text-3xl font-bold">
                  10. Contact Us
                </h2>

                <p className="mb-6 break-words leading-8 text-green-50">
                  If you have any questions about this Privacy Policy, you can
                  contact us anytime.
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/20 bg-white/15 p-5">
                    <Mail size={24} className="mb-3" />

                    <p className="text-sm text-green-100">
                      Email
                    </p>

                    <p className="break-all font-bold">
                      support@farmveggies.com
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/20 bg-white/15 p-5">
                    <Globe size={24} className="mb-3" />

                    <p className="text-sm text-green-100">
                      Website
                    </p>

                    <p className="font-bold">
                      Farm Veggies
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-[#f5f7f8]">
      {children}
    </h2>
  );
};

const PolicySection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="border-b border-gray-200 pb-10 last:border-b-0 dark:border-[#29343c]">
      <Title>{title}</Title>

      <p className="text-[16px] leading-8 text-gray-600 dark:text-[#9aa7b1]">
        {children}
      </p>
    </section>
  );
};

export default PrivacyPolicy;