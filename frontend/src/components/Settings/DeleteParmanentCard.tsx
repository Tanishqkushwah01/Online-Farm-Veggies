// import { useState } from "react";
// import { Lock, Trash2, AlertTriangle, EyeOff, Eye } from "lucide-react";
// import { deleteAccount, verifyDeletePassword } from "../Api/authApi";
// import useWebNavigate from "../hooks/useWebNavigate";

// const DeleteAccount = () => {
//     const { gotoRegister } = useWebNavigate();
//     const [step, setStep] = useState<"password" | "confirm">("password");
//     const [password, setPassword] = useState("");
//     const [confirmText, setConfirmText] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);


//     const [error, setError] = useState("");

//     const handleVerifyPassword = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         if (!password.trim()) {
//             setError("Password is required");
//             return;
//         }

//         try {
//             setLoading(true);
//             setError("");

//             const response = await verifyDeletePassword(password);
//             // console.log(response.data)

//             if (response.data.success) {
//                 setStep("confirm");
//             }

//             // temporary testing
//             // setStep("confirm"); 
//         } catch (error: any) {
//             setError(error.response?.data?.message || "Password is incorrect");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDeleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         if (confirmText !== "DELETE") {
//             setError("Please type DELETE to confirm");
//             return;
//         }

//         try {
//             setLoading(true);
//             setError("");

//             const res = await deleteAccount();

//             if (res.data.success) {
//                 localStorage.clear();
//                 gotoRegister()
//             }else{
//                 console.log("id is not deleted");
//             }
//         } catch (error: any) {
//             setError(error.response?.data?.message || "Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-[#EEF3EC] px-4">
//             <div className="w-full max-w-md bg-[#F1F1F1] shadow-lg rounded-xl p-8">
//                 <div className="flex justify-center">
//                     <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
//                         {step === "password" ? (
//                             <Lock size={32} className="text-red-600" />
//                         ) : (
//                             <AlertTriangle size={34} className="text-red-600" />
//                         )}
//                     </div>
//                 </div>

//                 <h1 className="text-3xl font-bold text-center text-red-600 mt-5">
//                     Delete Account
//                 </h1>

//                 {step === "password" ? (
//                     <>
//                         <p className="text-gray-500 text-center mt-2">
//                             Enter your current password to continue.
//                             <br />
//                             This keeps your account safe.
//                         </p>

//                         <form
//                             noValidate
//                             onSubmit={handleVerifyPassword}
//                             className="mt-8 space-y-4"
//                         >
//                             <div>
//                                 <div className="relative">
//                                     <Lock
//                                         size={19}
//                                         className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
//                                     />

//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         placeholder="Confirm password"
//                                         className="w-full h-11 rounded-xl border border-gray-300 pl-12 pr-12 outline-none focus:border-blue-500"
//                                     />

//                                     <button
//                                         type="button"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
//                                     >
//                                         {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                                     </button>
//                                 </div>

//                                 {/* <p className="text-red-500 text-sm mt-1 h-5">
//                                     {errors.confirmPassword || ""}
//                                 </p> */}
//                                 <p className="text-red-500 text-sm mt-1 h-5">
//                                     {error || ""}
//                                 </p>
//                             </div>

//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className="w-full h-14 bg-red-600 text-white rounded-xl font-semibold text-lg hover:bg-red-700 transition-all cursor-pointer disabled:opacity-60"
//                             >
//                                 {loading ? "Verifying..." : "Verify Password"}
//                             </button>
//                         </form>
//                     </>
//                 ) : (
//                     <>
//                         <p className="text-gray-500 text-center mt-2">
//                             This action is permanent and cannot be undone.
//                             <br />
//                             Type <span className="font-bold text-red-600">DELETE</span> below.
//                         </p>

//                         <div className="mt-6 rounded-xl bg-red-50 border border-red-200 p-4">
//                             <div className="flex gap-3">
//                                 <Trash2 className="text-red-600 shrink-0" size={22} />
//                                 <div>
//                                     <h3 className="font-semibold text-red-700">
//                                         Your account will be permanently deleted
//                                     </h3>
//                                     <p className="text-sm text-red-500 mt-1">
//                                         Your profile, products, orders, and saved data may be removed.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         <form
//                             noValidate
//                             onSubmit={handleDeleteAccount}
//                             className="mt-6 space-y-4"
//                         >
//                             <div>
//                                 <label className="block font-medium mb-2">
//                                     Type DELETE
//                                 </label>

//                                 <input
//                                     type="text"
//                                     value={confirmText}
//                                     onChange={(e) => {
//                                         setConfirmText(e.target.value);
//                                         setError("");
//                                     }}
//                                     placeholder="DELETE"
//                                     className="w-full h-11 rounded-xl border border-gray-300 px-4 outline-none focus:border-red-500"
//                                 />

//                                 <p className="text-red-500 text-sm mt-1 h-5">
//                                     {error || ""}
//                                 </p>
//                             </div>

//                             <div className="flex gap-3">
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         setStep("password");
//                                         setConfirmText("");
//                                         setError("");
//                                     }}
//                                     className="w-full h-14 bg-gray-100 text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all cursor-pointer"
//                                 >
//                                     Back
//                                 </button>

