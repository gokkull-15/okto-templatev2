import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Navbar = ({ onNavClick }: { onNavClick: (section: string) => void }) => {
    const [isExplorerOpen, setIsExplorerOpen] = useState(false);
    const [isIntentsOpen, setIsIntentsOpen] = useState(false);

    const toggleExplorer = () => setIsExplorerOpen(!isExplorerOpen);
    const toggleIntents = () => setIsIntentsOpen(!isIntentsOpen);

    return (
        <div className="flex flex-col bg-gray-50 text-white w-64 p-6 fixed left-0 top-0 h-full border-r border-gray-500 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-500">Menu</h2>

            {/* Explorer Dropdown */}
            <button
                onClick={toggleExplorer}
                className="mb-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded-lg transition flex items-center justify-between w-full"
            >
                <span>Explorer</span>
                <span className="ml-2">
                    {isExplorerOpen ? (
                        <FaChevronUp className="h-5 w-5 text-white" />
                    ) : (
                        <FaChevronDown className="h-5 w-5 text-white" />
                    )}
                </span>
            </button>
            {isExplorerOpen && (
                <div className="border-l ml-3 mb-4 p-2 rounded-lg">
                    <button onClick={() => onNavClick('account')} className="w-full py-2 px-4 mb-2 bg-blue-500 hover:bg-blue-700 rounded-lg transition">
                        Get Account
                    </button>
                    <button onClick={() => onNavClick('portfolio')} className="w-full py-2 px-4 mb-2 bg-blue-500 hover:bg-blue-700 rounded-lg transition">
                        View Portfolio
                    </button>
                    <button onClick={() => onNavClick('tokens')} className="w-full py-2 px-4 mb-2 bg-blue-500 hover:bg-blue-700 rounded-lg transition">
                        Get Tokens
                    </button>
                    <button onClick={() => onNavClick('activity')} className="w-full py-2 px-4 mb-2 bg-blue-500 hover:bg-blue-700 rounded-lg transition">
                        Portfolio Activity
                    </button>
                    <button onClick={() => onNavClick('chains')} className="w-full py-2 px-4 mb-2 bg-blue-500 hover:bg-blue-700 rounded-lg transition">
                        Get Chains
                    </button>
                    <button onClick={() => onNavClick('history')} className="w-full py-2 px-4 mb-2 bg-blue-500 hover:bg-blue-700 rounded-lg transition">
                        Get History
                    </button>
                    <button onClick={() => onNavClick('nft')} className="w-full py-2 px-4 mb-2 bg-blue-500 hover:bg-blue-700 rounded-lg transition">
                        Get NFT Collection
                    </button>
                </div>
            )}

            {/* Intents Dropdown */}
            <button
                onClick={toggleIntents}
                className="mb-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded-lg transition flex items-center justify-between w-full"
            >
                Intents
                <span className="ml-2">
                    {isIntentsOpen ? (
                        <FaChevronUp className="h-5 w-5 text-white" />
                    ) : (
                        <FaChevronDown className="h-5 w-5 text-white" />
                    )}
                </span>
            </button>
            {isIntentsOpen && (
                <div className=" mb-4 p-2 rounded-lg border-l ml-2">
                    <button onClick={() => onNavClick('tokenTransfer')} className="w-full py-2 px-4 mb-2 bg-blue-500 hover:bg-blue-700 rounded-lg transition">
                        Token Transfer
                    </button>
                    <button onClick={() => onNavClick('nft')} className="w-full py-2 px-4 mb-2 bg-blue-500 hover:bg-blue-700 rounded-lg transition">
                        NFT
                    </button>
                    <button onClick={() => onNavClick('rawTransfer')} className="w-full py-2 px-4 mb-2 bg-blue-500 hover:bg-blue-700 rounded-lg transition">
                        Raw Transfer
                    </button>
                </div>
            )}

            {/* Logout Button */}
            <button
                onClick={() => onNavClick('logout')}
                className="py-2 px-4 bg-red-500 hover:bg-red-700 rounded-lg transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;
