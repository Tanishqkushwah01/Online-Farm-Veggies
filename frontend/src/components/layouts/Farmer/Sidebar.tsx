import {
  Home,
  Package,
  ShoppingCart,
  Settings,
  Star,
} from "lucide-react";
import { useState } from "react";

type SidebarProps = {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const Sidebar = ({ activePage, setActivePage }: SidebarProps) => {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", page: "dashboard", icon: <Home size={22} /> },
    { name: "Products", page: "products", icon: <Package size={22} /> },
    { name: "Orders", page: "orders", icon: <ShoppingCart size={22} /> },
    { name: "Reviews", page: "reviews", icon: <Star size={22} /> },
  ];

  function handleMenuClick(page: string) {
    setActivePage(page);
  }

  return (
    <aside
      className={`
        h-full bg-[#F1F1F1] rounded-tl-md
        transition-[width] duration-500 ease-in-out
        ${open ? "w-72" : "w-20"}
        flex flex-col overflow-hidden
      `}
    >
      {/* Logo */}
      <div
        onClick={() => setOpen(!open)}
        className="h-20 flex items-center gap-3 px-5 cursor-pointer shrink-0"
      >
        <div className="h-10 w-10 shrink-0 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
          {/* F */}
          🌿
        </div>

        <h1
          className={`
            text-xl font-bold text-gray-800 whitespace-nowrap
            transition-all duration-300 ease-in-out
            ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
          `}
        >
          Farm Veggies
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-6 px-3 space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.page}
            onClick={() => handleMenuClick(item.page)}
            className={`
              h-12 flex items-center gap-4 px-4 rounded-xl cursor-pointer
              transition-all duration-300 ease-in-out
              ${
                activePage === item.page
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            <div className="shrink-0">{item.icon}</div>

            <span
              className={`
                font-medium whitespace-nowrap
                transition-all duration-300 ease-in-out
                ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
              `}
            >
              {item.name}
            </span>
          </div>
        ))}
      </nav>

      {/* Settings */}
      <div className="px-3 pb-5 shrink-0">
        <div
          onClick={() => handleMenuClick("settings")}
          className={`
            h-12 flex items-center gap-4 px-4 rounded-xl cursor-pointer
            transition-all duration-300 ease-in-out
            ${
              activePage === "settings"
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-300"
            }
          `}
        >
          <div className="shrink-0">
            <Settings size={22} />
          </div>

          <span
            className={`
              font-medium whitespace-nowrap
              transition-all duration-300 ease-in-out
              ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
            `}
          >
            Settings
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;