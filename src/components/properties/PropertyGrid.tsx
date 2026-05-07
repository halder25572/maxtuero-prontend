"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";

// API response type
interface PropertyResponse {
  success: boolean;
  data: {
    properties: Array<{
      id: number;
      name: string;
      address: string;
      price: number;
      thumbnail: string | null;
      type: string;
      feautured_tag?: boolean;
    }>;
  };
}

export default function PropertyGrid() {
  const [properties, setProperties] = useState<PropertyResponse['data']['properties']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://maxtuero.thenightowl.team";
        const response = await fetch(`${baseUrl}/property/get-all`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch properties: ${response.status}`);
        }
        
        const data: PropertyResponse = await response.json();
        
        if (data.success && data.data?.properties) {
          setProperties(data.data.properties);
        } else {
          throw new Error("Failed to load properties");
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(err instanceof Error ? err.message : "Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-2xl h-64 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Failed to load properties</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {properties.map((property) => (
          <PropertyCard 
            key={property.id} 
            property={{
              id: property.id.toString(),
              title: property.name || "",
              price: property.price || 0,
              location: property.address || "",
              city: "",
              images: property.thumbnail ? [property.thumbnail] : [],
              type: (property.type as any) || "",
              featured: property.feautured_tag || false,
              bedrooms: 0,
              bathrooms: 0,
              area: 0,
              status: "for-sale" as const,
              agentId: "",
              description: "",
              amenities: [],
              createdAt: new Date().toISOString(),
            }}
          />
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