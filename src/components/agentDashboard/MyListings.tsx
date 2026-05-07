"use client";

import { PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { readStoredAuthSession } from "@/lib/store";

// Types
interface ManagementListing {
  id: number;
  name: string;
  address: string;
  price: number;
  thumbnail: string | null;
  type: "raffle" | "sale" | "fair";
}

interface MyListingsProps {
  onAddProperty: () => void;
  onViewListing: (listing: ManagementListing, mode: "view" | "edit") => void;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data: {
    properties: ManagementListing[];
  };
}

// API function to fetch properties
const fetchProperties = async (): Promise<ManagementListing[]> => {
  const session = readStoredAuthSession();
  let token = session?.token || "";

  if (!token) {
    const authData = localStorage.getItem("expovivienda_auth_session");
    if (authData) {
      token = JSON.parse(authData)?.token || "";
    }
  }

  if (!token) {
    token = localStorage.getItem("auth_token") || "";
  }

  if (!token) {
    throw new Error("No authentication token found");
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://maxtuero.thenightowl.team";
  const response = await fetch(`${baseUrl}/property/index`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem("expovivienda_auth_session");
      localStorage.removeItem("expovivienda_demo_user");
      localStorage.removeItem("auth_token");
      Object.keys(localStorage).forEach((key) => {
        if (
          key.includes("auth") ||
          key.includes("token") ||
          key.includes("session")
        ) {
          localStorage.removeItem(key);
        }
      });
      window.location.href = "/login";
      throw new Error("Authentication failed");
    }
    throw new Error(`Failed to fetch properties: ${response.status}`);
  }

  const data: ApiResponse = await response.json();

  if (!data.success) {
    throw new Error(data.message || "Failed to load properties");
  }

  return data.data.properties;
};

export default function MyListings({
  onAddProperty,
  onViewListing,
}: MyListingsProps) {
  const {
    data: properties = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery<ManagementListing[]>({
    queryKey: ["properties"],
    queryFn: fetchProperties,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const handleEditClick = (listing: ManagementListing) => {
    onViewListing(listing, "edit");
  };

  // Helper function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Helper function to get status display
  const getStatusDisplay = (type: string) => {
    switch (type.toLowerCase()) {
      case "raffle":
        return { text: "Raffle", className: "bg-purple-50 text-purple-600" };
      case "sale":
        return { text: "For Sale", className: "bg-green-50 text-green-600" };
      case "fair":
        return { text: "Fair", className: "bg-orange-50 text-orange-600" };
      default:
        return { text: type, className: "bg-gray-50 text-gray-600" };
    }
  };

  // Helper function to get image URL
  const getImageUrl = (thumbnail: string | null) => {
    if (thumbnail) {
      return thumbnail.startsWith("http")
        ? thumbnail
        : `https://maxtuero.thenightowl.team/${thumbnail}`;
    }
    return "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200"; // Default placeholder
  };

  if (loading) {
    return (
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Listings</h1>
            <p className="text-gray-400 text-sm mt-0.5">Loading...</p>
          </div>
          <button
            onClick={onAddProperty}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
          >
            <PlusCircle size={15} />
            Add Property
          </button>
        </div>

        {/* Loading Skeleton */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 px-5 py-3">
            <div className="h-3 w-24 rounded-full bg-gray-100 animate-pulse" />
          </div>

          <div className="divide-y divide-gray-50">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[1.6fr_0.7fr_0.7fr_0.8fr] gap-4 px-5 py-4 items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gray-100 animate-pulse shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-40 rounded-full bg-gray-100 animate-pulse" />
                    <div className="h-2.5 w-28 rounded-full bg-gray-100 animate-pulse" />
                  </div>
                </div>

                <div className="h-3 w-20 rounded-full bg-gray-100 animate-pulse" />

                <div className="h-6 w-20 rounded-full bg-gray-100 animate-pulse" />

                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gray-100 animate-pulse" />
                  <div className="w-4 h-4 rounded-full bg-gray-100 animate-pulse" />
                  <div className="w-4 h-4 rounded-full bg-gray-100 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Listings</h1>
            <p className="text-gray-400 text-sm mt-0.5">
              Error loading properties
            </p>
          </div>
          <button
            onClick={onAddProperty}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
          >
            <PlusCircle size={15} />
            Add Property
          </button>
        </div>

        {/* Error State */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="text-center">
            <p className="text-red-500 mb-4">Failed to load properties</p>
            <p className="text-gray-500 text-sm">
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Listings</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {properties.length} properties listed
          </p>
        </div>
        <button
          onClick={onAddProperty}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
        >
          <PlusCircle size={15} />
          Add Property
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[600px]">
          {/* Head */}
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 py-3">
                Property
              </th>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">
                Price
              </th>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">
                Status
              </th>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-50">
            {properties.map((listing) => {
              const statusDisplay = getStatusDisplay(listing.type);
              return (
                <tr
                  key={listing.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Property */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={getImageUrl(listing.thumbnail)}
                        alt={listing.name}
                        className="w-11 h-11 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {listing.name}
                        </p>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {listing.address}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-900 text-sm">
                      {formatPrice(listing.price)}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${statusDisplay.className}`}
                    >
                      {statusDisplay.text}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {/* View */}
                      <button
                        type="button"
                        className="text-gray-400 hover:text-primary-600 transition-colors"
                        title="View Listing"
                        onClick={() =>
                          (window.location.href = `/agent-dashboard/${listing.id}`)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.641 0-8.583-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </button>
                      {/* Edit */}
                      <button
                        type="button"
                        className="text-gray-400 hover:text-primary-600 transition-colors"
                        title="Edit Listing"
                        onClick={() => handleEditClick(listing)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                      {/* Delete */}
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete Listing"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
