import useWebNavigate from "../components/hooks/useWebNavigate";

const Terms = () => {
    const { gotoRegister } = useWebNavigate();
    return (

        <div className="min-h-screen bg-[#EEF3EC] py-10 px-6">
            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={gotoRegister}
                    className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
                >
                    ← Go Back
                </button>

                {/* <h1 className="text-4xl font-bold">
                    Terms & Conditions
                </h1> */}

                <div></div>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
                <h1 className="text-4xl font-bold mb-6">
                    Terms & Conditions
                </h1>

                <p className="mb-4">
                    Welcome to our Agri Marketplace. By creating an account or using
                    this platform, you agree to the following terms and conditions.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3">
                    1. User Account
                </h2>

                <p>
                    Users are responsible for maintaining the confidentiality of their
                    account credentials and all activities that occur under their
                    account.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3">
                    2. Accurate Information
                </h2>

                <p>
                    You agree to provide accurate and complete information while
                    registering and using the platform.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3">
                    3. Buying & Selling
                </h2>

                <p>
                    Farmers must provide genuine product information. Customers should
                    verify product details before purchasing.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3">
                    4. Privacy
                </h2>

                <p>
                    We respect your privacy. Your personal information will never be
                    shared without your consent except where required by law.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3">
                    5. Prohibited Activities
                </h2>

                <ul className="list-disc ml-6 space-y-2">
                    <li>Posting false information.</li>
                    <li>Uploading harmful or illegal content.</li>
                    <li>Attempting to hack or misuse the platform.</li>
                    <li>Impersonating another user.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-3">
                    6. Termination
                </h2>

                <p>
                    We reserve the right to suspend or terminate any account that
                    violates these terms.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-3">
                    7. Contact
                </h2>

                <p>
                    If you have any questions regarding these Terms & Conditions,
                    please contact our support team.
                </p>
            </div>
        </div>
    );
};

export default Terms;