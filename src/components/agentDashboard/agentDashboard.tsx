"use client";

import { useState } from "react";
import Link from "next/link";
import {
    LayoutDashboard, Radio, List, MessageCircle,
    PlusCircle, Settings, LogOut, Home, ArrowUpRight,
    Menu, X, Eye, DollarSign,
    Search, MapPin, Pencil, Lock, User
} from "lucide-react";

const sidebarLinks = [
    { label: "Overview", icon: <LayoutDashboard size={15} />, key: "overview" },
    { label: "Go Live", icon: <Radio size={15} />, key: "golive" },
    { label: "My Listings", icon: <List size={15} />, key: "listings" },
    { label: "Messages", icon: <MessageCircle size={15} />, key: "messages" },
    { label: "Add Property", icon: <PlusCircle size={15} />, key: "addproperty" },
    { label: "Profile & Settings", icon: <Settings size={15} />, key: "settings" },
];

const stats = [
    {
        label: "Active Listings",
        value: "6",
        icon: <Home size={16} className="text-primary-600" />,
        bg: "bg-blue-50",
    },
    {
        label: "Total Views",
        value: "12,847",
        icon: <Eye size={16} className="text-green-500" />,
        bg: "bg-green-50",
    },
    {
        label: "Total Sales",
        value: "$4.2M",
        icon: <DollarSign size={16} className="text-yellow-500" />,
        bg: "bg-yellow-50",
    },
];

const topListings = [
    {
        id: "1",
        title: "Modern Waterfront Villa",
        location: "Miami Beach, FL",
        price: "$2450K",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200",
    },
    {
        id: "2",
        title: "Skyline View Apartments",
        location: "New York, NY",
        price: "$875K",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200",
    },
    {
        id: "3",
        title: "Downtown Luxury Penthouse",
        location: "Los Angeles, CA",
        price: "$3200K",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200",
    },
    {
        id: "4",
        title: "Mediterranean Garden Estate",
        location: "Santa Barbara, CA",
        price: "$1950K",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200",
    },
];

