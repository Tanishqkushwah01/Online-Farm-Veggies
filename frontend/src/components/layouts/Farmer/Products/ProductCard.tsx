// import { Trash2, Star } from "lucide-react";

// type ProductProps = {
//   product: {
//     _id: string;
//     productName: string;
//     category: string;
//     price: number;
//     quantity: number;
//     review: number;
//     image: string;
//   };
//   onDelete: (id: string) => void;
//   onEdit: (product: any) => void;
// };

// const ProductCard = ({
//   product,
//   onDelete,
//   onEdit,
// }: ProductProps) => {
//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow duration-300 hover:shadow-xl">
//       <img
//         src={product.image}
//         alt={product.productName}
//         className="h-52 w-full object-cover"
//       />

//       <div className="p-5">
//         <h2 className="text-xl font-bold">{product.productName}</h2>

//         <p className="mt-1 text-gray-500">{product.category}</p>

//         <h1 className="mt-4 text-2xl font-bold text-green-600">
//           ₹{product.price}
//         </h1>

//         <div className="mt-4 flex justify-between">
//           <span className="text-gray-600">
//             {product.quantity} Kg
//           </span>

//           <span className="flex items-center gap-1 text-yellow-500">
//             <Star size={18} fill="currentColor" />
//             {product.review}
//           </span>
//         </div>

//         <div className="mt-6 flex gap-3">
//           <button
//             onClick={() => onEdit(product)}
//             className="flex-1 cursor-pointer rounded-lg bg-green-600 py-2 text-white hover:bg-green-700"
//           >
//             Edit
//           </button>

//           <button
//             onClick={() => onDelete(product._id)}
//             className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
//           >
//             <Trash2 size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


import { Trash2, Star } from "lucide-react";

type ProductProps = {
  product: {
    _id: string;
    productName: string;
    category: string;
    price: number;
    quantity: number;
    review: number;
    image: string;
  };
  onDelete: (id: string) => void;
  onEdit: (product: any) => void;
};

const ProductCard = ({
  product,
  onDelete,
  onEdit,
}: ProductProps) => {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow transition-all duration-300 hover:shadow-xl dark:border-[#29343c] dark:bg-[#141c23]">
      <img
        src={product.image}
        alt={product.productName}
        className="h-48 w-full object-cover sm:h-52"
      />

      <div className="min-w-0 p-4 sm:p-5">
        <h2 className="truncate text-xl font-bold text-slate-900 dark:text-[#f5f7f8]">
          {product.productName}
        </h2>

        <p className="mt-1 truncate text-gray-500 dark:text-[#9aa7b1]">
          {product.category}
        </p>

        <h1 className="mt-4 text-2xl font-bold text-green-600 dark:text-[#00c767]">
          ₹{product.price}
        </h1>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="whitespace-nowrap text-gray-600 dark:text-[#c4cdd3]">
            {product.quantity} Kg
          </span>

          <span className="flex shrink-0 items-center gap-1 text-yellow-500">
            <Star
              size={18}
              fill="currentColor"
            />
            {product.review}
          </span>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 cursor-pointer rounded-lg bg-green-600 py-2 text-white transition hover:bg-green-700"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(product._id)}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-red-100 text-red-600 transition hover:bg-red-200 dark:bg-[#321d24] dark:text-[#ff6578] dark:hover:bg-[#493139]"
            aria-label="Delete product"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;