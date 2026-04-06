"use client";

import { Search, MapPin, DollarSign, Home, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-4">
          Discover Your Dream Property
          <br />
          <span className="text-primary-400">in the Dominican Republic</span>
        </h1>
        <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
          Explore premium real estate, participate in virtual fairs, and win your dream home.
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-2 flex flex-wrap gap-2 max-w-3xl mx-auto shadow-2xl">
          <div className="flex items-center gap-2 flex-1 min-w-[140px] px-3 py-2 border-r border-gray-200">
            <MapPin size={16} className="text-primary-600 shrink-0" />
            <input
              type="text"
              placeholder="Location"
              className="text-sm text-gray-700 outline-none w-full placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-[140px] px-3 py-2 border-r border-gray-200">
            <DollarSign size={16} className="text-primary-600 shrink-0" />
            <input
              type="text"
              placeholder="Price Range"
              className="text-sm text-gray-700 outline-none w-full placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-[120px] px-3 py-2 border-r border-gray-200">
            <Home size={16} className="text-primary-600 shrink-0" />
            <input
              type="text"
              placeholder="Property"
              className="text-sm text-gray-700 outline-none w-full placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-[110px] px-3 py-2">
            <Users size={16} className="text-primary-600 shrink-0" />
            <input
              type="text"
              placeholder="Bedrooms"
              className="text-sm text-gray-700 outline-none w-full placeholder:text-gray-400"
            />
          </div>
          <button className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-lg transition-colors">
            <Search size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
