import { useState } from "react";
import farmer from "../assets/images/farmer.png";
import { User, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import useWebNavigate from "../components/hooks/useWebNavigate";
import { loginSchema } from "../components/Validation/login.schema";
import { userLogin } from "../components/Api/api";

const Login = () => {
    // const [role, setRole] = useState<"Customer" | "Farmer">("Customer");
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState<{
        identifier?: string;
        password?: string;
    }>({});

    const { gotoRegister } = useWebNavigate();

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const result = loginSchema.safeParse({
    identifier,
    password,
  });

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    setErrors({
      identifier: fieldErrors.identifier?.[0],
      password: fieldErrors.password?.[0],
    });

    return;
  }

  setErrors({});

  const isEmail = result.data.identifier.includes("@");

  const data = isEmail
    ? {
        email: result.data.identifier,
        password: result.data.password,
      }
    : {
        phoneNumber: result.data.identifier,
        password: result.data.password,
      };

  const res = await userLogin(data);

  localStorage.setItem("token", res.data.token);

  setIdentifier("");
  setPassword("");
}

    return (
        <div className="min-h-screen w-full flex">
            {/* Left image */}
            <div className="w-150 min-h-screen bg-black">
                <img
                    src={farmer}
                    alt="Farmer"
                    className="w-full h-full object-cover object-top"
                />
            </div>

            {/* Right section */}
            <div className="flex-1 min-h-screen flex flex-col items-center bg-[#EEF3EC] overflow-y-auto py-8">
                <div className="flex flex-col items-center gap-2 mb-6">
                    <h1 className="text-black font-bold text-5xl">
                        Login to Your Account
                    </h1>
                    <h3 className="text-black font-semibold text-2xl">
                        Enter your details to login
                    </h3>
                </div>

                {/* Customer / Farmer buttons */}
                {/* <div className="flex w-75 h-12 border border-gray-300 rounded-lg overflow-hidden mb-8">
                    <button
                        type="button"
                        onClick={() => setRole("Customer")}
                        className={`flex-1 font-semibold transition-all ${role === "Customer"
                            ? "bg-green-600 text-white"
                            : "bg-white cursor-pointer text-black"
                            }`}
                    >
                        Customer
                    </button>

                    <button
                        type="button"
                        onClick={() => setRole("Farmer")}
                        className={`flex-1 font-semibold transition-all ${role === "Farmer"
                            ? "bg-green-600 text-white"
                            : "bg-white cursor-pointer text-black"
                            }`}
                    >
                        Farmer
                    </button>
                </div> */}

                <form onSubmit={handleLogin} className="space-y-4 w-96 mt-10">
                    {/* Email / Phone */}
                    <div>
                       
                        <div className="relative">
                            <User
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                            <input
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder="Email or Phone Number"
                                className="w-full h-11 rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-blue-500"
                            />
                        </div>

                        <p className="text-red-500 text-sm mt-1 h-5">
                            {errors.identifier || ""}
                        </p>
                    </div>

                    {/* Password */}
                    <div>
                       
                        <div className="relative">
                            <Lock
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                            <input
                                type="email"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full h-11 rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-blue-500"
                            />
                        </div>

                        <p className="text-red-500 text-sm mt-1 h-5">
                            {errors.password || ""}
                        </p>
                    </div>

                    <div className="text-right">
                        <h1 className="inline-block text-gray-600 cursor-pointer hover:text-green-400">
                            Forgot Password?
                        </h1>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-14 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-all cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                <div className="w-96 flex items-center mx-auto my-4 mt-10">
                    <div className="w-34 h-px bg-gray-300"></div>

                    <span className="mx-4 text-sm text-gray-500 whitespace-nowrap">
                        or continue with
                    </span>

                    <div className="w-34 h-px bg-gray-300"></div>
                </div>

                <div className="flex my-5">
                    <button className="flex cursor-pointer items-center gap-2 border rounded-lg px-4 py-2 border-gray-300 shadow-sm">
                        <FcGoogle size={22} />
                        Continue with Google
                    </button>
                </div>

                <div>
                    <h1>
                        Don't have an account?
                        <span
                            onClick={gotoRegister}
                            className="text-green-600 cursor-pointer"
                        >
                            {" "}
                            Register here
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Login;