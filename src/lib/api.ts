// Central API layer keeps backend calls in one place for reuse and easier debugging.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
  phone?: string | null;
  premium?: number;
};

export type AuthSessionResponse = {
  success: boolean;
  status: boolean;
  message: string;
  code: number;
  exception_file: string | null;
  exception_path: string | null;
  data: {
    user: AuthUser;
    authorisation: {
      token: string;
      type: string;
    };
  };
  errors?: Record<string, string[]>;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: "user" | "agent";
};

export type RegisterResponse = {
  success: boolean;
  status: boolean;
  message: string;
  code: number;
  exception_file: string | null;
  exception_path: string | null;
  errors?: Record<string, string[]>;
  data: AuthSessionResponse["data"];
};

function getFirstApiErrorMessage(
  data: { message?: string; errors?: Record<string, string[]> } | null,
  fallback: string,
): string {
  const firstError = data?.errors
    ? Object.values(data.errors).find((messages) => messages?.length)?.[0]
    : undefined;

  return firstError ?? data?.message ?? fallback;
}

// for registration and eventually other auth-related API calls like login, password reset, etc.
export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as RegisterResponse | null;

  if (!response.ok || !data) {
    throw new Error(getFirstApiErrorMessage(data, "Registration failed"));
  }

  return data;
}


// for login type
export type LoginPayload = {
  email: string;
  password: string;
};

// for login api call
export async function loginUser(payload: LoginPayload): Promise<AuthSessionResponse> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as AuthSessionResponse | null;

  if (!response.ok || !data) {
    throw new Error(getFirstApiErrorMessage(data, "Login failed"));
  }

  return data;
}

export type LogoutResponse = {
  success: boolean;
  status: boolean;
  message: string;
  code: number;
  exception_file: string | null;
  exception_path: string | null;
  errors?: Record<string, string[]>;
  data: Record<string, string>;
};

export type ProfileUser = {
  id: number;
  name: string;
  email: string;
  role: "user" | "agent" | "admin" | string;
  avatar: string | null;
  bio: string | null;
  address?: string | null;
  phone?: string | null;
  birth_date?: string | null;
  created_at: string;
};

export type ProfileGetResponse = {
  success: boolean;
  data: {
    user: ProfileUser;
  };
  message?: string;
  errors?: Record<string, string[]>;
};

export type ProfileUpdatePayload = {
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  birth_date?: string | null;
};

export type ProfileUpdateResponse = {
  success: boolean;
  status: boolean;
  message: string;
  code: number;
  exception_file: string | null;
  exception_path: string | null;
  errors?: Record<string, string[]>;
  data: {
    name: string;
    email: string;
    avatar: string | null;
    address: string | null;
    phone: string | null;
    birth_date: string | null;
  };
};

export type AgentListItem = {
  id: number;
  name: string;
  avatar: string;
};

export type AgentsResponse = {
  success: boolean;
  message: string;
  data: {
    agents: AgentListItem[];
    stats: {
      total_agents: number;
      total_properties: number;
    };
  };
  errors?: Record<string, string[]>;
};

export type AgentProperty = {
  id: number;
  title: string;
  price: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  thumbnail: string;
};

export type AgentDetail = {
  id: number;
  name: string;
  avatar: string;
  bio: string | null;
  properties: AgentProperty[];
};

export type AgentDetailResponse = {
  success: boolean;
  message: string;
  data: {
    agent: AgentDetail;
  };
  errors?: Record<string, string[]>;
};

export type PropertyCreatePayload = {
  title: string;
  sales_type: SalesType;
  bedrooms: number;
  bathrooms: number;
  property_type_id: number;
  area: number;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  latitude: number;
  longitude: number;
};

export const SALES_TYPES = ["raffle", "sales", "fair"] as const;
export type SalesType = typeof SALES_TYPES[number];

