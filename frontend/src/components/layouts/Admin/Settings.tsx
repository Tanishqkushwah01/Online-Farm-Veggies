// import {
//   Bell,
//   Lock,
//   Mail,
//   Moon,
//   Phone,
//   Shield,
//   Sun,
//   User,
//   SquarePen,
//   LogOut,
//   Trash2,
// } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UpdateCard from "./UpdateCard";

// type ProfileType = {
//   name: string;
//   email: string;
//   phone: string;
//   shopName: string;
//   bio: string;
//   crops: string;
//   photo: string;
// };

// const Settings = () => {
//   const navigate = useNavigate();
//   const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

//   const [openUpdate, setOpenUpdate] = useState(false);
//   const [orderUpdates, setOrderUpdates] = useState(true);
//   const [emailAlerts, setEmailAlerts] = useState(true);
//   const [promotions, setPromotions] = useState(false);
//   const [theme, setTheme] = useState<"light" | "dark">("light");

//   const [profile, setProfile] = useState<ProfileType>({
//     name: userInfo.username || userInfo.name || "Tanishq Kushwah",
//     email: userInfo.email || "tanishq@gmail.com",
//     phone: userInfo.phoneNumber || "",
//     shopName: userInfo.shopName || "Fresh Farm Store",
//     bio:
//       userInfo.bio ||
//       "I provide fresh and organic vegetables directly from my farm.",
//     crops: userInfo.crops || "Potato, Tomato, Onion, Wheat",
//     photo: userInfo.image || "",
//   });

//   function handleLogout() {
//     localStorage.clear();
//     navigate("/login");
//   }

//   function handleDeleteAccount() {
//     const confirmDelete = confirm(
//       "Are you sure you want to permanently delete your account?"
//     );

//     if (!confirmDelete) return;

//     localStorage.clear();
//     alert("Account deleted permanently");
//     navigate("/register");
//   }

//   return (
//     <div className="min-h-screen rounded-md bg-[#EEF3EC] px-6 py-8">
//       <div className="mx-auto max-w-6xl">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-slate-900">Settings</h1>
//           <p className="mt-2 text-slate-600">
//             Manage your profile, security and preferences.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-7 lg:grid-cols-[300px_1fr]">
//           {/* LEFT SIDE */}
//           <div className="space-y-6">
//             {/* Profile Card */}
//             <div className="rounded-3xl bg-white p-6 shadow-lg">
//               <div className="flex min-h-[300px] flex-col items-center justify-center">
//                 <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-green-600 text-4xl font-bold text-white">
//                   {profile.photo ? (
//                     <img
//                       src={profile.photo}
//                       alt="Profile"
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     profile.name.charAt(0).toUpperCase()
//                   )}
//                 </div>

//                 <h2 className="mt-4 text-center text-2xl font-bold text-slate-900">
//                   {profile.name}
//                 </h2>

//                 <p className="mt-1 text-center font-semibold text-green-700">
//                   {profile.shopName}
//                 </p>

//                 <p className="mt-2 text-center text-sm text-slate-500">
//                   {profile.email}
//                 </p>
//               </div>
//             </div>

//             {/* Appearance */}
//             <div className="rounded-3xl bg-white p-6 shadow-lg">
//               <div className="mb-5 flex items-center gap-3">
//                 <Shield className="text-green-600" />
//                 <h2 className="text-2xl font-bold text-slate-900">
//                   Appearance
//                 </h2>
//               </div>

//               <div className="space-y-4">
//                 <button
//                   onClick={() => setTheme("light")}
//                   className={`flex h-14 w-full items-center justify-center gap-2 rounded-xl border font-semibold ${
//                     theme === "light"
//                       ? "border-green-600 bg-green-50 text-green-700"
//                       : "border-slate-300 bg-white text-slate-700"
//                   }`}
//                 >
//                   <Sun size={20} />
//                   Light
//                 </button>

//                 <button
//                   onClick={() => setTheme("dark")}
//                   className={`flex h-14 w-full items-center justify-center gap-2 rounded-xl border font-semibold ${
//                     theme === "dark"
//                       ? "border-green-600 bg-green-50 text-green-700"
//                       : "border-slate-300 bg-white text-slate-700"
//                   }`}
//                 >
//                   <Moon size={20} />
//                   Dark
//                 </button>
//               </div>
//             </div>

//             {/* Danger Zone */}
//             <div className="rounded-3xl border border-red-200 bg-white p-6 shadow-lg">
//               <div className="mb-5">
//                 <h2 className="text-2xl font-bold text-red-600">
//                   Danger Zone
//                 </h2>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Account related risky actions.
//                 </p>
//               </div>

