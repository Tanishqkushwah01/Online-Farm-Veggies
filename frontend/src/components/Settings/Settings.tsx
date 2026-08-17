// import {
//   AlertTriangle,
//   Lock,
//   LogOut,
//   Mail,
//   MapPin,
//   Moon,
//   Phone,
//   Shield,
//   SquarePen,
//   Sun,
//   Trash2,
//   User,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import UpdateCard from "./UpdateCard";
// import useWebNavigate from "../hooks/useWebNavigate";
// import { logoutUser } from "../Api/authApi";

// type ProfileType = {
//   username: string;
//   email: string;
//   phoneNumber: string;
//   farmName?: string;
//   farmAddress?: string;
//   bio: string;
//   crops?: string;
//   profilePicture: string;
//   city: string;
// };

// import {type ActivePage } from "../context/CustomerNavigationContext"; // path apne project ke hisaab se
// import { useTheme } from "../context/ThemeContext";

// type SettingsProps = {
//   setActivePage: (page: ActivePage) => void;
// };

// const Settings = ({ setActivePage }: SettingsProps) => {
//   const { gotoLogin } = useWebNavigate();

//   const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
//   const role = userInfo.role?.toLowerCase();

//   const [openUpdate, setOpenUpdate] = useState(false);
//   const { theme, setTheme } = useTheme();

//   const [profile, setProfile] = useState<ProfileType>({
//     username: userInfo.username || "Tanishq Kushwah",
//     email: userInfo.email || "tanishq@gmail.com",
//     phoneNumber: String(userInfo.phoneNumber || ""),
//     farmName: userInfo.farmName || "",
//     farmAddress: userInfo.farmAddress || "",
//     bio:
//       userInfo.bio ||
//       "I provide fresh and organic vegetables directly from my farm.",
//     crops: Array.isArray(userInfo.mainCrops)
//       ? userInfo.mainCrops.join(", ")
//       : userInfo.mainCrops || userInfo.crops || "Potato, Tomato, Onion, Wheat",
//     profilePicture: userInfo.profilePicture || userInfo.image || "",
//     city: userInfo.city || "",
//   });

//   useEffect(() => {
//     if (userInfo.isProfileCompleted === false) {
//       setOpenUpdate(true);
//     }
//   }, []);

//   async function handleLogout() {
//     try {
//       const res = await logoutUser();

//       if (res.data.success) {
//         localStorage.clear();
//         gotoLogin();
//       }
//     } catch (error: any) {
//       console.log("Logout Error:", error.response?.data || error.message);
//     }
//   }

// //   return (
// //     <div className="min-h-screen rounded-md bg-gray-300 px-6 py-8">
// //       <div className="mx-auto max-w-7xl">
// //         <div className="mb-8 flex items-start gap-10">
// //           {userInfo.role === "Customer" && (
// //             <button
// //               onClick={() => setActivePage("home")}
// //               className="cursor-pointer rounded-lg bg-green-600 px-6 py-3 text-base font-semibold text-white hover:bg-green-700"
// //             >
// //               Go Back
// //             </button>
// //           )}

// //           <div>
// //             <h1 className="text-4xl font-bold text-slate-900">Settings</h1>
// //             <p className="mt-2 text-slate-600">
// //               Manage your profile, security and preferences.
// //             </p>
// //           </div>
// //         </div>

// //         <div className="space-y-7">
// //           <div className="rounded-3xl bg-white p-7 shadow-lg">
// //             <div className="mb-7 flex items-center justify-between">
// //               <div className="flex items-center gap-3">
// //                 <User className="text-green-600" />
// //                 <h2 className="text-2xl font-bold text-slate-900">
// //                   Profile Information
// //                 </h2>
// //               </div>

// //               <button
// //                 onClick={() => setOpenUpdate(true)}
// //                 className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-green-600 text-white transition hover:bg-green-700"
// //               >
// //                 <SquarePen size={21} />
// //               </button>
// //             </div>

