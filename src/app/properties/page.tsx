import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyGrid from "@/components/properties/PropertyGrid";
import { ALL_PROPERTIES } from "@/lib/constants";

export default function PropertiesPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-gray-900">Browse Properties</h1>
            <p className="text-gray-500 mt-1">
              Explore {ALL_PROPERTIES.length} premium properties across the Dominican Republic
            </p>
          </div>
          <PropertyGrid properties={ALL_PROPERTIES} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
