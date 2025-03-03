import { useState } from "react";
import { useOkto } from "@okto_web3/react-sdk";
import { getPortfolioActivity } from "@okto_web3/react-sdk";

interface UserPortfolioActivity {
  symbol: string;
  image: string;
  name: string;
  shortName: string;
  id: string;
  groupId: string;
  description: string;
  quantity: string;
  orderType: string;
  transferType: string;
  status: string;
  timestamp: number;
  txHash: string;
  caip2Id: string;
  networkName: string;
  networkExplorerUrl: string;
  networkSymbol: string;
  caipId: string;
}

export default function PortfolioActivity() {
  const oktoClient = useOkto();
  const [activities, setActivities] = useState<UserPortfolioActivity[]>([]);
  const [fetched, setFetched] = useState(false);

  async function fetchActivity() {
    try {
      if (!oktoClient) {
        console.error("OktoClient not initialized.");
        return;
      }
      const activity: UserPortfolioActivity[] = await getPortfolioActivity(
        oktoClient
      );
      setActivities(activity || []);
      setFetched(true);
      console.log("Portfolio activity:", activity);
    } catch (error) {
      console.error("Error fetching portfolio activity:", error);
      setFetched(true);
    }
  }

  return (
    <div className="max-w-full mx-auto p-4">
      <button
        onClick={fetchActivity}
        className="px-3 py-1 mb-4 border border-black rounded cursor-pointer"
      >
        Fetch
      </button>

      {/* Display the table only after fetching data */}
      {fetched && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-black bg-transparent">
            <thead>
              <tr className="border-b border-black bg-transparent">
                <th className="border border-black p-2">Image</th>
                <th className="border border-black p-2">Name</th>
                <th className="border border-black p-2">Quantity</th>
                <th className="border border-black p-2">Status</th>
                <th className="border border-black p-2">Order Type</th>
                <th className="border border-black p-2">Network</th>
                <th className="border border-black p-2">Timestamp</th>
                <th className="border border-black p-2">Transaction</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <tr key={index} className="border-b border-black">
                    <td className="border border-black p-2 text-center">
                      <img
                        src={activity.image}
                        alt={activity.name}
                        className="w-12 h-12 rounded"
                      />
                    </td>
                    <td className="border border-black p-2">
                      {activity.name} ({activity.symbol})
                    </td>
                    <td className="border border-black p-2">
                      {activity.quantity}
                    </td>
                    <td className="border border-black p-2">
                      {activity.status}
                    </td>
                    <td className="border border-black p-2">
                      {activity.orderType}
                    </td>
                    <td className="border border-black p-2">
                      {activity.networkName} ({activity.networkSymbol})
                    </td>
                    <td className="border border-black p-2">
                      {new Date(activity.timestamp).toLocaleString()}
                    </td>
                    <td className="border border-black p-2 text-center">
                      <a
                        href={`${activity.networkExplorerUrl}/${activity.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Transaction
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center p-4 border border-black"
                  >
                    No activities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