// //             <div className="flex items-start gap-10">
// //               {profile.profilePicture ? (
// //                 <img
// //                   src={profile.profilePicture}
// //                   alt="Profile"
// //                   className="h-40 w-40 shrink-0 rounded-full object-cover"
// //                 />
// //               ) : (
// //                 <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
// //                   <User size={54} />
// //                 </div>
// //               )}

// //               <div className="flex-1">
// //                 <h2 className="text-4xl font-bold text-slate-900">
// //                   {profile.username}
// //                 </h2>

// //                 <div className="mt-5 space-y-3 text-slate-500">
// //                   <div className="flex items-center gap-3">
// //                     <Mail size={18} />
// //                     <span>{profile.email}</span>
// //                   </div>

// //                   <div className="flex items-center gap-3">
// //                     <Phone size={18} />
// //                     <span>{profile.phoneNumber || "No phone number"}</span>
// //                   </div>

// //                   <div className="flex items-center gap-3">
// //                     <MapPin size={18} />
// //                     <span>{profile.city || "No city added"}</span>
// //                   </div>
// //                 </div>

// //                 <div className="mt-7">
// //                   <h3 className="font-bold text-slate-900">Bio</h3>
// //                   <p className="mt-2 text-slate-600">
// //                     {profile.bio || "No bio added"}
// //                   </p>
// //                 </div>

// //                 {role === "farmer" && (
// //                   <div className="mt-5">
// //                     <h3 className="font-bold text-slate-900">Crop Types</h3>
// //                     <p className="mt-2 text-slate-600">{profile.crops}</p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="rounded-3xl bg-white p-6 shadow-lg">
// //             <div className="mb-5 flex items-center gap-3">
// //               <Lock className="text-green-600" />
// //               <h2 className="text-2xl font-bold text-slate-900">
// //                 Change Password
// //               </h2>
// //             </div>

// //             <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
// //               <div>
// //                 <h3 className="font-semibold">Change Password</h3>
// //                 <p className="text-sm text-slate-500">
// //                   Update your account password.
// //                 </p>
// //               </div>

// //               <button
// //                 onClick={() => setActivePage("changePassword")}
// //                 className="cursor-pointer rounded-lg bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700"
// //               >
// //                 Change
// //               </button>
// //             </div>
// //           </div>

// //           <div className="rounded-3xl bg-white p-6 shadow-lg">
// //             <div className="mb-5 flex items-center gap-3">
// //               <Shield className="text-green-600" />
// //               <h2 className="text-2xl font-bold text-slate-900">
// //                 Appearance
// //               </h2>
// //             </div>

// //             <div className="grid grid-cols-2 gap-4">
// //               <button
// //                 onClick={() => setTheme("light")}
// //                 className={`flex h-16 cursor-pointer items-center justify-center gap-2 rounded-xl border font-semibold ${
// //                   theme === "light"
// //                     ? "border-green-600 bg-green-50 text-green-700"
// //                     : "border-slate-300 bg-white text-slate-700"
// //                 }`}
// //               >
// //                 <Sun size={20} />
// //                 Light
// //               </button>

// //               <button
// //                 onClick={() => setTheme("dark")}
// //                 className={`flex h-16 cursor-pointer items-center justify-center gap-2 rounded-xl border font-semibold ${
// //                   theme === "dark"
// //                     ? "border-green-600 bg-green-50 text-green-700"
// //                     : "border-slate-300 bg-white text-slate-700"
// //                 }`}
// //               >
// //                 <Moon size={20} />
// //                 Dark
// //               </button>
// //             </div>
// //           </div>

// //           {/* <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-lg">
// //             <div className="mb-5 flex items-center gap-3">
// //               <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
// //                 <AlertTriangle size={22} />
// //               </div>

// //               <div>
// //                 <h2 className="text-2xl font-bold text-red-600">
// //                   Danger Zone
// //                 </h2>
// //                 <p className="mt-1 text-sm text-slate-500">
// //                   Account related risky actions. Please be careful before using
// //                   these options.
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
// //               <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
// //                 <div className="flex items-start gap-3">
// //                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-600">
// //                     <LogOut size={20} />
// //                   </div>

