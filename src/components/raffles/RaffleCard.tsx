"use client";

import Link from "next/link";
import { MapPin, Ticket, Clock } from "lucide-react";
import { Raffle } from "@/types";
import { formatPrice } from "@/lib/utils";
import { getTimeRemaining } from "@/lib/utils";

interface RaffleCardProps {
  raffle: Raffle;
}

export default function RaffleCard({ raffle }: RaffleCardProps) {
  const { days, hours } = getTimeRemaining(raffle.endDate);
  const progress = Math.round((raffle.soldTickets / raffle.totalTickets) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={raffle.property.images[0]}
          alt={raffle.property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-gold text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          🎫 Active Raffle
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
          {raffle.property.title}
        </h3>
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
          <MapPin size={12} />
          <span>{raffle.property.location}</span>
        </div>

        {/* Property Value */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-500">Property Value</p>
            <p className="text-primary-600 font-bold text-lg">{formatPrice(raffle.property.price)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Ticket Price</p>
            <p className="text-gray-900 font-bold text-lg">{formatPrice(raffle.ticketPrice)}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span className="flex items-center gap-1">
              <Ticket size={11} /> {raffle.soldTickets.toLocaleString()} sold
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1 text-right">
            of {raffle.totalTickets.toLocaleString()} tickets
          </p>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
          <Clock size={12} />
          <span>{days}d {hours}h remaining</span>
        </div>

        <Link
          href={`/raffles/${raffle.id}`}
          className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
        >
          Buy Tickets
        </Link>
      </div>
    </div>
  );
}
