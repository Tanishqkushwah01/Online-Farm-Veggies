import { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
const ResetPassword = () => {
    

    const { token } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `http://localhost:3000/api/auth/reset-password/${token}`,
                {
                    password,
                }
            );

            alert(res.data.message);

            navigate("/login");
        } catch (error: any) {
            console.log(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Reset Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="font-medium">New Password</label>
                        <input
                            type="password"
                            className="w-full border rounded-lg p-3 mt-2 outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full border rounded-lg p-3 mt-2 outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;