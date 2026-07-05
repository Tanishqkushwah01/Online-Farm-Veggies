import { Search, Download } from "lucide-react";

const OrderFilters = () => {
  return (
    <div className="bg-white rounded-t-xl p-5 border-b border-gray-200">
      <div className="grid grid-cols-4 gap-4">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search orders..."
            className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <select className="h-12 rounded-lg border border-gray-300 px-4 outline-none">
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>

        <select className="h-12 rounded-lg border border-gray-300 px-4 outline-none">
          <option>All Payment</option>
          <option>Paid</option>
          <option>COD</option>
        </select>

        <button className="h-12 rounded-lg border border-gray-300 px-4 flex items-center justify-center gap-2 hover:bg-gray-100">
          <Download size={18} />
          Export
        </button>
      </div>
    </div>
  );
};

export default OrderFilters;