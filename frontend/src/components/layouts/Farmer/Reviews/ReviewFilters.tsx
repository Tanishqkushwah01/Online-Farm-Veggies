import { Search } from "lucide-react";

const ReviewFilters = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      <div className="relative col-span-2 bg-white rounded-xl">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search reviews by customer or product..."
          className="w-full h-12 bg-white pl-12 pr-4 rounded-xl border border-gray-300 text-gray-700 outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <select className="h-12 bg-white rounded-xl border border-gray-300 px-4 text-gray-700 outline-none focus:ring-1 focus:ring-green-500">
        <option>All Ratings</option>
        <option>5 Stars</option>
        <option>4 Stars</option>
        <option>3 Stars</option>
        <option>2 Stars</option>
        <option>1 Star</option>
      </select>

      <select className="h-12 bg-white rounded-xl border border-gray-300 px-4 text-gray-700 outline-none focus:ring-1 focus:ring-green-500">
        <option>Most Recent</option>
        <option>Oldest</option>
        <option>Highest Rated</option>
        <option>Lowest Rated</option>
      </select>
    </div>
  );
};

export default ReviewFilters;