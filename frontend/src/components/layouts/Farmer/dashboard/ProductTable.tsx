// import { Pencil, Trash2 } from "lucide-react";

// type ProductTableProps = {
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
// };

// const ProductTable = ({ setActivePage }: ProductTableProps) => {
//   const products = [
//     {
//       name: "Tomato",
//       category: "Vegetables",
//       price: "₹15 / kg",
//       stock: "128 kg",
//       status: "In Stock",
//       image: "https://images.unsplash.com/photo-1546470427-e5ac89d3f1a9?w=100",
//     },
//     {
//       name: "Potato",
//       category: "Vegetables",
//       price: "₹12 / kg",
//       stock: "96 kg",
//       status: "In Stock",
//       image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100",
//     },
//     {
//       name: "Onion",
//       category: "Vegetables",
//       price: "₹18 / kg",
//       stock: "85 kg",
//       status: "In Stock",
//       image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=100",
//     },
//     {
//       name: "Spinach",
//       category: "Leafy Greens",
//       price: "₹20 / bunch",
//       stock: "64 bunch",
//       status: "In Stock",
//       image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100",
//     },
//     {
//       name: "Carrot",
//       category: "Vegetables",
//       price: "₹16 / kg",
//       stock: "20 kg",
//       status: "Low Stock",
//       image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=100",
//     },
//   ];

//   return (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-slate-900">Recent Products</h2>
//         <button
//           onClick={() => { setActivePage("products") }}
//           className="text-green-600 cursor-pointer font-semibold">View All</button>
//       </div>

//       <table className="w-full">
//         <thead>
//           <tr className="text-left text-gray-500 border-b">
//             <th className="pb-4">Product</th>
//             <th className="pb-4">Category</th>
//             <th className="pb-4">Price</th>
//             <th className="pb-4">Stock</th>
//             <th className="pb-4">Status</th>
//             <th className="pb-4">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {products.map((product) => (
//             <tr key={product.name} className="border-b last:border-none">
//               <td className="py-4">
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="h-12 w-12 rounded-lg object-cover"
//                   />
//                   <span className="font-semibold text-slate-900">
//                     {product.name}
//                   </span>
//                 </div>
//               </td>

//               <td className="py-4">{product.category}</td>
//               <td className="py-4">{product.price}</td>
//               <td className="py-4">{product.stock}</td>

//               <td className="py-4">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-semibold ${product.status === "In Stock"
//                       ? "bg-green-100 text-green-600"
//                       : "bg-orange-100 text-orange-600"
//                     }`}
//                 >
//                   {product.status}
//                 </span>
//               </td>

//               <td className="py-4">
//                 <div className="flex gap-3">
//                   <button className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center text-slate-700 hover:bg-gray-200">
//                     <Pencil size={17} />
//                   </button>

//                   <button className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100">
//                     <Trash2 size={17} />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="text-center mt-6">
//         <button
//           onClick={() => { setActivePage("products") }}
//           className="text-green-600 cursor-pointer font-semibold">View all products →</button>
//       </div>
//     </div>
//   );
// };

// export default ProductTable;

// import { Pencil, Trash2 } from "lucide-react";
// import { useProducts } from "../../../hooks/useProducts";

// type ProductTableProps = {
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
// };

// const ProductTable = ({ setActivePage }: ProductTableProps) => {
//   const { products, loading } = useProducts();

//   const recentProducts = [...products].reverse().slice(0, 5);

//   return (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-slate-900">Recent Products</h2>

//         <button
//           onClick={() => setActivePage("products")}
//           className="text-green-600 cursor-pointer font-semibold"
//         >
//           View All
//         </button>
//       </div>

