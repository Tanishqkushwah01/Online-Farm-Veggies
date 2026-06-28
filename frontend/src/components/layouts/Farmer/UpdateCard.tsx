import { useState } from "react";
import { X, Camera } from "lucide-react";

type ProfileType = {
  name: string;
  email: string;
  phone: string;
  shopName: string;
  bio: string;
  crops: string;
  photo: string;
};

type UpdateCardProps = {
  profile: ProfileType;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType>>;
  onClose: () => void;
};

const UpdateCard = ({ profile, setProfile, onClose }: UpdateCardProps) => {
  const [formData, setFormData] = useState(profile);

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

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setFormData({
        ...formData,
        photo: imageUrl,
      });
    }
  }

  function handleUpdate() {
    setProfile(formData);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-2xl shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-500 hover:text-black"
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
                formData.photo ||
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
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 border rounded-xl px-4 py-2 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Shop Name</label>
            <input
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
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

          <div>
            <label className="text-sm font-semibold">Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 border rounded-xl px-4 py-2 outline-none"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-semibold">Crop Types</label>
          <input
            name="crops"
            value={formData.crops}
            onChange={handleChange}
            placeholder="Potato, Tomato, Onion"
            className="w-full mt-1 border rounded-xl px-4 py-2 outline-none"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-semibold">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            className="w-full mt-1 border rounded-xl px-4 py-2 outline-none resize-none"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UpdateCard;