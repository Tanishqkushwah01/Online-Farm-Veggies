// // import { useState } from "react";
// // import { useLocation, useParams } from "react-router-dom";

// // import Header from "../Home/CustomerHeader";
// // import Navbar from "../Home/Navbar";
// // import Footer from "../Home/Footer";

// // import FarmerProfileCard from "./FarmerProfileCard";
// // import FarmerProducts from "./FarmerProducts";
// // import ReviewSection from "../Review/ReviewSection";

// // import useWebNavigate from "../../../hooks/useWebNavigate";
// // import { useCustomerNavigation } from "../../../hooks/useCustomerNavigation";
// // import type { ActivePage } from "../../../context/CustomerNavigationContext";

// // const FarmerProfilePage = () => {
// //   const { farmerId } = useParams();
// //   const location = useLocation();

// //   const { gotoCustomer } = useWebNavigate();
// //   const { setActivePage } = useCustomerNavigation();

// //   const [filterOpen, setFilterOpen] = useState(false);

// //   const farmer = location.state?.farmer;
// //   const products = location.state?.products || [];
// //   const review = location.state?.review || null;

// //   const handleActivePage = (page: ActivePage) => {
// //     setActivePage(page); // Context Update
// //     gotoCustomer(); // Navigate to Dashboard
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#F5F7F5]">
// //       <Header
// //         setActivePage={handleActivePage}
// //         onFilterClick={() => setFilterOpen((prev) => !prev)}
// //       />

// //       <Navbar
// //         filterOpen={filterOpen}
// //         setFilterOpen={setFilterOpen}
// //       />

// //       <div className="space-y-8 p-8">
// //         <div className="mx-auto rounded-[28px]">
// //           {!farmer ? (
// //             <p className="text-center text-red-500">
// //               Farmer not found.
// //             </p>
// //           ) : (
// //             <>
// //               <FarmerProfileCard
// //                 farmer={farmer}
// //                 productsCount={products.length}
// //               />

// //               <div className="mt-7">
// //                 <FarmerProducts products={products} />
// //               </div>

// //               <div className="mt-7">
// //                 <ReviewSection
// //                   id={farmerId!}
// //                   type="farmer"
// //                   reviews={review}
// //                   onReviewAdded={() => {}}
// //                 />
// //               </div>

// //               <div className="mt-7">
// //                 <Footer />
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FarmerProfilePage;

// // import { useEffect, useState } from "react";
// // import { useLocation, useParams } from "react-router-dom";

// // import Header from "../Home/CustomerHeader";
// // import Navbar from "../Home/Navbar";
// // import Footer from "../Home/Footer";

// // import FarmerProfileCard from "./FarmerProfileCard";
// // import FarmerProducts from "./FarmerProducts";
// // import FarmerPagination from "./FarmerPagination";
// // import ReviewSection from "../Review/ReviewSection";

// // import useWebNavigate from "../../../hooks/useWebNavigate";
// // import { useCustomerNavigation } from "../../../hooks/useCustomerNavigation";
// // import { useCustomerFarmerProducts } from "../../../hooks/useCustomerFarmerProducts";

// // import type { ActivePage } from "../../../context/CustomerNavigationContext";

// // const FarmerProfilePage = () => {
// //   const { farmerId } = useParams();
// //   const location = useLocation();

// //   const { gotoCustomer } = useWebNavigate();
// //   const { setActivePage } = useCustomerNavigation();

// //   const {
// //     farmerProducts,
// //     farmerLoading,
// //     page,
// //     totalPages,
// //     totalProducts,
// //     setPage,
// //     setFarmerId,
// //   } = useCustomerFarmerProducts();

// //   const [filterOpen, setFilterOpen] = useState(false);

// //   const farmer = location.state?.farmer;
// //   const review = location.state?.review || null;

// //   useEffect(() => {
// //     if (farmerId) {
// //       setFarmerId(farmerId);
// //     }
// //   }, [farmerId, setFarmerId]);

// //   const handleActivePage = (page: ActivePage) => {
// //     setActivePage(page);
// //     gotoCustomer();
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#F5F7F5]">
// //       <Header
// //         setActivePage={handleActivePage}
// //         onFilterClick={() => setFilterOpen((prev) => !prev)}
// //       />

