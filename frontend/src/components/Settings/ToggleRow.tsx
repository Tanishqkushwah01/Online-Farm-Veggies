
type ToggleRowProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

const ToggleRow = ({ title, description, checked, onChange }: ToggleRowProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>

      <button
        onClick={onChange}
        className={`relative h-7 w-14 cursor-pointer rounded-full transition ${checked ? "bg-green-600" : "bg-slate-300"
          }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked ? "left-8" : "left-1"
            }`}
        />
      </button>
    </div>
  );
};

export default ToggleRow;