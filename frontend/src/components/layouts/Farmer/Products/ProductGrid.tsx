// import { useState } from "react";
// import ProductCard from "./ProductCard";
// import AddProduct from "./AddProduct";
// import { useFarmerProducts } from "../../../hooks/useFarmerProducts";
// import { deleteProduct } from "../../../Api/farmerApi";

// const ProductGrid = () => {
//   const { products, loading, fetchProducts } = useFarmerProducts();

//   const [openProduct, setOpenProduct] = useState(false);
//   const [editProduct, setEditProduct] = useState<any | null>(null);

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

//   if (loading) {
//     return <h1>Loading...</h1>;
//   }

//   if (products.length === 0) {
//     return <h1>No Products Found</h1>;
//   }

//   return (
//     <>
//       <div className="grid grid-cols-4 gap-6">
//         {products.map((product) => (
//           <ProductCard
//             key={product._id}
//             product={product}
//             onDelete={handleDelete}
//             onEdit={handleEdit}
//           />
//         ))}
//       </div>

//       <AddProduct
//         open={openProduct}
//         onClose={handleCloseModal}
//         editProduct={editProduct}
//       />
//     </>
//   );
// };

// export default ProductGrid;
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";
import { useFarmerProducts } from "../../../hooks/useFarmerProducts";
import { deleteProduct } from "../../../Api/farmerApi";

type ProductGridProps = {
  highlightProductId: string | null;
};

const ProductGrid = ({ highlightProductId }: ProductGridProps) => {
  const { products, loading, fetchProducts } = useFarmerProducts();

  const [openProduct, setOpenProduct] = useState(false);
  const [editProduct, setEditProduct] = useState<any | null>(null);
  console.log("highlightProductId:", highlightProductId);
  console.log("products:", products.map((p) => p._id));

  useEffect(() => {
    if (!highlightProductId || products.length === 0) return;

    const timer = setTimeout(() => {
      document.getElementById(highlightProductId)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [highlightProductId, products]);

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

  if (loading) return <h1>Loading...</h1>;

  if (products.length === 0) return <h1>No Products Found</h1>;

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            id={product._id}
            key={product._id}
            className={`rounded-xl transition-all duration-500 ${highlightProductId === product._id
                ? "scale-[1.03] ring-4 ring-green-500 shadow-2xl"
                : ""
              }`}
          >
            <ProductCard
              product={product}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        ))}
      </div>

      <AddProduct
        open={openProduct}
        onClose={handleCloseModal}
        editProduct={editProduct}
      />
    </>
  );
};

export default ProductGrid;