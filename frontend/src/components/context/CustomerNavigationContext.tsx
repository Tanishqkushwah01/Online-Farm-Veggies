import { createContext, useState, type ReactNode } from "react";

export type ActivePage =
  | "home"
  | "products"
  | "orders"
  | "wishlist"
  | "notifications"
  | "profile"
  | "settings"
  | "privacy"
  | "help"
  | "changePassword"
  | "DeleteAccount";


type CustomerNavigationContextType = {

  // Navigation
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;


  // Product Search
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;


  // Order Search
  orderSearch: string;
  setOrderSearch: React.Dispatch<React.SetStateAction<string>>;


  // Wishlist Search
  wishlistSearch: string;
  setWishlistSearch: React.Dispatch<React.SetStateAction<string>>;



  // Filters
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;


  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;


  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;

};


export const CustomerNavigationContext =
  createContext<CustomerNavigationContextType | null>(null);



type Props = {
  children: ReactNode;
};



export const CustomerNavigationProvider = ({
  children,
}: Props) => {


  // Navigation
  const [activePage, setActivePage] =
    useState<ActivePage>("home");



  // Product Search
  const [search, setSearch] =
    useState("");



  // Order Search
  const [orderSearch, setOrderSearch] =
    useState("");



  // Wishlist Search
  const [wishlistSearch, setWishlistSearch] =
    useState("");



  // Filters
  const [category, setCategory] =
    useState("All Category");


  const [location, setLocation] =
    useState("All Location");


  const [price, setPrice] =
    useState("");



  return (

    <CustomerNavigationContext.Provider

      value={{

        activePage,
        setActivePage,


        search,
        setSearch,


        orderSearch,
        setOrderSearch,


        wishlistSearch,
        setWishlistSearch,



        category,
        setCategory,


        location,
        setLocation,


        price,
        setPrice,


      }}

    >

      {children}

    </CustomerNavigationContext.Provider>

  );
};