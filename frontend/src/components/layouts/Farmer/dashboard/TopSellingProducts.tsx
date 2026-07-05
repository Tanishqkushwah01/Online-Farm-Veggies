const TopSellingProducts = () => {
  const products = [
    {
      name: "Tomato",
      quantity: "128 kg",
      amount: "₹1,920",
      image: "https://images.unsplash.com/photo-1546470427-e5ac89d3f1a9?w=100",
    },
    {
      name: "Potato",
      quantity: "96 kg",
      amount: "₹1,440",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100",
    },
    {
      name: "Onion",
      quantity: "85 kg",
      amount: "₹1,275",
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=100",
    },
    {
      name: "Spinach",
      quantity: "64 bunch",
      amount: "₹960",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Top Selling Products</h2>
        <button className="text-green-600 font-semibold">View All</button>
      </div>

      <div className="space-y-5">
        {products.map((product) => (
          <div key={product.name} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="h-14 w-14 rounded-lg object-cover"
              />

              <div>
                <h3 className="font-semibold text-slate-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.quantity}</p>
              </div>
            </div>

            <p className="font-bold text-green-600">{product.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;