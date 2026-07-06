import { useMemo, useState } from "react";
import { X, Camera, Trash2 } from "lucide-react";
import Select from "react-select";
import { City } from "country-state-city";
import ImageCropModal from "./ImageCropModal";
import { updateUserProfile } from "../Api/authApi";

type ProfileType = {
  profilePicture: string;
  username: string;
  phoneNumber: string;
  farmName?: string;
  crops?: string;
  farmAddress?: string;
  address?: string;
  bio: string;
  city: string;
  email: string;
};

type CityOption = {
  value: string;
  label: string;
};

type ErrorsType = {
  username?: string;
  phoneNumber?: string;
  city?: string;
  farmName?: string;
  crops?: string;
  farmAddress?: string;
  address?: string;
};

type UpdateCardProps = {
  profile: ProfileType;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType>>;
  onClose: () => void;
};

const UpdateCard = ({ profile, setProfile, onClose }: UpdateCardProps) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const role = userInfo.role;
  const isCustomer = role === "Customer";

  const [formData, setFormData] = useState<ProfileType>({
    ...profile,
    address: profile.address || profile.farmAddress || "",
  });

  const [errors, setErrors] = useState<ErrorsType>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cityInput, setCityInput] = useState("");

  const allCityOptions: CityOption[] = useMemo(() => {
    const cities = City.getCitiesOfCountry("IN") || [];

    return cities.map((city) => ({
      value: `${city.name}, ${city.stateCode}, India`,
      label: `${city.name}, ${city.stateCode}, India`,
    }));
  }, []);

  const filteredCityOptions = useMemo(() => {
    if (cityInput.trim().length < 2) return [];

    return allCityOptions
      .filter((city) =>
        city.label.toLowerCase().includes(cityInput.toLowerCase())
      )
      .slice(0, 50);
  }, [cityInput, allCityOptions]);

  const selectedCity =
    allCityOptions.find((city) => city.value === formData.city) || null;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);

    setFormData({
      ...formData,
      phoneNumber: value,
    });

    setErrors({
      ...errors,
      phoneNumber: "",
    });
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setRemoveImage(false);
  }

  function handleCropDone(file: File, previewUrl: string) {
    setProfileFile(file);
    setRemoveImage(false);

    setFormData({
      ...formData,
      profilePicture: previewUrl,
    });

    setSelectedImage(null);
  }

  function handleRemoveImage() {
    setProfileFile(null);
    setRemoveImage(true);

    setFormData({
      ...formData,
      profilePicture: "",
    });
  }

  async function handleUpdate() {
    const newErrors: ErrorsType = {};

    if (!formData.username.trim()) newErrors.username = "Name is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (formData.phoneNumber.length !== 10)
      newErrors.phoneNumber = "Phone number must be 10 digits";
    if (!formData.city.trim()) newErrors.city = "City is required";

    if (isCustomer) {
      if (!formData.address?.trim()) newErrors.address = "Address is required";
    } else {
      if (!formData.farmName?.trim())
        newErrors.farmName = "Farm name is required";
      if (!formData.crops?.trim()) newErrors.crops = "Crop type is required";
      if (!formData.farmAddress?.trim())
        newErrors.farmAddress = "Farm address is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("username", formData.username);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("city", formData.city);
      data.append("bio", formData.bio || "");

      if (isCustomer) {
        data.append("address", formData.address || "");
      } else {
        data.append("farmName", formData.farmName || "");
        data.append("mainCrops", formData.crops || "");
        data.append("farmAddress", formData.farmAddress || "");
      }

      if (removeImage) {
        data.append("removeProfilePicture", "true");
      } else if (profileFile) {
        data.append("profilePicture", profileFile);
      }
      // console.log("data=========",formData.data)
      const response = await updateUserProfile(data);

      if (response.data.success) {
        const updatedUserInfo = response.data.userInfo;

        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

        setProfile({
          username: updatedUserInfo.username,
          email: updatedUserInfo.email,
          phoneNumber: String(updatedUserInfo.phoneNumber),
          city: updatedUserInfo.city,
          address: updatedUserInfo.address || "",
          farmName: updatedUserInfo.farmName || "",
          crops: Array.isArray(updatedUserInfo.mainCrops)
            ? updatedUserInfo.mainCrops.join(", ")
            : updatedUserInfo.mainCrops || "",
          farmAddress: updatedUserInfo.farmAddress || "",
          bio: updatedUserInfo.bio || "",
          profilePicture: updatedUserInfo.profilePicture || "",
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
            Update your {isCustomer ? "customer" : "farmer"} profile details
          </p>

          <div className="flex flex-col items-center mt-6">
            <div className="relative">
              <img
                src={
                  formData.profilePicture ||
                  "https://ui-avatars.com/api/?name=User&background=16a34a&color=fff"
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

            {formData.profilePicture && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-3 flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer"
              >
                <Trash2 size={15} />
                Remove Image
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full mt-1 border rounded-xl px-4 py-2 outline-none"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold">Phone Number</label>
              <input
                name="phoneNumber"
                type="tel"
                maxLength={10}
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
                className="w-full mt-1 border rounded-xl px-4 py-2 outline-none"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold">City</label>
              <Select<CityOption, false>
                options={filteredCityOptions}
                value={selectedCity}
                onInputChange={(value) => setCityInput(value)}
                onChange={(selected) => {
                  setFormData({
                    ...formData,
                    city: selected?.value || "",
                  });

                  setErrors({
                    ...errors,
                    city: "",
                  });
                }}
                placeholder="Type at least 2 letters"
                isSearchable
                noOptionsMessage={() =>
                  cityInput.length < 2
                    ? "Type at least 2 letters"
                    : "No city found"
                }
                className="mt-1"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "42px",
                    borderRadius: "12px",
                    borderColor: errors.city ? "#ef4444" : "#d1d5db",
                    boxShadow: "none",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: "2px 12px",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            {!isCustomer && (
              <div>
                <label className="text-sm font-semibold">Farm Name</label>
                <input
                  name="farmName"
                  value={formData.farmName || ""}
                  onChange={handleChange}
                  placeholder="Enter farm name"
                  className="w-full mt-1 border rounded-xl px-4 py-2 outline-none"
                />
                {errors.farmName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.farmName}
                  </p>
                )}
              </div>
            )}

            {!isCustomer && (
              <div>
                <label className="text-sm font-semibold">Crop Types</label>
                <input
                  name="crops"
                  value={formData.crops || ""}
                  onChange={handleChange}
                  placeholder="Potato, Tomato, Onion"
                  className="w-full mt-1 border rounded-xl px-4 py-2 outline-none"
                />
                {errors.crops && (
                  <p className="text-red-500 text-xs mt-1">{errors.crops}</p>
                )}
              </div>
            )}

            <div>
              <label className="text-sm font-semibold">
                {isCustomer ? "Address" : "Farm Address"}
              </label>
              <input
                name={isCustomer ? "address" : "farmAddress"}
                value={isCustomer ? formData.address || "" : formData.farmAddress || ""}
                onChange={handleChange}
                placeholder={
                  isCustomer ? "Enter address" : "Enter farm address"
                }
                className="w-full mt-1 border rounded-xl px-4 py-2 outline-none"
              />
              {(errors.address || errors.farmAddress) && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address || errors.farmAddress}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold">Bio Optional</label>
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

      {selectedImage && (
        <ImageCropModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onCropDone={handleCropDone}
          onRemoveImage={handleRemoveImage}
          variant="profile"
        />
      )}
    </>
  );
};

export default UpdateCard;