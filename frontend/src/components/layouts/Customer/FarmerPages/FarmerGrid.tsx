// import React from "react";
// import "./FarmerGrid.css";
// import ProductCard from "../Product/ProductCard";


// export interface Product {
//   _id: string;
//   productName: string;
//   productImage: string;
//   price: number;
//   [key: string]: any;
// }

// interface FarmerGridProps {
//   searchedProduct?: Product | null;
//   farmerProducts: Product[];
//   message?: string;
// }

// const FarmerGrid: React.FC<FarmerGridProps> = ({
//   searchedProduct,
//   farmerProducts,
//   message,
// }) => {
//   const otherProducts = farmerProducts.filter(
//     (item) => item._id !== searchedProduct?._id
//   );

//   return (
//     <div className="farmer-container">
//       {message && <p className="farmer-message">{message}</p>}

//       {/* Search Product */}
//       {searchedProduct && (
//         <section className="search-section">
//           <h2>Search Product</h2>

//           <div className="search-card">
//             <ProductCard product={searchedProduct} />
//           </div>
//         </section>
//       )}

//       {/* Farmer Products */}
//       {otherProducts.length > 0 && (
//         <section className="grid-section">
//           <h2>More Products From This Farmer</h2>

//           <div className="farmer-grid">
//             {otherProducts.map((product) => (
//               <ProductCard
//                 key={product._id}
//                 product={product}
//               />
//             ))}
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default FarmerGrid;




import React from "react";
import "./FarmerGrid.css";
import ProductCard from "../Product/ProductCard";

export interface Product {
  _id: string;
  productName: string;
  productImage: string;
  price: number;
  [key: string]: any;
}

interface FarmerGridProps {
  searchedProduct?: Product | null;
  farmerProducts: Product[];
  message?: string;
}

const FarmerGrid: React.FC<FarmerGridProps> = ({
  searchedProduct,
  farmerProducts,
  message,
}) => {
  const otherProducts = farmerProducts.filter(
    (item) => item._id !== searchedProduct?._id
  );

  return (
    <div
      className="
        farmer-container
        w-full
        min-w-0
        px-0
        transition-colors
        duration-200
        dark:text-[#f5f7f8]
      "
    >
      {message && (
        <p
          className="
            farmer-message
            wrap-break-word
            text-slate-700
            dark:text-[#9aa7b1]
          "
        >
          {message}
        </p>
      )}

      {/* Search Product */}
      {searchedProduct && (
        <section
          className="
            search-section
            min-w-0
            transition-colors
            duration-200
          "
        >
          <h2
            className="
              wrap-break-word
              text-slate-900
              dark:text-[#f5f7f8]
            "
          >
            Search Product
          </h2>

          <div
            className="
              search-card
              min-w-0
              transition-colors
              duration-200
            "
          >
            <ProductCard product={searchedProduct} />
          </div>
        </section>
      )}

      {/* Farmer Products */}
      {otherProducts.length > 0 && (
        <section
          className="
            grid-section
            min-w-0
            transition-colors
            duration-200
          "
        >
          <h2
            className="
              wrap-break-word
              text-slate-900
              dark:text-[#f5f7f8]
            "
          >
            More Products From This Farmer
          </h2>

          <div
            className="
              farmer-grid
              w-full
              min-w-0
            "
          >
            {otherProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default FarmerGrid;