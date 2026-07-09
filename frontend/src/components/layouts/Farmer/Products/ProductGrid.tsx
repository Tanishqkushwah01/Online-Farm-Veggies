import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";
import { useFarmerProducts } from "../../../hooks/useFarmerProducts";
import { deleteProduct } from "../../../Api/farmerApi";
import { useProductHighlight } from "../../../hooks/useProductHighlight";

const ProductGrid = () => {
  const { products, loading, fetchProducts } = useFarmerProducts();
  const { highlightProductId, clearHighlight } = useProductHighlight();

  const [openProduct, setOpenProduct] = useState(false);
  const [editProduct, setEditProduct] = useState<any | null>(null);

  useEffect(() => {
    if (!highlightProductId || products.length === 0) return;

    const timer = setTimeout(() => {
      const element = document.getElementById(`product-${highlightProductId}`);
      const container = element?.closest("main");

      if (!element || !container) return;

      const containerTop = container.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;

      container.scrollTo({
        top: container.scrollTop + elementTop - containerTop - 40,
        behavior: "smooth",
      });

      element.classList.add("border-green-500", "shadow-md");

      setTimeout(() => {
        element.classList.remove("border-green-500", "shadow-md");
        clearHighlight();
      }, 1800);
    }, 100);

    return () => clearTimeout(timer);
  }, [highlightProductId, products.length, clearHighlight]);
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
            id={`product-${product._id}`}
            key={product._id}
            className={`rounded-xl transition duration-300 ${highlightProductId === product._id
                ? "ring-4 ring-green-500 shadow-xl"
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