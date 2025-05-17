import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function HomePage() {
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [selectedChains, setSelectedChains] = useState([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        let twitterId = params.get('twitterId');

        if (twitterId) {
            localStorage.setItem('twitterId', twitterId);
        } else {
            twitterId = localStorage.getItem('twitterId');
        }

        if (twitterId) {
            fetchUserData(twitterId);
            fetchTransactions(twitterId);
        }
    }, [location.search]);

    const fetchUserData = async (id) => {
        try {
            const res = await fetch(`https://app.eventblink.xyz/xfi/users/${id}`);
            const data = await res.json();
            console.log(data);
            setUser(data);
            setSelectedChains(data.chain); // assuming chain is part of data
        } catch (err) {
            console.log('Failed to fetch user:', err);
            console.error('Failed to fetch user:', err);
        }
    };

    const fetchTransactions = async (id) => {
        try {
            const res = await fetch(`https://app.eventblink.xyz/xfi/users/history/${id}`);
            const data = await res.json();
            console.log(data);
            setTransactions(data);
        } catch (err) {
            console.error('Failed to fetch transactions:', err);
        }
    };

    const handleChainChange = async (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(opt => opt.value);
        setSelectedChains(selectedOptions);
        const userId = localStorage.getItem("twitterId");
        try {
            await fetch(`https://app.eventblink.xyz/xfi/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chains: selectedOptions,
                }),
            });
        } catch (err) {
            console.error("Failed to update chains", err);
        }
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

    if (!user) {
        return <div className="text-white text-center mt-20">Loading user data...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-gray-200 py-10 px-4">
            <div className="w-full max-w-xl flex flex-col gap-8 justify-center">
                {/* User Info */}
                <div className="border border-gray-700 rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-300 mb-4">User Details</h2>
                    <div className="space-y-4">
                        <InfoRow title="Username" value={`@${user.username}`} />
                        <InfoRow title="Name" value={user.name} />
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Address (EVM)</span>
                            <div className="flex flex-col items-end">
                                <button
                                    onClick={() => copyToClipboard(user.evmWalletAddress)}
                                    className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-600 hover:bg-gray-700 transition font-mono hover:cursor-pointer"
                                    title="Click to copy"
                                >
                                    {shortenAddress(user.address)}
                                </button>
                                {copied && <span className="text-xs text-green-400 mt-1">Copied!</span>}
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Address (SVM)</span>
                            <div className="flex flex-col items-end">
                                <button
                                    onClick={() => copyToClipboard(user.address)}
                                    className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-600 hover:bg-gray-700 transition font-mono hover:cursor-pointer"
                                    title="Click to copy"
                                >
                                    {shortenAddress(user.svmWalletAddress)}
                                </button>
                                {copied && <span className="text-xs text-green-400 mt-1">Copied!</span>}
                            </div>
                        </div>
                        <InfoRow title="Balance" value={user.balance} />
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Selected Chains</span>
                            <select
                                multiple
                                value={selectedChains}
                                onChange={handleChainChange}
                                className="bg-black border border-gray-600 rounded px-2 py-1 text-white hover:cursor-pointer"
                            >
                                <option value="Solana">Solana</option>
                                <option value="Ethereum">Ethereum</option>
                                <option value="Base">Base</option>
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
                                        <span className="text-base font-medium truncate mb-2" title={removeAtUsername(tx.meta.originalCommand)}>
                                            {trimDescription(removeAtUsername(tx.meta.originalCommand))}
                                        </span>
                                        <span className="text-sm text-gray-500">{formatDate(tx.createdAt)}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-base font-semibold mb-1">{tx.amount}</div>
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium inline-block mt-1 whitespace-nowrap ${tx.status === 'Success' ? 'bg-green-700 text-white' :
                                            tx.status === 'Pending' ? 'bg-yellow-600 text-black' : 'bg-green-700 text-white'
                                            }`}>
                                            success
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

function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
}

function removeAtUsername(text) {
    return text.replace(/^@\S+\s*/, '');
}