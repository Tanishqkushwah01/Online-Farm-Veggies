// import {
//   Home,
//   Package,
//   ShoppingCart,
//   Settings,
//   Star,
// } from "lucide-react";
// import { useState } from "react";

// type SidebarProps = {
//   activePage: string;
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
// };

// const Sidebar = ({ activePage, setActivePage }: SidebarProps) => {
//   const [open, setOpen] = useState(true);

//   const menuItems = [
//     { name: "Dashboard", page: "dashboard", icon: <Home size={22} /> },
//     { name: "Products", page: "products", icon: <Package size={22} /> },
//     { name: "Orders", page: "orders", icon: <ShoppingCart size={22} /> },
//     { name: "Reviews", page: "reviews", icon: <Star size={22} /> },
//   ];

//   function handleMenuClick(page: string) {
//     setActivePage(page);
//   }

//   return (
//     <aside
//       className={`
//         h-full bg-[#F1F1F1] rounded-tl-md
//         transition-[width] duration-500 ease-in-out
//         ${open ? "w-72" : "w-20"}
//         flex flex-col overflow-hidden
//       `}
//     >
//       {/* Logo */}
//       <div
//         onClick={() => setOpen(!open)}
//         className="h-20 flex items-center gap-3 px-5 cursor-pointer shrink-0"
//       >
//         <div className="h-10 w-10 shrink-0 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
//           {/* F */}
//           🌿
//         </div>

//         <h1
//           className={`
//             text-xl font-bold text-gray-800 whitespace-nowrap
//             transition-all duration-300 ease-in-out
//             ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
//           `}
//         >
//           Farm Veggies
//         </h1>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 mt-6 px-3 space-y-2">
//         {menuItems.map((item) => (
//           <div
//             key={item.page}
//             onClick={() => handleMenuClick(item.page)}
//             className={`
//               h-12 flex items-center gap-4 px-4 rounded-xl cursor-pointer
//               transition-all duration-300 ease-in-out
//               ${
//                 activePage === item.page
//                   ? "bg-green-600 text-white"
//                   : "text-gray-700 hover:bg-gray-300"
//               }
//             `}
//           >
//             <div className="shrink-0">{item.icon}</div>

//             <span
//               className={`
//                 font-medium whitespace-nowrap
//                 transition-all duration-300 ease-in-out
//                 ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
//               `}
//             >
//               {item.name}
//             </span>
//           </div>
//         ))}
//       </nav>

//       {/* Settings */}
//       <div className="px-3 pb-5 shrink-0">
//         <div
//           onClick={() => handleMenuClick("settings")}
//           className={`
//             h-12 flex items-center gap-4 px-4 rounded-xl cursor-pointer
//             transition-all duration-300 ease-in-out
//             ${
//               activePage === "settings"
//                 ? "bg-green-600 text-white"
//                 : "text-gray-700 hover:bg-gray-300"
//             }
//           `}
//         >
//           <div className="shrink-0">
//             <Settings size={22} />
//           </div>

//           <span
//             className={`
//               font-medium whitespace-nowrap
//               transition-all duration-300 ease-in-out
//               ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
//             `}
//           >
//             Settings
//           </span>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;



import {
  Home,
  Package,
  ShoppingCart,
  Settings,
  Star,
  X,
} from "lucide-react";

type SidebarProps = {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({
  activePage,
  setActivePage,
  setSidebarOpen,
}: SidebarProps) => {
  const menuItems = [
    {
      name: "Dashboard",
      page: "dashboard",
      icon: <Home size={22} />,
    },
    {
      name: "Products",
      page: "products",
      icon: <Package size={22} />,
    },
    {
      name: "Orders",
      page: "orders",
      icon: <ShoppingCart size={22} />,
    },
    {
      name: "Reviews",
      page: "reviews",
      icon: <Star size={22} />,
    },
  ];

  const handleMenuClick = (page: string) => {
    setActivePage(page);

    // Close drawer on mobile/tablet.
    // On desktop this has no visible effect because sidebar is always shown.
    setSidebarOpen(false);
  };

  return (
    <aside
      className="
        flex
        h-full
        w-full
        flex-col
        overflow-hidden
        rounded-tl-md
        bg-[#F1F1F1]
        text-gray-700
        transition-colors
        duration-300
        dark:bg-[#141c23]
        dark:text-[#f5f7f8]
      "
    >
      {/* Logo / Header */}
      <div
        className="
          relative
          flex
          h-20
          shrink-0
          items-center
          gap-3
          px-5
        "
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 font-bold text-white">
          🌿
        </div>

        <h1 className="whitespace-nowrap text-xl font-bold text-gray-800 dark:text-[#f5f7f8]">
          Farm Veggies
        </h1>

        {/* Mobile Close */}
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="
            absolute
            right-4
            top-1/2
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-lg
            text-gray-600
            transition
            hover:bg-gray-200
            lg:hidden
            dark:text-[#f5f7f8]
            dark:hover:bg-[#192128]
          "
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-6 flex-1 space-y-2 overflow-y-auto px-3 no-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.page}
            type="button"
            onClick={() => handleMenuClick(item.page)}
            className={`
              flex
              h-12
              w-full
              items-center
              gap-4
              rounded-xl
              px-4
              text-left
              transition-all
              duration-200
              ${
                activePage === item.page
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-300 dark:text-[#c4cdd3] dark:hover:bg-[#192128]"
              }
            `}
          >
            <span className="shrink-0">
              {item.icon}
            </span>

            <span className="whitespace-nowrap font-medium">
              {item.name}
            </span>
          </button>
        ))}
      </nav>

      {/* Settings */}
      <div className="shrink-0 px-3 pb-5">
        <button
          type="button"
          onClick={() => handleMenuClick("settings")}
          className={`
            flex
            h-12
            w-full
            items-center
            gap-4
            rounded-xl
            px-4
            text-left
            transition-all
            duration-200
            ${
              activePage === "settings"
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-300 dark:text-[#c4cdd3] dark:hover:bg-[#192128]"
            }
          `}
        >
          <span className="shrink-0">
            <Settings size={22} />
          </span>

          <span className="whitespace-nowrap font-medium">
            Settings
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;