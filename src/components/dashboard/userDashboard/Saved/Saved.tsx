"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/dashboard/userDashboard/DashboardLayout";
import PropertyCard from "@/components/properties/PropertyCard";
import { getAuthToken, getWishlist } from "@/lib/api";
import { useDashboard } from "@/contexts/DashboardContext";

export default function SavedPage() {
  const { profile } = useDashboard();
  const [savedProperties, setSavedProperties] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const wishlistRes = await getWishlist(token);

      if (wishlistRes.success && wishlistRes.wishlist) {
        setSavedProperties(wishlistRes.wishlist);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DashboardLayout
      ticketsCount={profile?.tickets_count || 0}
      savedCount={profile?.saved_properties_count || 0}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Properties</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {savedProperties.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <PropertyCard property={item} onWishlistChange={fetchData} />
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}