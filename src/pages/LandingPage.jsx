import React from 'react';

export default function LandingPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white py-10">
            <div className="w-full max-w-max min-w-[60vh] border-2 border-gray-700 rounded-2xl p-10 text-center flex flex-col justify-between min-h-[80vh] max-h-[90vh]">
                <div>
                    {/* Above the App name */}
                    {/* <div className="flex justify-center mb-4">
                        <img src="/logo.svg" alt="xFi Logo" className="w-12 h-12" />
                    </div> */}

                    {/* Replace App name so remove h1 tag */}
                    {/* <img src="/logo-text.svg" alt="xFi" className="w-48 mx-auto mb-6" /> */}
                    <h1 className="text-5xl font-bold mb-25 mt-3">xFi</h1>
                    <p className="text-gray-400 mb-10 text-lg">
                        Perform DeFi actions directly on twitter.
                    </p>
                </div>
                <div>
                    <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition mb-6 hover:cursor-pointer">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};