// //                   <div>
// //                     <h3 className="font-bold text-orange-600">Logout</h3>
// //                     <p className="mt-1 text-sm leading-6 text-slate-500">
// //                       Logout will only remove your current session from this
// //                       device.
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <button
// //                   onClick={handleLogout}
// //                   className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-500 font-semibold text-white transition hover:bg-orange-600"
// //                 >
// //                   <LogOut size={18} />
// //                   Logout
// //                 </button>
// //               </div>

// //               <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
// //                 <div className="flex items-start gap-3">
// //                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-600">
// //                     <Trash2 size={20} />
// //                   </div>

// //                   <div>
// //                     <h3 className="font-bold text-red-600">
// //                       Permanent Delete
// //                     </h3>
// //                     <p className="mt-1 text-sm leading-6 text-slate-500">
// //                       This will permanently remove your account data. This
// //                       action cannot be undone.
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <button
// //                   onClick={() => setActivePage("DeleteAccount")}
// //                   className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 font-semibold text-white transition hover:bg-red-700"
// //                 >
// //                   <Trash2 size={18} />
// //                   Delete Account
// //                 </button>
// //               </div>
// //             </div>
// //           </div> */}
// //           <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-lg">
// //   <div className="mb-6 flex items-start justify-between gap-4">
// //     <div className="flex items-center gap-3">
// //       <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
// //         <AlertTriangle size={24} />
// //       </div>

// //       <div>
// //         <h2 className="text-2xl font-bold text-slate-900">Danger Zone</h2>
// //         <p className="mt-1 text-sm text-slate-500">
// //           Manage sensitive account actions carefully.
// //         </p>
// //       </div>
// //     </div>

// //     <span className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600">
// //       Critical
// //     </span>
// //   </div>

// //   <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
// //     <div className="rounded-2xl border border-orange-100 bg-linear-to-br from-orange-50 to-white p-5">
// //       <div className="flex items-start gap-4">
// //         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
// //           <LogOut size={21} />
// //         </div>

// //         <div>
// //           <h3 className="text-lg font-bold text-slate-900">Logout</h3>
// //           <p className="mt-1 text-sm leading-6 text-slate-500">
// //             End your current session safely. Your account data will remain
// //             unchanged.
// //           </p>
// //         </div>
// //       </div>

// //       <button
// //         onClick={handleLogout}
// //         className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white font-semibold text-orange-600 transition hover:bg-orange-500 hover:text-white"
// //       >
// //         <LogOut size={18} />
// //         Logout
// //       </button>
// //     </div>

// //     <div className="rounded-2xl border border-red-200 bg-linear-to-br from-red-50 to-white p-5">
// //       <div className="flex items-start gap-4">
// //         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
// //           <Trash2 size={21} />
// //         </div>

// //         <div>
// //           <h3 className="text-lg font-bold text-slate-900">Delete Account</h3>
// //           <p className="mt-1 text-sm leading-6 text-slate-500">
// //             Permanently remove your account and saved data. This action cannot
// //             be undone.
// //           </p>
// //         </div>
// //       </div>

// //       <button
// //         onClick={() => setActivePage("DeleteAccount")}
// //         className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 font-semibold text-white transition hover:bg-red-700"
// //       >
// //         <Trash2 size={18} />
// //         Delete Account
// //       </button>
// //     </div>
// //   </div>
// // </div>
// //         </div>
// //       </div>

// //       {openUpdate && (
// //         <UpdateCard
// //           profile={profile}
// //           setProfile={setProfile}
// //           onClose={() => setOpenUpdate(false)}
// //         />
// //       )}
// //     </div>
// //   );

//  return (
//     <div className="min-h-screen rounded-md bg-gray-300 px-6 py-8 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-8 flex items-start gap-10">
//           {userInfo.role === "Customer" && (
//             <button
//               onClick={() => setActivePage("home")}
//               className="cursor-pointer rounded-lg bg-green-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-green-700"
//             >
//               Go Back
//             </button>
//           )}