export type StorePropertyPayload = {
  title: string;
  sales_type: SalesType;
  property_type_id: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type StorePropertyResponse = {
  success: boolean;
  data: {
    property_id: number;
  };
  message?: string;
  status?: boolean;
  code?: number;
  exception_file?: string | null;
  exception_path?: string | null;
  errors?: Record<string, string[]>;
};

export type UpdatePropertyPriceResponse = {
  success: boolean;
  data: {
    property_id: number;
    new_price: number;
  };
  message?: string;
  status?: boolean;
  code?: number;
  exception_file?: string | null;
  exception_path?: string | null;
  errors?: Record<string, string[]>;
};

export type PropertyIndexItem = {
  id: number;
  title: string;
  price: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  thumbnail: string;
};

export type PropertyIndexResponse = {
  success: boolean;
  data: {
    properties: PropertyIndexItem[];
  };
  message?: string;
  status?: boolean;
  code?: number;
  exception_file?: string | null;
  exception_path?: string | null;
  errors?: Record<string, string[]>;
};

export type PropertyDetailApiItem = {
  id?: number | string;
  property_id?: number | string;
  title?: string;
  price?: string | number;
  address?: string;
  city?: string;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  area?: number;
  description?: string;
  listing_type?: string;
  type?: string;
  status?: string;
  featured?: boolean | number;
  agent_id?: number | string;
  image?: string;
  thumbnail?: string;
  images?: string[];
  amenities?: string[];
  created_at?: string;
  [key: string]: unknown;
};

export type PropertyDetailResponse = {
  success?: boolean;
  status?: boolean | string;
  message?: string;
  code?: number;
  data?: {
    property?: PropertyDetailApiItem;
    data?: PropertyDetailApiItem;
    [key: string]: unknown;
  } | PropertyDetailApiItem;
  errors?: Record<string, string[]>;
  exception_file?: string | null;
  exception_path?: string | null;
};

export type PropertyTypesResponse = {
  success: boolean;
  data: {
    types?: string[];
    property_types?: string[];
    propertyTypes?: string[];
    [key: string]: unknown;
  };
  message?: string;
  status?: boolean;
  code?: number;
  exception_file?: string | null;
  exception_path?: string | null;
  errors?: Record<string, string[]>;
};

export async function logoutUser(token?: string): Promise<LogoutResponse> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = (await response.json().catch(() => null)) as LogoutResponse | null;

  if (!response.ok || !data) {
    throw new Error(getFirstApiErrorMessage(data, "Logout failed"));
  }

  return data;
}

export async function getUserProfile(token?: string): Promise<ProfileGetResponse> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}/user/profile-get`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = (await response.json().catch(() => null)) as ProfileGetResponse | null;

  if (!response.ok || !data || !data.success) {
    throw new Error(getFirstApiErrorMessage(data, "Failed to fetch profile"));
  }

  return data;
}

export async function updateUserProfile(
  payload: ProfileUpdatePayload,
  token?: string,
): Promise<ProfileUpdateResponse> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}/user/profile-update`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as ProfileUpdateResponse | null;

  if (!response.ok || !data || !data.success) {
    throw new Error(getFirstApiErrorMessage(data, "Failed to update profile"));
  }

  return data;
}

export async function getAgents(): Promise<AgentsResponse> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}/agent/get-agents`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = (await response.json().catch(() => null)) as AgentsResponse | null;

  if (!response.ok || !data || !data.success) {
    throw new Error(getFirstApiErrorMessage(data, "Failed to fetch agents"));
  }

  return data;
}

export async function getAgentById(agentId: string | number): Promise<AgentDetailResponse> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}/agent/${agentId}/get-by-id`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = (await response.json().catch(() => null)) as AgentDetailResponse | null;

  if (!response.ok || !data || !data.success) {
    throw new Error(getFirstApiErrorMessage(data, "Failed to fetch agent"));
  }

  return data;
}

export async function storeProperty(
  payload: StorePropertyPayload,
  token?: string,
): Promise<StorePropertyResponse> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}/property/store`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as StorePropertyResponse | null;

  if (!response.ok || !data || !data.success) {
    throw new Error(getFirstApiErrorMessage(data, "Failed to store property"));
  }

  return data;
}

export async function updatePropertyPrice(
  propertyId: string | number,
  newPrice: number,
  token?: string,
): Promise<UpdatePropertyPriceResponse> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}/property/${propertyId}/update-price`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ new_price: newPrice }),
  });

  const data = (await response.json().catch(() => null)) as UpdatePropertyPriceResponse | null;

  if (!response.ok || !data || !data.success) {
    throw new Error(getFirstApiErrorMessage(data, "Failed to update property price"));
  }

  return data;
}

export async function getPropertiesIndex(): Promise<PropertyIndexResponse> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}/property/index`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = (await response.json().catch(() => null)) as PropertyIndexResponse | null;

  if (!response.ok || !data || !data.success) {
    throw new Error(getFirstApiErrorMessage(data, "Failed to fetch properties"));
  }

  return data;
}

export async function getPropertyById(propertyId: string | number, token?: string): Promise<PropertyDetailResponse> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}/property/${propertyId}/get`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = (await response.json().catch(() => null)) as PropertyDetailResponse | null;

  if (!response.ok || !data || data.success === false || data.status === "error") {
    throw new Error(getFirstApiErrorMessage(data as { message?: string; errors?: Record<string, string[]> } | null, "Property not found"));
  }

  return data;
}

export async function getPropertyTypes(): Promise<PropertyTypesResponse> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}/property/types`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = (await response.json().catch(() => null)) as PropertyTypesResponse | null;

  if (!response.ok || !data || !data.success) {
    throw new Error(getFirstApiErrorMessage(data, "Failed to fetch property types"));
  }

  return data;
}