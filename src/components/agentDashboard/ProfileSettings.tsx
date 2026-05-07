"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { User, Lock, Pencil, Eye, EyeOff } from "lucide-react";
import UserInitials from "./UserInitials";

// Types
interface User {
    name?: string;
    role?: string;
}

interface ProfileData {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar: string;
    bio: string | null;
    address: string | null;
    phone: string | null;
    created_at: string;
}

interface ProfileResponse {
    success: boolean;
    data: {
        user: ProfileData;
    };
}

interface UpdateProfileResponse {
    success: boolean;
    status: boolean;
    message: string;
    code: number;
    exception_file: null;
    exception_path: null;
    data: {
        name: string;
        email: string;
        avatar: null;
        address: null;
        phone: string;
        birth_date: null;
    };
}

interface ChangePasswordResponse {
    success: boolean;
    status: boolean;
    message: string;
    code: number;
    exception_file: null;
    exception_path: null;
    data: {
        name: string;
        email: string;
        avatar: null;
    };
}

interface ProfileSettingsProps {
    user: User | null;
}

export default function ProfileSettings({ user }: ProfileSettingsProps) {
    const router = useRouter();
    const [settingsTab, setSettingsTab] = useState<"personal" | "security">("personal");
    const [showPassword, setShowPassword] = useState(false);
    const queryClient = useQueryClient();

    // Password visibility states
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        bio: "",
    });

    // Password form state
    const [passwordData, setPasswordData] = useState({
        old_password: "",
        password: "",
        password_confirmation: "",
    });

    // Fetch profile data using TanStack Query
    const { data: profileData, isLoading, error } = useQuery<ProfileResponse>({
        queryKey: ["profile"],
        queryFn: async () => {
            const token = 
                localStorage.getItem("auth_token") ||
                JSON.parse(localStorage.getItem("expovivienda_auth_session") || "{}")?.token ||
                "";

            if (!token) {
                throw new Error("No authentication token found");
            }

            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://maxtuero.thenightowl.team";
            
            const response = await fetch(`${baseUrl}/user/profile-get`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch profile data");
            }

            return response.json();
        },
    });

    // Update profile mutation
    const updateProfileMutation = useMutation<UpdateProfileResponse, Error, typeof formData>({
        mutationFn: async (data) => {
            const token = 
                localStorage.getItem("auth_token") ||
                JSON.parse(localStorage.getItem("expovivienda_auth_session") || "{}")?.token ||
                "";

            if (!token) {
                throw new Error("No authentication token found");
            }

            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://maxtuero.thenightowl.team";
            
            const response = await fetch(`${baseUrl}/user/profile-update`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            return response.json();
        },
        onSuccess: (data) => {
            toast.success(data.message || "Profile updated successfully");
            // Invalidate and refetch profile data
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update profile");
        },
    });

    // Change password mutation
    const changePasswordMutation = useMutation<ChangePasswordResponse, Error, typeof passwordData>({
        mutationFn: async (data) => {
            const token = 
                localStorage.getItem("auth_token") ||
                JSON.parse(localStorage.getItem("expovivienda_auth_session") || "{}")?.token ||
                "";

            if (!token) {
                throw new Error("No authentication token found");
            }

            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://maxtuero.thenightowl.team";
            
            const response = await fetch(`${baseUrl}/user/change-password`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to change password");
            }

            return response.json();
        },
        onSuccess: (data) => {
            toast.success(data.message || "Password changed successfully");
            // Clear auth data and redirect to login
            localStorage.removeItem("auth_token");
            localStorage.removeItem("expovivienda_auth_session");
            setTimeout(() => {
                router.push("/login");
            }, 2000); // Wait for toast to show
        },
        onError: (error) => {
            toast.error(error.message || "Failed to change password");
        },
    });

    const profile = profileData?.data?.user;

    // Update form data when profile loads
    React.useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || "",
                email: profile.email || "",
                phone: profile.phone || "",
                address: profile.address || "",
                bio: profile.bio || "",
            });
        }
    }, [profile]);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfileMutation.mutate(formData);
    };

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle password form submission
    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        changePasswordMutation.mutate(passwordData);
    };

    // Handle password input changes
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div>
            {/* Profile Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    {isLoading ? (
                        <>
                            <div className="w-14 h-14 rounded-xl bg-gray-200 animate-pulse"></div>
                            <div>
                                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-14 h-14 rounded-xl bg-[#1B2B5E] flex items-center justify-center shrink-0">
                                <UserInitials user={profile || user} className="text-white font-bold text-lg" />
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-900 text-lg">
                                    {profile?.name || user?.name || "Agent"}
                                </h2>
                                <p className="text-gray-400 text-xs mt-0.5">
                                    {profile?.created_at 
                                        ? `Member since ${new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
                                        : "Member since March 2025"
                                    }
                                </p>
                            </div>
                        </>
                    )}
                </div>
                {isLoading ? (
                    <div className="h-8 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                ) : (
                    <button className="flex items-center gap-1.5 text-primary-600 text-xs font-semibold hover:underline">
                        <Pencil size={13} />
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Error State */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm">Failed to load profile data. Please try again.</p>
                </div>
            )}

            {/* Tabs */}
            <div className="grid grid-cols-2 bg-gray-100 rounded-full p-1 mb-6">
                <button
                    onClick={() => setSettingsTab("personal")}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                        settingsTab === "personal"
                            ? "bg-primary-600 text-white shadow"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    <User size={14} />
                    Personal
                </button>
                <button
                    onClick={() => setSettingsTab("security")}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                        settingsTab === "security"
                            ? "bg-primary-600 text-white shadow"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    <Lock size={14} />
                    Security
                </button>
            </div>

            {/* Personal Tab */}
            {settingsTab === "personal" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-gray-900 text-base">Personal Information</h3>
                        {isLoading ? (
                            <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                        ) : (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                {profile?.role || user?.role || "Agent"}
                            </span>
                        )}
                    </div>
                    <p className="text-gray-400 text-xs mb-6">Update your personal details and contact info</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Full Name</label>
                                {isLoading ? (
                                    <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                                ) : (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Agent"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300 bg-gray-50"
                                    />
                                )}
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email</label>
                                {isLoading ? (
                                    <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                                ) : (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@expovivienda.com"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300 bg-gray-50"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Phone + Location */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Phone</label>
                                {isLoading ? (
                                    <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                                ) : (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 (555) 123-4567"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors bg-gray-50"
                                    />
                                )}
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Location</label>
                                {isLoading ? (
                                    <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                                ) : (
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="City, State"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300 bg-gray-50"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Bio</label>
                            {isLoading ? (
                                <div className="h-24 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                            ) : (
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Tell clients about yourself, your experience, and areas of expertise..."
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300 bg-gray-50 resize-none"
                                />
                            )}
                        </div>

                        {/* Save */}
                        <div className="flex justify-end">
                            {isLoading ? (
                                <div className="h-10 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
                            ) : (
                                <button 
                                    type="submit"
                                    disabled={updateProfileMutation.isPending}
                                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
                                >
                                    {updateProfileMutation.isPending ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                                            </svg>
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}

            {/* Security Tab */}
            {settingsTab === "security" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 text-base mb-1">Security</h3>
                    <p className="text-gray-400 text-xs mb-6">Manage your password and account security</p>

                    <form onSubmit={handlePasswordSubmit} className="space-y-5">
                        {/* Current Password */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    name="old_password"
                                    value={passwordData.old_password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter current password"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors bg-gray-50 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* New Password + Confirm Password */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        name="password"
                                        value={passwordData.password}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter new password"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors bg-gray-50 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="password_confirmation"
                                        value={passwordData.password_confirmation}
                                        onChange={handlePasswordChange}
                                        placeholder="Confirm new password"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors bg-gray-50 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Update Button */}
                        <div className="flex justify-end">
                            <button 
                                type="submit"
                                disabled={changePasswordMutation.isPending}
                                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
                            >
                                {changePasswordMutation.isPending ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                                        </svg>
                                        Update Password
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
