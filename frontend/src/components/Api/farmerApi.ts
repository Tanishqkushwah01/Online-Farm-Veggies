

import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_FARMER_URL
})


export type ProductRequest = {
    productName: string;
    category: string;
    price: number;
    quantity: number;
    unit: string;
    stockStatus: "In Stock" | "Out of Stock";
    description: string;
    image?: File;
};

export const createProduct = async (data: ProductRequest) => {
    const formData = new FormData();

    formData.append("productName", data.productName);
    formData.append("category", data.category);
    formData.append("price", String(data.price));
    formData.append("quantity", String(data.quantity));
    formData.append("unit", data.unit);
    formData.append("stockStatus", data.stockStatus);
    formData.append("description", data.description);

    if (data.image) {
        formData.append("image", data.image);
    }
    console.log("forma data ====", formData);
    return await api.post("/products", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};


