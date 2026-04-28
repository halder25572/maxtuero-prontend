import { notFound } from "next/navigation";
import PublicPageFrame from "@/components/layout/PublicPageFrame";
import PropertyDetailView from "@/components/properties/PropertyDetailView";
import { FEATURED_PROPERTIES } from "@/lib/constants";

type PropertyDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;

  const property = FEATURED_PROPERTIES.find((item) => item.id === id);

  if (!property) {
    notFound();
  }

  return (
    <PublicPageFrame className="bg-gray-50">
      <PropertyDetailView property={property} />
    </PublicPageFrame>
  );
}