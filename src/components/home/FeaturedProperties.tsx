import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Maximize, ArrowRight } from "lucide-react";
import { FEATURED_PROPERTIES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { div } from "framer-motion/client";

export default function FeaturedProperties() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-[35px] lg:text-[48px] font-bold text-black">Featured Properties</h2>
          <p className="text-gray-500 mt-1">Handpicked premium properties for discerning buyers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_PROPERTIES.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {property.featured && (
                  <span className="absolute top-3 right-3 bg-white/20 text-black backdrop-blur-[2.5px] shadow-lg text-[14px] font-semibold px-2.5 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-primary-600 font-bold text-[24px] mb-1">
                  {formatPrice(property.price)}
                </p>
                <h3 className="font-semibold text-black text-[19px] mb-1 line-clamp-2">
                  {property.title}
                </h3>
                <div className="flex items-center gap-1 text-gray-400 text-[16px] mb-3">
                  <MapPin size={16} />
                  <span>{property.location}</span>
                </div>

                <div className="flex items-center justify-between gap-4 text-gray-500 text-xs border-t border-gray-100 pt-3 mb-4">
                  <span className="flex items-center gap-1">
                    <Bed size={13} /> {property.bedrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={13} /> {property.bathrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize size={13} /> {property.area.toLocaleString()} ft²
                  </span>
                </div>

                <Link
                  href={`/properties/${property.id}`}
                  className="flex items-center justify-end gap-1 text-primary-600 text-[16px] font-medium hover:gap-2 transition-all"
                >
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
