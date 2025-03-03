import { useOkto } from "@okto_web3/react-sdk";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import TokenTransfer from "./components/TokenTransferForm";
import Account from "./components/Account";
import Portfolio from "./components/Portfolio";
import Tokens from "./components/Tokens";
import Activity from "./components/Activity";
import Chains from "./components/Chains";
import History from "./components/History";
import NFT from "./components/NFT";
import RawTransfer from "./components/RawTransfer";

const App = () => {
  const oktoClient = useOkto();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleLogin(credentialResponse: any) {
    try {
      await oktoClient.loginUsingOAuth({
        idToken: credentialResponse.credential,
        provider: "google",
      });
      console.log(oktoClient.userSWA);
      navigate("/portfolio");
    } catch (error) {
      console.error("Authentication error:", error);
      setError("Authentication failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {location.pathname !== "/" && <Navbar onNavClick={navigate} />}

      <div className="flex flex-col justify-center items-center space-y-6 p-6 w-full">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Okto-TemplateV2
                </h1>
                <div className="w-full max-w-sm p-8 bg-gray-800 shadow-lg rounded-lg flex flex-col justify-center items-center space-y-6">
                  <h1 className="text-3xl font-bold text-white text-center">
                    Google Authentication
                  </h1>
                  {error && (
                    <div className="bg-red-500 text-white py-2 px-4 rounded">
                      {error}
                    </div>
                  )}
                  <div className="text-gray-400 text-sm text-center">
                    Please sign in to continue
                  </div>
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() =>
                      setError("Google login failed. Please try again.")
                    }
                    theme="outline"
                    shape="rectangular"
                    width="250px"
                    text="signin_with"
                    className="transition duration-300 ease-in-out transform hover:scale-105"
                  />
                </div>
              </div>
            }
          />
          <Route path="/transfer" element={<TokenTransfer />} />
          <Route path="/account" element={<Account />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/chains" element={<Chains />} />
          <Route path="/history" element={<History />} />
          <Route path="/nft" element={<NFT />} />
          <Route path="/rawTransfer" element={<RawTransfer />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
