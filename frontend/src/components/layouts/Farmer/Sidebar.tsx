import {
  Home,
  Package,
  ShoppingCart,
  Settings,
} from "lucide-react";
import { useState } from "react";

type SidebarProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const Sidebar = ({ setActivePage }: SidebarProps) => {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", page: "dashboard", icon: <Home size={22} /> },
    { name: "Products", page: "products", icon: <Package size={22} /> },
    { name: "Orders", page: "orders", icon: <ShoppingCart size={22} /> },
  ];

  function handleMenuClick(name: string, page: string) {
    setActive(name);
    setActivePage(page);
  }

  return (
    <aside
      className={`
        h-full bg-[#F1F1F1] rounded-tl-md
        transition-all duration-300
        ${open ? "w-72" : "w-20"}
        flex flex-col
      `}
    >
      <div
        onClick={() => setOpen(!open)}
        className="h-20 flex items-center gap-3 px-5 cursor-pointer"
      >
        <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
          F
        </div>

        {open && (
          <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">
            Farm Veggies
          </h1>
        )}
      </div>

      <nav className="flex-1 mt-6 px-3 space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => handleMenuClick(item.name, item.page)}
            className={`
              flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer
              transition-all duration-200
              ${
                active === item.name
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            {item.icon}

            {open && (
              <span className="font-medium whitespace-nowrap">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </nav>

      <div className="px-3 pb-5">
        <div
          onClick={() => handleMenuClick("Settings", "settings")}
          className={`
            flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer
            transition-all duration-200
            ${
              active === "Settings"
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-300"
            }
          `}
        >
          <Settings size={22} />

          {open && (
            <span className="font-medium whitespace-nowrap">
              Settings
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;