// // import { useState, useRef, useEffect } from "react";
// // import {
// //   Search,
// //   ShoppingBag,
// //   SlidersHorizontal,
// //   Heart,
// //   User,
// // } from "lucide-react";
// // import ProfileCard from "./ProfileCard";
// // import useWebNavigate from "../../../hooks/useWebNavigate";

// // import { type ActivePage } from "../../../context/CustomerNavigationContext";

// // type HeaderProps = {
// //   setActivePage: (page: ActivePage) => void;
// //    onFilterClick: () => void;
// // };

// // const Header = ({ setActivePage, onFilterClick }: HeaderProps) => {
// //   const [profileOpen, setProfileOpen] = useState(false);
// //   const profileRef = useRef<HTMLDivElement>(null);

// //   const { gotoCustomer } = useWebNavigate();

// //   const user = JSON.parse(localStorage.getItem("userInfo") || "{}");

// //   const handlePageChange = (page: ActivePage) => {
// //     setActivePage(page);
// //     gotoCustomer();
// //   };

// //   useEffect(() => {
// //     function handleClickOutside(event: MouseEvent) {
// //       if (
// //         profileRef.current &&
// //         !profileRef.current.contains(event.target as Node)
// //       ) {
// //         setProfileOpen(false);
// //       }
// //     }

// //     document.addEventListener("mousedown", handleClickOutside);

// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   return (
// //     <header className="w-full border-b border-gray-200 bg-white px-8 py-4 shadow-sm">
// //       <div className="mx-auto flex max-w-full items-center justify-between gap-8">
// //         <div
// //           onClick={() => handlePageChange("home")}
// //           className="flex cursor-pointer items-center gap-3"
// //         >
// //           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-xl font-bold text-white">
// //             🌿
// //           </div>

// //           <div>
// //             <h1 className="text-2xl font-bold text-green-700">
// //               Farm Veggies
// //             </h1>
// //           </div>
// //         </div>

// //         <div className="max-w-xl flex-1">
// //           <div className="flex h-14 items-center rounded-full bg-gray-100 px-5">
// //             <Search className="text-gray-500" size={22} />

// //             <input
// //               type="text"
// //               placeholder="Search fresh vegetables..."
// //               className="flex-1 bg-transparent px-3 text-gray-700 outline-none"
// //             />
// //           </div>
// //         </div>

// //         <div className="flex items-start gap-5">
// //           <button
// //             onClick={() => handlePageChange("orders")}
// //             className="group flex w-16 cursor-pointer flex-col items-center"
// //           >
// //             <div className="flex h-10 w-10 items-center justify-center">
// //               <ShoppingBag
// //                 size={24}
// //                 className="text-gray-700 transition group-hover:text-green-600"
// //               />
// //             </div>

// //             <span className="mt-1 text-xs text-gray-700 transition group-hover:text-green-600">
// //               Orders
// //             </span>
// //           </button>

// //           <button
// //             onClick={onFilterClick}
// //             className="group flex cursor-pointer flex-col items-center text-gray-700 transition hover:text-green-600"
// //           >
// //             <div className="flex h-10 w-10 items-center justify-center">
// //               <SlidersHorizontal
// //                 size={24}
// //                 className="text-gray-700 transition group-hover:text-green-600"
// //               />
// //             </div>

// //             <span className="mt-1 text-xs text-gray-700 transition group-hover:text-green-600">
// //               Filter
// //             </span>
// //           </button>

// //           <button
// //             onClick={() => handlePageChange("wishlist")}
// //             className="group flex w-16 cursor-pointer flex-col items-center"
// //           >
// //             <div className="relative flex h-10 w-10 items-center justify-center">
// //               <Heart
// //                 size={24}
// //                 className="text-gray-700 transition group-hover:text-red-500"
// //               />
// //             </div>

// //             <span className="mt-1 text-xs text-gray-700 transition group-hover:text-red-500">
// //               Wishlist
// //             </span>
// //           </button>

// //           <div ref={profileRef} className="relative">
// //             <button
// //               onClick={() => setProfileOpen((prev) => !prev)}
// //               className="group flex w-16 cursor-pointer flex-col items-center"
// //             >
// //               <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-green-100 transition group-hover:bg-green-600">
// //                 {user.profilePicture ? (
// //                   <img
// //                     src={user.profilePicture}
// //                     alt="Profile"
// //                     className="h-full w-full object-cover"
// //                   />
// //                 ) : (
// //                   <User
// //                     size={22}
// //                     className="text-green-700 transition group-hover:text-white"
// //                   />
// //                 )}
// //               </div>

// //               <span className="mt-1 text-xs text-gray-700 transition group-hover:text-green-600">
// //                 Profile
// //               </span>
// //             </button>