// //       <Navbar
// //         filterOpen={filterOpen}
// //         setFilterOpen={setFilterOpen}
// //       />

// //       <div className="space-y-8 p-8">
// //         <div className="mx-auto rounded-[28px]">
// //           {!farmer ? (
// //             <p className="text-center text-red-500 text-lg font-medium">
// //               Farmer not found.
// //             </p>
// //           ) : (
// //             <>
// //               <FarmerProfileCard
// //                 farmer={farmer}
// //                 productsCount={totalProducts}
// //               />

// //               <div className="mt-7">
// //                 <FarmerProducts
// //                   products={farmerProducts}
// //                   loading={farmerLoading}
// //                 />

// //                 <FarmerPagination
// //                   currentPage={page}
// //                   totalPages={totalPages}
// //                   onPageChange={setPage}
// //                 />
// //               </div>

// //               <div className="mt-7">
// //                 <ReviewSection
// //                   id={farmerId!}
// //                   type="farmer"
// //                   reviews={review}
// //                   onReviewAdded={() => {}}
// //                 />
// //               </div>

// //               <div className="mt-7">
// //                 <Footer />
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FarmerProfilePage;
// import { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";

// import Header from "../Home/CustomerHeader";
// import Navbar from "../Home/Navbar";
// import Footer from "../Home/Footer";

// import FarmerProfileCard from "./FarmerProfileCard";
// import FarmerProducts from "./FarmerProducts";
// import FarmerPagination from "./FarmerPagination";
// import ReviewSection from "../Review/ReviewSection";

// import useWebNavigate from "../../../hooks/useWebNavigate";
// import { useCustomerNavigation } from "../../../hooks/useCustomerNavigation";
// import { useCustomerFarmerProducts } from "../../../hooks/useCustomerFarmerProducts";

// import type { ActivePage } from "../../../context/CustomerNavigationContext";

// const FarmerProfilePage = () => {
//   const { farmerId } = useParams();
//   const location = useLocation();

//   const { gotoCustomer } = useWebNavigate();
//   const { setActivePage } = useCustomerNavigation();

//   const {
//     farmerProducts,
//     farmerLoading,

//     page,
//     totalPages,
//     totalProducts,

//     setPage,
//     setFarmerId,
//   } = useCustomerFarmerProducts();

//   const [filterOpen, setFilterOpen] = useState(false);

//   const farmer = location.state?.farmer;
//   const review = location.state?.review || null;

//   useEffect(() => {
//     if (farmerId) {
//       setFarmerId(farmerId);
//     }
//   }, [farmerId, setFarmerId]);

//   const handleActivePage = (page: ActivePage) => {
//     setActivePage(page);
//     gotoCustomer();
//   };

//   return (
//     <div className="min-h-screen bg-[#F5F7F5]">
//       <Header
//         setActivePage={handleActivePage}
//         onFilterClick={() => setFilterOpen((prev) => !prev)}
//       />

//       <Navbar
//         filterOpen={filterOpen}
//         setFilterOpen={setFilterOpen}
//       />

//       <div className="space-y-8 p-8">
//         <div className="mx-auto rounded-[28px]">
//           {!farmer ? (
//             <p className="text-center text-lg font-medium text-red-500">
//               Farmer not found.
//             </p>
//           ) : (
//             <>
//               <FarmerProfileCard
//                 farmer={farmer}
//                 productsCount={totalProducts}
//               />

//               <div className="mt-7">
//                 <FarmerProducts
//                   products={farmerProducts}
//                   loading={farmerLoading}
//                 />

//                 <FarmerPagination
//                   currentPage={page}
//                   totalPages={totalPages}
//                   onPageChange={setPage}
//                 />
//               </div>

//               <div className="mt-7">
//                 <ReviewSection
//                   id={farmerId!}
//                   type="farmer"
//                   reviews={review}
//                   onReviewAdded={() => {}}
//                 />
//               </div>

//               <div className="mt-7">
//                 <Footer />
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerProfilePage;

// import { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";

// import Header from "../Home/CustomerHeader";
// import Navbar from "../Home/Navbar";
// import Footer from "../Home/Footer";

// import FarmerProfileCard from "./FarmerProfileCard";
// import FarmerProducts from "./FarmerProducts";
// import FarmerPagination from "./FarmerPagination";
// import ReviewSection from "../Review/ReviewSection";

