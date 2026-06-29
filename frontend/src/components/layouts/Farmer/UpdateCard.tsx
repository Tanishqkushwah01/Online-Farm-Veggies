import { useState } from "react";
import { X, Camera } from "lucide-react";
import ImageCropModal from "./ImageCropModal";
import { updateUserProfile } from "../../Api/authApi";

type ProfileType = {
  username: string;
  email: string;
  phoneNumber: string;
  // shopName: string;
  farmName: string;
  // address: string;
  farmAddress: string;
  bio: string;
  crops: string;
  profilePicture: string;
};

type UpdateCardProps = {
  profile: ProfileType;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType>>;
  onClose: () => void;
};

const UpdateCard = ({ profile, setProfile, onClose }: UpdateCardProps) => {
  const [formData, setFormData] = useState<ProfileType>(profile);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setCropImage(imageUrl);
  }

  function handleCropDone(file: File, previewUrl: string) {
    setProfileFile(file);

    setFormData({
      ...formData,
      profilePicture: previewUrl,
    });

    setCropImage(null);
  }

  async function handleUpdate() {
    try {
      setLoading(true);

      const data = new FormData();

      data.append("username", formData.username);
      data.append("phoneNumber", formData.phoneNumber);
      // data.append("shopName", formData.shopName);
      data.append("farmName", formData.farmName);
      data.append("mainCrops", formData.crops);
      // data.append("address", formData.address);
      data.append("farmAddress", formData.farmAddress);
      data.append("bio", formData.bio);

      if (profileFile) {
        data.append("profilePicture", profileFile);
      }

      const response = await updateUserProfile(data);

      if (response.data.success) {
        setProfile({
          ...formData,
          profilePicture: response.data.user.profilePicture || formData.profilePicture,
        });

        onClose();
      }
    } catch (error: any) {
      console.log(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div className="bg-white w-full max-w-155 max-h-[90vh] overflow-y-auto no-scrollbar rounded-2xl shadow-2xl p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 cursor-pointer text-slate-500 hover:text-black"
          >
            <X size={22} />
          </button>

          <h2 className="text-2xl font-bold text-slate-900">
            Update Profile
          </h2>

          <p className="text-slate-500 mt-1">
            Update your farmer profile details
          </p>

          <div className="flex justify-center mt-6">
            <div className="relative">
              <img
                src={
                  formData.profilePicture ||
                  "https://ui-avatars.com/api/?name=Farmer&background=16a34a&color=fff"
                }
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover border"
              />

              <label className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer">
                <Camera size={16} />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input
                name="name"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full mt-1 border rounded-xl px-4 py-2 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Phone Number</label>
              <input
                name="phone"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full mt-1 border rounded-xl px-4 py-2 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                name="email"
                value={formData.email}
                disabled
                className="w-full mt-1 border rounded-xl px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* <div>
              <label className="text-sm font-semibold">Shop Name</label>
              <input
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                placeholder="Enter shop name"
                className="w-full mt-1 border rounded-xl px-4 py-2 outline-none"
              />
            </div> */}

            <div>
              <label className="text-sm font-semibold">Farm Name</label>
              <input
                name="farmName"
                value={formData.farmName}
                onChange={handleChange}
                placeholder="Enter farm name"
                className="w-full mt-1 border rounded-xl px-4 py-2 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Crop Types</label>
              <input
                name="crops"
                value={formData.crops}
                onChange={handleChange}
                placeholder="Potato, Tomato, Onion"
                className="w-full mt-1 border rounded-xl px-4 py-2 outline-none"
              />
            </div>

            {/* <div>
              <label className="text-sm font-semibold">Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full mt-1 border rounded-xl px-4 py-2 outline-none"
              />
            </div> */}

            <div>
              <label className="text-sm font-semibold">Farm Address</label>
              <input
                name="farmAddress"
                value={formData.farmAddress}
                onChange={handleChange}
                placeholder="Enter farm address"
                className="w-full mt-1 border rounded-xl px-4 py-2 outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Write something about yourself"
              className="w-full mt-1 border rounded-xl px-4 py-2 outline-none resize-none"
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full mt-6 cursor-pointer bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {cropImage && (
        <ImageCropModal
          image={cropImage}
          onClose={() => setCropImage(null)}
          onCropDone={handleCropDone}
        />
      )}
    </>
  );
};

export default UpdateCard;