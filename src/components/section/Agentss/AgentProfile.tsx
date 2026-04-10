import { MessageCircle, MapPin, Bed, Bath, Maximize } from "lucide-react";
import { Agent } from "@/types";
import { FEATURED_PROPERTIES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function AgentProfile({ agent }: { agent: Agent }) {
  const listings = FEATURED_PROPERTIES;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Agent Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">
        <img
          src={agent.avatar}
          alt={agent.name}
          className="w-20 h-20 rounded-full object-cover shrink-0"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-900">{agent.name}</h1>
          <p className="text-gray-400 text-sm mt-0.5 mb-3">{agent.title}</p>
          <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors">
            <MessageCircle size={13} />
            Message
          </button>
        </div>
      </div>

      {/* About */}
      <div className="mb-10">
        <h2 className="font-bold text-gray-900 text-base mb-3">About {agent.name}</h2>
        <p className="text-gray-500 text-sm leading-relaxed max-w-3xl">
          {agent.bio} With deep knowledge of the Dominican Republic&apos;s growing real estate sector,
          they provide clients with unique insights to help maximize their returns in this thriving market.
        </p>
      </div>

      {/* Listings */}
      <div>
        <h2 className="font-bold text-gray-900 text-base mb-5">Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {property.featured && (
                  <span className="absolute top-3 left-3 bg-primary-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    Featured
                  </span>
                )}
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
                  className="flex items-center gap-1 text-primary-600 text-xs font-semibold hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}