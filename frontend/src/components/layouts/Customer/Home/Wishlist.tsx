import { Heart, ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";

type WishlistProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const Wishlist = ({ setActivePage }: WishlistProps) => {
  const wishlistItems = [
    {
      id: 1,
      name: "Fresh Tomato",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=500",
      farm: "Green Valley Farm",
    },
    {
      id: 2,
      name: "Organic Potato",
      price: 30,
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500",
      farm: "Fresh Farm",
    },
    {
      id: 3,
      name: "Green Capsicum",
      price: 60,
      image:
        "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500",
      farm: "Nature Farm",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => setActivePage("home")}
        className="mb-8 flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 cursor-pointer"
      >
        <ArrowLeft size={22} />
        Go Back
      </button>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <Heart className="text-red-500 fill-red-500" size={36} />
          My Wishlist
        </h1>
        <p className="text-gray-500 mt-2">
          Your saved fresh vegetables are here
        </p>
      </div>

      {/* Wishlist Cards */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900">
                  {item.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {item.farm}
                </p>

                <p className="text-green-700 font-bold text-lg mt-3">
                  ₹{item.price} / kg
                </p>

                <div className="flex items-center gap-3 mt-5">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-xl font-medium hover:bg-green-700 transition cursor-pointer">
                    <ShoppingCart size={18} />
                    Add
                  </button>

                  <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition cursor-pointer">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center">
          <Heart size={70} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mt-2">
            Save your favourite vegetables here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
