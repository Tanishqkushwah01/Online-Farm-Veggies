// // // import { Heart, ShoppingBag } from 'lucide-react'

// // // const ProductDetailsCard = () => {
// // //   return (
// // //     <div className="space-y-5">
// // //               <div className="relative h-72 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-sm md:h-96">
// // //                 <img
// // //                   src={product.image}
// // //                   alt={product.productName}
// // //                   className="h-full w-full object-cover"
// // //                 />

// // //                 <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105">
// // //                   <Heart size={20} className="text-red-500 fill-red-500" />
// // //                 </button>

// // //                 {/* <span className="absolute left-4 top-4 rounded-full bg-green-600 px-4 py-1.5 text-sm font-semibold text-white">
// // //                   In Stock
// // //                 </span> */}
// // //               </div>

// // //               <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
// // //                 <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
// // //                   <div>
// // //                     <h1 className="text-3xl font-bold text-gray-900">
// // //                       {product.productName}
// // //                     </h1>

// // //                     <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
// // //                       <Star
// // //                         size={17}
// // //                         className="fill-yellow-400 text-yellow-400"
// // //                       />
// // //                       <span className="font-semibold text-gray-800">
// // //                         {product.review}
// // //                       </span>
// // //                       <span>(124 Reviews)</span>
// // //                     </div>

// // //                     <div className="mt-4 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
// // //                       <p>
// // //                         <span className="font-semibold">Price:</span>{" "}
// // //                         <span className="text-xl font-bold text-green-600">
// // //                           ₹{product.price} / kg
// // //                         </span>
// // //                       </p>

// // //                       <p>
// // //                         <span className="font-semibold">Available:</span>{" "}
// // //                         {product.quantity} kg
// // //                       </p>

// // //                       <p>
// // //                         <span className="font-semibold">Category:</span>{" "}
// // //                         {product.category}
// // //                       </p>

// // //                       <p>
// // //                         <span className="font-semibold">Farmer:</span>{" "}
// // //                         {product.farmerName}
// // //                       </p>
// // //                     </div>

// // //                     <div className="mt-5">
// // //                       <h2 className="mb-2 text-lg font-bold text-gray-900">
// // //                         Product Details
// // //                       </h2>

// // //                       <ul className="space-y-1 text-sm text-gray-600">
// // //                         <li>• Freshly harvested from farm</li>
// // //                         <li>• Organic cultivation</li>
// // //                         <li>• No chemicals</li>
// // //                         <li>• Same day dispatch</li>
// // //                       </ul>
// // //                     </div>
// // //                   </div>

// // //                   <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-7 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 md:w-auto">
// // //                     <ShoppingBag size={18} />
// // //                     Order Now
// // //                   </button>
// // //                 </div>

// // //                 <div className="mt-5 border-t border-gray-200 pt-4">
// // //                   <p className="text-sm text-gray-500">
// // //                     To protect farmer privacy, contact details will only be
// // //                     visible after you place an order.
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //   )
// // // }

// // // export default ProductDetailsCard;

// // import { Heart, ShoppingBag, Star } from "lucide-react";

// // type ProductDetailsCardProps = {
// //   product: any;
// // };

// // const ProductDetailsCard = ({ product }: ProductDetailsCardProps) => {
// //   return (
// //     <div className="space-y-5">
// //       <div className="relative h-72 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-sm md:h-96">
// //         <img
// //           src={product.image}
// //           alt={product.productName}
// //           className="h-full w-full object-cover"
// //         />

// //         <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105">
// //           <Heart size={20} className="fill-red-500 text-red-500" />
// //         </button>

// //         <span className="absolute left-4 top-4 rounded-full bg-green-600 px-4 py-1.5 text-sm font-semibold text-white">
// //           {product.quantity > 0 ? "In Stock" : "Out of Stock"}
// //         </span>
// //       </div>

// //       <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
// //         <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
// //           <div>
// //             <h1 className="text-3xl font-bold text-gray-900">
// //               {product.productName}
// //             </h1>

// //             <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
// //               <Star size={17} className="fill-yellow-400 text-yellow-400" />
// //               <span className="font-semibold text-gray-800">
// //                 {product.review || 5}
// //               </span>
// //               <span>(124 Reviews)</span>
// //             </div>

// //             <div className="mt-4 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
// //               <p>
// //                 <span className="font-semibold">Price:</span>{" "}
// //                 <span className="text-xl font-bold text-green-600">
// //                   ₹{product.price} / kg
// //                 </span>
// //               </p>

// //               <p>
// //                 <span className="font-semibold">Available:</span>{" "}
// //                 {product.quantity} kg
// //               </p>

// //               <p>
// //                 <span className="font-semibold">Category:</span>{" "}
// //                 {product.category}
// //               </p>
// //             </div>

// //             <div className="mt-5">
// //               <h2 className="mb-2 text-lg font-bold text-gray-900">
// //                 Product Details
// //               </h2>

// //               <p className="text-sm leading-6 text-gray-600">
// //                 {product.description ||
// //                   "Freshly harvested from farm, organic cultivation, no chemicals, same day dispatch."}
// //               </p>
// //             </div>
// //           </div>

// //           <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-7 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 md:w-auto">
// //             <ShoppingBag size={18} />
// //             Order Now
// //           </button>
// //         </div>

// //         <div className="mt-5 border-t border-gray-200 pt-4">
// //           <p className="text-sm text-gray-500">
// //             To protect farmer privacy, contact details will only be visible
// //             after you place an order.
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDetailsCard;

// import { Heart, ShoppingBag, Star } from "lucide-react";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { addToWishlist } from "../../../Api/customerApi";

// type ProductDetailsCardProps = {
//     product: {
//         _id: string;
//         productName: string;
//         image: string;
//         price: number;
//         quantity: number;
//         category: string;
//         review?: number;
//         description?: string;
//         isWishlisted?: boolean;
//     };
// };