function GoLivePanel() {
    const [destination, setDestination] = useState<"virtual" | "raffle">("virtual");
    const [selectedProperty, setSelectedProperty] = useState(topListings[0].id);
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
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${cameraOn ? "bg-primary-600 text-white" : "bg-primary-600 text-white"
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </button>

                            <button
                                onClick={() => setMicOn(!micOn)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${micOn ? "bg-primary-600 text-white" : "bg-primary-600 text-white"
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                                </svg>
                            </button>
                        </div>

                        <button
                            onClick={() => setIsLive(!isLive)}
                            className={`flex items-center gap-2 font-semibold text-sm px-6 py-2.5 rounded-full transition-colors ${isLive
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
                                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-colors text-xs font-semibold ${destination === "virtual"
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
                                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-colors text-xs font-semibold ${destination === "raffle"
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
                                    className={`w-full flex items-center gap-3 p-2 rounded-xl transition-colors ${selectedProperty === listing.id
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

function AddPropertySection() {
    const [step, setStep] = useState(1);

    const steps = [
        { id: 1, label: "Basic Info" },
        { id: 2, label: "Location" },
        { id: 3, label: "Media" },
        { id: 4, label: "Pricing" },
        { id: 5, label: "Preview" },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900">Add New Property</h1>
                <p className="text-gray-400 text-sm mt-0.5">Fill in the details to list your property</p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
                {steps.map((s, i) => (
                    <div key={s.id} className="flex items-center gap-1 shrink-0">
                        <button
                            onClick={() => setStep(s.id)}
                            className="flex items-center gap-2"
                        >
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step > s.id
                                ? "bg-green-500 text-white"
                                : step === s.id
                                    ? "bg-primary-600 text-white"
                                    : "bg-gray-100 text-gray-400"
                                }`}>
                                {step > s.id ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                ) : s.id}
                            </div>
                            <span className={`text-sm font-medium ${step === s.id ? "text-gray-900 font-semibold" : "text-gray-400"
                                }`}>
                                {s.label}
                            </span>
                        </button>
                        {i < steps.length - 1 && (
                            <div className={`w-6 h-px mx-1 ${step > s.id ? "bg-green-300" : "bg-gray-200"}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

                {/* Step 1 - Basic Info */}
                {step === 1 && (
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                                <Home size={14} className="text-primary-600" />
                            </div>
                            <h2 className="font-bold text-gray-900 text-base">Basic Information</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Property Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Modern Waterfront Villa"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Listing Type</label>
                                <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors text-gray-700 appearance-auto">
                                    <option>For Sale</option>
                                    <option>For Rent</option>
                                    <option>Raffle</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Bedrooms</label>
                                    <input
                                        type="number"
                                        defaultValue={3}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Bathrooms</label>
                                    <input
                                        type="number"
                                        defaultValue={2}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Sq Ft</label>
                                    <input
                                        type="number"
                                        defaultValue={2400}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Description</label>
                                <textarea
                                    rows={5}
                                    placeholder="Describe your property..."
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300 resize-y"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2 - Location */}
                {step === 2 && (
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                                <MapPin size={14} className="text-primary-600" />
                            </div>
                            <h2 className="font-bold text-gray-900 text-base">Location</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Address</label>
                                <input
                                    type="text"
                                    defaultValue="123 Main Street"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">City</label>
                                    <input
                                        type="text"
                                        defaultValue="Miami"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">State</label>
                                    <input
                                        type="text"
                                        defaultValue="FL"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">ZIP Code</label>
                                    <input
                                        type="text"
                                        defaultValue="33139"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Country</label>
                                    <input
                                        type="text"
                                        defaultValue="United States"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-xl overflow-hidden h-36 relative">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    loading="lazy"
                                    src="https://maps.google.com/maps?q=Miami+FL&output=embed"
                                    className="border-0 opacity-60"
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <p className="text-gray-400 text-sm bg-white/80 px-3 py-1 rounded-full">
                                        Or Directly Select With Google Map
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3 - Media */}
                {step === 3 && (
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-primary-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>
                            <h2 className="font-bold text-gray-900 text-base">Media Upload</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Property Images */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Property Images</label>
                                <label className="block border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-primary-400 transition-colors">
                                    <input type="file" accept="image/*" multiple className="hidden" />
                                    <div className="flex flex-col items-center justify-center py-12 bg-white">
                                        <div className="mb-3 text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-medium text-gray-600">Click to upload images</p>
                                        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB each</p>
                                    </div>
                                </label>
                            </div>

                            {/* Video Walkthrough */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Video Walkthrough</label>
                                <label className="block border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-primary-400 transition-colors">
                                    <input type="file" accept="video/*" className="hidden" />
                                    <div className="flex flex-col items-center justify-center py-12 bg-white">
                                        <div className="mb-3 text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-medium text-gray-600">Click to upload video</p>
                                        <p className="text-xs text-gray-400 mt-1">MP4, MOV up to 500MB</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4 - Pricing */}
                {step === 4 && (
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                                <DollarSign size={14} className="text-primary-600" />
                            </div>
                            <h2 className="font-bold text-gray-900 text-base">Pricing</h2>
                        </div>

                        <div className="space-y-4">
                            {/* Property Price */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                                    Property Price ($)
                                </label>
                                <input
                                    type="text"
                                    placeholder="2,500,000"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300"
                                />
                            </div>

                            {/* Commission Notice */}
                            <div className="bg-blue-50 rounded-xl px-4 py-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-primary-600 shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                                <p className="text-sm text-gray-600">
                                    Platform commission: <span className="font-bold text-gray-900">5%</span> of sale price
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5 - Preview */}
                {step === 5 && (
                    <div>
                        <div className="flex items-center gap-2 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-green-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <h2 className="font-bold text-gray-900 text-base">Preview & Publish</h2>
                        </div>

                        <div className="border border-gray-100 rounded-2xl py-16 flex flex-col items-center justify-center bg-gray-50/50">
                            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-green-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 text-base mb-1">Ready to Publish</h3>
                            <p className="text-gray-400 text-sm">
                                Review your listing details before publishing. You can edit anytime.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Next / Back / Submit Buttons */}
            <div className="flex justify-between mt-5">
                <button
                    onClick={() => setStep(step - 1)}
                    className={`flex items-center gap-2 border border-gray-200 text-gray-500 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-50 transition-colors ${
                        step === 1 ? "invisible" : ""
                    }`}
                >
                    ← Previous
                </button>

                {step < 5 ? (
                    <button
                        onClick={() => setStep(step + 1)}
                        className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
                    >
                        Next <ArrowUpRight size={15} />
                    </button>
                ) : (
                    <button
                        className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
                    >
                        Publish Listing <ArrowUpRight size={15} />
                    </button>
                )}
            </div>
        </div>
    );
}

function SettingsSection() {
    const [settingsTab, setSettingsTab] = useState<"personal" | "security">("personal");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            {/* Profile Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#1B2B5E] flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-lg">JH</span>
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900 text-lg">John</h2>
                        <p className="text-gray-400 text-xs mt-0.5">Member since March 2025</p>
                    </div>
                </div>
                <button className="flex items-center gap-1.5 text-primary-600 text-xs font-semibold hover:underline">
                    <Pencil size={13} />
                    Edit Profile
                </button>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2 bg-gray-100 rounded-full p-1 mb-6">
                <button
                    onClick={() => setSettingsTab("personal")}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                        settingsTab === "personal"
                            ? "bg-primary-600 text-white shadow"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    <User size={14} />
                    Personal
                </button>
                <button
                    onClick={() => setSettingsTab("security")}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                        settingsTab === "security"
                            ? "bg-primary-600 text-white shadow"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    <Lock size={14} />
                    Security
                </button>
            </div>

            {/* Personal Tab */}
            {settingsTab === "personal" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 text-base mb-1">Personal Information</h3>
                    <p className="text-gray-400 text-xs mb-6">Update your personal details and contact info</p>

                    <div className="space-y-5">
                        {/* Full Name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Agent"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300 bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email</label>
                                <input
                                    type="email"
                                    placeholder="john@expovivienda.com"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300 bg-gray-50"
                                />
                            </div>
                        </div>

                        {/* Phone + Location */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Phone</label>
                                <input
                                    type="tel"
                                    defaultValue="+1 (555) 123-4567"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Location</label>
                                <input
                                    type="text"
                                    placeholder="City, State"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300 bg-gray-50"
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Bio</label>
                            <textarea
                                rows={4}
                                placeholder="Tell clients about yourself, your experience, and areas of expertise..."
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300 bg-gray-50 resize-none"
                            />
                        </div>

                        {/* Save */}
                        <div className="flex justify-end">
                            <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                                </svg>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Security Tab */}
            {settingsTab === "security" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 text-base mb-1">Security Settings</h3>
                    <p className="text-gray-400 text-xs mb-6">Manage your password and account security</p>

                    <div className="space-y-5">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Current Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter current password"
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300 bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">New Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300 bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Confirm New Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300 bg-gray-50"
                            />
                        </div>

                        {/* Show Password */}
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                                className="accent-primary-600"
                            />
                            <span className="text-sm text-gray-500">Show passwords</span>
                        </label>

                        <div className="flex justify-end">
                            <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">
                                <Lock size={14} />
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function AgentDashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="max-w-7xl mx-auto min-h-screen flex">

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 h-full bg-white z-40 border-r border-gray-100 shadow-sm
        transition-transform duration-300 flex flex-col
        w-52 pt-6 px-4
        lg:static lg:translate-x-0 lg:z-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
                {/* Logo */}
                <div className="flex items-center justify-between mb-6 px-1">
                    <Link href="/" className="font-bold text-base text-[#1B2B5E] tracking-wide">
                        EXPOVIVIENDA
                    </Link>
                    <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
                        <X size={18} />
                    </button>
                </div>

                {/* Agent Info */}
                <div className="flex items-center gap-3 mb-6 px-1">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                        alt="Agent"
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div>
                        <p className="font-bold text-gray-900 text-sm">John</p>
                        <p className="text-gray-400 text-xs">Agent</p>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 space-y-1">
                    {sidebarLinks.map((link) => (
                        <button
                            key={link.key}
                            onClick={() => { setActiveTab(link.key); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${activeTab === link.key
                                ? "bg-blue-50 text-primary-600 font-semibold"
                                : "text-gray-500 hover:bg-gray-50"
                                }`}
                        >
                            {link.icon}
                            {link.label}
                        </button>
                    ))}
                </nav>

                {/* Logout */}
                <button className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors mb-4 mt-2">
                    <LogOut size={15} />
                    Logout
                </button>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Mobile Top Bar */}
                <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-500">
                        <Menu size={20} />
                    </button>
                    <p className="font-bold text-[#1B2B5E] text-sm">EXPOVIVIENDA</p>
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                        alt="Agent"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 lg:p-8">

                    {activeTab === "overview" && (
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 mb-1">Dashboard</h1>
                            <p className="text-gray-400 text-sm mb-7">Welcome back! Here's an overview of your performance.</p>

                            {/* Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                {stats.map((s) => (
                                    <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-gray-400 text-xs font-medium">{s.label}</p>
                                            <div className={`w-8 h-8 ${s.bg} rounded-full flex items-center justify-center`}>
                                                {s.icon}
                                            </div>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Top Listings */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="font-bold text-gray-900 text-sm">Top Listings</h2>
                                    <button className="flex items-center gap-1 text-primary-600 text-xs font-semibold hover:underline">
                                        View all <ArrowUpRight size={13} />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {topListings.map((listing) => (
                                        <div
                                            key={listing.id}
                                            className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0"
                                        >
                                            <img
                                                src={listing.image}
                                                alt={listing.title}
                                                className="w-12 h-12 rounded-xl object-cover shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-900 text-sm truncate">{listing.title}</p>
                                                <p className="text-gray-400 text-xs mt-0.5">{listing.location}</p>
                                            </div>
                                            <p className="font-bold text-gray-900 text-sm shrink-0">{listing.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "golive" && <GoLivePanel />}

                    {activeTab === "listings" && (
                        <div>
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">My Listings</h1>
                                    <p className="text-gray-400 text-sm mt-0.5">6 properties listed</p>
                                </div>
                                <button
                                    onClick={() => setActiveTab("addproperty")}
                                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
                                >
                                    <PlusCircle size={15} />
                                    Add Property
                                </button>
                            </div>

                            {/* Table */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
                                <table className="w-full min-w-[600px]">
                                    {/* Head */}
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 py-3">Property</th>
                                            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Price</th>
                                            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Status</th>
                                            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Actions</th>
                                        </tr>
                                    </thead>

                                    {/* Body */}
                                    <tbody className="divide-y divide-gray-50">
                                        {[
                                            { id: "1", title: "Modern Waterfront Villa", location: "Miami Beach, FL", price: "$2,450,000", status: "For Sale", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200" },
                                            { id: "2", title: "Skyline View Apartments", location: "New York, NY", price: "$875,000", status: "For Sale", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200" },
                                            { id: "3", title: "Downtown Luxury Penthouse", location: "Los Angeles, CA", price: "$3,200,000", status: "Raffle", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200" },
                                            { id: "4", title: "Mediterranean Garden Estate", location: "Santa Barbara, CA", price: "$1,950,000", status: "For Sale", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200" },
                                            { id: "5", title: "Urban Modern Townhouse", location: "Austin, TX", price: "$725,000", status: "For Sale", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200" },
                                            { id: "6", title: "Lakeside Retreat", location: "Lake Tahoe, NV", price: "$1,650,000", status: "Raffle", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200" },
                                        ].map((listing) => (
                                            <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                                                {/* Property */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={listing.image}
                                                            alt={listing.title}
                                                            className="w-11 h-11 rounded-xl object-cover shrink-0"
                                                        />
                                                        <div>
                                                            <p className="font-semibold text-gray-900 text-sm">{listing.title}</p>
                                                            <p className="text-gray-400 text-xs mt-0.5">{listing.location}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Price */}
                                                <td className="px-4 py-4">
                                                    <p className="font-semibold text-gray-900 text-sm">{listing.price}</p>
                                                </td>

                                                {/* Status */}
                                                <td className="px-4 py-4">
                                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${listing.status === "For Sale"
                                                        ? "bg-green-50 text-green-600"
                                                        : "bg-purple-50 text-purple-600"
                                                        }`}>
                                                        {listing.status}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {/* View */}
                                                        <button className="text-gray-400 hover:text-primary-600 transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.641 0-8.583-3.007-9.963-7.178z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </button>
                                                        {/* Edit */}
                                                        <button className="text-gray-400 hover:text-primary-600 transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                                                            </svg>
                                                        </button>
                                                        {/* Delete */}
                                                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "messages" && (
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 mb-6">Messages</h1>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="flex h-[580px]">

                                    {/* Conversation List */}
                                    <div className="w-72 border-r border-gray-100 flex flex-col shrink-0">
                                        {/* Search */}
                                        <div className="p-4 border-b border-gray-100">
                                            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
                                                <Search size={14} className="text-gray-400 shrink-0" />
                                                <input
                                                    type="text"
                                                    placeholder="Search conversations..."
                                                    className="text-sm text-gray-600 outline-none bg-transparent w-full placeholder:text-gray-400"
                                                />
                                            </div>
                                        </div>

                                        {/* List */}
                                        <div className="flex-1 overflow-y-auto">
                                            {[
                                                {
                                                    id: 1,
                                                    name: "James Wilson",
                                                    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
                                                    lastMessage: "I'm interested in the downtown p...",
                                                    online: true,
                                                    active: true,
                                                },
                                                {
                                                    id: 2,
                                                    name: "Emily Chen",
                                                    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
                                                    lastMessage: "Thank you for the property report!",
                                                    online: false,
                                                    active: false,
                                                },
                                                {
                                                    id: 3,
                                                    name: "Robert Martinez",
                                                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
                                                    lastMessage: "Let me discuss with my wife and...",
                                                    online: false,
                                                    active: false,
                                                },
                                                {
                                                    id: 4,
                                                    name: "Lisa Thompson",
                                                    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
                                                    lastMessage: "Perfect, see you at the open hous...",
                                                    online: false,
                                                    active: false,
                                                },
                                                {
                                                    id: 5,
                                                    name: "David Park",
                                                    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
                                                    lastMessage: "Can you send me the comparable list...",
                                                    online: false,
                                                    active: false,
                                                },
                                            ].map((convo) => (
                                                <button
                                                    key={convo.id}
                                                    className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 ${convo.active ? "bg-blue-50" : ""
                                                        }`}
                                                >
                                                    <div className="relative shrink-0">
                                                        <img
                                                            src={convo.avatar}
                                                            alt={convo.name}
                                                            className="w-9 h-9 rounded-full object-cover"
                                                        />
                                                        {convo.online && (
                                                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-sm truncate ${convo.active ? "font-bold text-primary-600" : "font-medium text-gray-800"}`}>
                                                            {convo.name}
                                                        </p>
                                                        <p className="text-xs text-gray-400 truncate mt-0.5">{convo.lastMessage}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Chat Window */}
                                    <div className="flex flex-col flex-1 min-w-0">

                                        {/* Chat Header */}
                                        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                                            <div className="relative">
                                                <img
                                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100"
                                                    alt="James Wilson"
                                                    className="w-9 h-9 rounded-full object-cover"
                                                />
                                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm">James Wilson</p>
                                                <p className="text-xs text-green-500">Online</p>
                                            </div>
                                        </div>

                                        {/* Messages */}
                                        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-gray-50/30">
                                            {[
                                                { id: 1, from: "them", text: "Hi, I saw your listing for the downtown penthouse.", time: "10:30 AM" },
                                                { id: 2, from: "me", text: "Hello James! Yes, it's one of our premium listings.", time: "10:32 AM", seen: true },
                                                { id: 3, from: "them", text: "What's the square footage and HOA fees?", time: "10:35 AM" },
                                                { id: 4, from: "me", text: "It's 2,800 sq ft with HOA fees of $850/month. That covers amenities, security, and maintenance.", time: "10:38 AM", seen: true },
                                                { id: 5, from: "them", text: "Sounds great. Can we schedule a viewing this weekend?", time: "10:42 AM" },
                                                { id: 6, from: "me", text: "Absolutely! I have Saturday at 2 PM or Sunday at 11 AM available.", time: "10:42 AM", seen: true },
                                                { id: 7, from: "them", text: "I'm interested in the downtown penthouse. Is it still available?", time: "10:45 AM" },
                                            ].map((msg) => (
                                                <div key={msg.id} className={`flex flex-col ${msg.from === "me" ? "items-end" : "items-start"}`}>
                                                    <div className={`max-w-[65%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.from === "me"
                                                        ? "bg-primary-600 text-white rounded-br-sm"
                                                        : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                                                        }`}>
                                                        {msg.text}
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-1 px-1">
                                                        <p className="text-[10px] text-gray-400">{msg.time}</p>
                                                        {msg.from === "me" && msg.seen && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="text-primary-400">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Input */}
                                        <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-3 bg-white">
                                            {/* Emoji */}
                                            <button className="text-gray-400 hover:text-gray-600 shrink-0 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                                                </svg>
                                            </button>
                                            {/* Attach */}
                                            <button className="text-gray-400 hover:text-gray-600 shrink-0 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                </svg>
                                            </button>
                                            {/* Input */}
                                            <input
                                                type="text"
                                                placeholder="Type a message..."
                                                className="flex-1 bg-gray-50 rounded-full px-4 py-2.5 text-sm outline-none placeholder:text-gray-400 border border-gray-100"
                                            />
                                            {/* Send */}
                                            <button className="w-9 h-9 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center shrink-0 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "addproperty" && <AddPropertySection />}

                    {activeTab === "settings" && <SettingsSection />}

                </div>
            </div>
        </div>
    );
}