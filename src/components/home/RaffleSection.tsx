"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

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
          <h2 className="font-display text-5xl font-bold text-gray-900">Win Your Dream Home</h2>
          <p className="text-gray-500 text-[20px] font-medium mt-1">Participate in Our Property Raffles</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <Image
            src="/images/win1.jpg"
            alt="Luxury Villa"
            className="object-cover rounded-2xl"
            width={811}
            height={519}
          />
          <div className="shadow-[0_25px_50px_-12px_rgba(0,0,0,0.05)] p-[40px] rounded-r-2xl h-[470px]">
            {/* Current Raffle */}
            <span className="text-xs font-semibold text-primary-600 uppercase tracking-widest">
              Current Raffle
            </span>

            {/* Title */}
            <h3 className="font-bold text-2xl text-gray-900 mt-1 mb-1">
              Luxury Beachfront Villa
            </h3>

            {/* Price */}
            <p className="text-primary-600 font-semibold text-base mb-4">
              Win this {formatPrice(850000)} Villa
            </p>

            {/* Tickets Sold */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
              <span>Tickets Sold</span>
              <span>2,847 / 5,000</span>
            </div>

            {/* Countdown */}
            <div className="flex gap-3 mb-5">
              {units.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex-1 bg-blue-50 rounded-xl py-3 text-center"
                >
                  <p className="font-bold text-xl text-primary-600">
                    {String(value).padStart(2, "0")}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Button */}
            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 rounded-full transition-colors mb-3">
              Buy Tickets Now
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-5 text-xs text-gray-400">
              <span>⊙ Secure</span>
              <span>⊙ Licensed</span>
              <span>✓ Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
