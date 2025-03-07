import React, { useState } from "react";
import {
  useOkto,
  getAccount,
  getPortfolio,
  getTokens,
  getPortfolioActivity,
  getChains,
  getOrdersHistory,
  getNftCollections,
} from "@okto_web3/react-sdk";

import Navbar from "./components/Navbar"; // Import the Navbar component

const Home = () => {
  const [accountData, setAccountData] = useState<any[]>([]); // Store account data
  const [portfolio, setPortfolio] = useState<any | null>(null); // Store portfolio data
  const [tokens, setTokens] = useState<any[]>([]); // Store tokens data
  const [portfolioActivity, setPortfolioActivity] = useState<any | null>(null); // Store portfolio activity data
  const [chains, setChains] = useState<any[]>([]); // Store supported chains data
  const [ordersHistory, setOrdersHistory] = useState<any[]>([]); // Store order history data
  const [nftCollections, setNftCollections] = useState<any[]>([]); // Store NFT collection data

  const [activeSection, setActiveSection] = useState<
    | "portfolio"
    | "tokens"
    | "activity"
    | "account"
    | "chains"
    | "history"
    | "nft"
    | null
  >(null); // Active section state to control what is displayed

  const oktoClient = useOkto(); // Okto client for API calls

  // Fetch data functions
  const getAccountData = async () => {
    try {
      const accountResponse = await getAccount(oktoClient);
      setAccountData(accountResponse);
      setActiveSection("account");
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  };

  const getPortfolioData = async () => {
    try {
      const portfolioResponse = await getPortfolio(oktoClient);
      setPortfolio(portfolioResponse);
      setActiveSection("portfolio");
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  };

  const getTokensData = async () => {
    try {
      const tokensResponse = await getTokens(oktoClient);
      setTokens(tokensResponse);
      setActiveSection("tokens");
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  };

  const getPortfolioActivityData = async () => {
    try {
      const portfolioActivityResponse = await getPortfolioActivity(oktoClient);
      console.log("Portfolio activity:", portfolioActivityResponse);
      setPortfolioActivity(portfolioActivityResponse);
      setActiveSection("activity");
    } catch (error) {
      console.error("Error fetching portfolio activity:", error);
    }
  };

  const getChainsData = async () => {
    try {
      const chainsResponse = await getChains(oktoClient);
      setChains(chainsResponse);
      setActiveSection("chains");
    } catch (error) {
      console.error("Error fetching chains:", error);
    }
  };

  const getHistoryData = async () => {
    try {
      const ordersResponse = await getOrdersHistory(oktoClient);
      setOrdersHistory(ordersResponse);
      setActiveSection("history");
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  const getNftCollectionsData = async () => {
    try {
      const nftCollectionsResponse = await getNftCollections(oktoClient);
      setNftCollections(nftCollectionsResponse);
      setActiveSection("nft");
    } catch (error) {
      console.error("Error fetching NFT collections:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Navbar) */}
      <Navbar
        onNavClick={(section) => {
          switch (section) {
            case "account":
              getAccountData();
              break;
            case "portfolio":
              getPortfolioData();
              break;
            case "tokens":
              getTokensData();
              break;
            case "activity":
              getPortfolioActivityData();
              break;
            case "chains":
              getChainsData();
              break;
            case "history":
              getHistoryData();
              break;
            case "nft":
              getNftCollectionsData();
              break;
            case "tokenTransfer":
              tokenTransfer();
              break;
            default:
              break;
          }
        }}
      />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 min-h-screen">
        <h1 className="text-2xl font-bold text-center text-gray-500 mb-6">
          Home Page
        </h1>

        {/* Account Data */}
        {activeSection === "account" && accountData.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-500">
              Account Data:
            </h3>
            <table className="min-w-full table-auto border-collapse border border-gray-300 text-gray-500">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Network Name</th>
                  <th className="border border-gray-300 p-2">Network Symbol</th>
                  <th className="border border-gray-300 p-2">Address</th>
                  <th className="border border-gray-300 p-2">Network ID</th>
                  <th className="border border-gray-300 p-2">CAIP ID</th>
                </tr>
              </thead>
              <tbody>
                {accountData.map((account, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">
                      {account.networkName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {account.networkSymbol}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {account.address}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {account.networkId}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {account.caipId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Portfolio Data */}
        {activeSection === "portfolio" && portfolio && (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-500">
              Portfolio Data:
            </h3>
            <pre className="bg-gray-100 p-4 rounded-lg">
              {JSON.stringify(portfolio, null, 2)}
            </pre>
          </div>
        )}

        {/* Tokens Data */}
        {activeSection === "tokens" && tokens.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-500">Tokens:</h3>
            <table className="min-w-full table-auto border-collapse border border-gray-300 text-gray-500">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Address</th>
                  <th className="border border-gray-300 p-2">CAIP ID</th>
                  <th className="border border-gray-300 p-2">Symbol</th>
                  <th className="border border-gray-300 p-2">Network Name</th>
                  <th className="border border-gray-300 p-2">Whitelisted</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">
                      {token.address}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {token.caipId}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {token.symbol}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {token.networkName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {token.whitelisted ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Portfolio Activity Data */}
        {activeSection === "activity" && (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-500">
              Portfolio Activity:
            </h3>
            <table className="w-full table-auto border-collapse border border-gray-300 text-gray-500">
              <thead>
                <tr>
<<<<<<< HEAD
                  <th className="border border-gray-300 p-3 text-sm">
                    Description
                  </th>
                  <th className="border border-gray-300 p-3 text-sm">
                    Quantity
                  </th>
                  <th className="border border-gray-300 p-3 text-sm">
                    Transaction Hash
                  </th>
                  <th className="border border-gray-300 p-3 text-sm">
                    Timestamp
                  </th>
                  <th className="border border-gray-300 p-3 text-sm">
                    Network Symbol
                  </th>
                  <th className="border border-gray-300 p-3 text-sm">
=======
                  <th className="border border-gray-300 p-1 text-sm">
                    Description
                  </th>
                  <th className="border border-gray-300 p-1 text-sm">
                    Quantity
                  </th>
                  <th className="border border-gray-300 p-1 text-sm">
                    Transaction Hash
                  </th>
                  <th className="border border-gray-300 p-1 text-sm">
                    Timestamp
                  </th>
                  <th className="border border-gray-300 p-1 text-sm">
                    Network Symbol
                  </th>
                  <th className="border border-gray-300 p-1 text-sm">
>>>>>>> b96b7a92d9a0b5c92dfe0a970427948169be4b44
                    CAIP ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {portfolioActivity && portfolioActivity.length > 0 ? (
                  portfolioActivity.map((activity, index) => (
                    <tr key={index}>
<<<<<<< HEAD
                      <td className="border border-gray-300 p-3">
                        {activity.description ?? ""}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {activity.quantity ?? ""}
                      </td>
                      <td className="border border-gray-300 p-3">
=======
                      <td className="border border-gray-300 p-1 text-sm">
                        {activity.description ?? ""}
                      </td>
                      <td className="border border-gray-300 p-1 text-sm">
                        {activity.quantity ?? ""}
                      </td>
                      <td className="border border-gray-300 p-1 text-sm">
>>>>>>> b96b7a92d9a0b5c92dfe0a970427948169be4b44
                        {activity.txHash ? (
                          <a
                            href={`${activity.networkExplorerUrl}tx/${activity.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600"
                          >
                            {activity.txHash}
                          </a>
                        ) : (
                          ""
                        )}
                      </td>
<<<<<<< HEAD
                      <td className="border border-gray-300 p-3">
=======
                      <td className="border border-gray-300 p-1 text-sm">
>>>>>>> b96b7a92d9a0b5c92dfe0a970427948169be4b44
                        {activity.timestamp
                          ? new Date(activity.timestamp * 1000)
                              .toISOString()
                              .slice(0, 19)
                              .replace("T", " ")
                          : ""}
                      </td>
<<<<<<< HEAD
                      <td className="border border-gray-300 p-3">
                        {activity.networkSymbol ?? ""}
                      </td>
                      <td className="border border-gray-300 p-3">
=======
                      <td className="border border-gray-300 p-1 text-sm">
                        {activity.networkSymbol ?? ""}
                      </td>
                      <td className="border border-gray-300 p-1 text-sm">
>>>>>>> b96b7a92d9a0b5c92dfe0a970427948169be4b44
                        {activity.caipId ?? ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="border border-gray-300 p-3 text-center"
                    >
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Chains Data */}
        {activeSection === "chains" && chains.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-500">Chains:</h3>
            <table className="min-w-full table-auto border-collapse border border-gray-300 text-gray-500">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">CAIP ID</th>
                  <th className="border border-gray-300 p-2">Network Name</th>
                  <th className="border border-gray-300 p-2">Logo</th>
                  <th className="border border-gray-300 p-2">Type</th>
                  <th className="border border-gray-300 p-2">Whitelisted</th>
                </tr>
              </thead>
              <tbody>
                {chains.map((chain, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">
                      {chain.caipId}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {chain.networkName}
                    </td>
                    <td className="border border-gray-300 p-2">{chain.logo}</td>
                    <td className="border border-gray-300 p-2">{chain.type}</td>
                    <td className="border border-gray-300 p-2">
                      {chain.whitelisted ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Orders History Data */}
        {activeSection === "history" && (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-500">
              Orders History:
            </h3>
            <table className="w-full table-auto border-collapse border border-gray-300 text-gray-500">
              <thead>
                <tr>
<<<<<<< HEAD
                  <th className="border border-gray-300 p-3 text-sm">
                    Intent ID
                  </th>
                  <th className="border border-gray-300 p-3 text-sm">
                    Intent Type
                  </th>
                  <th className="border border-gray-300 p-3 text-sm">
                    Network Name
                  </th>

                  <th className="border border-gray-300 p-3 text-sm">
                    Timestamp
                  </th>
                  <th className="border border-gray-300 p-3 text-sm">
=======
                  <th className="border border-gray-300 p-1 text-sm">
                    Intent ID
                  </th>
                  <th className="border border-gray-300 p-1 text-sm">
                    Intent Type
                  </th>
                  <th className="border border-gray-300 p-1 text-sm">
                    Network Name
                  </th>
                  <th className="border border-gray-300 p-1 text-sm w-1/4">
                    Transaction Hash
                  </th>
                  <th className="border border-gray-300 p-1 text-sm">Status</th>
                  <th className="border border-gray-300 p-1 text-sm">
                    Timestamp
                  </th>
                  <th className="border border-gray-300 p-1 text-sm">
>>>>>>> b96b7a92d9a0b5c92dfe0a970427948169be4b44
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {ordersHistory && ordersHistory.length > 0 ? (
                  ordersHistory.map((order, index) => (
                    <tr key={index}>
<<<<<<< HEAD
                      <td className="border border-gray-300 p-3">
                        {order.intentId}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {order.intentType}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {order.networkName}
                      </td>

                      <td className="border border-gray-300 p-3">
=======
                      <td className="border border-gray-300 p-1 text-sm">
                        {order.intentId}
                      </td>
                      <td className="border border-gray-300 p-1 text-sm">
                        {order.intentType}
                      </td>
                      <td className="border border-gray-300 p-1 text-sm">
                        {order.networkName}
                      </td>
                      <td className="border border-gray-300 p-1 w-1/4 text-sm">
                        {order.transactionHash.length > 0
                          ? order.transactionHash.join(", ")
                          : "N/A"}
                      </td>
                      <td className="border border-gray-300 p-1 text-sm">
                        {order.reason}
                      </td>
                      <td className="border border-gray-300 p-1 text-sm">
>>>>>>> b96b7a92d9a0b5c92dfe0a970427948169be4b44
                        {order.blockTimestamp
                          ? new Date(order.blockTimestamp * 1000)
                              .toISOString()
                              .slice(0, 19)
                              .replace("T", " ")
                          : ""}
                      </td>
<<<<<<< HEAD
                      <td className="border border-gray-300 p-3">
=======
                      <td className="border border-gray-300 p-1 text-sm">
>>>>>>> b96b7a92d9a0b5c92dfe0a970427948169be4b44
                        {order.details.caip2id}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="border border-gray-300 p-3 text-center"
                    >
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* NFT Collections Data */}
        {activeSection === "nft" && (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-500">
              NFT Collections:
            </h3>
            <table className="min-w-full table-auto border-collapse border border-gray-300 text-gray-500">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Intent ID</th>
                  <th className="border border-gray-300 p-2">Network Name</th>
                  <th className="border border-gray-300 p-2">NFT ID</th>
                  <th className="border border-gray-300 p-2">
                    Recipient Wallet Address
                  </th>
                  <th className="border border-gray-300 p-2">Status</th>
                  <th className="border border-gray-300 p-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {nftCollections.length > 0 ? (
                  nftCollections.map((nft, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        {nft.intentId}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {nft.networkName}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {nft.details.nftId}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {nft.details.recipientWalletAddress}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {nft.reason}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {new Date(nft.blockTimestamp * 1000)
                          .toISOString()
                          .slice(0, 19)
                          .replace("T", " ")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="border border-gray-300 p-2 text-center text-gray-400"
                    >
                      No NFT collections available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;