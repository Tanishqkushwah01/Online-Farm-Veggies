import axios from "axios";
// import { CgPassword } from "react-icons/cg";

const api = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL
})

type LoginRequest =
  | {
    email: string;
    password: string;
  }
  | {
    phoneNumber: string;
    password: string;
  };

export const userLogin = async (data: LoginRequest) => {
  console.log(data)
  return await api.post("/signin", data);
};



type RegisterRequest = {
  role: "Customer" | "Farmer";
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export const userRegister = async (data: RegisterRequest) => {
  // console.log("user",data);
  return api.post("/signup", data);
};

export const gmailSend = async (email: string) => {
  // console.log("email =",email)
  await api.post("/send-email", { email });
}


export const gmailResend = async (email: string) => {
  // console.log("email =",email)
  await api.post("/resend-email", { email });
}

export const forgotPassword = async (email: string) => {
  // console.log("email =", email)
  return await api.post("/forgot-password", { email });
}

export const resetPassword = async ({ token, password }: { password: string, token: string }) => {
  // console.log("email =", email)
  return await api.put(`/reset-password/${token}`, { password });
}


export const logoutUser = async () => {

  const token = localStorage.getItem("token");

  return await api.delete("/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};





export const changePassword = async (data: LoginRequest) => {
  return await api.post("/change-password", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};


export const verifyDeletePassword = async (password: string) => {
  return await api.post("/verify-delete-password", { password },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const deleteAccount =async () => {
  return await api.delete("/profile",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const updateUserProfile = async (data: FormData) => {
  console.log([...data.entries()]);
  return await api.put("/profile", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
