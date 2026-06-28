import { LogOut, Mail, Phone, User, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ProfileCardProps = {
  onClose?: () => void;
};

const ProfileCard = ({ onClose }: ProfileCardProps) => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="absolute right-6 top-20 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 z-50">
      <div className="flex flex-col items-center">
        <div className="h-24 w-24 rounded-full bg-[#D7E3F2] flex items-center justify-center overflow-hidden">
          {userInfo.image ? (
            <img
              src={userInfo.image}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <User size={42} className="text-gray-600" />
          )}
        </div>

        <h2 className="mt-3 text-xl font-bold text-gray-900">
          {userInfo.username || userInfo.name || "User Name"}
        </h2>

        <p className="text-green-600 font-semibold">
          {userInfo.role || "Role"}
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
          <Mail size={18} className="text-green-600" />
          <p className="text-sm text-gray-700 break-all">
            {userInfo.email || "user@gmail.com"}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
          <Phone size={18} className="text-green-600" />
          <p className="text-sm text-gray-700">
            {userInfo.phoneNumber || "No phone number"}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
          <Shield size={18} className="text-green-600" />
          <p className="text-sm text-gray-700">
            {userInfo.role || "User"}
          </p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-5 w-full h-12 bg-red-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition cursor-pointer"
      >
        <LogOut size={20} />
        Logout
      </button>

      {onClose && (
        <button
          onClick={onClose}
          className="mt-3 w-full h-10 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition"
        >
          Close
        </button>
      )}
    </div>
  );
};

export default ProfileCard;