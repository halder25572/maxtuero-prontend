import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyDetail from "@/components/properties/PropertyDetail";
import { ALL_PROPERTIES } from "@/lib/constants";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ALL_PROPERTIES.map((p) => ({ id: p.id }));
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = ALL_PROPERTIES.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  return (
    <main>
      <Navbar />
      <div className="pt-16 bg-gray-50 min-h-screen">
        <PropertyDetail property={property} />
      </div>
      <Footer />
    </main>
  );
}
