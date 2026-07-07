// import {
// //   Facebook,
// //   Instagram,
// //   Twitter,
//   Mail,
//   Phone,
//   MapPin,
// } from "lucide-react";
// import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

// type FooterProps = {
//   setActivePage?: React.Dispatch<React.SetStateAction<string>>;
// };

// const Footer = ({ setActivePage }: FooterProps) => {
//   return (
//     <footer className="bg-white rounded-3xl border border-gray-200 shadow-sm px-8 py-10 mt-12">

//       {/* Top */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

//         {/* Logo */}
//         <div>
//           <h2 className="text-2xl font-bold text-green-700">
//             Farm Veggies
//           </h2>

//           <p className="text-gray-600 mt-4 leading-7">
//             Fresh fruits and vegetables delivered directly from trusted local
//             farmers to your doorstep.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="font-bold text-lg mb-4">
//             Quick Links
//           </h3>

//           <ul className="space-y-3">
//             <li>
//               <button
//                 onClick={() => setActivePage?.("home")}
//                 className="text-gray-600 hover:text-green-600 transition cursor-pointer"
//               >
//                 Home
//               </button>
//             </li>

//             <li>
//               <button
//                 onClick={() => setActivePage?.("wishlist")}
//                 className="text-gray-600 hover:text-green-600 transition cursor-pointer"
//               >
//                 Wishlist
//               </button>
//             </li>

//             <li>
//               <button
//                 onClick={() => setActivePage?.("orders")}
//                 className="text-gray-600 hover:text-green-600 transition cursor-pointer"
//               >
//                 Orders
//               </button>
//             </li>
//           </ul>
//         </div>

//         {/* Support */}
//         <div>
//           <h3 className="font-bold text-lg mb-4">
//             Support
//           </h3>

//           <ul className="space-y-3">
//             <li>
//               <button
//                 onClick={() => setActivePage?.("privacy")}
//                 className="text-gray-600 hover:text-green-600 transition cursor-pointer"
//               >
//                 Privacy Policy
//               </button>
//             </li>

//             <li>
//               <button
//                 onClick={() => setActivePage?.("help")}
//                 className="text-gray-600 hover:text-green-600 transition cursor-pointer"
//               >
//                 Help Center
//               </button>
//             </li>

//             <li>
//               <button
//                 onClick={() => setActivePage?.("settings")}
//                 className="text-gray-600 hover:text-green-600 transition cursor-pointer"
//               >
//                 Settings
//               </button>
//             </li>
//           </ul>
//         </div>

//         {/* Contact */}
//         <div>
//           <h3 className="font-bold text-lg mb-4">
//             Contact
//           </h3>

//           <div className="space-y-4">

//             <div className="flex items-center gap-3">
//               <Phone
//                 size={18}
//                 className="text-green-600"
//               />
//               <span className="text-gray-600">
//                 +91 98765 43210
//               </span>
//             </div>

//             <div className="flex items-center gap-3">
//               <Mail
//                 size={18}
//                 className="text-green-600"
//               />
//               <span className="text-gray-600">
//                 support@farmveggies.com
//               </span>
//             </div>

//             <div className="flex items-center gap-3">
//               <MapPin
//                 size={18}
//                 className="text-green-600"
//               />
//               <span className="text-gray-600">
//                 Indore, Madhya Pradesh
//               </span>
//             </div>

//             <div className="flex gap-3 pt-2">
//               <button className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-600 hover:text-white transition cursor-pointer">
//                 <FaFacebookF size={18} />
//               </button>

//               <button className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-600 hover:text-white transition cursor-pointer">
//                 <FaInstagram size={18} />
//               </button>

//               <button className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-600 hover:text-white transition cursor-pointer">
//                 <FaXTwitter size={18} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-gray-200 mt-10 pt-6">

//         <div className="flex flex-col md:flex-row justify-between items-center gap-4">

//           <p className="text-gray-500 text-sm">
//             © 2026 Farm Veggies. All Rights Reserved.
//           </p>

//           <div className="flex flex-wrap justify-center gap-6 text-sm">

//             <button
//               onClick={() => setActivePage?.("privacy")}
//               className="text-gray-500 hover:text-green-600 cursor-pointer"
//             >
//               Privacy Policy
//             </button>

//             <button className="text-gray-500 hover:text-green-600 cursor-pointer">
//               Terms & Conditions
//             </button>

//             <button className="text-gray-500 hover:text-green-600 cursor-pointer">
//               Contact Us
//             </button>

//             <button
//               onClick={() => setActivePage?.("help")}
//               className="text-gray-500 hover:text-green-600 cursor-pointer"
//             >
//               Help Center
//             </button>

//           </div>

//         </div>

//       </div>

//     </footer>
//   );
// };

// export default Footer;


const Footer = () => {
  return (
    <footer className="mt-10 border-t border-gray-200 pt-5 pb-2">
      <div className="flex flex-col items-center justify-between gap-3 text-sm text-gray-500 md:flex-row">
        <p>© 2026 Farm Veggies. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <button className="hover:text-green-600 transition">
            Privacy
          </button>

          <button className="hover:text-green-600 transition">
            Terms
          </button>

          <button className="hover:text-green-600 transition">
            Contact
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
