// import {
//   ArrowRight,
//   Home,
//   Mail,
//   MapPin,
//   Phone,
//   Sprout,
//   User,
// } from "lucide-react";
// import useWebNavigate from "../../../hooks/useWebNavigate";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import { getFarmerProfileById } from "../../../Api/customerApi";

// type FarmerDetailsCardProps = {
//   farmerDetails: any;
// };

// const FarmerDetailsCard = ({ farmerDetails }: FarmerDetailsCardProps) => {
//   if (!farmerDetails) return null;
//   const { gotoFarmerProfile } = useWebNavigate();
//   const [loadingDetails, setLoadingDetails] = useState(false);


//   const handleViewMore = async () => {
//     try {
//       setLoadingDetails(true);

//       const response = await getFarmerProfileById(farmerDetails._id);

//       if (response.data.success) {
//         gotoFarmerProfile(
//           farmerDetails._id,
//           response.data.product,
//           response.data.farmerDetails,
//           response.data.review
//         );
//       }
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoadingDetails(false);
//     }
//   };

//   return (
//     <aside className="flex h-full min-h-[520px] flex-col overflow-hidden rounded-[30px] border border-green-100 bg-white shadow-sm">
//       <div className="relative shrink-0 bg-gradient-to-br from-green-600 to-emerald-500 px-6 py-7 text-white">
//         <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
//         <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-white/10" />

//         <div className="relative flex flex-col items-center text-center">
//           <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-green-100 shadow-lg">
//             {farmerDetails.profilePicture ? (
//               <img
//                 src={farmerDetails.profilePicture}
//                 alt={farmerDetails.username}
//                 className="h-full w-full object-cover"
//               />
//             ) : (
//               <div className="flex h-full w-full items-center justify-center">
//                 <User size={44} className="text-green-700" />
//               </div>
//             )}
//           </div>

//           <h2 className="mt-3 text-xl font-bold">
//             {farmerDetails.username || "Farmer"}
//           </h2>

//           {/* <p className="mt-1 text-sm text-white/80">
//             {farmerDetails.farmName || "Farm Owner"}
//           </p> */}
//         </div>
//       </div>

//       <div className="flex flex-1 flex-col justify-between p-5">
//         <div className="space-y-3">
//           <InfoRow
//             icon={<Home size={18} />}
//             label="Farm"
//             value={farmerDetails.farmName || "Not added"}
//           />

//           <InfoRow
//             icon={<MapPin size={18} />}
//             label="Location"
//             value={
//               farmerDetails.city || farmerDetails.farmAddress || "Not added"
//             }
//           />

//           <InfoRow
//             icon={<Phone size={18} />}
//             label="Phone"
//             value={farmerDetails.phoneNumber || "Not added"}
//           />

//           <InfoRow
//             icon={<Mail size={18} />}
//             label="Email"
//             value={farmerDetails.email || "Not added"}
//           />

//           {farmerDetails.bio && (
//             <div className="rounded-2xl bg-green-50 p-4">
//               <div className="mb-2 flex items-center gap-2 font-semibold text-green-700">
//                 <Sprout size={18} />
//                 About Farmer
//               </div>

//               <p className="line-clamp-3 text-sm leading-6 text-gray-600">
//                 {farmerDetails.bio}
//               </p>
//             </div>
//           )}
//         </div>

//         <button
//           onClick={handleViewMore}
//           disabled={loadingDetails}
//           className="group mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
//         >
//           View Farmer Profile
//           <ArrowRight
//             size={18}
//             className="transition group-hover:translate-x-1"
//           />
//         </button>
//       </div>
//     </aside>
//   );
// };

// const InfoRow = ({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }) => {
//   return (
//     <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3">
//       <div className="shrink-0 rounded-xl bg-green-100 p-2 text-green-700">
//         {icon}
//       </div>

//       <div className="min-w-0">
//         <p className="text-xs font-semibold uppercase text-gray-400">
//           {label}
//         </p>
//         <p className="mt-1 break-words text-sm font-semibold text-gray-800">
//           {value}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default FarmerDetailsCard;

import {
  ArrowRight,
  Home,
  Mail,
  MapPin,
  Phone,
  Sprout,
  User,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { getFarmerProfileById } from "../../../Api/customerApi";
import useWebNavigate from "../../../hooks/useWebNavigate";

type FarmerDetailsCardProps = {
  farmerDetails: any;
};

const FarmerDetailsCard = ({ farmerDetails }: FarmerDetailsCardProps) => {
  const { gotoFarmerProfile } = useWebNavigate();
  const [loadingProfile, setLoadingProfile] = useState(false);

  if (!farmerDetails) return null;

  const handleFarmerProfile = async () => {
    try {
      setLoadingProfile(true);

      const response = await getFarmerProfileById(farmerDetails._id);
      console.log("luka==",response.data);

      if (response.data.success) {
        gotoFarmerProfile(
          farmerDetails._id,
          response.data.farmer,
          response.data.products,
          response.data.review
        );
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingProfile(false);
    }
  };

  return (
    <aside className="flex h-full min-h-130 flex-col overflow-hidden rounded-[30px] border border-green-100 bg-white shadow-sm">
      <div className="relative shrink-0 bg-linear-to-br from-green-600 to-emerald-500 px-6 py-7 text-white">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-white/10" />

        <div className="relative flex flex-col items-center text-center">
          <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-green-100 shadow-lg">
            {farmerDetails.profilePicture ? (
              <img
                src={farmerDetails.profilePicture}
                alt={farmerDetails.username}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User size={44} className="text-green-700" />
              </div>
            )}
          </div>

          <h2 className="mt-3 text-xl font-bold">
            {farmerDetails.username || "Farmer"}
          </h2>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="space-y-3">
          <InfoRow
            icon={<Home size={18} />}
            label="Farm"
            value={farmerDetails.farmName || "Not added"}
          />

          <InfoRow
            icon={<MapPin size={18} />}
            label="Location"
            value={
              farmerDetails.city || farmerDetails.farmAddress || "Not added"
            }
          />

          <InfoRow
            icon={<Phone size={18} />}
            label="Phone"
            value={farmerDetails.phoneNumber || "Not added"}
          />

          <InfoRow
            icon={<Mail size={18} />}
            label="Email"
            value={farmerDetails.email || "Not added"}
          />

          {farmerDetails.bio && (
            <div className="rounded-2xl bg-green-50 p-4">
              <div className="mb-2 flex items-center gap-2 font-semibold text-green-700">
                <Sprout size={18} />
                About Farmer
              </div>

              <p className="line-clamp-3 text-sm leading-6 text-gray-600">
                {farmerDetails.bio}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleFarmerProfile}
          disabled={loadingProfile}
          className="group mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loadingProfile ? "Loading..." : "View Farmer Profile"}
          <ArrowRight
            size={18}
            className="transition group-hover:translate-x-1"
          />
        </button>
      </div>
    </aside>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3">
      <div className="shrink-0 rounded-xl bg-green-100 p-2 text-green-700">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase text-gray-400">
          {label}
        </p>
        <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-800">
          {value}
        </p>
      </div>
    </div>
  );
};

export default FarmerDetailsCard;