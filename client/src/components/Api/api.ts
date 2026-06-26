import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api"
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
  return await api.post("/auth/signin", data);
};



type RegisterRequest = {
  role: "Customer" | "Farmer";
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export const userRegister = async (data: RegisterRequest) => {
  console.log("user",data);
  return api.post("/auth/signup", data);
};