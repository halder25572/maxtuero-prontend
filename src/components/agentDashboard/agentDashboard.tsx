"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AddPropertyForm from "./AddPropertyForm";
import EditPropertyForm from "./EditPropertyForm";
import useAuth from "@/hooks/useAuth";
import { getAuthToken } from "@/lib/api";
import MyListings from "./MyListings";
import GoLive from "./GoLive";
import Messages from "./Messages";
import ProfileSettings from "./ProfileSettings";
import UserInitials, { UserInfo } from "./UserInitials";
import {
  LayoutDashboard,
  Radio,
  List,
  MessageCircle,
  PlusCircle,
  Settings,
  LogOut,
  Home,
  ArrowUpRight,
  Menu,
  X,
  Eye,
  DollarSign,
  MapPin,
  Pencil,
  Lock,
  User,
} from "lucide-react";

type ListingModalData = {
  id: string;
  title: string;
  location: string;
  price: string;
  status: string;
  image: string;
  images?: string[];
};

const sidebarLinks = [
  // { label: "Overview", icon: <LayoutDashboard size={15} />, key: "overview" },
  { label: "Go Live", icon: <Radio size={15} />, key: "golive" },
  { label: "My Listings", icon: <List size={15} />, key: "listings" },
  // { label: "Messages", icon: <MessageCircle size={15} />, key: "messages" },
  { label: "Add Property", icon: <PlusCircle size={15} />, key: "addproperty" },
  {
    label: "Profile & Settings",
    icon: <Settings size={15} />,
    key: "settings",
  },
];

const stats = [
  {
    label: "Active Listings",
    value: "6",
    icon: <Home size={16} className="text-primary-600" />,
    bg: "bg-blue-50",
  },
  {
    label: "Total Views",
    value: "12,847",
    icon: <Eye size={16} className="text-green-500" />,
    bg: "bg-green-50",
  },
  {
    label: "Total Sales",
    value: "$4.2M",
    icon: <DollarSign size={16} className="text-yellow-500" />,
    bg: "bg-yellow-50",
  },
];

const topListings = [
  {
    id: "1",
    title: "Modern Waterfront Villa",
    location: "Miami Beach, FL",
    price: "$2450K",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200",
  },
  {
    id: "2",
    title: "Skyline View Apartments",
    location: "New York, NY",
    price: "$875K",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200",
  },
  {
    id: "3",
    title: "Downtown Luxury Penthouse",
    location: "Los Angeles, CA",
    price: "$3200K",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200",
  },
  {
    id: "4",
    title: "Mediterranean Garden Estate",
    location: "Santa Barbara, CA",
    price: "$1950K",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200",
  },
];

// Helper function to get initial tab from localStorage
const getInitialTab = (): string => {
  if (typeof window !== "undefined") {
    const savedTab = localStorage.getItem("agent-dashboard-active-tab");

    // If we have a saved tab, use it (this handles navigation from property details)
    if (savedTab) {
      return savedTab;
    }

    // Check if we came from a property details page without a specific tab
    const referrer = document.referrer;
    if (
      referrer &&
      referrer.includes("/agent-dashboard/") &&
      referrer !== window.location.href
    ) {
      return "listings";
    }

    return "listings";
  }
  return "listings";
};

