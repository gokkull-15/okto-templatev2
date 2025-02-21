  import React from "react";
  import ReactDOM from "react-dom/client";
  import App from "./App";
  import { GoogleOAuthProvider } from "@react-oauth/google";
  import { OktoProvider } from "@okto_web3/react-sdk";
  import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter

  const config = {
      environment: "sandbox",
      clientPrivateKey: import.meta.env.VITE_CLIENT_PRIV_KEY,
      clientSWA: import.meta.env.VITE_CLIENT_SWA,
  };

  ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
              <OktoProvider config={config}>
                  {/* Only wrap the App component with BrowserRouter here */}
                  <BrowserRouter>
                      <App />
                  </BrowserRouter>
              </OktoProvider>
          </GoogleOAuthProvider>
      </React.StrictMode>
  );
