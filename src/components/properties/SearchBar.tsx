"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/properties?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm max-w-md"
    >
      <MapPin size={16} className="text-primary-600 shrink-0" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by city or location..."
        className="flex-1 text-sm text-gray-700 outline-none placeholder:text-gray-400"
      />
      <button
        type="submit"
        className="bg-primary-600 hover:bg-primary-700 text-white p-1.5 rounded-lg transition-colors"
      >
        <Search size={15} />
      </button>
    </form>
  );
}
