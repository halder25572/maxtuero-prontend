"use client";

import { useState } from "react";
import { Radio, Mic, Video, VideoOff, MicOff } from "lucide-react";

// Types
interface TopListing {
    id: string;
    title: string;
    location: string;
    price: string;
    image: string;
}

interface GoLiveProps {
    topListings: TopListing[];
}

export default function GoLive({ topListings }: GoLiveProps) {
    const [destination, setDestination] = useState<"virtual" | "raffle">("virtual");
    const [selectedProperty, setSelectedProperty] = useState(topListings[0]?.id || "");
    const [cameraOn, setCameraOn] = useState(false);
    const [micOn, setMicOn] = useState(false);
    const [isLive, setIsLive] = useState(false);

    return (
        <div>
            <h1 className="text-xl font-bold text-gray-900 mb-0.5">Go Live</h1>
            <p className="text-gray-400 text-sm mb-6">Stream to Virtual Expo or Raffle audiences</p>

            <div className="flex flex-col lg:flex-row gap-5">

                {/* Camera Preview */}
                <div className="flex-1">
                    {/* Black Preview Box */}
                    <div className="relative bg-black rounded-2xl overflow-hidden w-full aspect-video flex items-center justify-center">
                        {isLive && (
                            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                                🔴 LIVE
                            </span>
                        )}
                        <div className="text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 text-gray-600 mx-auto mb-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                            </svg>
                            <p className="text-gray-400 text-sm font-medium">Camera preview will appear here</p>
                            <p className="text-gray-600 text-xs mt-1">Select a target and property, then go live</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 px-1">
                        <div className="flex gap-3">
                            <button
                                onClick={() => setCameraOn(!cameraOn)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                    cameraOn ? "bg-primary-600 text-white" : "bg-primary-600 text-white"
                                }`}
                            >
                                {cameraOn ? (
                                    <Video size={18} />
                                ) : (
                                    <VideoOff size={18} />
                                )}
                            </button>

                            <button
                                onClick={() => setMicOn(!micOn)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                    micOn ? "bg-primary-600 text-white" : "bg-primary-600 text-white"
                                }`}
                            >
                                {micOn ? (
                                    <Mic size={18} />
                                ) : (
                                    <MicOff size={18} />
                                )}
                            </button>
                        </div>

                        <button
                            onClick={() => setIsLive(!isLive)}
                            className={`flex items-center gap-2 font-semibold text-sm px-6 py-2.5 rounded-full transition-colors ${
                                isLive
                                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    : "bg-red-500 hover:bg-red-600 text-white"
                            }`}
                        >
                            {isLive ? (
                                <>⬛ Stop Live</>
                            ) : (
                                <>
                                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                    Go Live
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-full lg:w-52 space-y-4 shrink-0">

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                            Stream Destination
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setDestination("virtual")}
                                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-colors text-xs font-semibold ${
                                    destination === "virtual"
                                        ? "border-primary-600 bg-blue-50 text-primary-600"
                                        : "border-gray-100 text-gray-400 hover:border-gray-200"
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                                Virtual Expo
                            </button>
                            <button
                                onClick={() => setDestination("raffle")}
                                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-colors text-xs font-semibold ${
                                    destination === "raffle"
                                        ? "border-primary-600 bg-blue-50 text-primary-600"
                                        : "border-gray-100 text-gray-400 hover:border-gray-200"
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a3 3 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                                </svg>
                                Raffle
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                            Select Property
                        </p>
                        <div className="space-y-2">
                            {topListings.map((listing) => (
                                <button
                                    key={listing.id}
                                    onClick={() => setSelectedProperty(listing.id)}
                                    className={`w-full flex items-center gap-3 p-2 rounded-xl transition-colors ${
                                        selectedProperty === listing.id
                                            ? "bg-blue-50 border border-primary-200"
                                            : "hover:bg-gray-50 border border-transparent"
                                        }`}
                                >
                                    <img
                                        src={listing.image}
                                        alt={listing.title}
                                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                                    />
                                    <div className="text-left min-w-0">
                                        <p className="text-xs font-semibold text-gray-900 truncate">{listing.title}</p>
                                        <p className="text-[10px] text-gray-400 truncate">{listing.location}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