//               <div className="space-y-3">
//                 <button
//                   onClick={handleLogout}
//                   className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-50 font-semibold text-red-600 hover:bg-red-100"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </button>

//                 <button
//                   onClick={handleDeleteAccount}
//                   className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700"
//                 >
//                   <Trash2 size={18} />
//                   Permanent Delete ID
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="space-y-6">
//             {/* Profile Information */}
//             <div className="rounded-3xl bg-white p-6 shadow-lg">
//               <div className="mb-6 flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <User className="text-green-600" />
//                   <h2 className="text-2xl font-bold text-slate-900">
//                     Profile Information
//                   </h2>
//                 </div>

//                 <button
//                   onClick={() => setOpenUpdate(true)}
//                   className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white hover:bg-green-700"
//                 >
//                   <SquarePen size={21} />
//                 </button>
//               </div>

//               <h2 className="text-3xl font-bold text-slate-900">
//                 {profile.name}
//               </h2>

//               <p className="mt-2 text-xl font-semibold text-green-700">
//                 {profile.shopName}
//               </p>

//               <div className="mt-4 flex items-center gap-2 text-slate-500">
//                 <Mail size={18} />
//                 <span>{profile.email}</span>
//               </div>

//               <div className="mt-2 flex items-center gap-2 text-slate-500">
//                 <Phone size={18} />
//                 <span>{profile.phone || "No phone number"}</span>
//               </div>

//               <div className="mt-6">
//                 <h3 className="font-bold text-slate-900">Bio</h3>
//                 <p className="mt-2 text-slate-600">{profile.bio}</p>
//               </div>

//               <div className="mt-5">
//                 <h3 className="font-bold text-slate-900">Crop Types</h3>
//                 <p className="mt-2 text-slate-600">{profile.crops}</p>
//               </div>
//             </div>

//             {/* Security */}
//             <div className="rounded-3xl bg-white p-6 shadow-lg">
//               <div className="mb-5 flex items-center gap-3">
//                 <Lock className="text-green-600" />
//                 <h2 className="text-2xl font-bold text-slate-900">Security</h2>
//               </div>

//               <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
//                 <div>
//                   <h3 className="font-semibold">Change Password</h3>
//                   <p className="text-sm text-slate-500">
//                     Update your account password.
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => navigate("/forgot-password")}
//                   className="rounded-lg bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700"
//                 >
//                   Change
//                 </button>
//               </div>
//             </div>

//             {/* Notifications */}
//             <div className="rounded-3xl bg-white p-6 shadow-lg">
//               <div className="mb-5 flex items-center gap-3">
//                 <Bell className="text-green-600" />
//                 <h2 className="text-2xl font-bold text-slate-900">
//                   Notifications
//                 </h2>
//               </div>

//               <div className="space-y-4">
//                 <ToggleRow
//                   title="Order Updates"
//                   description="Receive order and delivery updates."
//                   checked={orderUpdates}
//                   onChange={() => setOrderUpdates(!orderUpdates)}
//                 />

//                 <ToggleRow
//                   title="Email Alerts"
//                   description="Get important account alerts."
//                   checked={emailAlerts}
//                   onChange={() => setEmailAlerts(!emailAlerts)}
//                 />

//                 <ToggleRow
//                   title="Promotional Emails"
//                   description="Receive offers and discounts."
//                   checked={promotions}
//                   onChange={() => setPromotions(!promotions)}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {openUpdate && (
//         <UpdateCard
//           profile={profile}
//           setProfile={setProfile}
//           onClose={() => setOpenUpdate(false)}
//         />
//       )}
//     </div>
//   );
// };

// type ToggleRowProps = {
//   title: string;
//   description: string;
//   checked: boolean;
//   onChange: () => void;
// };

// const ToggleRow = ({ title, description, checked, onChange }: ToggleRowProps) => {
//   return (
//     <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
//       <div>
//         <h3 className="font-semibold text-slate-900">{title}</h3>
//         <p className="text-sm text-slate-500">{description}</p>
//       </div>

//       <button
//         onClick={onChange}
//         className={`relative h-7 w-14 rounded-full transition ${
//           checked ? "bg-green-600" : "bg-slate-300"
//         }`}
//       >
//         <span
//           className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
//             checked ? "left-8" : "left-1"
//           }`}
//         />
//       </button>
//     </div>
//   );
// };

// export default Settings;