// //             {profileOpen && (
// //               <ProfileCard
// //                 user={user}
// //                 onSettings={() => {
// //                   setProfileOpen(false);
// //                   handlePageChange("settings");
// //                 }}
// //                 onPrivacy={() => {
// //                   setProfileOpen(false);
// //                   handlePageChange("privacy");
// //                 }}
// //                 onHelp={() => {
// //                   setProfileOpen(false);
// //                   handlePageChange("help");
// //                 }}
// //                 onNotification={() => {
// //                   setProfileOpen(false);
// //                   handlePageChange("notifications");
// //                 }}
// //               />
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;

// import { useState, useRef, useEffect } from "react";
// import {
//   Search,
//   ShoppingBag,
//   SlidersHorizontal,
//   Heart,
//   User,
// } from "lucide-react";

// import ProfileCard from "./ProfileCard";
// import useWebNavigate from "../../../hooks/useWebNavigate";
// import { useCustomerProducts } from "../../../hooks/useCustomerProducts";

// import { type ActivePage } from "../../../context/CustomerNavigationContext";
// import { useCustomerNavigation } from "../../../hooks/useCustomerNavigation";
// import { useLocation } from "react-router-dom";
// import { useCustomerFarmerProducts } from "../../../hooks/useCustomerFarmerProducts";

// type HeaderProps = {
//   setActivePage: (page: ActivePage) => void;
//   onFilterClick: () => void;
// };

// const Header = ({ setActivePage, onFilterClick, }: HeaderProps) => {

//   const [profileOpen, setProfileOpen] = useState(false);

//   const profileRef = useRef<HTMLDivElement>(null);

//   const { gotoCustomer, gotoCustomerProducts } = useWebNavigate();
//   const { activePage, setOrderSearch, setWishlistSearch } = useCustomerNavigation();


//   const { search, setSearch } = useCustomerProducts();
//   const { setSearch: setFarmerSearch } = useCustomerFarmerProducts();
//   const location = useLocation();


//   const user = JSON.parse(localStorage.getItem("userInfo") || "{}");


//   const handlePageChange = (page: ActivePage) => {
//     setActivePage(page);
//     gotoCustomer();
//   };


//   // const handleSearch = () => {
//   //   console.log("Current Page:", activePage);
//   //   console.log("Search:", search);

//   //   if (!search.trim()) return;


//   //   if (activePage === "home") {

//   //     gotoCustomerProducts(search);

//   //   }


//   //   else if (activePage === "orders") {

//   //     setOrderSearch(search);

//   //   }


//   //   else if (activePage === "wishlist") {

//   //     setWishlistSearch(search);

//   //   }

//   // };

//   const handleSearch = () => {

//     if (!search.trim()) return;



//     // Farmer profile page
//     if (location.pathname.includes("/customer/farmer/")) {
//       setSearch(search);
//       return;
//     }
//     // Home + Product Detail dono ke liye
//     if (activePage === "home" || location.pathname.includes("/customer/product/")) {
//       gotoCustomerProducts(search);
//     }
//     else if (activePage === "orders") {
//       setOrderSearch(search);
//     }
//     else if (activePage === "wishlist") {
//       setWishlistSearch(search);
//     }
//   };

//   useEffect(() => {

//     function handleClickOutside(event: MouseEvent) {

//       if (
//         profileRef.current &&
//         !profileRef.current.contains(
//           event.target as Node
//         )
//       ) {
//         setProfileOpen(false);
//       }

//     }


//     document.addEventListener(
//       "mousedown",
//       handleClickOutside
//     );


//     return () =>
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );


//   }, []);



//   return (

//     <header className="w-full border-b border-gray-200 bg-white px-8 py-4 shadow-sm">

//       <div className="mx-auto flex max-w-full items-center justify-between gap-8">


//         {/* Logo */}

//         <div
//           onClick={() => handlePageChange("home")}
//           className="flex cursor-pointer items-center gap-3"
//         >

//           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-xl font-bold text-white">
//             🌿
//           </div>


//           <h1 className="text-2xl font-bold text-green-700">
//             Farm Veggies
//           </h1>


//         </div>




//         {/* Search */}

//         <div className="max-w-xl flex-1">

//           <div className="flex h-14 items-center rounded-full bg-gray-100 px-5">


//             <Search
//               size={22}
//               onClick={handleSearch}
//               className="cursor-pointer text-gray-500"
//             />


//             <input

//               type="text"

//               value={search}

//               // onChange={(e) =>
//               //   setSearch(e.target.value)
//               // }
//               onChange={(e) => {
//                 const value = e.target.value;
//                 setSearch(value);
//                 setFarmerSearch(value);
//               }}

//               onKeyDown={(e) => {

