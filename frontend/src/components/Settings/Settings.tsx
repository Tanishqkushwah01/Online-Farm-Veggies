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

// type SettingsProps = {
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
// };
import {type ActivePage } from "../context/CustomerNavigationContext"; // path apne project ke hisaab se

type SettingsProps = {
  setActivePage: (page: ActivePage) => void;
};

const Settings = ({ setActivePage }: SettingsProps) => {
  const { gotoLogin } = useWebNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const role = userInfo.role?.toLowerCase();

  const [openUpdate, setOpenUpdate] = useState(false);
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
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-start gap-10">
          {userInfo.role === "Customer" && (
            <button
              onClick={() => setActivePage("home")}
              className="cursor-pointer rounded-lg bg-green-600 px-6 py-3 text-base font-semibold text-white hover:bg-green-700"
            >
              Go Back
            </button>
          )}

          <div>
            <h1 className="text-4xl font-bold text-slate-900">Settings</h1>
            <p className="mt-2 text-slate-600">
              Manage your profile, security and preferences.
            </p>
          </div>
        </div>

        <div className="space-y-7">
          <div className="rounded-3xl bg-white p-7 shadow-lg">
            <div className="mb-7 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="text-green-600" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Profile Information
                </h2>
              </div>

              <button
                onClick={() => setOpenUpdate(true)}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-green-600 text-white transition hover:bg-green-700"
              >
                <SquarePen size={21} />
              </button>
            </div>

            <div className="flex items-start gap-10">
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="h-40 w-40 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <User size={54} />
                </div>
              )}

              <div className="flex-1">
                <h2 className="text-4xl font-bold text-slate-900">
                  {profile.username}
                </h2>

                <div className="mt-5 space-y-3 text-slate-500">
                  <div className="flex items-center gap-3">
                    <Mail size={18} />
                    <span>{profile.email}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone size={18} />
                    <span>{profile.phoneNumber || "No phone number"}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin size={18} />
                    <span>{profile.city || "No city added"}</span>
                  </div>
                </div>

                <div className="mt-7">
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
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="mb-5 flex items-center gap-3">
              <Lock className="text-green-600" />
              <h2 className="text-2xl font-bold text-slate-900">
                Change Password
              </h2>
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
                className={`flex h-16 cursor-pointer items-center justify-center gap-2 rounded-xl border font-semibold ${
                  theme === "light"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-slate-300 bg-white text-slate-700"
                }`}
              >
                <Sun size={20} />
                Light
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={`flex h-16 cursor-pointer items-center justify-center gap-2 rounded-xl border font-semibold ${
                  theme === "dark"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-slate-300 bg-white text-slate-700"
                }`}
              >
                <Moon size={20} />
                Dark
              </button>
            </div>
          </div>

          {/* <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-lg">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
                <AlertTriangle size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-red-600">
                  Danger Zone
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Account related risky actions. Please be careful before using
                  these options.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-600">
                    <LogOut size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-orange-600">Logout</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Logout will only remove your current session from this
                      device.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-500 font-semibold text-white transition hover:bg-orange-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>

              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-600">
                    <Trash2 size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-red-600">
                      Permanent Delete
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      This will permanently remove your account data. This
                      action cannot be undone.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActivePage("DeleteAccount")}
                  className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 font-semibold text-white transition hover:bg-red-700"
                >
                  <Trash2 size={18} />
                  Delete Account
                </button>
              </div>
            </div>
          </div> */}
          <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-lg">
  <div className="mb-6 flex items-start justify-between gap-4">
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
        <AlertTriangle size={24} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-900">Danger Zone</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage sensitive account actions carefully.
        </p>
      </div>
    </div>

    <span className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600">
      Critical
    </span>
  </div>

  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
    <div className="rounded-2xl border border-orange-100 bg-linear-to-br from-orange-50 to-white p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
          <LogOut size={21} />
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900">Logout</h3>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            End your current session safely. Your account data will remain
            unchanged.
          </p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white font-semibold text-orange-600 transition hover:bg-orange-500 hover:text-white"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>

    <div className="rounded-2xl border border-red-200 bg-linear-to-br from-red-50 to-white p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
          <Trash2 size={21} />
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900">Delete Account</h3>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Permanently remove your account and saved data. This action cannot
            be undone.
          </p>
        </div>
      </div>

      <button
        onClick={() => setActivePage("DeleteAccount")}
        className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 font-semibold text-white transition hover:bg-red-700"
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