// import { useState, useRef, useEffect } from "react";
// import { Search, ShoppingBag, SlidersHorizontal, Heart, User } from "lucide-react";
// import ProfileCard from "./ProfileCard";
// import useWebNavigate from "../../../hooks/useWebNavigate";
// import { useCustomerProducts } from "../../../hooks/useCustomerProducts";
// import { useCustomerFarmerProducts } from "../../../hooks/useCustomerFarmerProducts";
// import { type ActivePage } from "../../../context/CustomerNavigationContext";
// import { useCustomerNavigation } from "../../../hooks/useCustomerNavigation";
// import { useLocation } from "react-router-dom";
// import useCusomterOrders from "../../../hooks/useProductOrders";
// import { useWishlist } from "../../../hooks/useWishlist";

// type HeaderProps = {
//   setActivePage: (page: ActivePage) => void;
//   onFilterClick: () => void;
// };

// const Header = ({ setActivePage, onFilterClick }: HeaderProps) => {

//   const [profileOpen, setProfileOpen] = useState(false);
//   const profileRef = useRef<HTMLDivElement>(null);
//   const { gotoCustomer, gotoCustomerProducts } = useWebNavigate();
//   const { activePage } = useCustomerNavigation();
//   // const { search, setSearch } = useCustomerProducts();
//   // const { setSearch: setFarmerSearch } = useCustomerFarmerProducts();
//   const customerProduct = useCustomerProducts();
//   const farmerProduct = useCustomerFarmerProducts();
//   const order = useCusomterOrders();
//   const wishlist = useWishlist();
//   const location = useLocation();
//   const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
//   const isFarmerPage = location.pathname.includes("/customer/farmer/");

//   const handlePageChange = (page: ActivePage) => {
//     setActivePage(page);
//     gotoCustomer();
//   };

//   // const handleSearch = () => {
//   //   if (isFarmerPage) {
//   //     return;
//   //   }
//   //   if (!search.trim()) return;

//   //   if (activePage === "home" || location.pathname.includes("/customer/product/")) {
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
//     if (isFarmerPage) return;

//     let currentSearch = "";

//     if (activePage === "orders") {
//       currentSearch = order.search;
//     } else if (activePage === "wishlist") {
//       currentSearch = wishlist.search;
//     } else {
//       currentSearch = customerProduct.search;
//     }

//     if (!currentSearch.trim()) return;

//     if (
//       activePage === "home" ||
//       location.pathname.includes("/customer/product/")
//     ) {
//       gotoCustomerProducts(currentSearch);
//     }

//     else if (activePage === "orders") {
//       // order.setPage(1);
//       order.fetchOrders();
//     }

//     else if (activePage === "wishlist") {
//       // wishlist.setPage(1);
//       wishlist.fetchWishlist();
//     }
//   };
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
//         setProfileOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <header className="w-full border-b border-gray-200 bg-white px-8 py-4 shadow-sm">
//       <div className="mx-auto flex max-w-full items-center justify-between gap-8">

//         {/* Logo */}
//         <div onClick={() => handlePageChange("home")} className="flex cursor-pointer items-center gap-3">
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
//               className="cursor-pointer text-gray-500" />
//             <input
//               type="text"
//               value={
//                 isFarmerPage
//                   ? farmerProduct.search
//                   : activePage === "orders"
//                     ? order.search
//                     : activePage === "wishlist"
//                       ? wishlist.search
//                       : customerProduct.search
//               }

//               onChange={(e) => {
//                 const value = e.target.value;

//                 if (isFarmerPage) {
//                   farmerProduct.setSearch(value);
//                 }
//                 else if (activePage === "orders") {
//                   order.setSearch(value);
//                 }
//                 else if (activePage === "wishlist") {
//                   wishlist.setSearch(value);
//                 }
//                 else {
//                   customerProduct.setSearch(value);
//                 }
//               }}

//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   handleSearch();
//                 }
//               }}

//               placeholder={
//                 activePage === "orders"
//                   ? "Search by Product Name or Order ID..."
//                   : activePage === "wishlist"
//                     ? "Search wishlist products..."
//                     : "Search fresh vegetables..."
//               }

//               className="flex-1 bg-transparent px-3 text-gray-700 outline-none" />
//           </div>
//         </div>

//         {/* Actions */}

//         <div className="flex items-start gap-5">
//           <button
//             onClick={() => handlePageChange("orders")}
//             className="group flex w-16 cursor-pointer flex-col items-center">
//             <ShoppingBag
//               size={24}
//               className="text-gray-700 group-hover:text-green-600" />
//             <span className="mt-1 text-xs">
//               Orders
//             </span>
//           </button>

//           <button
//             onClick={onFilterClick}
//             className="group flex cursor-pointer flex-col items-center text-gray-700 transition hover:text-green-600">
//             <div className="flex h-10 w-10 items-center justify-center">
//               <SlidersHorizontal
//                 size={24}
//                 className="text-gray-700 transition group-hover:text-green-600" />
//             </div>

//             <span className="mt-1 text-xs text-gray-700 transition group-hover:text-green-600">
//               Filter
//             </span>
//           </button>

//           <button
//             onClick={() => handlePageChange("wishlist")}
//             className="group flex w-16 cursor-pointer flex-col items-center">
//             <Heart
//               size={24}
//               className="text-gray-700 group-hover:text-red-500" />
//             <span className="mt-1 text-xs">
//               Wishlist
//             </span>
//           </button>

