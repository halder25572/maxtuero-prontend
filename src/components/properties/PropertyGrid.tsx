import { ChevronLeft, ChevronRight } from "lucide-react";
import { FEATURED_PROPERTIES } from "@/lib/constants";
import PropertyCard from "./PropertyCard";

const properties = [...FEATURED_PROPERTIES, ...FEATURED_PROPERTIES];

export default function PropertyGrid() {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {properties.map((property, idx) => (
          <PropertyCard key={`${property.id}-${idx}`} property={property} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-10">
        <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary-600 hover:text-primary-600 transition-colors">
          <ChevronLeft size={15} />
        </button>
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${
              n === 1
                ? "bg-primary-600 text-white"
                : "border border-gray-200 text-gray-500 hover:border-primary-600 hover:text-primary-600"
            }`}
          >
            {n}
          </button>
        ))}
        <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary-600 hover:text-primary-600 transition-colors">
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}