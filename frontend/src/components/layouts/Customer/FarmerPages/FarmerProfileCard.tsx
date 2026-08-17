// import {
//   BadgeCheck,
//   Leaf,
//   Mail,
//   MapPin,
//   Package,
//   Phone,
//   Star,
//   User,
// } from "lucide-react";

// type Props = {
//   farmer: any;
//   productsCount: number;
// };

// const FarmerProfileCard = ({ farmer, productsCount }: Props) => {
//   return (
//     <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
//       <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
//         <div className="rounded-[28px] bg-[#F0FDF4] p-6">
//           <div className="relative mx-auto h-40 w-40">
//             <div className="h-full w-full overflow-hidden rounded-full border-8 border-white bg-white shadow-lg">
//               {farmer.profilePicture ? (
//                 <img
//                   src={farmer.profilePicture}
//                   alt={farmer.username}
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <div className="flex h-full w-full items-center justify-center bg-green-100">
//                   <User size={60} className="text-green-700" />
//                 </div>
//               )}
//             </div>

//             <div className="absolute bottom-2 right-2 rounded-full bg-green-600 p-2 shadow">
//               <BadgeCheck size={22} className="text-white" />
//             </div>
//           </div>

//           <div className="mt-5 text-center">
//             <h1 className="text-3xl font-bold text-gray-900">
//               {farmer.farmName || farmer.username}
//             </h1>

//             <p className="mt-1 text-gray-500">
//               {farmer.username || "Verified Farmer"}
//             </p>
//           </div>

//           <div className="mt-6 grid grid-cols-2 gap-4">
//             <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
//               <Package className="mx-auto text-green-600" />
//               <h2 className="mt-2 text-2xl font-bold text-gray-900">
//                 {productsCount}
//               </h2>
//               <p className="text-sm text-gray-500">Products</p>
//             </div>

//             <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
//               <Star className="mx-auto fill-yellow-400 text-yellow-400" />
//               <h2 className="mt-2 text-2xl font-bold text-gray-900">
//                 {farmer.averageRating || "0.0"}
//               </h2>
//               <p className="text-sm text-gray-500">Rating</p>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-[28px] border border-gray-100 bg-gray-50 p-6">
//           <div className="flex items-center gap-2">
//             <Leaf className="text-green-600" />
//             <p className="font-semibold text-green-700">Farmer Profile</p>
//           </div>

//           <h2 className="mt-4 text-4xl font-bold leading-tight text-gray-900">
//             Quality vegetables from trusted local farm.
//           </h2>

//           <p className="mt-4 text-lg leading-8 text-gray-600">
//             {farmer.bio ||
//               "Fresh, healthy and naturally grown vegetables delivered with trust and care."}
//           </p>

//           <div className="mt-8 grid gap-4 md:grid-cols-2">
//             <InfoBox
//               icon={<MapPin size={21} />}
//               label="Location"
//               value={farmer.farmAddress || farmer.city || "Not added"}
//             />

//             <InfoBox
//               icon={<Phone size={21} />}
//               label="Phone"
//               value={farmer.phoneNumber || "Not available"}
//             />

