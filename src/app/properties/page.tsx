import SearchBar from "@/components/properties/SearchBar";
import PropertyFilters from "@/components/properties/PropertyFilters";
import PropertyGrid from "@/components/properties/PropertyGrid";
import PublicPageFrame from "@/components/layout/PublicPageFrame";

export default function PropertiesPage() {
  return (
    <PublicPageFrame className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Property Listings</h1>
          <p className="text-gray-400 text-sm mt-1">Browse 9 premium properties across the Dominican Republic</p>
        </div>

        <SearchBar />

        <div className="flex gap-6">
          <PropertyFilters />
          <PropertyGrid />
        </div>
      </div>
    </PublicPageFrame>
  );
}