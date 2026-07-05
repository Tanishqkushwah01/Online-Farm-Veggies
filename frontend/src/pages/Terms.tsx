import { useEffect, useState } from "react";
import useWebNavigate from "../components/hooks/useWebNavigate";
import {
    Leaf,
    ShieldCheck,
    UserCheck,
    ShoppingBasket,
    Lock,
    Ban,
    AlertTriangle,
    Mail,
    ArrowLeft,
} from "lucide-react";

const sections = [
    {
        icon: UserCheck,
        title: "1. User Account",
        content:
            "Users are responsible for maintaining the confidentiality of their account credentials and all activities that occur under their account.",
    },
    {
        icon: ShieldCheck,
        title: "2. Accurate Information",
        content:
            "You agree to provide accurate and complete information while registering and using the platform.",
    },
    {
        icon: ShoppingBasket,
        title: "3. Buying & Selling",
        content:
            "Farmers must provide genuine product information. Customers should verify product details before purchasing.",
    },
    {
        icon: Lock,
        title: "4. Privacy",
        content:
            "We respect your privacy. Your personal information will never be shared without your consent except where required by law.",
    },
];

const prohibited = [
    "Posting false information.",
    "Uploading harmful or illegal content.",
    "Attempting to hack or misuse the platform.",
    "Impersonating another user.",
];

const Terms = () => {
    const { gotoRegister } = useWebNavigate();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F4F9EE] via-[#EEF3EC] to-[#E5F0DE] py-10 px-6 relative overflow-hidden">
            {/* decorative background blobs */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-green-200/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 -right-24 w-72 h-72 bg-yellow-200/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />

            {/* header */}
            <div
                className={`max-w-4xl mx-auto flex justify-between items-center mb-8 transition-all duration-700 ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
                }`}
            >
                <button
                    onClick={gotoRegister}
                    className="group flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-full shadow-md
                    hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95
                    transition-all duration-300 cursor-pointer"
                >
                    <ArrowLeft
                        size={18}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                    />
                    Go Back
                </button>

                <div className="flex items-center gap-2 text-green-700/70 text-sm font-medium">
                    <Leaf size={16} className="animate-[wiggle_3s_ease-in-out_infinite]" />
                    Agri Marketplace
                </div>
            </div>

            {/* card */}
            <div
                className={`max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-10 border border-green-100
                transition-all duration-700 delay-100 ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-green-100 rounded-xl text-green-700">
                        <Leaf size={28} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Terms & Conditions
                    </h1>
                </div>
                <p className="h-1 w-24 bg-gradient-to-r from-green-500 to-yellow-400 rounded-full mb-6" />

                <p className="mb-8 text-gray-600 leading-relaxed">
                    Welcome to our Agri Marketplace. By creating an account or using
                    this platform, you agree to the following terms and conditions.
                </p>

                <div className="grid gap-5">
                    {sections.map(({ icon: Icon, title, content }, i) => (
                        <div
                            key={title}
                            style={{ transitionDelay: `${150 + i * 80}ms` }}
                            className={`group flex gap-4 p-5 rounded-xl border border-transparent
                            hover:border-green-200 hover:bg-green-50/60 hover:shadow-md hover:-translate-y-0.5
                            transition-all duration-300 ${
                                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                        >
                            <div className="flex-shrink-0 h-11 w-11 flex items-center justify-center rounded-full bg-green-100 text-green-700
                                group-hover:bg-green-600 group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                                <Icon size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-green-700 transition-colors">
                                    {title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">{content}</p>
                            </div>
                        </div>
                    ))}

                    {/* prohibited activities */}
                    <div
                        style={{ transitionDelay: "470ms" }}
                        className={`group flex gap-4 p-5 rounded-xl border border-transparent
                        hover:border-red-200 hover:bg-red-50/60 hover:shadow-md hover:-translate-y-0.5
                        transition-all duration-300 ${
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                    >
                        <div className="flex-shrink-0 h-11 w-11 flex items-center justify-center rounded-full bg-red-100 text-red-600
                            group-hover:bg-red-600 group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                            <Ban size={20} />
                        </div>
                        <div className="w-full">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                                5. Prohibited Activities
                            </h2>
                            <ul className="space-y-2">
                                {prohibited.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2 text-gray-600 hover:text-red-600 hover:translate-x-1 transition-all duration-200"
                                    >
                                        <AlertTriangle size={15} className="mt-1 flex-shrink-0 text-red-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* termination */}
                    <div
                        style={{ transitionDelay: "550ms" }}
                        className={`group flex gap-4 p-5 rounded-xl border border-transparent
                        hover:border-orange-200 hover:bg-orange-50/60 hover:shadow-md hover:-translate-y-0.5
                        transition-all duration-300 ${
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                    >
                        <div className="flex-shrink-0 h-11 w-11 flex items-center justify-center rounded-full bg-orange-100 text-orange-600
                            group-hover:bg-orange-600 group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors">
                                6. Termination
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We reserve the right to suspend or terminate any account that
                                violates these terms.
                            </p>
                        </div>
                    </div>

                    {/* contact */}
                    <div
                        style={{ transitionDelay: "630ms" }}
                        className={`group flex gap-4 p-5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white
                        hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                    >
                        <div className="flex-shrink-0 h-11 w-11 flex items-center justify-center rounded-full bg-white/20
                            group-hover:bg-white/30 group-hover:rotate-6 transition-all duration-300">
                            <Mail size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-1">7. Contact</h2>
                            <p className="text-green-50 leading-relaxed">
                                If you have any questions regarding these Terms & Conditions,
                                please contact our support team.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes wiggle {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-8deg); }
                    75% { transform: rotate(8deg); }
                }
            `}</style>
        </div>
    );
};

export default Terms;