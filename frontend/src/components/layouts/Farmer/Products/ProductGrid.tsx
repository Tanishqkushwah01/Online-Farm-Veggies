// import ProductCard from "./ProductCard";

const products = [
  {
    productName: "Tomato",
    category: "Vegetables",
    price: 30,
    quantity: 120,
    review: 4.8,
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
  }, {
    productName: "Tomato",
    category: "Vegetables",
    price: 30,
    quantity: 120,
    review: 4.8,
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
  }, {
    productName: "Tomato",
    category: "Vegetables",
    price: 30,
    quantity: 120,
    review: 4.8,
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
  }, {
    productName: "Tomato",
    category: "Vegetables",
    price: 30,
    quantity: 120,
    review: 4.8,
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
  }, {
    productName: "Tomato",
    category: "Vegetables",
    price: 30,
    quantity: 120,
    review: 4.8,
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
  }, {
    productName: "Tomato",
    category: "Vegetables",
    price: 30,
    quantity: 120,
    review: 4.8,
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
  },
  {
    productName: "Potato",
    category: "Vegetables",
    price: 25,
    quantity: 200,
    review: 4.7,
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
  },
  {
    productName: "Onion",
    category: "Vegetables",
    price: 35,
    quantity: 90,
    review: 4.9,
    image:
      "https://images.unsplash.com/photo-1508747703725-719777637510",
  },
  {
    productName: "Spinach",
    category: "Leafy",
    price: 20,
    quantity: 65,
    review: 4.5,
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
  },
];

// const ProductGrid = () => {
//   return (
//     <div className="grid grid-cols-4 gap-6">

//       {products.map((item, index) => (
//         <ProductCard
//           key={index}
//           product={item}
//         />
//       ))}

//     </div>
//   );
// };

// export default ProductGrid;
import ProductCard from "./ProductCard";
import { useProducts } from "../../../hooks/useProducts";
import type { Product } from "../../../context/ProductContext";

const ProductGrid = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (products.length === 0) {
    return <h1>No Products Found</h1>;
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product: Product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;