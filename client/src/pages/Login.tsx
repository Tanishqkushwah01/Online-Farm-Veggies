import { useState } from "react";
import farmer from "../assets/images/farmer.png";
import { User, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import useWebNavigate from "../components/hooks/useWebNavigate";

const Login = () => {
  const [role, setRole] = useState<"Customer" | "Farmer">("Customer");
  const { gotoRegister } = useWebNavigate();
  return (
    <div className="min-h-screen w-full flex">
      {/* Left image */}
      <div className="w-150 h-screen bg-black">
        <img
          src={farmer}
          alt="Farmer"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Right section takes remaining width bg-[#f4f2f2]*/}
      <div className="flex-1 h-screen flex flex-col items-center bg-[#EEF3EC]">
        <div className="flex flex-col items-center mt-20 gap-4 mb-10">
          <h1 className="text-black font-bold text-5xl">Login to Your Account</h1>
          <h3 className="text-black font-semibold text-2xl">Enter your details to login</h3>
        </div>
        <div className="flex w-75 h-12 border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setRole("Customer")}
            className={`flex-1 font-semibold transition-all ${role === "Customer"
              ? "bg-green-600 text-white"
              : "bg-white cursor-pointer text-black"
              }`}
          >
            Customer
          </button>

          <button
            onClick={() => setRole("Farmer")}
            className={`flex-1 font-semibold transition-all ${role === "Farmer"
              ? "bg-green-600 text-white"
              : "bg-white cursor-pointer text-black"
              }`}
          >
            Farmer
          </button>
        </div>

        {/* input box */}
        {/* <div className="flex flex-col w-75 mt-20 gap-5">

          <input type="text" className="border-2 border-gray-300 rounded-md p-2 outline-none" placeholder="Email or Phone Number"/>
          <input type="text" className="border-2 border-gray-300 rounded-md p-2 outline-none" placeholder="Password"/>
        </div> */}
        <div className="space-y-4 w-96 mt-15">
          {/* Email / Phone */}
          <div className="relative">
            <User
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Email or Phone Number"
              className="w-full h-14 rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-14 rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-blue-500"
            />
          </div>
          <div className="text-right">
            <h1 className="inline-block text-gray-600 cursor-pointer hover:text-blue-500">
              Forgot Password?
            </h1>
          </div>
        </div>

        <div className="w-96 flex items-center mx-auto my-4 mt-10">
          <div className="w-34 h-px bg-gray-300"></div>

          <span className="mx-4 text-sm text-gray-500 whitespace-nowrap">
            or continue with
          </span>

          <div className="w-34 h-px bg-gray-300"></div>
        </div>


        {/* google btn  */}
        <div className="flex my-5">
          <button className="flex cursor-pointer items-center gap-2 border rounded-lg px-4 py-2 border-gray-300 shadow-sm">
            <FcGoogle size={22} />
            Continue with Google
          </button>
        </div>
        <div>
          <h1>Don't have an account?<span onClick={gotoRegister} className="text-green-600 cursor-pointer"> Register here</span></h1>
        </div>
      </div>
    </div>
  );
};

export default Login;