//                 if (e.key === "Enter") {
//                   handleSearch();
//                 }

//               }}

//               placeholder="Search fresh vegetables..."

//               className="flex-1 bg-transparent px-3 text-gray-700 outline-none"

//             />


//           </div>

//         </div>






//         {/* Actions */}


//         <div className="flex items-start gap-5">


//           {/* Orders */}

//           <button
//             onClick={() => handlePageChange("orders")}
//             className="group flex w-16 cursor-pointer flex-col items-center"
//           >

//             <ShoppingBag
//               size={24}
//               className="text-gray-700 group-hover:text-green-600"
//             />

//             <span className="mt-1 text-xs">
//               Orders
//             </span>

//           </button>






//           {/* Filter */}

//           {/* <button
//             onClick={onFilterClick}
//             className="group flex cursor-pointer flex-col items-center"
//           >

//             <SlidersHorizontal
//               size={24}
//               className="text-gray-700 group-hover:text-green-600"
//             />

//             <span className="mt-1 text-xs">
//               Filter
//             </span>

//           </button> */}

//           <button
//             onClick={onFilterClick}
//             className="group flex cursor-pointer flex-col items-center text-gray-700 transition hover:text-green-600"
//           >
//             <div className="flex h-10 w-10 items-center justify-center">
//               <SlidersHorizontal
//                 size={24}
//                 className="text-gray-700 transition group-hover:text-green-600"
//               />
//             </div>
//             <span className="mt-1 text-xs text-gray-700 transition group-hover:text-green-600">
//               Filter
//             </span>
//           </button>







//           {/* Wishlist */}

//           <button
//             onClick={() => handlePageChange("wishlist")}
//             className="group flex w-16 cursor-pointer flex-col items-center"
//           >

//             <Heart
//               size={24}
//               className="text-gray-700 group-hover:text-red-500"
//             />

//             <span className="mt-1 text-xs">
//               Wishlist
//             </span>

//           </button>







//           {/* Profile */}

//           <div
//             ref={profileRef}
//             className="relative"
//           >

//             <button
//               onClick={() =>
//                 setProfileOpen(prev => !prev)
//               }
//               className="group flex w-16 cursor-pointer flex-col items-center"
//             >

//               <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-green-100">

//                 {
//                   user.profilePicture ?

//                     <img
//                       src={user.profilePicture}
//                       className="h-full w-full object-cover"
//                     />

//                     :

//                     <User
//                       size={22}
//                       className="text-green-700"
//                     />

//                 }

//               </div>


//               <span className="mt-1 text-xs">
//                 Profile
//               </span>


//             </button>





//             {
//               profileOpen &&

//               <ProfileCard

//                 user={user}

//                 onSettings={() => {
//                   setProfileOpen(false);
//                   handlePageChange("settings");
//                 }}

//                 onPrivacy={() => {
//                   setProfileOpen(false);
//                   handlePageChange("privacy");
//                 }}

//                 onHelp={() => {
//                   setProfileOpen(false);
//                   handlePageChange("help");
//                 }}

//                 onNotification={() => {
//                   setProfileOpen(false);
//                   handlePageChange("notifications");
//                 }}

//               />

//             }



//           </div>



//         </div>



//       </div>


//     </header>

//   );

// };


// export default Header;

import { useState, useRef, useEffect } from "react";
import { Search, ShoppingBag, SlidersHorizontal, Heart, User } from "lucide-react";
import ProfileCard from "./ProfileCard";
import useWebNavigate from "../../../hooks/useWebNavigate";
import { useCustomerProducts } from "../../../hooks/useCustomerProducts";
import { useCustomerFarmerProducts } from "../../../hooks/useCustomerFarmerProducts";
import { type ActivePage } from "../../../context/CustomerNavigationContext";
import { useCustomerNavigation } from "../../../hooks/useCustomerNavigation";
import { useLocation } from "react-router-dom";
import useCusomterOrders from "../../../hooks/useProductOrders";
import { useWishlist } from "../../../hooks/useWishlist";

type HeaderProps = {
  setActivePage: (page: ActivePage) => void;
  onFilterClick: () => void;
};

