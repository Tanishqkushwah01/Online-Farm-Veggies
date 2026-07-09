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
  console.log("data --", data);
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

  return api.post(`/wishlist/toggle/${productId}`, {},
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

export const addReview = (
  type: "product" | "farmer",
  data: {
    id: string;
    rating: number;
    review: string;
  }
) => {
  const token = localStorage.getItem("token");

  return api.post(`/review?type=${type}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyReview = (productId: string) => {
  const token = localStorage.getItem("token");

  return api.get(`/review/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};




export const getProductById = async (productId: string) => {

  const token = localStorage.getItem("token");

  return await api.get(`/products/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const deleteReview =async (type: string, id: string) => {
  const token = localStorage.getItem("token");

  return await api.delete(`/review/${type}/${id}`, {

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createOrder = async (data: {
  productId: string;
  quantity: number;
  requiredDate: string;
  city: string;
  totalPrice: number;
}) => {
  const token = localStorage.getItem("token");
  console.log("kana = ", data);

  return await api.post("/orders", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCustomerOrders = async () => {
  const token = localStorage.getItem("token");

  return await api.get("/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const cancelOrder = async (orderId: string) => {
  const token = localStorage.getItem("token");

  return await api.delete(
    `/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};



export const getFarmerProfileById = async (farmerId: string) => {
  const token = localStorage.getItem("token");
  return await api.get(
    `/farmer/${farmerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};