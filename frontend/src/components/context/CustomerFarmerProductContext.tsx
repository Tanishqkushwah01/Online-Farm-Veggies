// import { createContext, useEffect, useState } from "react";
// import type { ReactNode } from "react";
// import { getCustomerFarmerProducts } from "../Api/customerApi";
// export type FarmerProduct = {
//     _id: string;
//     farmerId: string;
//     productName: string;
//     description: string;
//     category: string;
//     price: number;
//     quantity: number;
//     unit: string;
//     image: string;
//     isAvailable: boolean;
//     averageRating: number;
//     totalReviews: number;
//     city: string;
//     createdAt: string;
//     updatedAt: string;
// };

// type ContextType = {
//     products: FarmerProduct[];
//     matchedProducts: FarmerProduct[];
//     farmerLoading: boolean;
//     page: number;
//     totalPages: number;
//     totalProducts: number;
//     hasNextPage: boolean;
//     hasPrevPage: boolean;
//     search: string;
//     category: string;
//     message: string[];
//     fallback: string;
//     matchedCount: number;
//     categoryCount: number;
//     farmerId: string;
//     setFarmerId: React.Dispatch<React.SetStateAction<string>>;
//     setSearch: React.Dispatch<React.SetStateAction<string>>;
//     setCategory: React.Dispatch<React.SetStateAction<string>>;
//     setPage: React.Dispatch<React.SetStateAction<number>>;
//     fetchProducts: () => Promise<void>;
// };

// export const CustomerFarmerProductContext = createContext<ContextType | null>(null);

// export const CustomerFarmerProductProvider = ({ children }: { children: ReactNode }) => {

//     const [products, setProducts] = useState<FarmerProduct[]>([]);
//     const [matchedProducts, setMatchedProducts] = useState<FarmerProduct[]>([]);
//     const [farmerLoading, setFarmerLoading] = useState(false);
//     const [farmerId, setFarmerId] = useState("");
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);
//     const [totalProducts, setTotalProducts] = useState(0);
//     const [hasNextPage, setHasNextPage] = useState(false);
//     const [hasPrevPage, setHasPrevPage] = useState(false);
//     const [search, setSearch] = useState("");
//     const [debouncedSearch, setDebouncedSearch] = useState("");
//     const [category, setCategory] = useState("");
//     const [message, setMessage] = useState<string[]>([]);
//     const [fallback, setFallback] = useState("none");
//     const [matchedCount, setMatchedCount] = useState(0);
//     const [categoryCount, setCategoryCount] = useState(0);

//     const fetchProducts = async () => {
//         console.count("fetchProducts");
//         if (!farmerId) {
//             return;
//         }
//         try {
//             setFarmerLoading(true);
//             const res = await getCustomerFarmerProducts(
//                 farmerId,
//                 page,
//                 15,
//                 debouncedSearch,
//                 category
//             );
//             const data = res.data;
//             // console.log("data ==",res.data);

//             if (data.success) {
//                 setProducts(data.products || []);
//                 setMatchedProducts(data.matchedProducts || []);
//                 setTotalPages(data.totalPages || 0);
//                 setTotalProducts(data.totalProducts || 0);
//                 setHasNextPage(data.hasNextPage || false);
//                 setHasPrevPage(data.hasPrevPage || false);
//                 setMessage(data.message || "");
//                 setFallback(data.fallback || "none");
//                 setMatchedCount(data.matchedCount || 0);
//                 setCategoryCount(data.categoryCount || 0);
//             }
//             else {
//                 setProducts([]);
//             }
//         }
//         catch (error) {
//             console.log("Customer Farmer Products Error:", error);
//             setProducts([]);
//             setMessage(["Unable to load products"]);
//         }
//         finally {
//             setFarmerLoading(false);
//         }
//     };

//     // Debounce Search
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setDebouncedSearch(search);
//         }, 500);

//         return () => clearTimeout(timer);
//     }, [search]);

