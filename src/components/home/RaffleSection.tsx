"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function RaffleSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 12, hours: 8, minutes: 34, seconds: 52 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-gray-900">Win Your Dream Home</h2>
          <p className="text-gray-500 mt-1">Participate in Our Property Raffles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-50 rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"
            alt="Luxury Villa"
            className="w-full h-80 object-cover"
          />
          <div className="p-8">
            <span className="text-xs font-semibold text-primary-600 uppercase tracking-widest">Current Raffle</span>
            <h3 className="font-display text-2xl font-bold text-gray-900 mt-2 mb-1">
              Luxury Beachfront Villa
            </h3>
            <p className="text-gray-500 text-sm mb-6">Win this {formatPrice(850000)} Villa</p>

            <div className="flex gap-3 mb-6">
              {units.map(({ label, value }) => (
                <div key={label} className="flex-1 bg-navy-DEFAULT text-white rounded-xl p-3 text-center">
                  <p className="font-bold text-2xl">{String(value).padStart(2, "0")}</p>
                  <p className="text-xs text-white/60 mt-1">{label}</p>
                </div>
              ))}
            </div>

            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors">
              Buy Tickets Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
