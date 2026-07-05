import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
};

const StatCard = ({ title, value, subtitle, icon }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-600">{title}</p>
        <h2 className="text-3xl font-bold text-slate-900 mt-1">{value}</h2>
        <p className="text-sm text-green-600 font-semibold mt-2">{subtitle}</p>
      </div>
    </div>
  );
};

export default StatCard;