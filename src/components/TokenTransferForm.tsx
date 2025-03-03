import { useOkto } from "@okto_web3/react-sdk";
import { tokenTransfer } from "@okto_web3/react-sdk/abstract";
import { useState } from "react";

export default function TokenTransfer() {
  const oktoClient = useOkto();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState(""); // Token address (empty for native tokens)
  const [caip2Id, setCaip2Id] = useState(""); // Blockchain network ID
  const [status, setStatus] = useState("");

  async function handleTransfer() {
    try {
      if (!recipient || !amount || !caip2Id) {
        setStatus("❌ Please enter recipient address, amount, and caip2Id.");
        return;
      }

      const txHash = await tokenTransfer(oktoClient, {
        amount: BigInt(amount), // Convert input to BigInt
        recipient,
        token, // User-defined token contract address
        caip2Id, // User-defined blockchain network ID
      });

      setStatus(`✅ Transfer complete! Intent Id: ${txHash}`);
    } catch (error: any) {
      console.error("❌ Transfer failed:", error);
      setStatus(`❌ Transfer failed: ${error.message}`);
    }
  }

    return (
        <div>
            
        <div className="p-6 max-w-lg mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Token Transfer
          </h2>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />

            <input
              type="text"
              placeholder="Amount (smallest unit)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />

            <input
              type="text"
              placeholder="Token Address (Leave empty for native)"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />

            <input
              type="text"
              placeholder="caip2Id (e.g., eip155:8453)"
              value={caip2Id}
              onChange={(e) => setCaip2Id(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />

            <button
              onClick={handleTransfer}
              className="w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition"
            >
              Send Token
            </button>
          </div>

          {status && (
            <p
              className={`mt-4 p-3 text-center text-sm font-medium rounded-lg ${
                status.includes("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status}
            </p>
          )}
        </div>
      </div>
    );
}