// import useWebNavigate from "../../../hooks/useWebNavigate";
// import { useCustomerNavigation } from "../../../hooks/useCustomerNavigation";

// import { useCustomerFarmerProducts } from "../../../hooks/useCustomerFarmerProducts";

// import type { ActivePage } from "../../../context/CustomerNavigationContext";



// const FarmerProfilePage = () => {
//   const { farmerId } = useParams();
//   const location = useLocation();
//   const { gotoCustomer } = useWebNavigate();
//   const { setActivePage } = useCustomerNavigation();
//   const { farmerProducts, farmerLoading, page, totalPages, totalProducts, message, setPage, setFarmerId, } = useCustomerFarmerProducts();
//   const [filterOpen, setFilterOpen] = useState(false);
//   const farmer = location.state?.farmer;
//   const review = location.state?.review || null;



//   useEffect(() => {

//     if (farmerId) {
//       setFarmerId(farmerId);
//     }
//   }, [farmerId, setFarmerId]);

//   const handleActivePage = (page: ActivePage) => {
//     setActivePage(page);
//     gotoCustomer();
//   };
//   return (
//     <div className="min-h-screen bg-[#F5F7F5]">
//       <Header
//         setActivePage={handleActivePage}
//         onFilterClick={() =>
//           setFilterOpen(prev => !prev)
//         } />

//       <Navbar
//         filterOpen={filterOpen}
//         setFilterOpen={setFilterOpen} />

//       <div className="space-y-8 p-8">
//         <div className="mx-auto rounded-[28px]">
//           {!farmer ? (
//             <p className="text-center text-lg font-medium text-red-500">
//               Farmer details not available.
//             </p>
//           ) : (
//             <>
//               <FarmerProfileCard
//                 farmer={farmer}
//                 productsCount={totalProducts} />
//               <div className="mt-7">
//                 {
//                   farmerLoading ? (
//                     <p className="text-center text-gray-500">
//                       Loading products...
//                     </p>
//                   ) : farmerProducts.length === 0 ? (
//                     <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
//                       <p className="text-gray-600">
//                         {
//                           message || "No products found"
//                         }
//                       </p>
//                     </div>
//                   ) : (
//                     <>
//                       <FarmerProducts
//                         products={farmerProducts}
//                         loading={farmerLoading} />

//                       <FarmerPagination
//                         currentPage={page}
//                         totalPages={totalPages}
//                         onPageChange={setPage} />
//                     </>
//                   )
//                 }
//               </div>
//               <div className="mt-7">
//                 <ReviewSection
//                   id={farmerId!}
//                   type="farmer"
//                   reviews={review}
//                   onReviewAdded={() => { }}
//                 />
//               </div>
//               <div className="mt-7">
//                 <Footer />
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };



// export default FarmerProfilePage;

// import { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";

// import Header from "../Home/CustomerHeader";
// import Navbar from "../Home/Navbar";
// import Footer from "../Home/Footer";

// import FarmerProfileCard from "./FarmerProfileCard";
// import FarmerProducts from "./FarmerProducts";
// import FarmerPagination from "./FarmerPagination";
// import ReviewSection from "../Review/ReviewSection";

// import useWebNavigate from "../../../hooks/useWebNavigate";
// import { useCustomerNavigation } from "../../../hooks/useCustomerNavigation";
// import { useCustomerFarmerProducts } from "../../../hooks/useCustomerFarmerProducts";

// import type { ActivePage } from "../../../context/CustomerNavigationContext";

// const FarmerProfilePage = () => {
//   const { farmerId } = useParams();
//   const location = useLocation();

//   const { gotoCustomer } = useWebNavigate();
//   const { setActivePage } = useCustomerNavigation();

//   const {
//     products,
//     matchedProducts,
//     farmerLoading,
//     page,
//     totalPages,
//     totalProducts,
//     messages,
//     // NEW
//     search,
//     matchedCount,
//     setPage,
//     setFarmerId,
//   } = useCustomerFarmerProducts();

//   const [filterOpen, setFilterOpen] = useState(false);
//   console.log("machu::",matchedProducts);

//   const farmer = location.state?.farmer;
//   const review = location.state?.review || null;