// const ProductDetailsCard = ({ product }: ProductDetailsCardProps) => {
//     const [isWishlisted, setIsWishlisted] = useState(false);

//     useEffect(() => {
//         setIsWishlisted(product.isWishlisted ?? false);
//     }, [product]);
//     // const [isWishlisted, setIsWishlisted] = useState(
//     //     product.isWishlisted ?? false
//     // );

//     const handleWishlist = async () => {
//         try {
//             const response = await addToWishlist(product._id);

//             if (response.data.success) {
//                 setIsWishlisted(response.data.isWishlisted);
//                 toast.success(response.data.message);
//             }
//         } catch (error: any) {
//             toast.error(error?.response?.data?.message || "Something went wrong");
//         }
//     };

//     return (
//         <div className="space-y-5">
//             <div className="relative h-72 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-sm md:h-96">
//                 <img
//                     src={product.image}
//                     alt={product.productName}
//                     className="h-full w-full object-cover"
//                 />

//                 <button
//                     onClick={handleWishlist}
//                     className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
//                 >
//                     <Heart
//                         size={20}
//                         className={`transition-all duration-300 ${isWishlisted
//                             ? "fill-red-500 text-red-500"
//                             : "text-gray-700 hover:text-red-500"
//                             }`}
//                     />

//                 </button>

//                 <span
//                     className={`absolute left-4 top-4 rounded-full px-4 py-1.5 text-sm font-semibold text-white ${product.quantity > 0 ? "bg-green-600" : "bg-red-500"
//                         }`}
//                 >
//                     {product.quantity > 0 ? "In Stock" : "Out of Stock"}
//                 </span>
//             </div>

//             <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//                 <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-900">
//                             {product.productName}
//                         </h1>

//                         <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
//                             <Star size={17} className="fill-yellow-400 text-yellow-400" />
//                             <span className="font-semibold text-gray-800">
//                                 {product.review ?? 5}
//                             </span>
//                             <span>(124 Reviews)</span>
//                         </div>

//                         <div className="mt-4 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
//                             <p>
//                                 <span className="font-semibold">Price:</span>{" "}
//                                 <span className="text-xl font-bold text-green-600">
//                                     ₹{product.price} / kg
//                                 </span>
//                             </p>

//                             <p>
//                                 <span className="font-semibold">Available:</span>{" "}
//                                 {product.quantity} kg
//                             </p>

//                             <p>
//                                 <span className="font-semibold">Category:</span>{" "}
//                                 {product.category}
//                             </p>
//                         </div>

//                         <div className="mt-5">
//                             <h2 className="mb-2 text-lg font-bold text-gray-900">
//                                 Product Details
//                             </h2>

//                             <p className="text-sm leading-6 text-gray-600">
//                                 {product.description ||
//                                     "Freshly harvested from farm, organic cultivation, no chemicals, same day dispatch."}
//                             </p>
//                         </div>
//                     </div>

//                     <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-7 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 md:w-auto">
//                         <ShoppingBag size={18} />
//                         Order Now
//                     </button>
//                 </div>

//                 <div className="mt-5 border-t border-gray-200 pt-4">
//                     <p className="text-sm text-gray-500">
//                         To protect farmer privacy, contact details will only be visible
//                         after you place an order.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetailsCard;

import { Heart, ShoppingBag, Star } from "lucide-react";
import { useWishlist } from "../../../hooks/useWishlist";
import { useState } from "react";

type Props = {
    product: any;
    onOrderClick: () => void;
};

const ProductDetailsCard = ({ product, onOrderClick }: Props) => {
    const { isInWishlist, toggleWishlist } = useWishlist();

    const isWishlisted = isInWishlist(product._id);

    return (
        <div className="space-y-5">
            <div className="relative h-72 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-sm md:h-96">
                <img
                    src={product.image}
                    alt={product.productName}
                    className="h-full w-full object-cover"
                />

                <button
                    //   onClick={() => toggleWishlist(product._id)}
                    onClick={() => toggleWishlist(product)}
                    className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
                >
                    <Heart
                        size={20}
                        className={`transition-all duration-300 ${isWishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-gray-700 hover:text-red-500"
                            }`}
                    />
                </button>

                <span
                    className={`absolute left-4 top-4 rounded-full px-4 py-1.5 text-sm font-semibold text-white ${product.quantity > 0 ? "bg-green-600" : "bg-red-500"
                        }`}
                >
                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {product.productName}
                        </h1>

                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                            <Star size={17} className="fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-gray-800">
                                {product.review ?? 5}
                            </span>
                            <span>(124 Reviews)</span>
                        </div>

                        <div className="mt-4 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                            <p>
                                <span className="font-semibold">Price:</span>{" "}
                                <span className="text-xl font-bold text-green-600">
                                    ₹{product.price} / kg
                                </span>
                            </p>

                            <p>
                                <span className="font-semibold">Available:</span>{" "}
                                {product.quantity} kg
                            </p>

                            <p>
                                <span className="font-semibold">Category:</span>{" "}
                                {product.category}
                            </p>
                        </div>

                        <div className="mt-5">
                            <h2 className="mb-2 text-lg font-bold text-gray-900">
                                Product Details
                            </h2>

                            <p className="text-sm leading-6 text-gray-600">
                                {product.description ||
                                    "Freshly harvested from farm, organic cultivation, no chemicals, same day dispatch."}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onOrderClick}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-green-600 px-7 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 md:w-auto">
                        <ShoppingBag size={18} />
                        Order Now
                    </button>
                </div>

                <div className="mt-5 border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-500">
                        To protect farmer privacy, contact details will only be visible
                        after you place an order.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsCard;