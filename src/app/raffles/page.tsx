import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RaffleGrid from "@/components/raffles/RaffleGrid";
import { RAFFLES } from "@/lib/constants";

export default function RafflesPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-gray-900">Property Raffles</h1>
            <p className="text-gray-500 mt-1">
              Win your dream property — buy a ticket and enter the raffle
            </p>
          </div>
          <RaffleGrid raffles={RAFFLES} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
