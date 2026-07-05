// const CustomerDashboard = () => {
//   const products = [
//     { name: "Tomato", price: "₹25/kg" },
//     { name: "Potato", price: "₹20/kg" },
//     { name: "Onion", price: "₹18/kg" },
//     { name: "Spinach", price: "₹15/kg" },
//   ];

//   return (
//     <div className="min-h-screen bg-green-50 p-6">
//       <h1 className="text-3xl font-bold text-green-700">
//         Customer Dashboard
//       </h1>

//       <div className="bg-white rounded-xl shadow p-6 mt-6">
//         <h2 className="text-2xl font-bold">Fresh Vegetables</h2>
//         <p className="text-gray-500 mt-2">
//           Buy fresh vegetables directly from farmers.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
//         {products.map((item) => (
//           <div key={item.name} className="bg-white rounded-xl shadow p-5">
//             <div className="h-32 bg-green-100 rounded-lg flex items-center justify-center text-5xl">
//               🥬
//             </div>

//             <h2 className="font-bold mt-4">{item.name}</h2>
//             <p className="text-green-700 font-semibold">{item.price}</p>

//             <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg">
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;

import CustomerHome from "../components/layouts/Customer/Home/CustomerHome"

const CustomerPage = () => {
  return <CustomerHome />;
};

export default CustomerPage;