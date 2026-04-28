"use client";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Footer from "@/components/layout/Footer";
import toast from "react-hot-toast";
import { logoutUser } from "@/lib/api";
import { clearAuthSession, readAuthSession } from "@/lib/auth";
import {
  User, MessageCircle, Heart, Ticket, Globe, LayoutGrid,
  LogOut, Pencil, Mail, Phone, MapPin, Calendar,
  TicketIcon, Lock, DollarSign, ShoppingBag, Check, X, Menu, Search
} from "lucide-react";

type AccountLink = {
  key: string;
  label: string;
  icon: ReactNode;
  href?: string;
  active?: boolean;
  badge?: number;
};

const sidebarLinks = [
  { label: "Profile", icon: <User size={15} />, key: "profile" },
  { label: "Messages", icon: <MessageCircle size={15} />, key: "messages", href: "/dashboard/message" },
  { label: "Saved", icon: <Heart size={15} />, key: "saved", badge: 4 },
  { label: "Raffle Tickets", icon: <Ticket size={15} />, key: "tickets", badge: 2 },
];

const quickLinks = [
  { label: "Browse Raffles", icon: <Globe size={15} />, href: "/raffles" },
  { label: "All Listings", icon: <LayoutGrid size={15} />, href: "/properties" },
];

const stats = [
  { icon: <TicketIcon size={16} className="text-gray-400" />, value: "5", label: "Raffle Tickets" },
  { icon: <Heart size={16} className="text-gray-400" />, value: "4", label: "Saved Properties" },
  { icon: <ShoppingBag size={16} className="text-gray-400" />, value: "4", label: "Total Orders" },
  { icon: <DollarSign size={16} className="text-gray-400" />, value: "$844", label: "Total Spent" },
];

const profileFields = [
  { icon: <Mail size={14} className="text-gray-400" />, label: "Email", key: "email" },
  { icon: <Phone size={14} className="text-gray-400" />, label: "Phone", key: "phone" },
  { icon: <MapPin size={14} className="text-gray-400" />, label: "Location", key: "location" },
  { icon: <Calendar size={14} className="text-gray-400" />, label: "Member Since", key: "memberSince", readonly: true },
];

  const accountLinks: AccountLink[] = [
    { key: "profile", label: "Profile", icon: <User size={14} />, href: "/dashboard" },
    {
      key: "messages",
      label: "Messages",
      icon: <MessageCircle size={14} />,
      href: "/dashboard/message",
    },
    { key: "saved", label: "Saved", icon: <Heart size={14} />, href: "/dashboard/saved", badge: 4 },
    {
      key: "tickets",
      label: "Raffle Tickets",
      icon: <Ticket size={14} />,
      href: "/dashboard/raffle-tickets",
      badge: 2,
    },
  ];


