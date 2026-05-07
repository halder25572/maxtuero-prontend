"use client";

const locations = ["All Locations", "Punta Cana", "Santo Domingo", "Cabarete", "Santiago"];
const propertyTypes = ["House", "Villa", "Apartment", "Condo", "Land", "Commercial"];

export default function PropertyFilters() {
  return (
    <aside className="hidden lg:block w-52 shrink-0">
      <div className="bg-white rounded-xl p-5 shadow-sm sticky top-24">
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-gray-900 text-sm">Filters</p>
          <button className="text-primary-600 text-xs font-medium">Reset All</button>
        </div>

        {/* Location */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-700 mb-2">Location</p>
          <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-500 outline-none">
            {locations.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-700 mb-2">Price Range</p>
          <div className="flex gap-2">
            <input placeholder="Min" className="w-full border border-gray-200 rounded-lg px-2 py-2 text-xs outline-none" />
            <input placeholder="Max" className="w-full border border-gray-200 rounded-lg px-2 py-2 text-xs outline-none" />
          </div>
        </div>

        {/* Property Type */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-700 mb-2">Property Type</p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            {propertyTypes.map((t) => (
              <label key={t} className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                <input type="checkbox" className="accent-primary-600" />
                {t}
              </label>
            ))}
          </div>
        </div>

        {/* Bedrooms */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-700 mb-2">Bedrooms</p>
          <div className="flex gap-2">
            {["1", "2", "3", "4", "5+"].map((n) => (
              <button key={n} className="flex-1 border border-gray-200 rounded-lg py-1.5 text-xs text-gray-500 hover:border-primary-600 hover:text-primary-600 transition-colors">
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-700 mb-2">Bathrooms</p>
          <div className="flex gap-2">
            {["1", "2", "3", "4+"].map((n) => (
              <button key={n} className="flex-1 border border-gray-200 rounded-lg py-1.5 text-xs text-gray-500 hover:border-primary-600 hover:text-primary-600 transition-colors">
                {n}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
          Apply Filters
        </button>
      </div>
    </aside>
  );
}