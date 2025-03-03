import { useState } from "react";
import { useOkto } from "@okto_web3/react-sdk";
import { getAccount } from "@okto_web3/react-sdk";

interface WalletData {
  address: string;
  caipId: string;
  networkId: string;
  networkName: string;
  networkSymbol: string;
}

const Account: React.FC = () => {
  const oktoClient = useOkto();
  const [wallets, setWallets] = useState<WalletData[]>([]);

  async function fetchAccounts() {
    try {
      const accounts = await getAccount(oktoClient);
      setWallets(accounts as WalletData[]);
    } catch (error) {
      console.error("Error fetching user accounts:", error);
    }
  }

  return (
    <div>
      <button onClick={fetchAccounts}>Fetch User Accounts</button>

      {wallets.length > 0 && (
        <table
          style={{
            marginTop: "10px",
            borderCollapse: "collapse",
            width: "100%",
            border: "2px solid black",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid black" }}>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Address
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                CAIP ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Network ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Network Name
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Network Symbol
              </th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet, index) => (
              <tr key={index} style={{ borderBottom: "1px solid black" }}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {wallet.address}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {wallet.caipId}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {wallet.networkId}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {wallet.networkName}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {wallet.networkSymbol}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Account;