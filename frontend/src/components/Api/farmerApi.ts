

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
    console.log("data===", data);
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
    // console.log("forma data ====", formData);
    //   console.log([...data.entries()]);

    return await api.post("/products", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const getFarmerProducts = async () => {
    const token = localStorage.getItem("token");

    return await api.get("/products",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

};

export const updateProduct = (productId: string, data: any) => {
    const token = localStorage.getItem("token");

    return api.put(`/products/${productId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
};


export const deleteProduct = (id: string) => {
    const token = localStorage.getItem("token");

    return api.delete(`/products/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getProductStats = () => {
    return api.get("/products/stats", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const getFarmerReviews = async (reviewType: "customer" | "product") => {
    const token = localStorage.getItem("token");

    return await api.get(`/reviews?type=${reviewType}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


export const getFarmerReviewStats = async (type: "product" | "customer") => {
    const token = localStorage.getItem("token");

    return await api.get(`/review-stats?type=${type}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


export const getRatingDistribution = async (reviewType: "customer" | "product") => {
    const token = localStorage.getItem("token");

    return await api.get(`/rating-distribution?type=${reviewType}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getHighestRatedProducts = async () => {
  const token = localStorage.getItem("token");

  return await api.get("/highest-rated-products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};