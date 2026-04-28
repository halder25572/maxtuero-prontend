import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AGENTS } from "@/lib/constants";
import AgentProfile from "@/components/section/Agentss/AgentProfile";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AgentDetailPage({ params }: Props) {
  const { id } = await params;
  const agent = AGENTS.find((a) => a.id === id);
  if (!agent) notFound();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-24">
        <AgentProfile agent={agent} />
      </div>
      <Footer />
    </>
  );
}