//   useEffect(() => {
//     if (farmerId) {
//       setFarmerId(farmerId);
//     }
//   }, [farmerId, setFarmerId]);

//   const handleActivePage = (page: ActivePage) => {
//     setActivePage(page);
//     gotoCustomer();
//   };

//   return (
//     <div className="min-h-screen bg-[#F5F7F5]">
//       <Header
//         setActivePage={handleActivePage}
//         onFilterClick={() => setFilterOpen((prev) => !prev)}
//       />

//       <Navbar
//         filterOpen={filterOpen}
//         setFilterOpen={setFilterOpen}
//       />

//       <div className="space-y-8 p-8">
//         <div className="mx-auto rounded-[28px]">
//           {!farmer ? (
//             <p className="text-center text-lg font-medium text-red-500">
//               Farmer details not available.
//             </p>
//           ) : (
//             <>
//               <FarmerProfileCard
//                 farmer={farmer}
//                 productsCount={totalProducts}
//               />

//               <div className="mt-7">
//                 {farmerLoading ? (
//                   <p className="text-center text-gray-500">
//                     Loading products...
//                   </p>
//                 ) : products.length === 0 ? (
//                   <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
//                     <p className="text-gray-600">
//                       {messages || "No products found"}
//                     </p>
//                   </div>
//                 ) : (
//                   <>
//                     <FarmerProducts
//                       products={products}
//                       matchedProducts={matchedProducts}
//                       loading={farmerLoading}
//                       search={search}
//                       matchedCount={matchedCount}
//                     />

//                     <FarmerPagination
//                       currentPage={page}
//                       totalPages={totalPages}
//                       onPageChange={setPage}
//                     />
//                   </>
//                 )}
//               </div>

//               <div className="mt-7">
//                 <ReviewSection
//                   id={farmerId!}
//                   type="farmer"
//                   reviews={review}
//                   onReviewAdded={() => { }}
//                 />
//               </div>

//               <div className="mt-7">
//                 <Footer />
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerProfilePage;

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Header from "../Home/CustomerHeader";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

import FarmerProfileCard from "./FarmerProfileCard";
import FarmerProducts from "./FarmerProducts";
import FarmerPagination from "./FarmerPagination";
import ReviewSection from "../Review/ReviewSection";

import useWebNavigate from "../../../hooks/useWebNavigate";
import { useCustomerNavigation } from "../../../hooks/useCustomerNavigation";
import { useCustomerFarmerProducts } from "../../../hooks/useCustomerFarmerProducts";

import type { ActivePage } from "../../../context/CustomerNavigationContext";

const FarmerProfilePage = () => {
  const { farmerId } = useParams();
  const location = useLocation();

  const { gotoCustomer } = useWebNavigate();
  const { setActivePage } = useCustomerNavigation();

  const {
    products,
    matchedProducts,
    farmerLoading,
    page,
    totalPages,
    totalProducts,
    messages,
    search,
    setPage,
    setFarmerId,
  } = useCustomerFarmerProducts();

  const [filterOpen, setFilterOpen] = useState(false);

  const farmer = location.state?.farmer;
  const review = location.state?.review || null;

  useEffect(() => {
    if (farmerId) {
      setFarmerId(farmerId);
    }
  }, [farmerId, setFarmerId]);

  const handleActivePage = (page: ActivePage) => {
    setActivePage(page);
    gotoCustomer();
  };

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
          {!farmer ? (
            <p className="text-center text-lg font-medium text-red-500">
              Farmer details not available.
            </p>
          ) : (
            <>
              <FarmerProfileCard
                farmer={farmer}
                productsCount={totalProducts}
              />

              <div className="mt-7">
                {farmerLoading ? (
                  <p className="text-center text-gray-500">
                    Loading products...
                  </p>
                ) : products.length === 0 && matchedProducts.length === 0 ? (
                  <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
                    <p className="text-gray-600">
                      {messages[0] || "No products found"}
                    </p>
                  </div>
                ) : (
                  <>
                    <FarmerProducts
                    messages={messages}
                      products={products}
                      totalProducts={totalProducts}
                      matchedProducts={matchedProducts}
                      loading={farmerLoading}
                      search={search}
                    />

                    {totalPages > 1 && (
                      <FarmerPagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                      />
                    )}
                  </>
                )}
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