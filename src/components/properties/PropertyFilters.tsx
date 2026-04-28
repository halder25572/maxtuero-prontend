"use client";

interface Filters {
  type: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  city: string;
}

interface PropertyFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  cities: string[];
}

const PROPERTY_TYPES = ["all", "villa", "apartment", "penthouse", "estate", "condo"];

export default function PropertyFilters({ filters, onChange, cities }: PropertyFiltersProps) {
  const update = (key: keyof Filters, value: string | number) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-5">
      <h3 className="font-semibold text-gray-900 text-sm">Filters</h3>

      {/* Property Type */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
          Type
        </label>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => update("type", t)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors capitalize ${
                filters.type === t
                  ? "bg-primary-600 text-white border-primary-600"
                  : "border-gray-200 text-gray-600 hover:border-primary-400"
              }`}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
          City
        </label>
        <select
          value={filters.city}
          onChange={(e) => update("city", e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 outline-none focus:border-primary-400"
        >
          <option value="all">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
          Price Range
        </label>
        <div className="space-y-2">
          <div>
            <span className="text-xs text-gray-500 mb-1 block">Min: ${filters.minPrice.toLocaleString()}</span>
            <input
              type="range"
              min={0}
              max={1000000}
              step={25000}
              value={filters.minPrice}
              onChange={(e) => update("minPrice", Number(e.target.value))}
              className="w-full accent-primary-600"
            />
          </div>
          <div>
            <span className="text-xs text-gray-500 mb-1 block">Max: ${filters.maxPrice.toLocaleString()}</span>
            <input
              type="range"
              min={100000}
              max={2000000}
              step={25000}
              value={filters.maxPrice}
              onChange={(e) => update("maxPrice", Number(e.target.value))}
              className="w-full accent-primary-600"
            />
          </div>
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
          Min. Bedrooms
        </label>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => update("bedrooms", n)}
              className={`w-9 h-9 text-xs rounded-lg border transition-colors ${
                filters.bedrooms === n
                  ? "bg-primary-600 text-white border-primary-600"
                  : "border-gray-200 text-gray-600 hover:border-primary-400"
              }`}
            >
              {n === 0 ? "Any" : n}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() =>
          onChange({ type: "all", minPrice: 0, maxPrice: 2000000, bedrooms: 0, city: "all" })
        }
        className="w-full text-sm text-gray-500 hover:text-primary-600 border border-gray-200 rounded-lg py-2 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
}
