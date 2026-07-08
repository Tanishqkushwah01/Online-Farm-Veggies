import { MapPin, Phone, Star, User,Home,LocateFixed, Mail } from "lucide-react";
import { Link } from "react-router-dom";
// type FarmerInfoCardProps = {
//   farmerName?: string;
//   farmName?: string;
//   city?: string;
// };

// const FarmerInfoCard = ({
//   farmerName = "Kushwah Farms",
//   farmName = "Organic Farmer",
//   city = "Indore, Madhya Pradesh",
// }: FarmerInfoCardProps) => {
//   return (
//     <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//       <div className="flex flex-col items-center text-center">
//         <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
//           <User size={42} className="text-green-600" />
//         </div>

//         <h2 className="mt-4 text-2xl font-bold text-gray-900">
//           {farmerName}
//         </h2>

//         <p className="mt-1 text-sm text-gray-500">{farmName}</p>

//         <div className="mt-3 flex items-center gap-1 text-sm">
//           <Star size={16} className="fill-yellow-400 text-yellow-400" />
//           <span className="font-semibold">4.9</span>
//           <span className="text-gray-500">(320 Orders)</span>
//         </div>

//         <div className="mt-6 w-full space-y-3 text-left text-sm text-gray-600">
//           <p className="flex items-center gap-2">
//             <MapPin size={17} className="text-green-600" />
//             {city}
//           </p>

//           <p className="flex items-center gap-2">
//             <Phone size={17} className="text-green-600" />
//             Contact visible after order
//           </p>
//         </div>

//         <button className="mt-6 w-full rounded-2xl border border-green-600 px-5 py-3 font-semibold text-green-600 transition hover:bg-green-50">
//           View Farmer Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FarmerInfoCard;
type FarmerDetailsCardProps = {
  farmerDetails: any;
};

const FarmerDetailsCard = ({ farmerDetails }: FarmerDetailsCardProps) => {
  if (!farmerDetails) {
    return null;
  }

  return (
   <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

  {/* Header */}
  <div className="mx-auto flex w-full max-w-md items-center justify-center rounded-full bg-gradient-to-r from-green-100 to-emerald-100 py-3">
    <h2 className="text-3xl font-bold text-emerald-900">
      Farmer Details
    </h2>
  </div>

  {/* Profile */}
  <div className="mt-6 flex justify-center">
    <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-green-200 shadow-lg">
      {farmerDetails.profilePicture ? (
        <img
          src={farmerDetails.profilePicture}
          alt={farmerDetails.username}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-green-100">
          <User size={50} className="text-green-600" />
        </div>
      )}
    </div>
  </div>

  {/* Divider */}
  <div className="mx-auto mt-6 mb-6 w-11/12 border-t border-gray-200" />

  {/* Details */}
  <div className="mx-auto grid max-w-2xl gap-5 sm:grid-cols-2">

    <div className="flex items-start gap-3">
      <User className="mt-1 text-green-600" size={20} />
      <div>
        <p className="font-semibold">Name</p>
        <p className="text-gray-600">{farmerDetails.username}</p>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <Home className="mt-1 text-green-600" size={20} />
      <div>
        <p className="font-semibold">Farm Name</p>
        <p className="text-gray-600">{farmerDetails.farmName}</p>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <MapPin className="mt-1 text-green-600" size={20} />
      <div>
        <p className="font-semibold">City</p>
        <p className="text-gray-600">{farmerDetails.city}</p>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <LocateFixed className="mt-1 text-green-600" size={20} />
      <div>
        <p className="font-semibold">Address</p>
        <p className="text-gray-600">{farmerDetails.farmAddress}</p>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <Mail className="mt-1 text-green-600" size={20} />
      <div>
        <p className="font-semibold">Email</p>
        <p className="break-all text-gray-600">
          {farmerDetails.email}
        </p>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <Phone className="mt-1 text-green-600" size={20} />
      <div>
        <p className="font-semibold">Phone</p>
        <p className="text-gray-600">{farmerDetails.phoneNumber}</p>
      </div>
    </div>

  </div>

  {/* Bio */}
  {farmerDetails.bio && (
    <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-green-50 p-5 text-center">
      <p className="italic leading-7 text-gray-700">
        "{farmerDetails.bio}"
      </p>
    </div>
  )}
  {/* divider */}
  <div className="mx-auto mt-6 w-11/12 border-t border-gray-200" />
  {/*post review button */}
  <div className="mt-6 flex justify-center">
    
    <button className="w-full rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
      Post Review
    </button>    
  </div>
</div>
  )}

export default FarmerDetailsCard; 