//     // Search / Category change
//     // reset pagination

//     useEffect(() => {
//         setPage(1);
//     }, [debouncedSearch, category]);

//     // Fetch whenever data changes
//     useEffect(() => {
//         fetchProducts();
//     }, [farmerId, page, debouncedSearch, category]);

//     return (
//         <CustomerFarmerProductContext.Provider
//             value={{
//                 products,
//                 matchedProducts,
//                 farmerLoading,
//                 page,
//                 totalPages,
//                 totalProducts,
//                 hasNextPage,
//                 hasPrevPage,
//                 search,
//                 category,
//                 message,
//                 fallback,
//                 matchedCount,
//                 categoryCount,
//                 farmerId,
//                 setFarmerId,
//                 setSearch,
//                 setCategory,
//                 setPage,
//                 fetchProducts,
//             }}        >
//             {children}
//         </CustomerFarmerProductContext.Provider>
//     )
// };


import {    createContext,    useCallback,    useEffect,    useState,    type ReactNode} from "react";
import { getCustomerFarmerProducts } from "../Api/customerApi";

export type FarmerProduct = {
    _id: string;
    farmerId: string;
    productName: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
    unit: string;
    image: string;
    isAvailable: boolean;
    averageRating: number;
    totalReviews: number;
    city: string;
    createdAt: string;
    updatedAt: string;
};

type ContextType = {
    products: FarmerProduct[];
    matchedProducts: FarmerProduct[];
    farmerLoading: boolean;
    farmerId: string;
    page: number;
    totalPages: number;
    totalProducts: number;
    search: string;
    category: string;
    messages: string[];
    setFarmerId: React.Dispatch<React.SetStateAction<string>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    fetchProducts: () => Promise<void>;
};

export const CustomerFarmerProductContext =    createContext<ContextType | null>(null);

export const CustomerFarmerProductProvider = ({    children}: {    children: ReactNode}) => {

    const [products, setProducts] = useState<FarmerProduct[]>([]);
    const [matchedProducts, setMatchedProducts] = useState<FarmerProduct[]>([]);

    const [farmerLoading, setFarmerLoading] = useState(false);

    const [farmerId, setFarmerId] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [category, setCategory] = useState("");
    const [messages, setMessages] = useState<string[]>([]);

    // -----------------------------
    // Debounce Search
    // -----------------------------

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim());
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    // -----------------------------
    // Reset Page
    // -----------------------------

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, category]);

    // -----------------------------
    // Fetch Products
    // -----------------------------

    const fetchProducts = useCallback(async () => {        if (!farmerId) return;

        try {
            setFarmerLoading(true);

            const res = await getCustomerFarmerProducts(
                farmerId,
                page,
                15,
                debouncedSearch,
                category
            );

            const data = res.data;

            if (data.success) {
                setProducts(data.products ?? []);
                setMatchedProducts(data.matchedProducts ?? []);

                setTotalPages(data.totalPages ?? 0);
                setTotalProducts(data.totalProducts ?? 0);
                // console.log("tp=",totalProducts,data.totalProducts)

                setMessages(data.messages ?? []);
            } else {
                setProducts([]);
                setMatchedProducts([]);
                setMessages([]);
            }
        } catch (error) {
            console.error("Customer Farmer Products Error:", error);

            setProducts([]);
            setMatchedProducts([]);
            setMessages(["Unable to load products"]);
        } finally {
            setFarmerLoading(false);
        }
    }, [farmerId, page, debouncedSearch, category]);

    // -----------------------------
    // Auto Fetch
    // -----------------------------

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <CustomerFarmerProductContext.Provider
            value={{
                products,
                matchedProducts,

                farmerLoading,

                farmerId,
                page,
                totalPages,
                totalProducts,

                search,
                category,

                messages,

                setFarmerId,
                setSearch,
                setCategory,
                setPage,

                fetchProducts,
            }}
        >
            {children}
        </CustomerFarmerProductContext.Provider>
    );
};