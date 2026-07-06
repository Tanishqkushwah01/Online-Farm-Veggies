import { MapPin } from "lucide-react";

type ProfileType = {
  username: string;
  email: string;
  profilePicture: string;
  city: string;
};

type UserCardProps = {
  profile: ProfileType;
};

const UserCard = ({ profile }: UserCardProps) => {
  return (
    <div className="h-full rounded-3xl bg-white p-6 shadow-lg">
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
  );
};

export default UserCard;