//       <table className="w-full">
//         <thead>
//           <tr className="text-left text-gray-500 border-b">
//             <th className="pb-4">Product</th>
//             <th className="pb-4">Category</th>
//             <th className="pb-4">Price</th>
//             <th className="pb-4">Stock</th>
//             <th className="pb-4">Status</th>
//             <th className="pb-4">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan={6} className="py-8 text-center text-gray-500">
//                 Loading products...
//               </td>
//             </tr>
//           ) : recentProducts.length > 0 ? (
//             recentProducts.map((product) => {
//               const status =
//                 product.quantity > 20 ? "In Stock" : "Low Stock";

//               return (
//                 <tr key={product._id} className="border-b last:border-none">
//                   <td className="py-4">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={product.image}
//                         alt={product.productName}
//                         className="h-12 w-12 rounded-lg object-cover"
//                       />

//                       <span className="font-semibold text-slate-900">
//                         {product.productName}
//                       </span>
//                     </div>
//                   </td>

//                   <td className="py-4">{product.category}</td>

//                   <td className="py-4">₹{product.price} / kg</td>

//                   <td className="py-4">{product.quantity} kg</td>

//                   <td className="py-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         status === "In Stock"
//                           ? "bg-green-100 text-green-600"
//                           : "bg-orange-100 text-orange-600"
//                       }`}
//                     >
//                       {status}
//                     </span>
//                   </td>

//                   <td className="py-4">
//                     <div className="flex gap-3">
//                       <button className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center text-slate-700 hover:bg-gray-200">
//                         <Pencil size={17} />
//                       </button>

//                       <button className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100">
//                         <Trash2 size={17} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan={6} className="py-8 text-center text-gray-500">
//                 No products found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div className="text-center mt-6">
//         <button
//           onClick={() => setActivePage("products")}
//           className="text-green-600 cursor-pointer font-semibold"
//         >
//           View all products →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductTable;


import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import AddProduct from "../Products/AddProduct";
import { useFarmerProducts } from "../../../hooks/useFarmerProducts";
import { deleteProduct } from "../../../Api/farmerApi";

type ProductTableProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const ProductTable = ({ setActivePage }: ProductTableProps) => {
  const { products, loading, fetchProducts } = useFarmerProducts();

  const [openProduct, setOpenProduct] = useState(false);
  const [editProduct, setEditProduct] = useState<any | null>(null);

  const recentProducts = [...products].reverse().slice(0, 5);

  const handleEdit = (product: any) => {
    setEditProduct(product);
    setOpenProduct(true);
  };

  const handleCloseModal = () => {
    setOpenProduct(false);
    setEditProduct(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteProduct(id);

      if (response.data.success) {
        await fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Recent Products
          </h2>

          <button
            onClick={() => setActivePage("products")}
            className="hover:text-green-600 text-gray-600 cursor-pointer font-semibold"
          >
            View All
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-4">Product</th>
              <th className="pb-4">Category</th>
              <th className="pb-4">Price</th>
              <th className="pb-4">Stock</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : recentProducts.length > 0 ? (
              recentProducts.map((product) => {
                const status =
                  product.quantity > 20 ? "In Stock" : "Low Stock";

                return (
                  <tr key={product._id} className="border-b last:border-none">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="h-12 w-12 rounded-lg object-cover"
                        />

                        <span className="font-semibold text-slate-900">
                          {product.productName}
                        </span>
                      </div>
                    </td>

                    <td className="py-4">{product.category}</td>

                    <td className="py-4">₹{product.price} / kg</td>

                    <td className="py-4">{product.quantity} kg</td>

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          status === "In Stock"
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(product)}
                          className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center text-slate-700 hover:bg-gray-200 cursor-pointer"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 cursor-pointer"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="text-center mt-6">
          <button
            onClick={() => setActivePage("products")}
            className="hover:text-green-600 text-gray-600 cursor-pointer font-semibold"
          >
            View all products →
          </button>
        </div>
      </div>

      <AddProduct
        open={openProduct}
        onClose={handleCloseModal}
        editProduct={editProduct}
      />
    </>
  );
};

export default ProductTable;