// import { useState } from "react";
// import { Pencil, Trash2 } from "lucide-react";
// import AddProduct from "../Products/AddProduct";
// import { useFarmerProducts } from "../../../hooks/useFarmerProducts";
// import { deleteProduct } from "../../../Api/farmerApi";
// import { useProductHighlight } from "../../../hooks/useProductHighlight";

// type ProductTableProps = {
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
// };

// const ProductTable = ({ setActivePage }: ProductTableProps) => {
//   const { products, loading, fetchProducts } = useFarmerProducts();

//   const [openProduct, setOpenProduct] = useState(false);
//   const [editProduct, setEditProduct] = useState<any | null>(null);

//   const recentProducts = [...products].reverse().slice(0, 5);

//   const { highlightProduct } = useProductHighlight();

//   const handleProductClick = (productId: string) => {
//     setActivePage("products");

//     setTimeout(() => {
//       highlightProduct(productId);
//     }, 100);
//   };

//   const handleEdit = (product: any) => {
//     setEditProduct(product);
//     setOpenProduct(true);
//   };

//   const handleCloseModal = () => {
//     setOpenProduct(false);
//     setEditProduct(null);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       const response = await deleteProduct(id);

//       if (response.data.success) {
//         await fetchProducts();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-bold text-slate-900">
//             Recent Products
//           </h2>

//           <button
//             onClick={() => setActivePage("products")}
//             className="hover:text-green-600 text-green-400 cursor-pointer font-semibold"
//           >
//             View All
//           </button>
//         </div>

//         <table className="w-full">
//           <thead>
//             <tr className="text-left text-gray-500 border-b">
//               <th className="pb-4">Product</th>
//               <th className="pb-4">Category</th>
//               <th className="pb-4">Price</th>
//               <th className="pb-4">Stock</th>
//               <th className="pb-4">Status</th>
//               <th className="pb-4">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={6} className="py-8 text-center text-gray-500">
//                   Loading products...
//                 </td>
//               </tr>
//             ) : recentProducts.length > 0 ? (
//               recentProducts.map((product) => {
//                 const status =
//                   product.quantity > 20 ? "In Stock" : "Low Stock";

//                 return (
//                   <tr key={product._id} className="border-b last:border-none">
//                     <td className="py-4">
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={product.image}
//                           alt={product.productName}
//                           className="h-12 w-12 rounded-lg object-cover"
//                         />
//                         <button className="mt-1 cursor-pointer text-sm font-semibold text-green-600 hover:underline"
//                           onClick={() => handleProductClick(product._id)}><span className="font-semibold text-green-600">
//                             {product.productName}
//                           </span></button>

//                       </div>
//                     </td>

//                     <td className="py-4">{product.category}</td>

//                     <td className="py-4">₹{product.price} / kg</td>

//                     <td className="py-4">{product.quantity} kg</td>

//                     <td className="py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${status === "In Stock"
//                           ? "bg-green-100 text-green-600"
//                           : "bg-orange-100 text-orange-600"
//                           }`}
//                       >
//                         {status}
//                       </span>
//                     </td>

//                     <td className="py-4">
//                       <div className="flex gap-3">
//                         <button
//                           onClick={() => handleEdit(product)}
//                           className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center text-slate-700 hover:bg-gray-200 cursor-pointer"
//                         >
//                           <Pencil size={17} />
//                         </button>

//                         <button
//                           onClick={() => handleDelete(product._id)}
//                           className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 cursor-pointer"
//                         >
//                           <Trash2 size={17} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan={6} className="py-8 text-center text-gray-500">
//                   No products found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         <div className="text-center mt-6">
//           <button
//             onClick={() => setActivePage("products")}
//             className="hover:text-green-600 text-green-400 cursor-pointer font-semibold"
//           >
//             View all products →
//           </button>
//         </div>
//       </div>

//       <AddProduct
//         open={openProduct}
//         onClose={handleCloseModal}
//         editProduct={editProduct}
//       />
//     </>
//   );
// };

// export default ProductTable;