export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const authSession = readAuthSession();
  const normalizedPath = (pathname || "").replace(/\/$/, "");
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [profile, setProfile] = useState({
    name: "James Harrison",
    email: "james.harrison@email.com",
    phone: "+1 (415) 555-0284",
    location: "San Francisco, CA",
    memberSince: "March 2025",
  });
  const [editData, setEditData] = useState({ ...profile });

  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const initials = profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  const handleSave = () => {
    setProfile({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profile });
    setIsEditing(false);
  };

  const handlePasswordUpdate = () => {
    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      setPasswordError("All fields are required.");
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (passwords.newPass.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    setPasswordError("");
    setPasswordSuccess(true);
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordSuccess(false);
      setPasswords({ current: "", newPass: "", confirm: "" });
    }, 1500);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordError("");
    setPasswords({ current: "", newPass: "", confirm: "" });
  };

  const handleLogout = async () => {
    try {
      if (authSession?.token) {
        const response = await logoutUser(authSession.token);
        toast.success(response.message || "Logged out successfully");
      } else {
        toast.success("Logged out successfully");
      }
    } catch {
      toast.error("Logout failed");
    } finally {
      clearAuthSession();
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 text-gray-500" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </button>
            <Link href="/" className="font-bold text-xl text-[#1B2B5E] tracking-wide">
              EXPOVIVIENDA
            </Link>
          </div>

          {/* Center Nav */}
          <nav className="hidden md:flex items-center gap-5">
            {[
              { label: "Home", href: "/" },
              { label: "Properties", href: "/properties" },
              { label: "Virtual Expo", href: "/virtual-expo" },
              { label: "Raffles", href: "/raffles" },
              { label: "Agents", href: "/agents" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex items-center">
              {searchOpen && (
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none w-36 sm:w-52 mr-2 focus:border-primary-600 transition-all"
                />
              )}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
              >
                {searchOpen ? <X size={18} /> : <Search size={18} />}
              </button>
            </div>

            {/* List Property */}
            <Link
              href="/properties"
              className="hidden sm:block bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              List Property
            </Link>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-[#1B2B5E] flex items-center justify-center text-white text-sm font-bold shrink-0">
              {initials}
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="bg-[#1B2B5E] pt-20 pb-20 text-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/bgg.jpg')" }}>
        <h1 className="text-2xl sm:text-5xl font-bold text-white pt-10">My Dashboard</h1>
        <p className="text-white/60 text-[20px] mt-2">Manage your properties, tickets, and account settings</p>
      </div>

      {/* Body */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-6 relative">

          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          {/* <aside className={`
            fixed top-0 left-0 h-full w-64 bg-white z-40 shadow-xl pt-20 px-5 transition-transform duration-300
            lg:static lg:w-56 lg:h-auto lg:shadow-none lg:pt-0 lg:px-0 lg:translate-x-0 lg:z-auto
            lg:rounded-2xl lg:border lg:border-gray-100 lg:p-5 shrink-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}>
            <div className="lg:hidden flex justify-end mb-4">
              <button onClick={() => setSidebarOpen(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Account</p>
            <ul className="space-y-1 mb-6">
              {sidebarLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => {
                      if (link.href) {
                        router.push(link.href);
                      } else {
                        setActiveTab(link.key);
                      }
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${(link.href ? pathname === link.href : activeTab === link.key)
                        ? "bg-blue-50 text-primary-600 font-semibold"
                        : "text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    <span className="flex items-center gap-2">{link.icon}{link.label}</span>
                    {link.badge && (
                      <span className="flex-shrink-0 bg-primary-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-col">
                        {link.badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Links</p>
            <ul className="space-y-1 mb-6">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 transition-colors">
                    {link.icon}{link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg w-full transition-colors">
              <LogOut size={15} /> Logout
            </button>
          </aside> */}

                      <aside className={`
              fixed top-0 left-0 h-full w-64 bg-white z-40 shadow-xl pt-20 px-5 transition-transform duration-300
              lg:static lg:w-auto lg:h-fit lg:shadow-sm lg:pt-4 lg:px-4 lg:translate-x-0 lg:z-auto
              lg:rounded-2xl lg:border lg:border-gray-100
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
              <div className="lg:hidden flex justify-end mb-4">
                <button onClick={() => setSidebarOpen(false)}>
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <p className="text-[20px] font-bold text-[#4B5563] uppercase tracking-widest mb-3">
                Account
              </p>
              <ul className="space-y-1.5 mb-6">
                {accountLinks.map((item) => (
                  <li key={item.key}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${normalizedPath === item.href
                            ? "bg-blue-50 text-primary-600 font-semibold"
                            : "text-gray-600 hover:bg-gray-50"
                          }`}
                      >
                        <span className="flex items-center gap-2">
                          {item.icon}
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="flex-shrink-0 bg-primary-600 ml-2 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-col">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ) : (
                      <button className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                        <span className="flex items-center gap-2">
                          {item.icon}
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="flex-shrink-0 bg-primary-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-col">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              <p className="text-[11px] font-bold text-[#4B5563] uppercase tracking-widest mb-3">
                Quick Links
              </p>
              <ul className="space-y-1.5 mb-4">
                {quickLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <Check size={14} className="text-gray-400" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <button type="button" onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
                <LogOut size={14} />
                Logout
              </button>
            </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-4 min-w-0">

            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#1B2B5E] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-lg">{initials}</span>
                  </div>
                  <div>
                    {isEditing ? (
                      <input
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="font-bold text-gray-900 text-lg border-b border-primary-600 outline-none w-full bg-transparent"
                      />
                    ) : (
                      <h2 className="font-bold text-gray-900 text-lg">{profile.name}</h2>
                    )}
                    <p className="text-gray-400 text-xs mt-0.5">Member since {profile.memberSince}</p>
                  </div>
                </div>

                {isEditing ? (
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="flex items-center gap-1 bg-primary-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                      <Check size={13} /> Save
                    </button>
                    <button onClick={handleCancel} className="flex items-center gap-1 border border-gray-200 text-gray-500 text-xs font-semibold px-3 py-1.5 rounded-lg">
                      <X size={13} /> Cancel
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 text-primary-600 text-xs font-semibold hover:underline">
                    <Pencil size={13} /> Edit Profile
                  </button>
                )}
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {profileFields.map((field) => (
                  <div key={field.key} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                      {field.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-400 text-xs mb-0.5">{field.label}</p>
                      {isEditing && !field.readonly ? (
                        <input
                          value={editData[field.key as keyof typeof editData]}
                          onChange={(e) => setEditData({ ...editData, [field.key]: e.target.value })}
                          className="text-gray-900 text-sm font-medium border-b border-primary-600 outline-none w-full bg-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 text-sm font-medium truncate">
                          {profile[field.key as keyof typeof profile]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="mb-3">{s.icon}</div>
                  <p className="text-xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Security & Preferences</h3>
              <div className="flex items-center justify-between py-3 border border-gray-100 rounded-xl px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                    <Lock size={14} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Change Password</p>
                    <p className="text-xs text-gray-400 mt-0.5">Last changed 3 months ago</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="text-primary-600 text-xs font-semibold hover:underline"
                >
                  Update
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">

            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 text-base">Change Password</h3>
              <button onClick={closePasswordModal} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={passwords.newPass}
                  onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300"
                />
              </div>

              {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
              {passwordSuccess && <p className="text-green-500 text-xs font-semibold">✓ Password updated successfully!</p>}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={closePasswordModal}
                className="flex-1 border border-gray-200 text-gray-500 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordUpdate}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                Update Password
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />

    </div>
  );
}