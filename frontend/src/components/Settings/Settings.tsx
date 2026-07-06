import {
  AlertTriangle,
  Bell,
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
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const Settings = ({ setActivePage }: SettingsProps) => {
  const { gotoLogin } = useWebNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const role = userInfo.role?.toLowerCase();

  const [openUpdate, setOpenUpdate] = useState(false);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

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
    <div className="min-h-screen rounded-md bg-gray-300 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-start gap-10">
          {userInfo.role === "Customer" && (
            <button
              onClick={() => setActivePage("home")}
              className="cursor-pointer rounded-lg text-base bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              go back
            </button>
          )}

          <div>
            <h1 className="text-4xl font-bold text-slate-900">Settings</h1>
            <p className="mt-2 text-slate-600">
              Manage your profile, security and preferences.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[300px_1fr] lg:grid-rows-[auto_auto]">
          <div className="h-full rounded-3xl bg-white p-6 shadow-lg lg:col-start-1 lg:row-start-1">
            <div className="flex h-full flex-col items-center justify-start pt-10">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-green-600 text-4xl font-bold text-white">
                {profile.profilePicture ? (
                  <img
                    src={profile.profilePicture}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  profile.username.charAt(0).toUpperCase()
                )}
              </div>

              <h2 className="mt-4 text-center text-2xl font-bold text-slate-900">
                {profile.username}
              </h2>

              <p className="mt-2 text-center text-sm text-slate-500">
                {profile.email}
              </p>

              <p className="mt-2 flex items-center gap-1 text-center text-sm text-slate-500">
                <MapPin size={15} />
                {profile.city || "No city added"}
              </p>
            </div>
          </div>

          <div className="space-y-6 lg:col-start-2 lg:row-start-1">
            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="text-green-600" />
                  <h2 className="text-2xl font-bold text-slate-900">
                    Profile Information
                  </h2>
                </div>

                <button
                  onClick={() => setOpenUpdate(true)}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-green-600 text-white hover:bg-green-700"
                >
                  <SquarePen size={21} />
                </button>
              </div>

              <h2 className="text-3xl font-bold text-slate-900">
                {profile.username}
              </h2>

              <div className="mt-4 flex items-center gap-2 text-slate-500">
                <Mail size={18} />
                <span>{profile.email}</span>
              </div>

              <div className="mt-2 flex items-center gap-2 text-slate-500">
                <Phone size={18} />
                <span>{profile.phoneNumber || "No phone number"}</span>
              </div>

              <div className="mt-2 flex items-center gap-2 text-slate-500">
                <MapPin size={18} />
                <span>{profile.city || "No city added"}</span>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-slate-900">Bio</h3>
                <p className="mt-2 text-slate-600">
                  {profile.bio || "No bio added"}
                </p>
              </div>

              {role === "farmer" && (
                <div className="mt-5">
                  <h3 className="font-bold text-slate-900">Crop Types</h3>
                  <p className="mt-2 text-slate-600">{profile.crops}</p>
                </div>
              )}
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="mb-5 flex items-center gap-3">
                <Lock className="text-green-600" />
                <h2 className="text-2xl font-bold text-slate-900">Security</h2>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <div>
                  <h3 className="font-semibold">Change Password</h3>
                  <p className="text-sm text-slate-500">
                    Update your account password.
                  </p>
                </div>

                <button
                  onClick={() => setActivePage("changePassword")}
                  className="cursor-pointer rounded-lg bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700"
                >
                  Change
                </button>
              </div>
            </div>
          </div>

          <div className="h-full rounded-3xl border border-red-200 bg-white p-6 shadow-lg lg:col-start-1 lg:row-start-2">
            <div className="flex h-full flex-col">
              <div className="mb-4 flex items-center gap-3">
                <AlertTriangle className="text-red-600" size={22} />
                <h3 className="text-2xl font-bold text-red-600">
                  Danger Zone
                </h3>
              </div>

              <p className="text-sm leading-6 text-slate-500">
                Account related risky actions. Please be careful before using
                these options.
              </p>

              <div className="mt-5 rounded-xl bg-red-50 p-4">
                <h4 className="font-semibold text-red-600">Logout</h4>
                <p className="mt-1 text-sm text-slate-500">
                  Logout will only remove your current session.
                </p>
              </div>

              <div className="mt-3 rounded-xl bg-red-50 p-4">
                <h4 className="font-semibold text-red-600">
                  Permanent Delete
                </h4>
                <p className="mt-1 text-sm text-slate-500">
                  This action will remove your saved account data from this
                  device.
                </p>
              </div>

              <div className="mt-auto space-y-3 pt-5">
                <button
                  onClick={handleLogout}
                  className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-50 font-semibold text-red-600 hover:bg-red-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>

                <button
                  onClick={() => setActivePage("DeleteAccount")}
                  className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700"
                >
                  <Trash2 size={18} />
                  ID Delete Permanent
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-start-2 lg:row-start-2">
            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="mb-5 flex items-center gap-3">
                <Bell className="text-green-600" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Notifications
                </h2>
              </div>

              <div className="space-y-4">
                <ToggleRow
                  title="Order Updates"
                  description="Receive order and delivery updates."
                  checked={orderUpdates}
                  onChange={() => setOrderUpdates(!orderUpdates)}
                />

                <ToggleRow
                  title="Email Alerts"
                  description="Get important account alerts."
                  checked={emailAlerts}
                  onChange={() => setEmailAlerts(!emailAlerts)}
                />

                <ToggleRow
                  title="Promotional Emails"
                  description="Receive offers and discounts."
                  checked={promotions}
                  onChange={() => setPromotions(!promotions)}
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="mb-5 flex items-center gap-3">
                <Shield className="text-green-600" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Appearance
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex h-16 cursor-pointer items-center justify-center gap-2 rounded-xl border font-semibold ${theme === "light"
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-slate-300 bg-white text-slate-700"
                    }`}
                >
                  <Sun size={20} />
                  Light
                </button>

                <button
                  onClick={() => setTheme("dark")}
                  className={`flex h-16 cursor-pointer items-center justify-center gap-2 rounded-xl border font-semibold ${theme === "dark"
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-slate-300 bg-white text-slate-700"
                    }`}
                >
                  <Moon size={20} />
                  Dark
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

type ToggleRowProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

const ToggleRow = ({ title, description, checked, onChange }: ToggleRowProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>

      <button
        onClick={onChange}
        className={`relative h-7 w-14 cursor-pointer rounded-full transition ${checked ? "bg-green-600" : "bg-slate-300"
          }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked ? "left-8" : "left-1"
            }`}
        />
      </button>
    </div>
  );
};

export default Settings;