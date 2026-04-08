"use client";
import { Search, MapPin, DollarSign, Home, BedDouble } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('images/herobg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 w-full max-w-7xl mx-auto">
        <h1 className="font-display font-bold mb-4
          text-[23px] leading-[40px]
          sm:text-[36px] sm:leading-[52px]
          md:text-[46px] md:leading-[68px]
          lg:text-[58px] lg:leading-[80px]">
          Discover Your Dream Property
          <br />
          <span className="text-primary-400">in the Dominican Republic</span>
        </h1>

        <p className="text-white/90 text-center mb-8 lg:mb-[60px]
          text-[14px] leading-6
          sm:text-[16px]
          md:text-[18px]
          lg:text-[20px] lg:leading-7">
          Explore premium real estate, participate in virtual fairs, and win your dream home.
        </p>

        {/* Search Bar */}
        <div className="flex items-center justify-center w-full px-4">

          {/* Mobile: stacked cards */}
          <div className="flex flex-col gap-3 w-full sm:hidden">
            {[
              { icon: <MapPin size={15} />, label: "Location" },
              { icon: <DollarSign size={15} />, label: "Price Range" },
              { icon: <Home size={15} />, label: "Property" },
              { icon: <BedDouble size={15} />, label: "Bedrooms" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-full h-[50px] flex items-center gap-2 px-5 text-black"
              >
                <span className="text-black shrink-0">{item.icon}</span>
                <span className="text-sm font-medium text-black">{item.label}</span>
              </div>
            ))}
            <button className="bg-primary-600 hover:bg-primary-700 h-[50px] w-full text-white rounded-full flex items-center justify-center gap-2 font-semibold transition-colors">
              <Search size={20} />
              Search
            </button>
          </div>

          {/* Tablet: 2x2 grid */}
          <div className="hidden sm:grid md:hidden grid-cols-2 gap-3 w-full max-w-lg">
            {[
              { icon: <MapPin size={15} />, label: "Location" },
              { icon: <DollarSign size={15} />, label: "Price Range" },
              { icon: <Home size={15} />, label: "Property" },
              { icon: <BedDouble size={15} />, label: "Bedrooms" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-full h-[50px] flex items-center gap-2 px-5 text-black"
              >
                <span className="text-black shrink-0">{item.icon}</span>
                <span className="text-sm font-medium text-black">{item.label}</span>
              </div>
            ))}
            <button className="col-span-2 bg-primary-600 hover:bg-primary-700 h-[50px] text-white rounded-full flex items-center justify-center gap-2 font-semibold transition-colors">
              <Search size={20} />
              Search
            </button>
          </div>

          {/* Desktop: single pill bar */}
          <div className="hidden md:flex items-center gap-3">
            <div
              style={{ height: "60px", borderRadius: "100px" }}
              className="bg-white flex items-center px-3 gap-1 shadow-2xl
                w-[520px] lg:w-[660px] xl:w-[720px]"
            >
              {/* Location */}
              <div className="flex items-center gap-2 flex-1 px-3 border-r border-gray-200 h-full">
                <MapPin size={15} className="text-black shrink-0" />
                <span className="text-sm text-black whitespace-nowrap font-medium">Location</span>
              </div>
              {/* Price Range */}
              <div className="flex items-center gap-2 flex-1 px-3 border-r border-gray-200 h-full">
                <DollarSign size={15} className="text-black shrink-0" />
                <span className="text-sm text-black whitespace-nowrap font-medium">Price Range</span>
              </div>
              {/* Property */}
              <div className="flex items-center gap-2 flex-1 px-3 border-r border-gray-200 h-full">
                <Home size={15} className="text-black shrink-0" />
                <span className="text-sm text-black whitespace-nowrap">Property</span>
              </div>
              {/* Bedrooms */}
              <div className="flex items-center gap-2 flex-1 px-3 h-full">
                <BedDouble size={15} className="text-black shrink-0" />
                <span className="text-sm text-black whitespace-nowrap">Bedrooms</span>
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-primary-600 hover:bg-primary-700 w-[60px] h-[60px] text-white rounded-full flex items-center justify-center shrink-0 transition-colors">
              <Search size={28} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}