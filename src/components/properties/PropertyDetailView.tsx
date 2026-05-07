"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bath, Bed, Heart, MapPin, Maximize, Share2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Property } from "@/types";

type SimilarProperty = {
  id: string;
  title: string;
  price: number;
  location: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
};

type PropertyDetailProps = {
  property: Property;
  similarProperties?: SimilarProperty[];
};

function SimilarPropertyCard({ property }: { property: SimilarProperty }) {
  const imageSrc = property.images[0] || "/images/a1.jpg";

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={imageSrc}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-lg font-bold text-primary-600">
          {formatPrice(property.price)}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-900">
          {property.title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <MapPin size={12} />
          {property.location}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <Bed size={12} /> {property.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath size={12} /> {property.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Heart size={12} /> Add to
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function PropertyDetailView({
  property,
  similarProperties = [],
}: PropertyDetailProps) {
  const encodedLocation = encodeURIComponent(
    `${property.location}, Dominican Republic`,
  );

  const galleryImages = useMemo(() => {
    if (!property.images || property.images.length === 0) {
      return ["/images/a1.jpg"];
    }

    return property.images;
  }, [property.images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const pauseAutoSlideRef = useRef(false);
  const lastMouseTriggerRef = useRef(0);

  const activeImage = galleryImages[activeIndex] ?? galleryImages[0];

  const goToNextImage = () => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const goToPreviousImage = () => {
    setActiveIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [property.id]);

  useEffect(() => {
    if (galleryImages.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      if (!pauseAutoSlideRef.current) {
        goToNextImage();
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const stats = [
    {
      icon: Bed,
      label: "Bedrooms",
      value: property.bedrooms
        ? `${property.bedrooms} bedrooms`
        : "No data found for this",
    },
    {
      icon: Bath,
      label: "Bathrooms",
      value: property.bathrooms
        ? `${property.bathrooms} bathrooms`
        : "No data found for this",
    },
    {
      icon: Maximize,
      label: "Area",
      value: property.area
        ? `${property.area.toLocaleString()} m²`
        : "No data found for this",
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {property.title}
            </h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
              <MapPin size={14} />
              {property.location || "No data found for this"}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start">
            <button className="h-10 w-10 rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:border-primary-200 hover:text-primary-600">
              <Share2 size={16} className="mx-auto" />
            </button>
            <button className="h-10 w-10 rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:border-red-200 hover:text-red-500">
              <Heart size={16} className="mx-auto" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            <div className="space-y-4">
              <div
                className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
                onMouseEnter={() => {
                  pauseAutoSlideRef.current = true;
                }}
                onMouseLeave={() => {
                  pauseAutoSlideRef.current = false;
                }}
                onMouseMove={(event) => {
                  const now = Date.now();
                  if (now - lastMouseTriggerRef.current < 650) {
                    return;
                  }

                  const rect = event.currentTarget.getBoundingClientRect();
                  const x = event.clientX - rect.left;
                  const edgeZone = rect.width * 0.16;

                  if (x <= edgeZone) {
                    goToPreviousImage();
                    lastMouseTriggerRef.current = now;
                  } else if (x >= rect.width - edgeZone) {
                    goToNextImage();
                    lastMouseTriggerRef.current = now;
                  }
                }}
              >
                <div className="relative h-[420px] sm:h-[520px]">
                  <Image
                    key={activeImage}
                    src={activeImage}
                    alt={property.title}
                    fill
                    priority
                    className="object-cover transition-opacity duration-500"
                  />
                </div>
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur">
                  Featured Property
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur">
                  {formatPrice(property.price)}
                </div>
              </div>

              <div
                className="flex gap-3 overflow-x-auto pb-1 pr-1 [scrollbar-width:thin]"
                onWheel={(event) => {
                  event.currentTarget.scrollLeft += event.deltaY;
                }}
              >
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() => setActiveIndex(index)}
                    className={`relative h-20 min-w-[110px] overflow-hidden rounded-xl border transition-all ${
                      activeIndex === index
                        ? "border-primary-600 ring-2 ring-primary-100"
                        : "border-gray-200 hover:border-primary-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${property.title} preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 rounded-[16px] border border-[#E5E7EB] bg-[#F8FAFC] px-[94px] py-[33px] sm:gap-4">
              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="rounded-2xl px-4 py-5 text-center">
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                      <Icon size={18} />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-gray-900">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>

            <section>
              <h2 className="text-xl font-bold text-gray-900">
                About This Property
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
                <p>{property.description || "No data found for this"}</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">Location</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                <iframe
                  title="Property location map"
                  src={`https://www.google.com/maps?q=${encodedLocation}&output=embed`}
                  className="h-[300px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>
          </div>

          <aside />
        </div>
      </div>

      <section className="mt-[100px] w-full bg-[#F9FAFB] px-4 pb-20 pt-6 shadow-sm sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            Similar Properties
          </h2>

          {similarProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {similarProperties.map((item) => (
                <SimilarPropertyCard key={item.id} property={item} />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              <p>No data found for this</p>
            </div>
          )}
        </section>
      </section>
    </div>
  );
}
