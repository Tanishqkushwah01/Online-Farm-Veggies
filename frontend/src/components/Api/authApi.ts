import axios from "axios";

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
  console.log("user",data);
  return api.post("/signup", data);
};


export const gmailResend = async(email:string)=>{
console.log("email =",email)

  await api.post("/resend-email",{email});
}