import { MapPin, Phone, Star, User } from "lucide-react";

type FarmerInfoCardProps = {
  farmerName?: string;
  farmName?: string;
  city?: string;
};

const FarmerInfoCard = ({
  farmerName = "Kushwah Farms",
  farmName = "Organic Farmer",
  city = "Indore, Madhya Pradesh",
}: FarmerInfoCardProps) => {
  return (
    <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <User size={42} className="text-green-600" />
        </div>

        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          {farmerName}
        </h2>

        <p className="mt-1 text-sm text-gray-500">{farmName}</p>

        <div className="mt-3 flex items-center gap-1 text-sm">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">4.9</span>
          <span className="text-gray-500">(320 Orders)</span>
        </div>

        <div className="mt-6 w-full space-y-3 text-left text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <MapPin size={17} className="text-green-600" />
            {city}
          </p>

          <p className="flex items-center gap-2">
            <Phone size={17} className="text-green-600" />
            Contact visible after order
          </p>
        </div>

        <button className="mt-6 w-full rounded-2xl border border-green-600 px-5 py-3 font-semibold text-green-600 transition hover:bg-green-50">
          View Farmer Profile
        </button>
      </div>
    </div>
  );
};

export default FarmerInfoCard;