"use client";

import { Search } from "lucide-react";

const locations = ["All Locations", "Punta Cana", "Santo Domingo", "Cabarete", "Santiago"];
const types = ["All Types", "House", "Villa", "Apartment", "Condo", "Land", "Commercial"];
const prices = ["Any Price", "Under $200K", "$200K - $500K", "$500K - $1M", "Over $1M"];

export default function SearchBar() {
  return (
    <div className="bg-white rounded-xl px-4 py-3 flex flex-wrap gap-3 items-center mb-6 shadow-sm">
      <div className="flex items-center gap-2 flex-1 min-w-[160px]">
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search by name or location"
          className="text-sm text-gray-700 outline-none w-full placeholder:text-gray-400"
        />
      </div>
      <select className="text-sm text-gray-500 outline-none bg-transparent border-l border-gray-200 pl-3">
        {locations.map((l) => <option key={l}>{l}</option>)}
      </select>
      <select className="text-sm text-gray-500 outline-none bg-transparent border-l border-gray-200 pl-3">
        {types.map((t) => <option key={t}>{t}</option>)}
      </select>
      <select className="text-sm text-gray-500 outline-none bg-transparent border-l border-gray-200 pl-3">
        {prices.map((p) => <option key={p}>{p}</option>)}
      </select>
      <button className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2 rounded-lg flex items-center gap-2 transition-colors">
        <Search size={15} /> Search
      </button>
    </div>
  );
}