//                                 <button
//                                     type="submit"
//                                     disabled={loading || confirmText !== "DELETE"}
//                                     className="w-full h-14 bg-red-600 text-white rounded-xl font-semibold text-lg hover:bg-red-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                     {loading ? "Deleting..." : "Delete Forever"}
//                                 </button>
//                             </div>
//                         </form>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default DeleteAccount;



import { useState } from "react";
import { Lock, Trash2, AlertTriangle, EyeOff, Eye } from "lucide-react";
import { deleteAccount, verifyDeletePassword } from "../Api/authApi";
import useWebNavigate from "../hooks/useWebNavigate";

import { type ActivePage } from "../context/CustomerNavigationContext";


type ChangePasswordProps = {
  setActivePage: (page: ActivePage) => void;
};

const DeleteAccount = ({ setActivePage }: ChangePasswordProps) => {
  const { gotoRegister } = useWebNavigate();

  const [step, setStep] = useState<"password" | "confirm">("password");
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  

  const handleVerifyPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await verifyDeletePassword(password);

      if (response.data.success) {
        setStep("confirm");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Password is incorrect"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (confirmText !== "DELETE") {
      setError("Please type DELETE to confirm");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await deleteAccount();

      if (res.data.success) {
        localStorage.clear();
        gotoRegister();
      } else {
        console.log("id is not deleted");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#EEF3EC] px-4 py-24 transition-colors duration-200 sm:px-6 sm:py-28 dark:bg-[#0f171f]">
      {/* Go Back Button */}
      {/* <button
        type="button"
        onClick={handleGoBack}
        className="absolute left-4 top-6 cursor-pointer rounded-lg bg-green-600 px-5 py-3 text-white transition hover:bg-green-700 sm:left-6 sm:top-8 lg:left-10 lg:top-10"
      >
        ← Go Back
      </button> */}
      <button
        onClick={() => setActivePage("settings")}
        className="absolute left-4 top-6 cursor-pointer rounded-lg bg-green-600 px-5 py-3 text-white transition hover:bg-green-700 sm:left-6 sm:top-8 lg:left-10 lg:top-10"
      >
        ← Go Back
      </button>

      <div className="w-full max-w-md rounded-xl bg-[#F1F1F1] p-6 shadow-lg transition-colors duration-200 sm:p-8 dark:bg-[#141c23]">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-[#321d24]">
            {step === "password" ? (
              <Lock
                size={32}
                className="text-red-600"
              />
            ) : (
              <AlertTriangle
                size={34}
                className="text-red-600"
              />
            )}
          </div>
        </div>

        <h1 className="mt-5 text-center text-3xl font-bold text-red-600">
          Delete Account
        </h1>

        {step === "password" ? (
          <>
            <p className="mt-2 text-center text-gray-500 dark:text-[#9aa7b1]">
              Enter your current password to continue.
              <br />
              This keeps your account safe.
            </p>

            <form
              noValidate
              onSubmit={handleVerifyPassword}
              className="mt-8 space-y-4"
            >
              <div>
                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#71808a]"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-12 text-slate-900 outline-none transition-colors focus:border-blue-500 dark:border-[#29343c] dark:bg-[#192128] dark:text-[#f5f7f8] dark:placeholder:text-[#71808a]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-[#71808a] dark:hover:text-[#f5f7f8]"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                <p className="mt-1 h-5 text-sm text-red-500">
                  {error || ""}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-14 w-full cursor-pointer rounded-xl bg-red-600 text-lg font-semibold text-white transition-all hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify Password"}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="mt-2 text-center text-gray-500 dark:text-[#9aa7b1]">
              This action is permanent and cannot be undone.
              <br />
              Type{" "}
              <span className="font-bold text-red-600">
                DELETE
              </span>{" "}
              below.
            </p>

            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-[#493139] dark:bg-[#291b20]">
              <div className="flex gap-3">
                <Trash2
                  className="shrink-0 text-red-600"
                  size={22}
                />

                <div>
                  <h3 className="font-semibold text-red-700 dark:text-[#ff6578]">
                    Your account will be permanently deleted
                  </h3>

                  <p className="mt-1 text-sm text-red-500 dark:text-[#d97786]">
                    Your profile, products, orders, and saved data
                    may be removed.
                  </p>
                </div>
              </div>
            </div>

            <form
              noValidate
              onSubmit={handleDeleteAccount}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="mb-2 block font-medium text-slate-900 dark:text-[#f5f7f8]">
                  Type DELETE
                </label>

                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => {
                    setConfirmText(e.target.value);
                    setError("");
                  }}
                  placeholder="DELETE"
                  className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-slate-900 outline-none transition-colors focus:border-red-500 dark:border-[#29343c] dark:bg-[#192128] dark:text-[#f5f7f8] dark:placeholder:text-[#71808a]"
                />

                <p className="mt-1 h-5 text-sm text-red-500">
                  {error || ""}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setStep("password");
                    setConfirmText("");
                    setError("");
                  }}
                  className="h-14 w-full cursor-pointer rounded-xl bg-gray-100 text-lg font-semibold text-gray-700 transition-all hover:bg-gray-200 dark:bg-[#192128] dark:text-[#9aa7b1] dark:hover:bg-[#29343c] dark:hover:text-[#f5f7f8]"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={
                    loading || confirmText !== "DELETE"
                  }
                  className="h-14 w-full cursor-pointer rounded-xl bg-red-600 text-lg font-semibold text-white transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Deleting..." : "Delete Forever"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteAccount;