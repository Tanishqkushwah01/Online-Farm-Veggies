// import { useState } from "react";
// import { useLocation, useParams } from "react-router-dom";

// import Header from "../Home/CustomerHeader";
// import Navbar from "../Home/Navbar";
// import Footer from "../Home/Footer";

// import ReviewSection from "../Review/ReviewSection";
// import SimilarProducts from "./SimilarProducts";
// import useWebNavigate from "../../../hooks/useWebNavigate";
// import ProductDetailsCard from "./ProductDetailsCard";
// import FarmerDetailsCard from "./FarmerInfoCard";
// import OrderCard from "../Orders/OrderCard";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const { gotoCustomer } = useWebNavigate();
//   const [showOrderCard, setShowOrderCard] = useState(false);


//   // const [activePage, setActivePage] = useState("home");
//   const [filterOpen, setFilterOpen] = useState(false);


//   // const handleActivePage: React.Dispatch<React.SetStateAction<string>> = () => {
//   //   gotoCustomer();
//   // };
//   const handleActivePage = (page: string) => {
//     gotoCustomer(page);
//   };
//   const location = useLocation();

//   const product = location.state?.product;
//   const farmerDetails = location.state?.farmerDetails;
//   const review = location.state?.review;


//   if (!product) {
//     return <h1 className="p-6 text-xl font-bold">Product not found</h1>;
//   }

//   return (
//     <div className="min-h-screen bg-[#F5F7F5]">
//       <Header
//         setActivePage={handleActivePage}
//         onFilterClick={() => setFilterOpen((prev) => !prev)}
//       />

//       <Navbar filterOpen={filterOpen} setFilterOpen={setFilterOpen} />

//       {/* <div className="p-4 md:p-8"> */}
//       <div className="space-y-8 p-8">

//         {/* <div className="mx-auto rounded-[28px] border border-gray-200 bg-white p-4 shadow-sm md:p-8"> */}
//         <div className="mx-auto rounded-[28px]">
//           <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">


//             {/* card ayega  */}
//             <ProductDetailsCard onOrderClick={() => setShowOrderCard(true)} product={product} />

//             <FarmerDetailsCard farmerDetails={farmerDetails} />


//           </div>

//           <div className="mt-7">
//             <SimilarProducts />
//           </div>

//           <div className="mt-7">
//             <ReviewSection
//               id={id!}
//               type="product"
//               reviews={review}
//               onReviewAdded={() => { }}
//             />
//           </div>



//           <div className="mt-7">
//             <Footer />
//           </div>
//         </div>
//       </div>
//       {showOrderCard && (
//         <OrderCard
//           productId={product._id}
//           price={product.price}
//           availableQuantity={product.quantity}
//           city={farmerDetails.city}
//           onClose={() => { setShowOrderCard(false) }}
//         />

//       )}
//     </div>)

// };

// export default ProductDetails;

import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Header from "../Home/CustomerHeader";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

import ReviewSection from "../Review/ReviewSection";
import SimilarProducts from "./SimilarProducts";
import useWebNavigate from "../../../hooks/useWebNavigate";
import ProductDetailsCard from "./ProductDetailsCard";
import FarmerDetailsCard from "./FarmerInfoCard";
import OrderCard from "../Orders/OrderCard";
import { useCustomerNavigation } from "../../../hooks/useCustomerNavigation";

const ProductDetails = () => {
  const { id } = useParams();

  const { gotoCustomer } = useWebNavigate();

  const { setActivePage } = useCustomerNavigation();

  const [showOrderCard, setShowOrderCard] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleActivePage = (page: any) => {
    setActivePage(page); // Context update
    gotoCustomer(); // Navigate only
  };

  const location = useLocation();

  const product = location.state?.product;
  const farmerDetails = location.state?.farmerDetails;
  const review = location.state?.review;

  if (!product) {
    return <h1 className="p-6 text-xl font-bold">Product not found</h1>;
  }

  return (
    <div className="min-h-screen bg-[#F5F7F5]">
      <Header
        setActivePage={handleActivePage}
        onFilterClick={() => setFilterOpen((prev) => !prev)}
      />

      <Navbar
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
      />

      <div className="space-y-8 p-8">
        <div className="mx-auto rounded-[28px]">
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <ProductDetailsCard
              onOrderClick={() => setShowOrderCard(true)}
              product={product}
            />

            <FarmerDetailsCard farmerDetails={farmerDetails} />
          </div>

          <div className="mt-7">
            <SimilarProducts />
          </div>

          <div className="mt-7">
            <ReviewSection
              id={id!}
              type="product"
              reviews={review}
              onReviewAdded={() => {}}
            />
          </div>

          <div className="mt-7">
            <Footer />
          </div>
        </div>
      </div>

      {showOrderCard && (
        <OrderCard
          productId={product._id}
          price={product.price}
          availableQuantity={product.quantity}
          city={farmerDetails.city}
          onClose={() => setShowOrderCard(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;