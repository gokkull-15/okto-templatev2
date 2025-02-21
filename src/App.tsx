import { useOkto } from "@okto_web3/react-sdk";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Routes, Route } from "react-router-dom";
import Home from "./Home";  // Import Home component
import { useState } from "react"; // To handle success/error state

const App = () => {
    const oktoClient = useOkto();
    const navigate = useNavigate(); // For navigation after successful login
    const [error, setError] = useState<string | null>(null); // State to hold error message

    // Handle Google login
    async function handleGoogleLogin(credentialResponse: any) {
        try {
            await oktoClient.loginUsingOAuth({
                idToken: credentialResponse.credential,
                provider: "google",
            });
            console.log(oktoClient.userSWA);

            // Redirect to /home after successful login
            navigate('/home');
        } catch (error) {
            console.error("Authentication error:", error);
            setError("Authentication failed. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-white flex justify-center items-center">
            <Routes>
                {/* Login Route - this is displayed first */}
                <Route
                    path="/"
                    element={
                        <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg flex flex-col justify-center items-center space-y-6">
                            {/* Title */}
                            <h1 className="text-3xl font-bold text-gray-900 text-center">
                                Google Authentication
                            </h1>

                            {/* Error message if any */}
                            {error && (
                                <div className="bg-red-500 text-white py-2 px-4 rounded">
                                    {error}
                                </div>
                            )}

                            {/* Login Method Text */}
                            <div className="text-gray-700 text-sm text-center">
                                Please sign in to continue
                            </div>

                            {/* Google login button */}
                            <GoogleLogin
                                onSuccess={handleGoogleLogin} // Handle successful login
                                onError={() => setError("Google login failed. Please try again.")}
                                theme="outline"
                                shape="rectangular"
                                width="250px"
                                text="signin_with"
                                className="transition duration-300 ease-in-out transform hover:scale-105"
                            />
                        </div>
                    }
                />

                {/* Home Route - after successful login */}
                <Route path="/home" element={<Home />} />
            </Routes>
        </div>
    );
};

export default App;
