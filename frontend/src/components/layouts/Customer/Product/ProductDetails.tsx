import { useEffect, useState } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";

import Header from "../Home/CustomerHeader";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

import FarmerInfoCard from "./FarmerInfoCard";
import ProductReviewSection from "./ProductReviewSection";
import SimilarProducts from "./SimilarProducts";
import useWebNavigate from "../../../hooks/useWebNavigate";
import ProductDetailsCard from "./ProductDetailsCard";
import FarmerDetailsCard from "./FarmerInfoCard";

const ProductDetails = () => {
  const { id } = useParams();
  const { gotoCustomer } = useWebNavigate();

  // const [activePage, setActivePage] = useState("home");
  const [filterOpen, setFilterOpen] = useState(false);

  // const handleActivePage = (page: string) => {
  //   setActivePage(page);
  //   gotoCustomer();
  // };
  const handleActivePage: React.Dispatch<React.SetStateAction<string>> = () => {
    gotoCustomer();
  };
  const location = useLocation();

  const product = location.state?.product;
  const farmerDetails = location.state?.farmerDetails;

  if (!product) {
    return <h1 className="p-6 text-xl font-bold">Product not found</h1>;
  }

  return (
    <div className="min-h-screen bg-[#F5F7F5]">
      <Header
        setActivePage={handleActivePage}
        onFilterClick={() => setFilterOpen((prev) => !prev)}
      />

      <Navbar filterOpen={filterOpen} setFilterOpen={setFilterOpen} />

      {/* <div className="p-4 md:p-8"> */}
      <div className="space-y-8 p-8">

        {/* <div className="mx-auto rounded-[28px] border border-gray-200 bg-white p-4 shadow-sm md:p-8"> */}
        <div className="mx-auto rounded-[28px]">
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            

            {/* card ayega  */}
             <ProductDetailsCard product={product} />

        <FarmerDetailsCard farmerDetails={farmerDetails} />

            {/* <FarmerInfoCard
              farmerName={product.farmerName}
              farmName="Organic Farmer"
              city="Indore, Madhya Pradesh"
            /> */}
          </div>

          <div className="mt-7">
            <SimilarProducts />
          </div>

          <div className="mt-7">
            <ProductReviewSection productId={id!}/>
          </div>



          <div className="mt-7">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

