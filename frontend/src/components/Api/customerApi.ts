import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_FARMER_URL
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