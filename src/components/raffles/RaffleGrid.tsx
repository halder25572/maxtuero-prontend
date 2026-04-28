import { Raffle } from "@/types";
import RaffleCard from "./RaffleCard";

interface RaffleGridProps {
  raffles: Raffle[];
}

export default function RaffleGrid({ raffles }: RaffleGridProps) {
  if (raffles.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg font-semibold">No active raffles</p>
        <p className="text-sm mt-1">Check back soon for upcoming raffles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {raffles.map((raffle) => (
        <RaffleCard key={raffle.id} raffle={raffle} />
      ))}
    </div>
  );
}
