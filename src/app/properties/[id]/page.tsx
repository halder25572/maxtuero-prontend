import { notFound } from "next/navigation";
import PublicPageFrame from "@/components/layout/PublicPageFrame";
import PropertyDetailView from "@/components/properties/PropertyDetailView";
import { FEATURED_PROPERTIES } from "@/lib/constants";

type PropertyDetailPageProps = {
	params: {
		id: string;
	};
};

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
	const property = FEATURED_PROPERTIES.find((item) => item.id === params.id);

	if (!property) {
		notFound();
	}

	return (
		<PublicPageFrame className="bg-gray-50">
			<PropertyDetailView property={property} />
		</PublicPageFrame>
	);
}
