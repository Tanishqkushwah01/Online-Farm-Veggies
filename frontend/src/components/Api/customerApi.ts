import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_CUSTOMER_URL
})


type FilterData = {
  location?: string;
  category?: string;
  price?: string;
  freshness?: string;
};

export const filterProducts = (data: FilterData) => {
    console.log("data --",data);
  return api.get("/products", {
    params: {
      location: data.location,
      category: data.category,
      price: data.price,
      freshness: data.freshness,
    },
    headers: {
      token: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getTenProducts = () => {
  const token = localStorage.getItem("token");

  return api.get("/products/random", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



export const addToWishlist = async (productId: string) => {
  const token = localStorage.getItem("token");

  return api.post(`/wishlist/toggle/${productId}`,{},
        {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

 

export const getWishlist = async () => {
  const token = localStorage.getItem("token");

  return api.get("/wishlist",
        {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const addReview = (data: {
  productId: string;
  rating: number;
  review: string;
}) => {
  const token = localStorage.getItem("token");

  return api.post("/review", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};