import React from 'react';

export default function LandingPage() {
    const handleSignIn = () => {
        window.location.href = "https://app.eventblink.xyz/xfi/auth/twitter";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white py-10 px-4">
            <div className="w-full max-w-lg border-2 border-gray-700 rounded-2xl p-10 text-center flex flex-col justify-between min-h-[80vh] max-h-[90vh]">
                <div>
                    <img src="/xFi-logo.png" alt="xFi" className="w-48 mx-auto mb-6 mt-3" />
                    <p className="text-gray-400 mb-10 text-lg">
                        Perform DeFi actions directly on Twitter.
                    </p>
                </div>
                <div>
                    <button
                        onClick={handleSignIn}
                        className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition mb-6 hover:cursor-pointer"
                    >
                        Sign in with X
                    </button>
                </div>
            </div>
        </div>
    );
}