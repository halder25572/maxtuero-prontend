"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Bed, Bath, Maximize, Heart } from "lucide-react";
import { Property } from "@/types";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";
import { toggleWishlist, getAuthToken } from "@/lib/api";

export default function PropertyCard({ property, onWishlistChange }: { property: Property; onWishlistChange?: () => void }) {
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        toast.error("Please login to save properties", {
          style: {
            backgroundColor: "black",
            color: "white",
          },
        });
        return;
      }

      const response = await toggleWishlist(property.id, token);
      
      // Update the saved state based on API response
      setSaved(response.data?.in_wishlist || false);
      
      // Show success message
      toast(response.message, {
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update wishlist", {
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {property.images && property.images.length > 0 && property.images[0] ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
        {property.featured && (
          <span className="absolute top-3 left-3 bg-primary-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
        <button
          onClick={handleToggleWishlist}
          disabled={isLoading}
          className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Heart
            size={14}
            className={saved ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-primary-600 font-bold text-base mb-1">
          {formatPrice(property.price)}
        </p>
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
          <MapPin size={11} />
          <span>{property.location}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-gray-400 text-xs border-t border-gray-100 pt-3 mb-4">
          <span className="flex items-center gap-1">
            <Bed size={12} /> {property.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath size={12} /> {property.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Maximize size={12} /> {property.area} m²
          </span>
        </div>

        <Link
          href={`/properties/${property.id}`}
          className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}