//           <div ref={profileRef} className="relative">
//             <button
//               onClick={() => setProfileOpen(prev => !prev)}
//               className="group flex w-16 cursor-pointer flex-col items-center">
//               <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-green-100">
//                 {user.profilePicture ?
//                   <img src={user.profilePicture} className="h-full w-full object-cover" />
//                   :
//                   <User size={22} className="text-green-700" />}
//               </div>

//               <span className="mt-1 text-xs">
//                 Profile
//               </span>
//             </button>

//             {profileOpen &&
//               <ProfileCard
//                 user={user}
//                 onSettings={() => { setProfileOpen(false); handlePageChange("settings"); }}
//                 onPrivacy={() => { setProfileOpen(false); handlePageChange("privacy"); }}
//                 onHelp={() => { setProfileOpen(false); handlePageChange("help"); }}
//                 onNotification={() => { setProfileOpen(false); handlePageChange("notifications"); }} />
//             }
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



import { useState, useRef, useEffect } from "react";
import {
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Heart,
  User,
} from "lucide-react";
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
    } else if (activePage === "orders") {
      order.fetchOrders();
    } else if (activePage === "wishlist") {
      wishlist.fetchWishlist();
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full border-b border-gray-200 bg-white px-4 py-3 shadow-sm transition-colors duration-200 sm:px-5 sm:py-4 lg:px-8 dark:border-[#29343c] dark:bg-[#0d151b]">
      <div className="mx-auto flex max-w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        {/* Logo */}
        <div
          onClick={() => handlePageChange("home")}
          className="flex shrink-0 cursor-pointer items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-xl font-bold text-white">
            🌿
          </div>

          <h1 className="text-2xl font-bold text-green-700 dark:text-[#00c767]">
            Farm Veggies
          </h1>
        </div>

        {/* Search */}
        <div className="w-full max-w-xl flex-1 lg:w-auto">
          <div className="flex h-14 w-full items-center rounded-full bg-gray-100 px-5 transition-colors duration-200 dark:bg-[#192128]">
            <Search
              size={22}
              onClick={handleSearch}
              className="shrink-0 cursor-pointer text-gray-500 transition-colors hover:text-green-600 dark:text-[#71808a] dark:hover:text-[#00c767]"
            />

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
                } else if (activePage === "orders") {
                  order.setSearch(value);
                } else if (activePage === "wishlist") {
                  wishlist.setSearch(value);
                } else {
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
              className="min-w-0 flex-1 bg-transparent px-3 text-gray-700 outline-none placeholder:text-gray-400 dark:text-[#f5f7f8] dark:placeholder:text-[#71808a]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex w-full items-start justify-between gap-2 overflow-x-auto pb-1 sm:justify-center sm:gap-3 lg:w-auto lg:justify-start lg:overflow-visible">
          {/* Orders */}
          <button
            onClick={() => handlePageChange("orders")}
            className="group flex min-w-16 shrink-0 cursor-pointer flex-col items-center"
          >
            <ShoppingBag
              size={24}
              className="text-gray-700 transition group-hover:text-green-600 dark:text-[#f5f7f8] dark:group-hover:text-[#00c767]"
            />

            <span className="mt-1 text-xs text-gray-700 dark:text-[#9aa7b1]">
              Orders
            </span>
          </button>

          {/* Filter */}
          <button
            onClick={onFilterClick}
            className="group flex shrink-0 cursor-pointer flex-col items-center text-gray-700 transition hover:text-green-600 dark:text-[#9aa7b1] dark:hover:text-[#00c767]"
          >
            <div className="flex h-10 w-10 items-center justify-center">
              <SlidersHorizontal
                size={24}
                className="text-gray-700 transition group-hover:text-green-600 dark:text-[#f5f7f8] dark:group-hover:text-[#00c767]"
              />
            </div>

            <span className="mt-1 text-xs text-gray-700 transition group-hover:text-green-600 dark:text-[#9aa7b1] dark:group-hover:text-[#00c767]">
              Filter
            </span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => handlePageChange("wishlist")}
            className="group flex min-w-16 shrink-0 cursor-pointer flex-col items-center"
          >
            <Heart
              size={24}
              className="text-gray-700 transition group-hover:text-red-500 dark:text-[#f5f7f8]"
            />

            <span className="mt-1 text-xs text-gray-700 dark:text-[#9aa7b1]">
              Wishlist
            </span>
          </button>

          {/* Profile */}
          <div ref={profileRef} className="relative shrink-0">
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="group flex w-16 cursor-pointer flex-col items-center"
            >
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-green-100 dark:bg-[#123126]">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.username || "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User
                    size={22}
                    className="text-green-700 dark:text-[#00c767]"
                  />
                )}
              </div>

              <span className="mt-1 text-xs text-gray-700 dark:text-[#9aa7b1]">
                Profile
              </span>
            </button>

            {profileOpen && (
              <ProfileCard
                user={user}
                onSettings={() => {
                  setProfileOpen(false);
                  handlePageChange("settings");
                }}
                onPrivacy={() => {
                  setProfileOpen(false);
                  handlePageChange("privacy");
                }}
                onHelp={() => {
                  setProfileOpen(false);
                  handlePageChange("help");
                }}
                onNotification={() => {
                  setProfileOpen(false);
                  handlePageChange("notifications");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;