import Link from "next/link";
import { MapPin, Bed, Bath, Maximize, Heart } from "lucide-react";
import { Property } from "@/types";
import { formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {property.featured && (
            <span className="bg-primary-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Featured
            </span>
          )}
          <span className="bg-white text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
            {property.type}
          </span>
        </div>
        <button className="absolute top-3 right-3 bg-white/80 hover:bg-white p-1.5 rounded-full transition-colors">
          <Heart size={14} className="text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-primary-600 font-bold text-xl mb-1">
          {formatPrice(property.price)}
        </p>
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
          <MapPin size={12} />
          <span>{property.location}</span>
        </div>

        <div className="flex items-center gap-4 text-gray-500 text-xs border-t border-gray-100 pt-3 mb-4">
          <span className="flex items-center gap-1">
            <Bed size={13} /> {property.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1">
            <Bath size={13} /> {property.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1">
            <Maximize size={13} /> {property.area.toLocaleString()} ft²
          </span>
        </div>

        <Link
          href={`/properties/${property.id}`}
          className="block w-full text-center bg-primary-50 hover:bg-primary-100 text-primary-700 font-semibold text-sm py-2 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
