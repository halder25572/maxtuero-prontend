"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";
import {
  Bed,
  Bath,
  Check,
  Heart,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Search,
  Square,
  Ticket,
  User,
  X,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

type AccountLink = {
  key: string;
  label: string;
  icon: ReactNode;
  href?: string;
  badge?: number;
};

const savedProperties = [
  {
    id: 1,
    title: "Oceanview Luxury Villa",
    location: "Malibu, CA",
    beds: 6,
    baths: 5,
    size: "7,200 sqft",
    price: "$9.9M",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500",
  },
  {
    id: 2,
    title: "Miami Waterfront Condo",
    location: "Miami Beach, FL",
    beds: 3,
    baths: 3,
    size: "2,900 sqft",
    price: "$1.85M",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500",
  },
  {
    id: 3,
    title: "Aspen Mountain Chalet",
    location: "Aspen, CO",
    beds: 5,
    baths: 4,
    size: "4,000 sqft",
    price: "$6.75M",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=500",
  },
  {
    id: 4,
    title: "Scottsdale Desert Retreat",
    location: "Scottsdale, AZ",
    beds: 5,
    baths: 5,
    size: "5,900 sqft",
    price: "$7.9M",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14b4f?w=500",
  },
];

export default function SavedPage() {
  const router = useRouter();
  const pathname = usePathname();
  const normalizedPath = (pathname || "").replace(/\/$/, "");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const accountLinks: AccountLink[] = [
    { key: "profile", label: "Profile", icon: <User size={14} />, href: "/dashboard" },
    {
      key: "messages",
      label: "Messages",
      icon: <MessageCircle size={14} />,
      href: "/dashboard/message",
    },
    { key: "saved", label: "Saved", icon: <Heart size={14} />, href: "/dashboard/saved", badge: 4 },
    {
      key: "tickets",
      label: "Raffle Tickets",
      icon: <Ticket size={14} />,
      href: "/dashboard/raffle-tickets",
      badge: 2,
    },
  ];

  const initials = "JH";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 text-gray-500" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </button>
            <Link href="/" className="font-bold text-xl text-[#1B2B5E] tracking-wide">
              EXPOVIVIENDA
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-5">
            {[
              { label: "Home", href: "/" },
              { label: "Properties", href: "/properties" },
              { label: "Virtual Expo", href: "/virtual-expo" },
              { label: "Raffles", href: "/raffles" },
              { label: "Agents", href: "/agents" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {searchOpen && (
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none w-36 sm:w-52 mr-2 focus:border-primary-600 transition-all"
                />
              )}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
              >
                {searchOpen ? <X size={18} /> : <Search size={18} />}
              </button>
            </div>

            <Link
              href="/properties"
              className="hidden sm:block bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              List Property
            </Link>

            <div className="w-9 h-9 rounded-full bg-[#1B2B5E] flex items-center justify-center text-white text-sm font-bold shrink-0">
              {initials}
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div
        className="bg-[#1B2B5E] pt-20 pb-20 text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bgg.jpg')" }}
      >
        <h1 className="text-2xl sm:text-5xl font-bold text-white pt-10">My Dashboard</h1>
        <p className="text-white/60 text-[20px] mt-2">Manage your properties, tickets, and account settings</p>
      </div>

      {/* Body */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-6 relative">
          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          <aside
            className={`
              fixed top-0 left-0 h-full w-64 bg-white z-40 shadow-xl pt-20 px-5 transition-transform duration-300
              lg:static lg:w-auto lg:h-fit lg:shadow-sm lg:pt-4 lg:px-4 lg:translate-x-0 lg:z-auto
              lg:rounded-2xl lg:border lg:border-gray-100
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <div className="lg:hidden flex justify-end mb-4">
              <button onClick={() => setSidebarOpen(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <p className="text-[20px] font-bold text-[#4B5563] uppercase tracking-widest mb-3">
                Account
              </p>
            <ul className="space-y-1.5 mb-6">
              {accountLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href || "#"}
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      normalizedPath === item.href
                        ? "bg-blue-50 text-primary-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon}
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="flex-shrink-0 bg-primary-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-col">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              Quick Links
            </p>
            <ul className="space-y-1.5 mb-4">
              {[
                { label: "Browse Raffles", href: "/raffles" },
                { label: "All Listings", href: "/properties" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Check size={14} className="text-gray-400" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
              <LogOut size={14} />
              Logout
            </button>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Properties</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {savedProperties.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-50">
                      <Heart size={16} className="text-red-500" />
                    </button>
                    <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-lg">
                      {item.location}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-gray-900 text-base">{item.title}</h3>

                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Bed size={14} /> {item.beds} beds
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={14} /> {item.baths} baths
                      </div>
                      <div className="flex items-center gap-1">
                        <Square size={14} /> {item.size}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-bold text-gray-900">{item.price}</span>
                      <button className="bg-primary-600 hover:bg-primary-700 text-white text-xs px-4 py-2 rounded-lg transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
