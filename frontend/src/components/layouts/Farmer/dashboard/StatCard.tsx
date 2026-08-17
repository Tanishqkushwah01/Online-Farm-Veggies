// type StatCardProps = {
//   title: string;
//   value: number;
//   subtitle: string;
//   icon: React.ReactNode;
//   onClick?: () => void;
// };

// const StatCard = ({ title, value, subtitle, icon, onClick }: StatCardProps) => {
//   return (
//     <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 flex items-center gap-5">
//       <div className="h-16 w-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
//         {icon}
//       </div>

//       <div>
//         <p className="text-gray-600 font-medium">{title}</p>
//         <h2 className="text-3xl font-bold text-slate-900">{value}</h2>

//         <p
//           onClick={onClick}
//           className={`text-sm text-green-600 font-semibold mt-1 ${
//             onClick ? "cursor-pointer hover:underline" : ""
//           }`}
//         >
//           {subtitle}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default StatCard;


type StatCardProps = {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  onClick,
}: StatCardProps) => {
  return (
    <div className="flex w-full min-w-0 items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 sm:gap-5 sm:p-6 dark:border-[#29343c] dark:bg-[#141c23]">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 sm:h-16 sm:w-16 dark:bg-[#123126] dark:text-[#00c767]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="truncate font-medium text-gray-600 dark:text-[#9aa7b1]">
          {title}
        </p>

        <h2 className="mt-0.5 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-[#f5f7f8]">
          {value}
        </h2>

        <p
          onClick={onClick}
          className={`mt-1 break-words text-sm font-semibold text-green-600 dark:text-[#00c767] ${
            onClick
              ? "cursor-pointer hover:underline"
              : ""
          }`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default StatCard;