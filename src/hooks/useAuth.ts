"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
	loginUser,
	logoutUser,
	registerUser,
	type AuthSessionResponse,
	type LoginPayload,
	type RegisterPayload,
	type RegisterResponse,
	type AuthUser,
} from "@/lib/api";
import {
	AUTH_EVENT_NAME,
	clearStoredAuthSession,
	readStoredAuthSession,
	type StoredAuthSession,
	writeStoredAuthSession,
} from "@/lib/store";

type UseAuthResult = {
	user: AuthUser | null;
	token: string | null;
	isLoggedIn: boolean;
	session: StoredAuthSession | null;
	login: (payload: LoginPayload) => Promise<AuthSessionResponse>;
	register: (payload: RegisterPayload) => Promise<RegisterResponse>;
	logout: () => Promise<void>;
	isLoading: boolean;
	loginError: Error | null;
	registerError: Error | null;
	logoutError: Error | null;
};

function toStoredSession(response: AuthSessionResponse | RegisterResponse): StoredAuthSession {
	console.log('Login response:', response);
	console.log('Token from response:', response.data.authorisation.token);
	console.log('Token type:', response.data.authorisation.type);
	
	const session = {
		user: response.data.user,
		token: response.data.authorisation.token,
		type: response.data.authorisation.type,
	};
	
	console.log('Stored session:', session);
	return session;
}

export default function useAuth(): UseAuthResult {
	const queryClient = useQueryClient();
	const [session, setSession] = useState<StoredAuthSession | null>(() => readStoredAuthSession());

	// Query to sync auth state across tabs
	const { data: authState } = useQuery({
		queryKey: ["auth"],
		queryFn: () => readStoredAuthSession(),
		staleTime: 0,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		const syncAuthState = () => {
			const newSession = readStoredAuthSession();
			setSession(newSession);
			queryClient.setQueryData(["auth"], newSession);
		};

		window.addEventListener("storage", syncAuthState);
		window.addEventListener(AUTH_EVENT_NAME, syncAuthState);

		return () => {
			window.removeEventListener("storage", syncAuthState);
			window.removeEventListener(AUTH_EVENT_NAME, syncAuthState);
		};
	}, [queryClient]);

	// Login mutation
	const loginMutation = useMutation({
		mutationFn: loginUser,
		onSuccess: (response) => {
			console.log('Login success - storing session...');
			const nextSession = toStoredSession(response);
			setSession(nextSession);
			writeStoredAuthSession(nextSession);
			queryClient.setQueryData(["auth"], nextSession);
			
			// Verify token was stored
			const storedSession = readStoredAuthSession();
			console.log('Verification - stored session after login:', storedSession);
			console.log('Verification - token in localStorage:', storedSession?.token);
			
			toast.success(response.message || "Login Successfully", {
				style: {
					background: 'black',
					color: 'white',
				},
				position: 'top-right',
			});
		},
		onError: (error) => {
			toast.error(error.message || "Login failed", {
				style: {
					background: 'black',
					color: 'white',
				},
				position: 'top-right',
			});
		},
	});

	// Register mutation
	const registerMutation = useMutation({
		mutationFn: registerUser,
		onSuccess: (response) => {
			const nextSession = toStoredSession(response);
			setSession(nextSession);
			writeStoredAuthSession(nextSession);
			queryClient.setQueryData(["auth"], nextSession);
			toast.success(response.message || "Registration successfully done", {
				style: {
					background: 'black',
					color: 'white',
				},
				position: 'top-right',
			});
		},
		onError: (error) => {
			toast.error(error.message || "Registration failed", {
				style: {
					background: 'black',
					color: 'white',
				},
				position: 'top-right',
			});
		},
	});

	// Logout mutation
	const logoutMutation = useMutation({
		mutationFn: async () => {
			console.log('Starting logout process...');
			
			// Try multiple ways to get the token
			const session = readStoredAuthSession();
			let token = session?.token || '';
			
			// Fallback: try to get token directly from localStorage
			if (!token) {
				const authData = localStorage.getItem('expovivienda_auth_session');
				if (authData) {
					try {
						const parsed = JSON.parse(authData);
						token = parsed.token || '';
					} catch (e) {
						console.error('Failed to parse auth data during logout:', e);
					}
				}
			}
			
			// Final fallback: try legacy token
			if (!token) {
				token = localStorage.getItem('auth_token') || '';
			}
			
			console.log('Logout - token found:', !!token);
			console.log('Logout - token length:', token.length);
			console.log('Logout - token value:', token);
			
			// Check if token is expired
			if (token) {
				try {
					const parts = token.split('.');
					if (parts.length === 3) {
						const payload = JSON.parse(atob(parts[1]));
						const currentTime = Math.floor(Date.now() / 1000);
						console.log('Token payload:', payload);
						console.log('Token issued at (iat):', new Date(payload.iat * 1000));
						console.log('Token expires at (exp):', new Date(payload.exp * 1000));
						console.log('Current time:', new Date(currentTime * 1000));
						console.log('Token expired:', currentTime > payload.exp);
					}
				} catch (e) {
					console.error('Failed to decode token:', e);
				}
			}
			
			if (token && token !== "legacy-demo-session") {
				try {
					// Check if token is expired before calling API
					let isExpired = false;
					try {
						const parts = token.split('.');
						if (parts.length === 3) {
							const payload = JSON.parse(atob(parts[1]));
							const currentTime = Math.floor(Date.now() / 1000);
							isExpired = currentTime > payload.exp;
						}
					} catch (e) {
						console.error('Failed to check token expiration:', e);
					}
					
					if (isExpired) {
						console.log('Token is expired, proceeding with local cleanup only');
						return { success: true, message: "Logged out locally (token expired)" };
					}
					
					const response = await logoutUser({
						email: "team4@team.com",
						password: "12345678"
					}, token);
					console.log('Logout API response:', response);
					return response;
				} catch (error) {
					console.error('Logout API error:', error);
					console.log('API logout failed, proceeding with local cleanup');
					// Even if API fails, proceed with local cleanup
					return { success: true, message: "Logged out locally" };
				}
			} else {
				console.log('No valid token found for logout, proceeding with local cleanup');
				// Return a mock success response for local cleanup
				return { success: true, message: "Logged out locally" };
			}
		},
		onSuccess: (response) => {
			clearStoredAuthSession();
			setSession(null);
			queryClient.setQueryData(["auth"], null);
			queryClient.clear();
			// Show custom styled toast and navigate to home
			toast.success(response?.message || "Successfully logged out", {
				style: {
					background: 'black',
					color: 'white',
				},
				position: 'top-right',
			});
			// Wait 2 seconds before navigating to home page
			setTimeout(() => {
				window.location.href = '/';
			}, 500);
		},
		onError: (error) => {
			toast.error(error.message || "Logout failed", {
				style: {
					background: 'black',
					color: 'white',
				},
				position: 'top-right',
			});
		},
	});

	const login = async (payload: LoginPayload) => {
		return loginMutation.mutateAsync(payload);
	};

	const register = async (payload: RegisterPayload) => {
		return registerMutation.mutateAsync(payload);
	};

	const logout = async () => {
		await logoutMutation.mutateAsync();
	};

	return {
		user: session?.user ?? null,
		token: session?.token ?? null,
		isLoggedIn: Boolean(session?.user),
		session,
		login,
		register,
		logout,
		isLoading: loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,
		loginError: loginMutation.error,
		registerError: registerMutation.error,
		logoutError: logoutMutation.error,
	};
}
