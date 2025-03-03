import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onNavClick }: { onNavClick: (section: string) => void }) => {
  const navigate = useNavigate();
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isIntentsOpen, setIsIntentsOpen] = useState(false);

  const toggleExplorer = () => {
    setIsExplorerOpen(!isExplorerOpen);
    setIsIntentsOpen(false); // Close Intents if Explorer opens
  };

  const toggleIntents = () => {
    setIsIntentsOpen(!isIntentsOpen);
    setIsExplorerOpen(false); // Close Explorer if Intents opens
  };

  const handleNavClick = (section: string) => {
    onNavClick(section);
    setIsExplorerOpen(false);
    setIsIntentsOpen(false); // Close all dropdowns on navigation
    if (section === "tokenTransfer") {
      navigate("/transfer");
    } else if (section === "logout") {
      navigate("/");
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center border-b border-gray-700 w-full">
      <h2 className="text-2xl font-bold text-gray-400">Okto V2 Template</h2>

      <div className="flex space-x-6 items-center">
        {/* Explorer Dropdown */}
        <div className="relative">
          <button
            onClick={toggleExplorer}
            className="py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-between"
          >
            Explorer
            <span className="ml-2">
              {isExplorerOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>
          {isExplorerOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-700 border border-gray-600 rounded-lg shadow-lg">
              {[
                "account",
                "portfolio",
                "tokens",
                "activity",
                "chains",
                "history",
                "nft",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left py-2 px-4 hover:bg-gray-600"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Intents Dropdown */}
        <div className="relative">
          <button
            onClick={toggleIntents}
            className="py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-between"
          >
            Intents
            <span className="ml-2">
              {isIntentsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>
          {isIntentsOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-700 border border-gray-600 rounded-lg shadow-lg">
              {["tokenTransfer", "nft", "rawTransfer"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left py-2 px-4 hover:bg-gray-600"
                >
                  {item.charAt(0).toUpperCase() +
                    item.slice(1).replace(/([A-Z])/g, " $1")}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => handleNavClick("logout")}
          className="py-2 px-6 bg-red-500 hover:bg-red-700 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
