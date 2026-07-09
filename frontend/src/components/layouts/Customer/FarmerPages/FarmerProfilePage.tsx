// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import Header from "../Home/CustomerHeader";
// import Navbar from "../Home/Navbar";
// import Footer from "../Home/Footer";

// import FarmerProfileCard from "./FarmerProfileCard";
// import FarmerProducts from "./FarmerProducts";
// import ReviewSection from "../Review/ReviewSection";

// import { getFarmerProfileById } from "../../../Api/customerApi";
// import useWebNavigate from "../../../hooks/useWebNavigate";

// const FarmerProfilePage = () => {
//     const { farmerId } = useParams();
//     const { gotoCustomer } = useWebNavigate();

//     const [farmer, setFarmer] = useState<any>(null);
//     const [products, setProducts] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [filterOpen, setFilterOpen] = useState(false);

//     const handleActivePage: React.Dispatch<React.SetStateAction<string>> = (
//         value
//     ) => {
//         if (typeof value === "function") {
//             gotoCustomer("home");
//             return;
//         }

//         gotoCustomer(value);
//     };

     
    

//     return (
//         <div className="min-h-screen bg-[#F5F7F5]">
//             <Header
//                 setActivePage={handleActivePage}
//                 onFilterClick={() => setFilterOpen((prev) => !prev)}
//             />

//             <Navbar filterOpen={filterOpen} setFilterOpen={setFilterOpen} />

//             <div className="space-y-8 p-8">
//                 <div className="mx-auto rounded-[28px]">
//                     {loading ? (
//                         <p className="text-center text-gray-500">
//                             Loading farmer profile...
//                         </p>
//                     ) : !farmer ? (
//                         <p className="text-center text-red-500">Farmer not found.</p>
//                     ) : (
//                         <>
//                             <FarmerProfileCard
//                                 farmer={farmer}
//                                 productsCount={products.length}
//                             />

//                             <div className="mt-7">
//                                 <FarmerProducts products={products} />
//                             </div>

//                             <div className="mt-7">
//                                 <ReviewSection
//                                     id={farmerId!}
//                                     type="farmer"
//                                     reviews={reviews}
//                                     onReviewAdded={fetchFarmer}
//                                 />
//                             </div>

//                             <div className="mt-7">
//                                 <Footer />
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FarmerProfilePage;

import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Header from "../Home/CustomerHeader";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

import FarmerProfileCard from "./FarmerProfileCard";
import FarmerProducts from "./FarmerProducts";
import ReviewSection from "../Review/ReviewSection";

import useWebNavigate from "../../../hooks/useWebNavigate";

const FarmerProfilePage = () => {
  const { farmerId } = useParams();
  const location = useLocation();
  const { gotoCustomer } = useWebNavigate();

  const [filterOpen, setFilterOpen] = useState(false);

  const farmer = location.state?.farmer;
  const products = location.state?.products || [];
  const review = location.state?.review || null;

  const handleActivePage: React.Dispatch<React.SetStateAction<string>> = (
    value
  ) => {
    if (typeof value === "function") {
      gotoCustomer("home");
      return;
    }

    gotoCustomer(value);
  };

  return (
    <div className="min-h-screen bg-[#F5F7F5]">
      <Header
        setActivePage={handleActivePage}
        onFilterClick={() => setFilterOpen((prev) => !prev)}
      />

      <Navbar filterOpen={filterOpen} setFilterOpen={setFilterOpen} />

      <div className="space-y-8 p-8">
        <div className="mx-auto rounded-[28px]">
          {!farmer ? (
            <p className="text-center text-red-500">Farmer not found.</p>
          ) : (
            <>
              <FarmerProfileCard
                farmer={farmer}
                productsCount={products.length}
              />

              <div className="mt-7">
                <FarmerProducts products={products} />
              </div>

              <div className="mt-7">
                <ReviewSection
                  id={farmerId!}
                  type="farmer"
                  reviews={review}
                  onReviewAdded={() => {}}
                />
              </div>

              <div className="mt-7">
                <Footer />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerProfilePage;