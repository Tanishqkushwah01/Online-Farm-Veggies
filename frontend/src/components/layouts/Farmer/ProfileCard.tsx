// import { LogOut, Mail, Phone, User, Shield } from "lucide-react";
// import { logoutUser } from "../../Api/authApi";
// import useWebNavigate from "../../hooks/useWebNavigate";

// type ProfileCardProps = {
//   onClose?: () => void;
// };

// const ProfileCard = ({ onClose }: ProfileCardProps) => {
//   const{gotoLogin}=useWebNavigate();

//   const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
//   console.log(userInfo,"userIndo")

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

//   return (
//     <div className="absolute right-6 top-20 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 z-50">
//       <div className="flex flex-col items-center">
//         <div className="h-24 w-24 rounded-full bg-[#D7E3F2] flex items-center justify-center overflow-hidden">
//           {userInfo.profilePicture ? (
//             <img
//               src={userInfo.profilePicture}
//               alt="Profile"
//               className="h-full w-full object-cover"
//             />
//           ) : (
//             <User size={42} className="text-gray-600" />
//           )}
//         </div>

//         <h2 className="mt-3 text-xl font-bold text-gray-900">
//           {userInfo.username || userInfo.name || "User Name"}
//         </h2>

//         <p className="text-green-600 font-semibold">
//           {userInfo.role || "Role"}
//         </p>
//       </div>

//       <div className="mt-5 space-y-3">
//         <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
//           <Mail size={18} className="text-green-600" />
//           <p className="text-sm text-gray-700 break-all">
//             {userInfo.email || "user@gmail.com"}
//           </p>
//         </div>

//         <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
//           <Phone size={18} className="text-green-600" />
//           <p className="text-sm text-gray-700">
//             {userInfo.phoneNumber || "No phone number"}
//           </p>
//         </div>

//         <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
//           <Shield size={18} className="text-green-600" />
//           <p className="text-sm text-gray-700">
//             {userInfo.role || "User"}
//           </p>
//         </div>
//       </div>

//       <button
//         onClick={handleLogout}
//         className="mt-5 w-full h-12 bg-red-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition cursor-pointer"
//       >
//         <LogOut size={20} />
//         Logout
//       </button>

//       {onClose && (
//         <button
//           onClick={onClose}
//           className="mt-3 cursor-pointer w-full h-10 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition"
//         >
//           Close
//         </button>
//       )}
//     </div>
//   );
// };

// export default ProfileCard;


import { LogOut, Mail, Phone, User, Shield } from "lucide-react";
import { logoutUser } from "../../Api/authApi";
import useWebNavigate from "../../hooks/useWebNavigate";

type ProfileCardProps = {
  onClose?: () => void;
};

const ProfileCard = ({ onClose }: ProfileCardProps) => {
  const { gotoLogin } = useWebNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  );

  console.log(userInfo, "userIndo");

  async function handleLogout() {
    try {
      const res = await logoutUser();

      if (res.data.success) {
        localStorage.clear();
        gotoLogin();
      }
    } catch (error: any) {
      console.log(
        "Logout Error:",
        error.response?.data || error.message
      );
    }
  }

  return (
    <div
      className="
        absolute
        right-0
        top-14
        z-50
        w-[calc(100vw-2rem)]
        max-w-80
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-2xl
        transition-colors
        duration-200
        dark:border-[#29343c]
        dark:bg-[#141c23]
        sm:right-0
        sm:top-16
      "
    >
      {/* Profile */}
      <div className="flex flex-col items-center">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#D7E3F2] dark:bg-[#192128]">
          {userInfo.profilePicture ? (
            <img
              src={userInfo.profilePicture}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <User
              size={42}
              className="text-gray-600 dark:text-[#f5f7f8]"
            />
          )}
        </div>

        <h2 className="mt-3 max-w-full break-words text-center text-xl font-bold text-gray-900 dark:text-[#f5f7f8]">
          {userInfo.username || userInfo.name || "User Name"}
        </h2>

        <p className="text-center font-semibold text-green-600 dark:text-[#00c767]">
          {userInfo.role || "Role"}
        </p>
      </div>

      {/* User Information */}
      <div className="mt-5 space-y-3">
        <div className="flex min-w-0 items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors duration-200 dark:bg-[#192128]">
          <Mail
            size={18}
            className="shrink-0 text-green-600"
          />

          <p className="min-w-0 break-all text-sm text-gray-700 dark:text-[#f5f7f8]">
            {userInfo.email || "user@gmail.com"}
          </p>
        </div>

        <div className="flex min-w-0 items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors duration-200 dark:bg-[#192128]">
          <Phone
            size={18}
            className="shrink-0 text-green-600"
          />

          <p className="min-w-0 break-words text-sm text-gray-700 dark:text-[#f5f7f8]">
            {userInfo.phoneNumber || "No phone number"}
          </p>
        </div>

        <div className="flex min-w-0 items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors duration-200 dark:bg-[#192128]">
          <Shield
            size={18}
            className="shrink-0 text-green-600"
          />

          <p className="min-w-0 break-words text-sm text-gray-700 dark:text-[#f5f7f8]">
            {userInfo.role || "User"}
          </p>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="
          mt-5
          flex
          h-12
          w-full
          cursor-pointer
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-red-600
          font-semibold
          text-white
          transition
          hover:bg-red-700
        "
      >
        <LogOut size={20} />
        Logout
      </button>

      {/* Close */}
      {onClose && (
        <button
          onClick={onClose}
          className="
            mt-3
            h-10
            w-full
            cursor-pointer
            rounded-xl
            border
            border-gray-300
            font-semibold
            text-gray-700
            transition
            hover:bg-gray-100
            dark:border-[#29343c]
            dark:text-[#f5f7f8]
            dark:hover:bg-[#192128]
          "
        >
          Close
        </button>
      )}
    </div>
  );
};

export default ProfileCard;