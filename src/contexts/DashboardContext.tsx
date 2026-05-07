"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getUserProfile, getAuthToken } from "@/lib/api";

type DashboardContextType = {
  profile: {
    name: string;
    email: string;
    phone: string | null;
    location: string | null;
    memberSince: string;
    avatar: string | null;
    tickets_count: number;
    saved_properties_count: number;
    total_spent: number;
  } | null;
  isLoading: boolean;
  initials: string;
  refreshProfile: () => Promise<void>;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
}

type DashboardProviderProps = {
  children: ReactNode;
};

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [profile, setProfile] = useState<DashboardContextType["profile"]>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initials = profile?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2) ?? "??";

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const token = getAuthToken();
      if (!token) {
        setProfile(null);
        return;
      }

      const response = await getUserProfile(token);
      if (response.success && response.data) {
        const userData = response.data.user;
        const formatted = {
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          location: userData.address || "",
          memberSince: userData.created_at
            ? new Date(userData.created_at).toLocaleDateString("en-US", { 
                year: "numeric", 
                month: "long" 
              })
            : "March 2025",
          avatar: userData.avatar || null,
          tickets_count: userData.tickets_count || 0,
          saved_properties_count: userData.saved_properties_count || 0,
          total_spent: userData.total_spent || 0,
        };
        setProfile(formatted);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    await fetchProfile();
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const value: DashboardContextType = {
    profile,
    isLoading,
    initials,
    refreshProfile,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