//             <InfoBox
//               icon={<Mail size={21} />}
//               label="Email"
//               value={farmer.email || "Not available"}
//               full
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const InfoBox = ({
//   icon,
//   label,
//   value,
//   full,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
//   full?: boolean;
// }) => {
//   return (
//     <div
//       className={`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm ${
//         full ? "md:col-span-2" : ""
//       }`}
//     >
//       <div className="flex items-start gap-4">
//         <div className="rounded-xl bg-green-100 p-3 text-green-700">
//           {icon}
//         </div>

//         <div>
//           <p className="text-sm font-semibold text-gray-400">{label}</p>
//           <p className="mt-1 break-all font-semibold text-gray-800">
//             {value}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerProfileCard;



import {
  BadgeCheck,
  Leaf,
  Mail,
  MapPin,
  Package,
  Phone,
  Star,
  User,
} from "lucide-react";

type Props = {
  farmer: any;
  productsCount: number;
};

const FarmerProfileCard = ({ farmer, productsCount }: Props) => {
  return (
    <section className="rounded-4xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 sm:p-6 dark:border-[#29343c] dark:bg-[#141c23]">
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <div className="rounded-[28px] bg-[#F0FDF4] p-5 transition-colors duration-200 sm:p-6 dark:bg-[#123126]">
          <div className="relative mx-auto h-40 w-40">
            <div className="h-full w-full overflow-hidden rounded-full border-8 border-white bg-white shadow-lg dark:border-[#192128] dark:bg-[#192128]">
              {farmer.profilePicture ? (
                <img
                  src={farmer.profilePicture}
                  alt={farmer.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-green-100 dark:bg-[#1d4936]">
                  <User size={60} className="text-green-700 dark:text-[#00c767]" />
                </div>
              )}
            </div>

            <div className="absolute bottom-2 right-2 rounded-full bg-green-600 p-2 shadow">
              <BadgeCheck size={22} className="text-white" />
            </div>
          </div>

          <div className="mt-5 text-center">
            <h1 className="wrap-break-word text-3xl font-bold text-gray-900 dark:text-[#f5f7f8]">
              {farmer.farmName || farmer.username}
            </h1>

            <p className="mt-1 wrap-break-word text-gray-500 dark:text-[#9aa7b1]">
              {farmer.username || "Verified Farmer"}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-4 text-center shadow-sm transition-colors duration-200 dark:bg-[#192128]">
              <Package className="mx-auto text-green-600" />

              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-[#f5f7f8]">
                {productsCount}
              </h2>

              <p className="text-sm text-gray-500 dark:text-[#9aa7b1]">
                Products
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4 text-center shadow-sm transition-colors duration-200 dark:bg-[#192128]">
              <Star className="mx-auto fill-yellow-400 text-yellow-400" />

              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-[#f5f7f8]">
                {farmer.averageRating || "0.0"}
              </h2>

              <p className="text-sm text-gray-500 dark:text-[#9aa7b1]">
                Rating
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-gray-100 bg-gray-50 p-5 transition-colors duration-200 sm:p-6 dark:border-[#29343c] dark:bg-[#192128]">
          <div className="flex items-center gap-2">
            <Leaf className="shrink-0 text-green-600" />

            <p className="font-semibold text-green-700 dark:text-[#00c767]">
              Farmer Profile
            </p>
          </div>

          <h2 className="mt-4 wrap-break-word text-3xl font-bold leading-tight text-gray-900 sm:text-4xl dark:text-[#f5f7f8]">
            Quality vegetables from trusted local farm.
          </h2>

          <p className="mt-4 wrap-break-word text-lg leading-8 text-gray-600 dark:text-[#9aa7b1]">
            {farmer.bio ||
              "Fresh, healthy and naturally grown vegetables delivered with trust and care."}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <InfoBox
              icon={<MapPin size={21} />}
              label="Location"
              value={farmer.farmAddress || farmer.city || "Not added"}
            />

            <InfoBox
              icon={<Phone size={21} />}
              label="Phone"
              value={farmer.phoneNumber || "Not available"}
            />

            <InfoBox
              icon={<Mail size={21} />}
              label="Email"
              value={farmer.email || "Not available"}
              full
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoBox = ({
  icon,
  label,
  value,
  full,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  full?: boolean;
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-[#29343c] dark:bg-[#141c23] ${
        full ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 rounded-xl bg-green-100 p-3 text-green-700 dark:bg-[#123126] dark:text-[#00c767]">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-400 dark:text-[#71808a]">
            {label}
          </p>

          <p className="mt-1 break-all font-semibold text-gray-800 dark:text-[#f5f7f8]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfileCard;