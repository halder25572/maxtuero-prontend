"use client";

import { useEffect, useState } from "react";
import {
	getPropertiesIndex,
	getPropertyById,
	getPropertyTypes,
	type PropertyDetailResponse,
	type PropertyIndexItem,
} from "@/lib/api";

type UsePropertiesResult = {
	properties: PropertyIndexItem[];
	propertyTypes: string[];
	loading: boolean;
	error: string | null;
	refresh: () => Promise<void>;
	fetchPropertyById: (propertyId: string | number, token?: string) => Promise<PropertyDetailResponse>;
};

export default function useProperties(): UsePropertiesResult {
	const [properties, setProperties] = useState<PropertyIndexItem[]>([]);
	const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadProperties = async () => {
		setLoading(true);
		setError(null);

		try {
			const [propertiesResponse, propertyTypesResponse] = await Promise.all([
				getPropertiesIndex(),
				getPropertyTypes(),
			]);

			setProperties(propertiesResponse.data.properties ?? []);
			setPropertyTypes(
				propertyTypesResponse.data.types ??
					propertyTypesResponse.data.property_types ??
					propertyTypesResponse.data.propertyTypes ??
					[],
			);
		} catch (fetchError) {
			setError(fetchError instanceof Error ? fetchError.message : "Failed to fetch properties");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		void loadProperties();
	}, []);

	return {
		properties,
		propertyTypes,
		loading,
		error,
		refresh: loadProperties,
		fetchPropertyById: getPropertyById,
	};
}
