"use client";

import { useEffect, useState } from "react";
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
};

function toStoredSession(response: AuthSessionResponse | RegisterResponse): StoredAuthSession {
	return {
		user: response.data.user,
		token: response.data.authorisation.token,
		type: response.data.authorisation.type,
	};
}

export default function useAuth(): UseAuthResult {
	const [session, setSession] = useState<StoredAuthSession | null>(() => readStoredAuthSession());

	useEffect(() => {
		const syncAuthState = () => {
			setSession(readStoredAuthSession());
		};

		window.addEventListener("storage", syncAuthState);
		window.addEventListener(AUTH_EVENT_NAME, syncAuthState);

		return () => {
			window.removeEventListener("storage", syncAuthState);
			window.removeEventListener(AUTH_EVENT_NAME, syncAuthState);
		};
	}, []);

	const login = async (payload: LoginPayload) => {
		const response = await loginUser(payload);
		const nextSession = toStoredSession(response);

		setSession(nextSession);
		writeStoredAuthSession(nextSession);

		return response;
	};

	const register = async (payload: RegisterPayload) => {
		const response = await registerUser(payload);
		const nextSession = toStoredSession(response);

		setSession(nextSession);
		writeStoredAuthSession(nextSession);

		return response;
	};

	const logout = async () => {
		const currentSession = readStoredAuthSession();

		try {
			if (currentSession?.token && currentSession.token !== "legacy-demo-session") {
				await logoutUser(currentSession.token);
			}
		} finally {
			clearStoredAuthSession();
			setSession(null);
		}
	};

	return {
		user: session?.user ?? null,
		token: session?.token ?? null,
		isLoggedIn: Boolean(session?.user),
		session,
		login,
		register,
		logout,
	};
}
