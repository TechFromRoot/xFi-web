import React, { useState } from 'react';

const mockUserData = {
    username: 'adaobichuks',
    name: 'Adaobi Chuks-Aginam',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    balance: '2.35 ETH',
    chain: "Base"
};

const mockTransactions = [
    {
        status: 'Success',
        description: 'Swapped ETH to DAI',
        amount: '200 DAI',
        date: '2025-05-10 14:23',
    },
    {
        status: 'Pending',
        description: 'Sent ETH to 0xabc... and then some longer than expected details that need trimming',
        amount: '0.5 ETH',
        date: '2025-05-12 09:12',
    },
    {
        status: 'Success',
        description: 'Swapped ETH to DAI',
        amount: '200 DAI',
        date: '2025-05-10 14:23',
    },
    {
        status: 'Pending',
        description: 'Sent ETH to 0xabc... and then some longer than expected details that need trimming',
        amount: '0.5 ETH',
        date: '2025-05-12 09:12',
    },
];

export default function HomePage() {
    const [user, setUser] = useState(mockUserData);
    const [transactions, setTransactions] = useState(mockTransactions);
    const [selectedChain, setSelectedChain] = useState(user.chain);
    const [copied, setCopied] = useState(false);

    const handleChainChange = (e) => {
        const updatedChain = e.target.value;
        setSelectedChain(updatedChain);
        setUser((prev) => ({ ...prev, chain: updatedChain }));
    };

    const shortenAddress = (address) =>
        address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

    const trimDescription = (desc, length = 40) =>
        desc.length > length ? `${desc.slice(0, length)}...` : desc;

    const copyToClipboard = (value) => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-gray-200 py-10">
            <div className="w-full max-w-max min-w-[60vh] flex flex-col gap-8 justify-center">
                {/* User Info */}
                <div className="border border-gray-700 rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-300 mb-4">User Details</h2>
                    <div className="space-y-4">
                        <InfoRow title="Username" value={`@${user.username}`} />
                        <InfoRow title="Name" value={user.name} />
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Address</span>
                            <div className="flex flex-col items-end">
                                <button
                                    onClick={() => copyToClipboard(user.address)}
                                    className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-600 hover:bg-gray-700 transition font-mono hover:cursor-pointer"
                                    title="Click to copy"
                                >
                                    {shortenAddress(user.address)}
                                </button>
                                {copied && <span className="text-xs text-green-400 mt-1">Copied!</span>}
                            </div>
                        </div>
                        <InfoRow title="Balance" value={user.balance} />
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Selected Chain</span>
                            <select
                                value={selectedChain || ''}
                                onChange={handleChainChange}
                                className="bg-black border border-gray-600 rounded px-2 py-1 text-white hover:cursor-pointer"
                            >
                                <option value="" disabled>Select chain</option>
                                <option className='hover:cursor-pointer' value="Base">Base</option>
                                <option className='hover:cursor-pointer' value="Polygon">Polygon</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Transactions */}
                <div className="border border-gray-700 rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-300 mb-4">Transactions</h2>
                    {transactions.length === 0 ? (
                        <p className="text-gray-500">No transactions yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {transactions.map((tx, idx) => (
                                <li
                                    key={idx}
                                    className="border border-gray-600 rounded-xl p-4 flex justify-between items-start"
                                >
                                    <div className="flex flex-col max-w-[60%]">
                                        <span className="text-base font-medium truncate mb-2" title={tx.description}>
                                            {trimDescription(tx.description)}
                                        </span>
                                        <span className="text-sm text-gray-500">{tx.date}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-base font-semibold mb-1">{tx.amount}</div>
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium inline-block mt-1 whitespace-nowrap ${tx.status === 'Success' ? 'bg-green-700 text-white' :
                                            tx.status === 'Pending' ? 'bg-yellow-600 text-black' : 'bg-red-700 text-white'
                                            }`}>
                                            {tx.status}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

function InfoRow({ title, value }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-gray-400">{title}</span>
            <span>{value}</span>
        </div>
    );
}