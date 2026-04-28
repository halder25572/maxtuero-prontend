"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Bed, Bath, Maximize, Heart } from "lucide-react";
import { Property } from "@/types";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export default function PropertyCard({ property }: { property: Property }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
        {property.featured && (
          <span className="absolute top-3 left-3 bg-primary-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
        <button
          onClick={() => setSaved(!saved)}
          className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow"
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