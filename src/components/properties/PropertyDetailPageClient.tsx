"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import PropertyDetailView from "@/components/properties/PropertyDetailView";
import { getPropertyById, PropertyDetailApiItem } from "@/lib/api";
import { readAuthSession } from "@/lib/auth";
import { Property } from "@/types";

type PropertyDetailPageClientProps = {
  propertyId: string;
};

function mapPropertyDetailToProperty(item: PropertyDetailApiItem): Property {
  const images = Array.isArray(item.images) && item.images.length > 0
    ? item.images.filter((image): image is string => typeof image === "string")
    : [
        typeof item.image === "string" ? item.image : undefined,
        typeof item.thumbnail === "string" ? item.thumbnail : undefined,
        "/images/pro.jpg",
      ].filter((image): image is string => Boolean(image));

  const priceValue = typeof item.price === "number"
    ? item.price
    : Number(String(item.price ?? "0").replace(/[^0-9.]/g, "")) || 0;

  const typeValue = typeof item.listing_type === "string"
    ? item.listing_type.toLowerCase()
    : typeof item.type === "string"
      ? item.type.toLowerCase()
      : "apartment";

  const allowedTypes: Property["type"][] = ["villa", "apartment", "penthouse", "estate", "condo"];

  return {
    id: String(item.id ?? item.property_id ?? ""),
    title: typeof item.title === "string" ? item.title : "Property Details",
    price: priceValue,
    location: typeof item.address === "string" ? item.address : typeof item.city === "string" ? item.city : "",
    city: typeof item.city === "string" ? item.city : "",
    images,
    bedrooms: typeof item.bedrooms === "number" ? item.bedrooms : 0,
    bathrooms: typeof item.bathrooms === "number" ? item.bathrooms : 0,
    area: typeof item.square_feet === "number" ? item.square_feet : typeof item.area === "number" ? item.area : 0,
    type: allowedTypes.includes(typeValue as Property["type"]) ? (typeValue as Property["type"]) : "apartment",
    status: typeof item.status === "string" && ["for-sale", "for-rent", "sold"].includes(item.status)
      ? (item.status as Property["status"])
      : "for-sale",
    featured: Boolean(item.featured),
    agentId: String(item.agent_id ?? ""),
    description: typeof item.description === "string" ? item.description : "",
    amenities: Array.isArray(item.amenities)
      ? item.amenities.filter((amenity): amenity is string => typeof amenity === "string")
      : [],
    createdAt: typeof item.created_at === "string" ? item.created_at : "",
  };
}

export default function PropertyDetailPageClient({ propertyId }: PropertyDetailPageClientProps) {
  const authSession = useMemo(() => readAuthSession(), []);

  const propertyQuery = useQuery({
    queryKey: ["property-detail", propertyId, authSession?.token],
    queryFn: async () => {
      const response = await getPropertyById(propertyId, authSession?.token);
      const rawProperty = response.data && "property" in response.data
        ? response.data.property ?? response.data.data
        : response.data;

      if (!rawProperty) {
        throw new Error("Property not found");
      }

      return mapPropertyDetailToProperty(rawProperty as PropertyDetailApiItem);
    },
    enabled: true,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  if (propertyQuery.isLoading) {
    return (
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-24">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-600 shadow-sm">
          <Loader2 size={18} className="animate-spin text-primary-600" />
          Loading property details...
        </div>
      </div>
    );
  }

  if (propertyQuery.isError) {
    const message = propertyQuery.error instanceof Error ? propertyQuery.error.message : "Failed to load property details";
    const needsLogin = !authSession?.token || message.toLowerCase().includes("unauthenticated") || message.toLowerCase().includes("unauthorized");

    if (needsLogin) {
      return (
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
              <LogIn size={20} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Sign in required</h1>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              This property detail endpoint is protected. Please sign in to view the listing.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Go to login
            </Link>
          </div>
        </div>
      );
    }

    toast.error(message);

    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Property unavailable</h1>
          <p className="mt-3 text-sm leading-6 text-gray-600">{message}</p>
        </div>
      </div>
    );
  }

  if (!propertyQuery.data) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Property unavailable</h1>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            The property response was empty.
          </p>
        </div>
      </div>
    );
  }

  return <PropertyDetailView property={propertyQuery.data} />;
}