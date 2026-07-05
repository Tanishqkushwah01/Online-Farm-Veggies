import {
  User,
  Bell,
  Settings,
  Shield,
  CircleHelp,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { logoutUser } from "../../../Api/authApi";
import useWebNavigate from "../../../hooks/useWebNavigate";

type ProfileCardProps = {
  user: {
    username: string;
    email: string;
    profilePicture?: string;
  };
  onNotification?: () => void;
  onSettings?: () => void;
  onPrivacy?: () => void;
  onHelp?: () => void;
  onLogout?: () => void;
};

const ProfileCard = ({
  user,
  onNotification,
  onSettings,
  onPrivacy,
  onHelp,
  onLogout,
}: ProfileCardProps) => {
    const {gotoLogin} = useWebNavigate();

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
    <div className="absolute right-0 top-16 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
      {/* Profile Section */}
      <div className="flex flex-col items-center py-6 px-5">
        <div className="h-20 w-20 rounded-full bg-green-100 overflow-hidden flex items-center justify-center mb-3">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <User size={38} className="text-green-700" />
          )}
        </div>

        <h2 className="text-lg font-semibold text-gray-900">
          {user.username}
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          {user.email}
        </p>
      </div>

      <div className="border-t border-gray-200" />

      {/* Menu */}
      <div className="py-2">
        <MenuItem
          icon={<Bell size={19} />}
          title="Notifications"
          onClick={onNotification}
        />

        <MenuItem
          icon={<Settings size={19} />}
          title="Settings"
          onClick={onSettings}
        />

        <MenuItem
          icon={<Shield size={19} />}
          title="Privacy & Policy"
          onClick={onPrivacy}
        />

        <MenuItem
          icon={<CircleHelp size={19} />}
          title="Help & Support"
          onClick={onHelp}
        />
      </div>

      <div className="border-t border-gray-200" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-red-50 transition cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <LogOut size={20} className="text-red-600" />

          <span className="text-base font-semibold text-red-600">
            Logout
          </span>
        </div>

        <ChevronRight size={17} className="text-gray-400" />
      </button>
    </div>
  );
};

type MenuItemProps = {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
};

const MenuItem = ({ icon, title, onClick }: MenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-3 hover:bg-green-50 transition cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <span className="text-gray-700">{icon}</span>

        <span className="text-base font-medium text-gray-800">
          {title}
        </span>
      </div>

      <ChevronRight size={17} className="text-gray-400" />
    </button>
  );
};

export default ProfileCard;