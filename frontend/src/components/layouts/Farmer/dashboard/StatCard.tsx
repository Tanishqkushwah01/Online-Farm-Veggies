type StatCardProps = {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

const StatCard = ({ title, value, subtitle, icon, onClick }: StatCardProps) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 flex items-center gap-5">
      <div className="h-16 w-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-gray-600 font-medium">{title}</p>
        <h2 className="text-3xl font-bold text-slate-900">{value}</h2>

        <p
          onClick={onClick}
          className={`text-sm text-green-600 font-semibold mt-1 ${
            onClick ? "cursor-pointer hover:underline" : ""
          }`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default StatCard;