//           <div>
//             <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
//               Settings
//             </h1>

//             <p className="mt-2 text-slate-600 dark:text-slate-400">
//               Manage your profile, security and preferences.
//             </p>
//           </div>
//         </div>

//         <div className="space-y-7">
//           {/* Profile Information */}
//           <div className="rounded-3xl bg-white p-7 shadow-lg transition-colors duration-200 dark:bg-slate-800">
//             <div className="mb-7 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <User className="text-green-600" />

//                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
//                   Profile Information
//                 </h2>
//               </div>

//               <button
//                 onClick={() => setOpenUpdate(true)}
//                 className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-green-600 text-white transition hover:bg-green-700"
//               >
//                 <SquarePen size={21} />
//               </button>
//             </div>

//             <div className="flex items-start gap-10">
//               {profile.profilePicture ? (
//                 <img
//                   src={profile.profilePicture}
//                   alt="Profile"
//                   className="h-40 w-40 shrink-0 rounded-full object-cover"
//                 />
//               ) : (
//                 <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400">
//                   <User size={54} />
//                 </div>
//               )}

//               <div className="flex-1">
//                 <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
//                   {profile.username}
//                 </h2>

//                 <div className="mt-5 space-y-3 text-slate-500 dark:text-slate-400">
//                   <div className="flex items-center gap-3">
//                     <Mail size={18} />
//                     <span>{profile.email}</span>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <Phone size={18} />
//                     <span>
//                       {profile.phoneNumber || "No phone number"}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <MapPin size={18} />
//                     <span>{profile.city || "No city added"}</span>
//                   </div>
//                 </div>

//                 <div className="mt-7">
//                   <h3 className="font-bold text-slate-900 dark:text-white">
//                     Bio
//                   </h3>

//                   <p className="mt-2 text-slate-600 dark:text-slate-400">
//                     {profile.bio || "No bio added"}
//                   </p>
//                 </div>

//                 {role === "farmer" && (
//                   <div className="mt-5">
//                     <h3 className="font-bold text-slate-900 dark:text-white">
//                       Crop Types
//                     </h3>

//                     <p className="mt-2 text-slate-600 dark:text-slate-400">
//                       {profile.crops}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Change Password */}
//           <div className="rounded-3xl bg-white p-6 shadow-lg transition-colors duration-200 dark:bg-slate-800">
//             <div className="mb-5 flex items-center gap-3">
//               <Lock className="text-green-600" />

//               <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
//                 Change Password
//               </h2>
//             </div>

//             <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-700/60">
//               <div>
//                 <h3 className="font-semibold text-slate-900 dark:text-white">
//                   Change Password
//                 </h3>

//                 <p className="text-sm text-slate-500 dark:text-slate-400">
//                   Update your account password.
//                 </p>
//               </div>

//               <button
//                 onClick={() => setActivePage("changePassword")}
//                 className="cursor-pointer rounded-lg bg-green-600 px-5 py-2 font-semibold text-white transition hover:bg-green-700"
//               >
//                 Change
//               </button>
//             </div>
//           </div>

//           {/* Appearance */}
//           <div className="rounded-3xl bg-white p-6 shadow-lg transition-colors duration-200 dark:bg-slate-800">
//             <div className="mb-5 flex items-center gap-3">
//               <Shield className="text-green-600" />

//               <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
//                 Appearance
//               </h2>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               {/* Light Mode */}
//               <button
//                 onClick={() => setTheme("light")}
//                 className={`flex h-16 cursor-pointer items-center justify-center gap-2 rounded-xl border font-semibold transition-colors ${
//                   theme === "light"
//                     ? "border-green-600 bg-green-50 text-green-700 dark:border-green-500 dark:bg-green-950/40 dark:text-green-400"
//                     : "border-slate-300 bg-white text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
//                 }`}
//               >
//                 <Sun size={20} />
//                 Light
//               </button>