const Header = ({ setActivePage, onFilterClick }: HeaderProps) => {

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { gotoCustomer, gotoCustomerProducts } = useWebNavigate();
  const { activePage } = useCustomerNavigation();
  // const { search, setSearch } = useCustomerProducts();
  // const { setSearch: setFarmerSearch } = useCustomerFarmerProducts();
  const customerProduct = useCustomerProducts();
  const farmerProduct = useCustomerFarmerProducts();
  const order = useCusomterOrders();
  const wishlist = useWishlist();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const isFarmerPage = location.pathname.includes("/customer/farmer/");

  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
    gotoCustomer();
  };

  // const handleSearch = () => {
  //   if (isFarmerPage) {
  //     return;
  //   }
  //   if (!search.trim()) return;

  //   if (activePage === "home" || location.pathname.includes("/customer/product/")) {
  //     gotoCustomerProducts(search);
  //   }
  //   else if (activePage === "orders") {
  //     setOrderSearch(search);
  //   }
  //   else if (activePage === "wishlist") {
  //     setWishlistSearch(search);
  //   }
  // };

  const handleSearch = () => {
    if (isFarmerPage) return;

    let currentSearch = "";

    if (activePage === "orders") {
      currentSearch = order.search;
    } else if (activePage === "wishlist") {
      currentSearch = wishlist.search;
    } else {
      currentSearch = customerProduct.search;
    }

    if (!currentSearch.trim()) return;

    if (
      activePage === "home" ||
      location.pathname.includes("/customer/product/")
    ) {
      gotoCustomerProducts(currentSearch);
    }

    else if (activePage === "orders") {
      // order.setPage(1);
      order.fetchOrders();
    }

    else if (activePage === "wishlist") {
      // wishlist.setPage(1);
      wishlist.fetchWishlist();
    }
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full border-b border-gray-200 bg-white px-8 py-4 shadow-sm">
      <div className="mx-auto flex max-w-full items-center justify-between gap-8">

        {/* Logo */}
        <div onClick={() => handlePageChange("home")} className="flex cursor-pointer items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-xl font-bold text-white">
            🌿
          </div>
          <h1 className="text-2xl font-bold text-green-700">
            Farm Veggies
          </h1>
        </div>

        {/* Search */}
        <div className="max-w-xl flex-1">
          <div className="flex h-14 items-center rounded-full bg-gray-100 px-5">
            <Search
              size={22}
              onClick={handleSearch}
              className="cursor-pointer text-gray-500" />
            <input
              type="text"
              value={
                isFarmerPage
                  ? farmerProduct.search
                  : activePage === "orders"
                    ? order.search
                    : activePage === "wishlist"
                      ? wishlist.search
                      : customerProduct.search
              }

              onChange={(e) => {
                const value = e.target.value;

                if (isFarmerPage) {
                  farmerProduct.setSearch(value);
                }
                else if (activePage === "orders") {
                  order.setSearch(value);
                }
                else if (activePage === "wishlist") {
                  wishlist.setSearch(value);
                }
                else {
                  customerProduct.setSearch(value);
                }
              }}

              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}

              placeholder={
                activePage === "orders"
                  ? "Search by Product Name or Order ID..."
                  : activePage === "wishlist"
                    ? "Search wishlist products..."
                    : "Search fresh vegetables..."
              }

              className="flex-1 bg-transparent px-3 text-gray-700 outline-none" />
          </div>
        </div>

        {/* Actions */}

        <div className="flex items-start gap-5">
          <button
            onClick={() => handlePageChange("orders")}
            className="group flex w-16 cursor-pointer flex-col items-center">
            <ShoppingBag
              size={24}
              className="text-gray-700 group-hover:text-green-600" />
            <span className="mt-1 text-xs">
              Orders
            </span>
          </button>

          <button
            onClick={onFilterClick}
            className="group flex cursor-pointer flex-col items-center text-gray-700 transition hover:text-green-600">
            <div className="flex h-10 w-10 items-center justify-center">
              <SlidersHorizontal
                size={24}
                className="text-gray-700 transition group-hover:text-green-600" />
            </div>

            <span className="mt-1 text-xs text-gray-700 transition group-hover:text-green-600">
              Filter
            </span>
          </button>

          <button
            onClick={() => handlePageChange("wishlist")}
            className="group flex w-16 cursor-pointer flex-col items-center">
            <Heart
              size={24}
              className="text-gray-700 group-hover:text-red-500" />
            <span className="mt-1 text-xs">
              Wishlist
            </span>
          </button>

          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(prev => !prev)}
              className="group flex w-16 cursor-pointer flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-green-100">
                {user.profilePicture ?
                  <img src={user.profilePicture} className="h-full w-full object-cover" />
                  :
                  <User size={22} className="text-green-700" />}
              </div>

              <span className="mt-1 text-xs">
                Profile
              </span>
            </button>

            {profileOpen &&
              <ProfileCard
                user={user}
                onSettings={() => { setProfileOpen(false); handlePageChange("settings"); }}
                onPrivacy={() => { setProfileOpen(false); handlePageChange("privacy"); }}
                onHelp={() => { setProfileOpen(false); handlePageChange("help"); }}
                onNotification={() => { setProfileOpen(false); handlePageChange("notifications"); }} />
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;