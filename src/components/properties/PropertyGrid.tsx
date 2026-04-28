"use client";

import { useState, useMemo } from "react";
import { Property } from "@/types";
import PropertyCard from "./PropertyCard";
import PropertyFilters from "./PropertyFilters";
import { SlidersHorizontal } from "lucide-react";

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    minPrice: 0,
    maxPrice: 2000000,
    bedrooms: 0,
    city: "all",
  });
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    let result = properties.filter((p) => {
      if (filters.type !== "all" && p.type !== filters.type) return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      if (filters.bedrooms > 0 && p.bedrooms < filters.bedrooms) return false;
      if (filters.city !== "all" && p.city !== filters.city) return false;
      return true;
    });

    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === "newest") result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return result;
  }, [properties, filters, sortBy]);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-800">{filtered.length}</span> properties
        </p>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 outline-none focus:border-primary-400"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 hover:border-primary-400 transition-colors"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="w-64 shrink-0">
            <PropertyFilters
              filters={filters}
              onChange={setFilters}
              cities={Array.from(new Set(properties.map((p) => p.city)))}
            />
          </div>
        )}

        {/* Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg font-semibold">No properties found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
