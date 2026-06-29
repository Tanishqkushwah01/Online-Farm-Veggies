import { useState } from "react";
import farmer from "../assets/images/farmer.png";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import useWebNavigate from "../components/hooks/useWebNavigate";
import { loginSchema } from "../components/Validation/login.schema";
import { userLogin } from "../components/Api/authApi";

const Login = () => {
    // const [role, setRole] = useState<"Customer" | "Farmer">("Customer");
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { gotoForgotPassword,gotoCustomer,gotoAdmin,gotoFarmer ,gotoRegister} = useWebNavigate();

    const [errors, setErrors] = useState<{
        identifier?: string;
        password?: string;
    }>({});


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
        console.log(res.data.userExist.role);
        const role = res.data.userExist.role;
        if(role ==="Customer"){
            gotoCustomer()
        }else if(role ==="Admin"){
            gotoAdmin();
        }else{
            gotoFarmer();
        }

        const userInfo = JSON.stringify(res.data.userExist);
        console.log(userInfo)
        localStorage.setItem("userInfo", userInfo);
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
                            {/* Lock Icon */}
                            <Lock
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                            />

                            {/* Input */}
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full h-11 rounded-xl border border-gray-300 pl-12 pr-12 outline-none focus:border-blue-500"
                            />

                            {/* Eye Icon */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <p className="text-red-500 text-sm mt-1 h-5">
                            {errors.password || ""}
                        </p>
                    </div>

                    <div className="text-right">
                        <button
                            type="button"
                            onClick={gotoForgotPassword}
                            className="text-gray-600 cursor-pointer hover:text-green-500 font-medium transition-colors duration-200"
                        >
                            Forgot Password?
                        </button>
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