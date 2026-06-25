import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api"
})

import type { LoginFormData } from "../Validation/login.schema";
import type { RegisterFormData } from "../Validation/register.schema";

type LoginRequest = LoginFormData & {
  role: "Customer" | "Farmer";
};

export const userLogin = async (data: LoginRequest) => {
  return await api.post("/auth/signin", data);
};

type RegisterRequest = RegisterFormData;

export const userRegister = async (data: RegisterRequest) => {
  console.log("user",data);
  return api.post("/auth/signup", data);
};