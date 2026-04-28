import { MapPin, Bed, Bath, Maximize, CheckCircle, Phone, Mail } from "lucide-react";
import { Property } from "@/types";
import { formatPrice } from "@/lib/utils";
import { AGENTS } from "@/lib/constants";
import PropertyImageGallery from "./PropertyImageGallery";

interface PropertyDetailProps {
  property: Property;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  const agent = AGENTS.find((a) => a.id === property.agentId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <PropertyImageGallery images={property.images} title={property.title} />

          {/* Title + Price */}
          <div>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="font-display text-2xl font-bold text-gray-900">{property.title}</h1>
                <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                  <MapPin size={14} />
                  <span>{property.location}</span>
                </div>
              </div>
              <p className="text-primary-600 font-bold text-3xl">{formatPrice(property.price)}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 flex-wrap border border-gray-100 rounded-xl p-4 bg-gray-50">
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <Bed size={18} className="text-primary-600" />
              <span><strong>{property.bedrooms}</strong> Bedrooms</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <Bath size={18} className="text-primary-600" />
              <span><strong>{property.bathrooms}</strong> Bathrooms</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <Maximize size={18} className="text-primary-600" />
              <span><strong>{property.area.toLocaleString()}</strong> ft²</span>
            </div>
            <span className="ml-auto text-xs font-semibold bg-primary-50 text-primary-700 px-3 py-1 rounded-full capitalize">
              {property.type}
            </span>
          </div>

          {/* Description */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={15} className="text-primary-600 shrink-0" />
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — Agent card + CTA */}
        <div className="space-y-5">
          {/* Price card */}
          <div className="bg-primary-600 text-white rounded-2xl p-6">
            <p className="text-sm text-white/70 mb-1">Listing Price</p>
            <p className="font-bold text-4xl mb-4">{formatPrice(property.price)}</p>
            <button className="w-full bg-white text-primary-700 font-semibold py-3 rounded-xl hover:bg-primary-50 transition-colors">
              Schedule a Viewing
            </button>
            <button className="w-full mt-2 border border-white/30 text-white font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors">
              Make an Offer
            </button>
          </div>

          {/* Agent card */}
          {agent && (
            <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Listed by
              </p>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{agent.name}</p>
                  <p className="text-xs text-gray-500">{agent.title}</p>
                </div>
              </div>
              <div className="space-y-2">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Phone size={14} /> {agent.phone}
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Mail size={14} /> {agent.email}
                </a>
              </div>
              <button className="w-full mt-4 border border-primary-200 text-primary-600 font-semibold text-sm py-2.5 rounded-xl hover:bg-primary-50 transition-colors">
                Contact Agent
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
