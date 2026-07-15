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
    <div className="farmer-container">
      {message && <p className="farmer-message">{message}</p>}

      {/* Search Product */}
      {searchedProduct && (
        <section className="search-section">
          <h2>Search Product</h2>

          <div className="search-card">
            <ProductCard product={searchedProduct} />
          </div>
        </section>
      )}

      {/* Farmer Products */}
      {otherProducts.length > 0 && (
        <section className="grid-section">
          <h2>More Products From This Farmer</h2>

          <div className="farmer-grid">
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