export default function AgentDashboard() {
  const { logout, user } = useAuth();
  // Initialize state directly from localStorage to prevent flicker
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [listingModalMode, setListingModalMode] = useState<
    "view" | "edit" | null
  >(null);
  const [selectedListing, setSelectedListing] =
    useState<ListingModalData | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("agent-dashboard-active-tab", activeTab);
    }
  }, [activeTab, isClient]);

  // Validate session on component mount and periodically check
  useEffect(() => {
    const validateSession = async () => {
      const token = getAuthToken();
      console.log("Token found:", !!token);

      if (!token) {
        console.log("No token found, redirecting to login");
        window.location.href = "/login";
        return;
      }

      try {
        console.log("Validating session with /user/profile-get endpoint...");
        console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

        // Use existing profile endpoint to validate session
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile-get`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Profile validation response status:", response.status);

        // Check for 401/403 responses (deleted user, invalid token, etc.)
        if (response.status === 401 || response.status === 403) {
          console.warn(
            `🔴 Authentication failed (${response.status}): User may be deleted or token invalid`,
          );
          // Clear all auth-related storage
          localStorage.removeItem("expovivienda_auth_session");
          localStorage.removeItem("expovivienda_demo_user");
          localStorage.removeItem("auth_token");

          // Clear any other potential auth keys
          Object.keys(localStorage).forEach((key) => {
            if (
              key.includes("auth") ||
              key.includes("token") ||
              key.includes("session")
            ) {
              localStorage.removeItem(key);
            }
          });

          // Redirect to login page
          console.log("🔴 Auto-logged out due to authentication failure");
          window.location.href = "/login";
          return;
        }

        const data = await response.json();
        console.log("Profile validation response data:", data);

        // If backend returns success: false, user may be deleted
        if (!data.success) {
          console.warn("🔴 Session validation failed: User may be deleted");
          // Clear auth and redirect
          localStorage.removeItem("expovivienda_auth_session");
          localStorage.removeItem("expovivienda_demo_user");
          localStorage.removeItem("auth_token");
          console.log("🔴 Auto-logged out due to validation failure");
          window.location.href = "/login";
        } else {
          console.log("✅ Session validation successful - user is valid");
        }
      } catch (error) {
        console.error("Session validation error:", error);
        console.log(
          "⚠️ Session validation failed, but not forcing logout due to network error",
        );
        // Don't force logout on network errors
      }
    };

    // Initial validation on mount
    validateSession();

    // Set up periodic validation every 30 seconds
    const intervalId = setInterval(validateSession, 30000);

    // Also validate when window becomes visible (user switches back to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("Window became visible, validating session...");
        validateSession();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []); // Run only on mount

  const openListingModal = (
    listing: any, // Will receive ManagementListing from MyListings component
    mode: "view" | "edit",
  ) => {
    // Convert ManagementListing to ListingModalData format
    const modalData: ListingModalData = {
      id: listing.id.toString(),
      title: listing.name,
      location: listing.address,
      price: listing.price,
      status:
        listing.type === "raffle"
          ? "Raffle"
          : listing.type === "sale"
            ? "For Sale"
            : "Fair",
      image:
        listing.thumbnail ||
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200",
    };
    setSelectedListing(modalData);
    setListingModalMode(mode);
  };

  const closeListingModal = () => {
    setSelectedListing(null);
    setListingModalMode(null);
  };

  // Don't render until client-side to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <section className="bg-[#F9FAFB]">
      <div className="min-h-screen max-w-7xl mx-auto flex">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
        fixed top-0 left-0 h-full bg-white z-40 border-r border-gray-100 shadow-sm
        transition-transform duration-300 flex flex-col
        w-52 pt-6 px-4
        lg:static lg:translate-x-0 lg:z-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
        >
          {/* Logo */}
          <div className="flex items-center justify-between mb-6 px-1">
            <Link
              href="/"
              className="font-bold text-base text-[#1B2B5E] tracking-wide"
            >
              EXPOVIVIENDA
            </Link>
            <button
              className="lg:hidden text-gray-400"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          {/* Agent Info */}
          <div className="flex items-center gap-3 mb-6 px-1">
            <div className="w-10 h-10 rounded-full bg-[#1B2B5E] flex items-center justify-center shrink-0">
              <UserInitials user={user} />
            </div>
            <div>
              <UserInfo user={user} />
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-1">
            {sidebarLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => {
                  setActiveTab(link.key);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  activeTab === link.key
                    ? "bg-blue-50 text-primary-600 font-semibold"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors mb-4 mt-2"
          >
            <LogOut size={15} />
            Logout
          </button>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Top Bar */}
          <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500"
            >
              <Menu size={20} />
            </button>
            <p className="font-bold text-[#1B2B5E] text-sm">EXPOVIVIENDA</p>
            <div className="w-8 h-8 rounded-full bg-[#1B2B5E] flex items-center justify-center shrink-0">
              <UserInitials
                user={user}
                className="text-white font-bold text-xs"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 lg:p-8">
            {activeTab === "overview" && (
              <div>
                <h1 className="text-xl font-bold text-gray-900 mb-1">
                  Dashboard
                </h1>
                <p className="text-gray-400 text-sm mb-7">
                  Welcome back! Here's an overview of your performance.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-400 text-xs font-medium">
                          {s.label}
                        </p>
                        <div
                          className={`w-8 h-8 ${s.bg} rounded-full flex items-center justify-center`}
                        >
                          {s.icon}
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Top Listings */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-bold text-gray-900 text-sm">
                      Top Listings
                    </h2>
                    <button className="flex items-center gap-1 text-primary-600 text-xs font-semibold hover:underline">
                      View all <ArrowUpRight size={13} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {topListings.map((listing) => (
                      <div
                        key={listing.id}
                        className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0"
                      >
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {listing.title}
                          </p>
                          <p className="text-gray-400 text-xs mt-0.5">
                            {listing.location}
                          </p>
                        </div>
                        <p className="font-bold text-gray-900 text-sm shrink-0">
                          {listing.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "golive" && <GoLive topListings={topListings} />}

            {activeTab === "listings" && (
              <MyListings
                onAddProperty={() => setActiveTab("addproperty")}
                onViewListing={openListingModal}
              />
            )}

            {activeTab === "messages" && <Messages />}

            {activeTab === "addproperty" && <AddPropertyForm />}

            {activeTab === "settings" && <ProfileSettings user={user} />}

            {selectedListing && listingModalMode === "view" && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div
                  className="absolute inset-0 bg-black/50"
                  onClick={closeListingModal}
                />
                <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] overflow-y-auto">
                  <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        {listingModalMode === "view"
                          ? "View Listing"
                          : "Edit Listing"}
                      </p>
                      <h3 className="text-lg font-bold text-gray-900 mt-1">
                        {selectedListing.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={closeListingModal}
                      className="text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                      <img
                        src={selectedListing.image}
                        alt={selectedListing.title}
                        className="w-full h-full object-contain object-center"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          Location
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          {selectedListing.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          Price
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          {selectedListing.price}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          Status
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          {selectedListing.status}
                        </p>
                      </div>
                      <div className="pt-2 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={closeListingModal}
                          className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedListing && listingModalMode === "edit" && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div
                  className="absolute inset-0 bg-black/50"
                  onClick={closeListingModal}
                />

                <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] overflow-y-auto">
                  <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        Edit Listing
                      </p>
                      <h3 className="text-lg font-bold text-gray-900 mt-1">
                        {selectedListing.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedListing.location}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={closeListingModal}
                      className="text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="p-6">
                    <EditPropertyForm propertyId={selectedListing.id} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