//               {/* Dark Mode */}
//               <button
//                 onClick={() => setTheme("dark")}
//                 className={`flex h-16 cursor-pointer items-center justify-center gap-2 rounded-xl border font-semibold transition-colors ${
//                   theme === "dark"
//                     ? "border-green-600 bg-green-50 text-green-700 dark:border-green-500 dark:bg-green-950/40 dark:text-green-400"
//                     : "border-slate-300 bg-white text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
//                 }`}
//               >
//                 <Moon size={20} />
//                 Dark
//               </button>
//             </div>
//           </div>

//           {/* Danger Zone */}
//           <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-lg transition-colors duration-200 dark:border-red-900/50 dark:bg-slate-800">
//             <div className="mb-6 flex items-start justify-between gap-4">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
//                   <AlertTriangle size={24} />
//                 </div>

//                 <div>
//                   <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
//                     Danger Zone
//                   </h2>

//                   <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
//                     Manage sensitive account actions carefully.
//                   </p>
//                 </div>
//               </div>

//               <span className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600 dark:bg-red-950/40 dark:text-red-400">
//                 Critical
//               </span>
//             </div>

//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//               {/* Logout */}
//               <div className="rounded-2xl border border-orange-100 bg-linear-to-br from-orange-50 to-white p-5 transition-colors duration-200 dark:border-orange-900/50 dark:from-orange-950/40 dark:to-slate-800">
//                 <div className="flex items-start gap-4">
//                   <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
//                     <LogOut size={21} />
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-bold text-slate-900 dark:text-white">
//                       Logout
//                     </h3>

//                     <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
//                       End your current session safely. Your account data will
//                       remain unchanged.
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleLogout}
//                   className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white font-semibold text-orange-600 transition hover:bg-orange-500 hover:text-white dark:border-orange-800 dark:bg-slate-700 dark:text-orange-400 dark:hover:bg-orange-600 dark:hover:text-white"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </button>
//               </div>

//               {/* Delete Account */}
//               <div className="rounded-2xl border border-red-200 bg-linear-to-br from-red-50 to-white p-5 transition-colors duration-200 dark:border-red-900/50 dark:from-red-950/40 dark:to-slate-800">
//                 <div className="flex items-start gap-4">
//                   <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
//                     <Trash2 size={21} />
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-bold text-slate-900 dark:text-white">
//                       Delete Account
//                     </h3>

//                     <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
//                       Permanently remove your account and saved data. This
//                       action cannot be undone.
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => setActivePage("DeleteAccount")}
//                   className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 font-semibold text-white transition hover:bg-red-700"
//                 >
//                   <Trash2 size={18} />
//                   Delete Account
//                 </button>
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

// export default Settings;

