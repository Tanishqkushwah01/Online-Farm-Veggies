import { useState } from "react";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";
import { useProducts } from "../../../hooks/useProducts";
import { deleteProduct } from "../../../Api/farmerApi";

const ProductGrid = () => {
  const { products, loading, fetchProducts } = useProducts();

  const [openProduct, setOpenProduct] = useState(false);
  const [editProduct, setEditProduct] = useState<any | null>(null);

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

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (products.length === 0) {
    return <h1>No Products Found</h1>;
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
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