import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import AddProduct from "../Products/AddProduct";
import { useFarmerProducts } from "../../../hooks/useFarmerProducts";
import { deleteProduct } from "../../../Api/farmerApi";
import { useProductHighlight } from "../../../hooks/useProductHighlight";

type ProductTableProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const ProductTable = ({ setActivePage }: ProductTableProps) => {
  const { products, loading, fetchProducts } = useFarmerProducts();

  const [openProduct, setOpenProduct] = useState(false);
  const [editProduct, setEditProduct] = useState<any | null>(null);

  const recentProducts = [...products].reverse().slice(0, 5);

  const { highlightProduct } = useProductHighlight();

  const handleProductClick = (productId: string) => {
    setActivePage("products");

    setTimeout(() => {
      highlightProduct(productId);
    }, 100);
  };

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
      <div className="w-full min-w-0 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-colors duration-200 sm:p-6 dark:border-[#29343c] dark:bg-[#141c23]">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-[#f5f7f8]">
            Recent Products
          </h2>

          <button
            onClick={() => setActivePage("products")}
            className="w-fit cursor-pointer font-semibold text-green-400 transition hover:text-green-600 dark:text-[#00c767] dark:hover:text-[#00e676]"
          >
            View All
          </button>
        </div>

        {/* Responsive table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500 dark:border-[#29343c] dark:text-[#9aa7b1]">
                <th className="pb-4 pr-4 font-semibold">
                  Product
                </th>

                <th className="pb-4 pr-4 font-semibold">
                  Category
                </th>

                <th className="pb-4 pr-4 font-semibold">
                  Price
                </th>

                <th className="pb-4 pr-4 font-semibold">
                  Stock
                </th>

                <th className="pb-4 pr-4 font-semibold">
                  Status
                </th>

                <th className="pb-4 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-gray-500 dark:text-[#9aa7b1]"
                  >
                    Loading products...
                  </td>
                </tr>
              ) : recentProducts.length > 0 ? (
                recentProducts.map((product) => {
                  const status =
                    product.quantity > 20
                      ? "In Stock"
                      : "Low Stock";

                  return (
                    <tr
                      key={product._id}
                      className="border-b border-gray-100 last:border-none dark:border-[#29343c]"
                    >
                      {/* Product */}
                      <td className="py-4 pr-4">
                        <div className="flex min-w-55 items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.productName}
                            className="h-12 w-12 shrink-0 rounded-lg object-cover"
                          />

                          <button
                            onClick={() =>
                              handleProductClick(product._id)
                            }
                            className="min-w-0 cursor-pointer text-left text-sm font-semibold text-green-600 hover:underline"
                          >
                            <span className="block max-w-55 truncate">
                              {product.productName}
                            </span>
                          </button>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 pr-4 text-gray-700 dark:text-[#c4cdd3]">
                        {product.category}
                      </td>

                      {/* Price */}
                      <td className="py-4 pr-4 font-medium text-gray-700 dark:text-[#c4cdd3]">
                        ₹{product.price} / kg
                      </td>

                      {/* Stock */}
                      <td className="py-4 pr-4 font-medium text-gray-700 dark:text-[#c4cdd3]">
                        {product.quantity} kg
                      </td>

                      {/* Status */}
                      <td className="py-4 pr-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            status === "In Stock"
                              ? "bg-green-100 text-green-600 dark:bg-[#123126] dark:text-[#00c767]"
                              : "bg-orange-100 text-orange-600 dark:bg-[#35261b] dark:text-[#ffad63]"
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              handleEdit(product)
                            }
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-gray-100 text-slate-700 transition hover:bg-gray-200 dark:bg-[#192128] dark:text-[#f5f7f8] dark:hover:bg-[#29343c]"
                            aria-label="Edit product"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(product._id)
                            }
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 dark:bg-[#321d24] dark:text-[#ff6578] dark:hover:bg-[#493139]"
                            aria-label="Delete product"
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
                  <td
                    colSpan={6}
                    className="py-8 text-center text-gray-500 dark:text-[#9aa7b1]"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setActivePage("products")}
            className="cursor-pointer font-semibold text-green-400 transition hover:text-green-600 dark:text-[#00c767] dark:hover:text-[#00e676]"
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