import {
  AlertTriangle,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Moon,
  Phone,
  Shield,
  SquarePen,
  Sun,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import UpdateCard from "./UpdateCard";
import useWebNavigate from "../hooks/useWebNavigate";
import { logoutUser } from "../Api/authApi";
import { type ActivePage } from "../context/CustomerNavigationContext";
import { useTheme } from "../context/ThemeContext";

type ProfileType = {
  username: string;
  email: string;
  phoneNumber: string;
  farmName?: string;
  farmAddress?: string;
  bio: string;
  crops?: string;
  profilePicture: string;
  city: string;
};

type SettingsProps = {
  setActivePage: (page: ActivePage) => void;
};

const Settings = ({ setActivePage }: SettingsProps) => {
  const { gotoLogin } = useWebNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const role = userInfo.role?.toLowerCase();

  const [openUpdate, setOpenUpdate] = useState(false);
  const { theme, setTheme } = useTheme();

  const [profile, setProfile] = useState<ProfileType>({
    username: userInfo.username || "Tanishq Kushwah",
    email: userInfo.email || "tanishq@gmail.com",
    phoneNumber: String(userInfo.phoneNumber || ""),
    farmName: userInfo.farmName || "",
    farmAddress: userInfo.farmAddress || "",
    bio:
      userInfo.bio ||
      "I provide fresh and organic vegetables directly from my farm.",
    crops: Array.isArray(userInfo.mainCrops)
      ? userInfo.mainCrops.join(", ")
      : userInfo.mainCrops || userInfo.crops || "Potato, Tomato, Onion, Wheat",
    profilePicture: userInfo.profilePicture || userInfo.image || "",
    city: userInfo.city || "",
  });

  useEffect(() => {
    if (userInfo.isProfileCompleted === false) {
      setOpenUpdate(true);
    }
  }, []);

  async function handleLogout() {
    try {
      const res = await logoutUser();

      if (res.data.success) {
        localStorage.clear();
        gotoLogin();
      }
    } catch (error: any) {
      console.log("Logout Error:", error.response?.data || error.message);
    }
  }

  return (
    <div className="min-h-screen rounded-md bg-gray-300 px-4 py-6 text-slate-900 transition-colors duration-200 sm:px-5 sm:py-7 lg:px-6 lg:py-8 dark:bg-[#0f171f] dark:text-[#f5f7f8]">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col items-start gap-4 sm:mb-8 sm:gap-6 lg:flex-row lg:items-start lg:gap-10">
          {userInfo.role === "Customer" && (
            <button
              onClick={() => setActivePage("home")}
              className="cursor-pointer rounded-lg bg-green-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-green-700"
            >
              Go Back
            </button>
          )}

          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-[#f5f7f8]">
              Settings
            </h1>

            <p className="mt-2 text-slate-600 dark:text-[#9aa7b1]">
              Manage your profile, security and preferences.
            </p>
          </div>
        </div>

        <div className="space-y-7">
          {/* Profile Information */}
          <div className="rounded-3xl bg-white p-7 shadow-lg transition-colors duration-200 sm:p-6 dark:bg-[#141c23]">
            <div className="mb-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <User className="text-green-600" />

                <h2 className="text-2xl font-bold text-slate-900 dark:text-[#f5f7f8]">
                  Profile Information
                </h2>
              </div>

              <button
                onClick={() => setOpenUpdate(true)}
                className="flex h-12 w-12 cursor-pointer items-center justify-center self-end rounded-xl bg-green-600 text-white transition hover:bg-green-700 sm:self-auto"
              >
                <SquarePen size={21} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-10">
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="h-40 w-40 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-[#123126] dark:text-[#00c767]">
                  <User size={54} />
                </div>
              )}

              <div className="w-full flex-1">
                <h2 className="wrap-break-word text-4xl font-bold text-slate-900 dark:text-[#f5f7f8]">
                  {profile.username}
                </h2>

                <div className="mt-5 space-y-3 text-slate-500 dark:text-[#9aa7b1]">
                  <div className="flex min-w-0 items-center gap-3">
                    <Mail className="shrink-0" size={18} />
                    <span className="break-all">{profile.email}</span>
                  </div>

                  <div className="flex min-w-0 items-center gap-3">
                    <Phone className="shrink-0" size={18} />
                    <span className="wrap-break-word">
                      {profile.phoneNumber || "No phone number"}
                    </span>
                  </div>

                  <div className="flex min-w-0 items-center gap-3">
                    <MapPin className="shrink-0" size={18} />
                    <span className="wrap-break-word">
                      {profile.city || "No city added"}
                    </span>
                  </div>
                </div>

                <div className="mt-7">
                  <h3 className="font-bold text-slate-900 dark:text-[#f5f7f8]">
                    Bio
                  </h3>

                  <p className="mt-2 wrap-break-word text-slate-600 dark:text-[#9aa7b1]">
                    {profile.bio || "No bio added"}
                  </p>
                </div>

                {role === "farmer" && (
                  <div className="mt-5">
                    <h3 className="font-bold text-slate-900 dark:text-[#f5f7f8]">
                      Crop Types
                    </h3>

                    <p className="mt-2 wrap-break-word text-slate-600 dark:text-[#9aa7b1]">
                      {profile.crops}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="rounded-3xl bg-white p-6 shadow-lg transition-colors duration-200 dark:bg-[#141c23]">
            <div className="mb-5 flex items-center gap-3">
              <Lock className="text-green-600" />

              <h2 className="text-2xl font-bold text-slate-900 dark:text-[#f5f7f8]">
                Change Password
              </h2>
            </div>

            <div className="flex flex-col gap-4 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:bg-[#192128]">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-[#f5f7f8]">
                  Change Password
                </h3>

                <p className="text-sm text-slate-500 dark:text-[#9aa7b1]">
                  Update your account password.
                </p>
              </div>

              <button
                onClick={() => setActivePage("changePassword")}
                className="w-full cursor-pointer rounded-lg bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700 sm:w-auto"
              >
                Change
              </button>
            </div>
          </div>

          {/* Appearance */}
          <div className="rounded-3xl bg-white p-6 shadow-lg transition-colors duration-200 dark:bg-[#141c23]">
            <div className="mb-5 flex items-center gap-3">
              <Shield className="text-green-600" />

              <h2 className="text-2xl font-bold text-slate-900 dark:text-[#f5f7f8]">
                Appearance
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {/* Light Mode */}
              <button
                onClick={() => setTheme("light")}
                className={`flex h-16 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border font-semibold ${
                  theme === "light"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-slate-300 bg-white text-slate-700 dark:border-[#29343c] dark:bg-[#192128] dark:text-[#9aa7b1]"
                }`}
              >
                <Sun size={20} />
                Light
              </button>

              {/* Dark Mode */}
              <button
                onClick={() => setTheme("dark")}
                className={`flex h-16 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border font-semibold ${
                  theme === "dark"
                    ? "border-green-600 bg-green-50 text-green-700 dark:border-[#00c767] dark:bg-[#123126] dark:text-[#00c767]"
                    : "border-slate-300 bg-white text-slate-700 dark:border-[#29343c] dark:bg-[#192128] dark:text-[#9aa7b1]"
                }`}
              >
                <Moon size={20} />
                Dark
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-lg transition-colors duration-200 dark:border-[#493139] dark:bg-[#141c23]">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-[#321d24] dark:text-[#ff6578]">
                  <AlertTriangle size={24} />
                </div>

                <div className="min-w-0">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-[#f5f7f8]">
                    Danger Zone
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-[#9aa7b1]">
                    Manage sensitive account actions carefully.
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600 dark:bg-[#321d24] dark:text-[#ff6578]">
                Critical
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Logout */}
              <div className="rounded-2xl border border-orange-100 bg-linear-to-br from-orange-50 to-white p-5 transition-colors duration-200 dark:border-[#4b3728] dark:from-[#2a2019] dark:to-[#141c23]">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-[#35261b] dark:text-[#ffad63]">
                    <LogOut size={21} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-[#f5f7f8]">
                      Logout
                    </h3>

                    <p className="mt-1 wrap-break-word text-sm leading-6 text-slate-500 dark:text-[#9aa7b1]">
                      End your current session safely. Your account data will
                      remain unchanged.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white font-semibold text-orange-600 transition hover:bg-orange-500 hover:text-white dark:border-[#62402a] dark:bg-[#192128] dark:text-[#ffad63] dark:hover:bg-orange-600 dark:hover:text-white"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>

              {/* Delete Account */}
              <div className="rounded-2xl border border-red-200 bg-linear-to-br from-red-50 to-white p-5 transition-colors duration-200 dark:border-[#493139] dark:from-[#291b20] dark:to-[#141c23]">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-[#321d24] dark:text-[#ff6578]">
                    <Trash2 size={21} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-[#f5f7f8]">
                      Delete Account
                    </h3>

                    <p className="mt-1 wrap-break-word text-sm leading-6 text-slate-500 dark:text-[#9aa7b1]">
                      Permanently remove your account and saved data. This
                      action cannot be undone.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActivePage("DeleteAccount")}
                  className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700"
                >
                  <Trash2 size={18} />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openUpdate && (
        <UpdateCard
          profile={profile}
          setProfile={setProfile}
          onClose={() => setOpenUpdate(false)}
        />
      )}
    </div>
  );
};

export default Settings;