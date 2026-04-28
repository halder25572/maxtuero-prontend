"use client";

import { useState } from "react";
import { Search, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AGENTS } from "@/lib/constants";
import Link from "next/link";
import CTASection from "@/components/home/CTASection";

const stats = [
  { value: "8", label: "Expert Agents", color: "text-primary-600", bg: "bg-blue-50" },
  { value: "180", label: "Properties Listed", color: "text-green-600", bg: "bg-green-50" },
  { value: "136", label: "Sales Completed", color: "text-yellow-600", bg: "bg-yellow-50" },
  { value: "4.9", label: "Average Rating", color: "text-purple-600", bg: "bg-purple-50" },
];

const filters = ["All", "Agents", "Developers", "Luxury Specialists"];

const allAgents = [...AGENTS, ...AGENTS];

export default function AgentsPages() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allAgents.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Our Expert Agents & Developers
            </h1>
            <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
              Connect with experienced real estate professionals who know the Dominican Republic market inside and out
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {stats.map((s) => (
              <div key={s.label} className={`${s.bg} rounded-2xl p-5 text-center`}>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-gray-500 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 w-full sm:w-72">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by agent name or company..."
                className="text-sm text-gray-700 outline-none w-full placeholder:text-gray-400"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === f
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((agent, idx) => (
              <div
                key={`${agent.id}-${idx}`}
                className="border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
              >
                {/* Avatar */}
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>

                {/* Name */}
                <h3 className="font-bold text-gray-900 text-sm">{agent.name}</h3>

                {/* Role */}
                <p className="text-primary-600 text-xs font-semibold mt-0.5 mb-1">{agent.role}</p>

                {/* Company */}
                <p className="text-gray-400 text-xs mb-3">{agent.title}</p>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      className={i < Math.floor(agent.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">{agent.rating}</span>
                </div>

                {/* Button */}
                <Link
                  href={`/agentss/${agent.id}`}
                  className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold py-2.5 rounded-full transition-colors"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CTASection/>
      <Footer />
    </>
  );
}