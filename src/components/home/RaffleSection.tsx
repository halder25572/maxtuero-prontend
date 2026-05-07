"use client";

import { useEffect, useState, useRef } from "react";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// API response type
interface RaffleApiResponse {
  success: boolean;
  message: string;
  raffles: Array<{
    id: number;
    thumbnail: string;
    location: string | null;
    title: string;
    price: number;
    start_date: string;
    dead_line: string;
    draw_date: string;
    tickets_sold: number;
    max_tickets: number;
    ticket_price: number;
  }>;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function RaffleSection() {
  const [raffles, setRaffles] = useState<RaffleApiResponse["raffles"]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 12,
    hours: 8,
    minutes: 34,
    seconds: 52,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let isActive = true;

    const fetchRaffles = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL ||
          "https://maxtuero.thenightowl.team";
        const response = await fetch(`${baseUrl}/raffle/index`);

        if (!response.ok) {
          throw new Error(`Failed to fetch raffles: ${response.status}`);
        }

        const data: RaffleApiResponse = await response.json();

        if (!isActive) {
          return;
        }

        if (data.success) {
          setRaffles(data.raffles);
        } else {
          setRaffles([]);
          console.error("API response unsuccessful:", data);
        }
      } catch (error) {
        if (!isActive) {
          return;
        }

        setRaffles([]);
        console.error("Error fetching raffles:", error);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchRaffles();

    return () => {
      isActive = false;
    };
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  // Get the current raffle (first one in the array)
  const currentRaffle = raffles.length > 0 ? raffles[0] : null;

  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { toggleActions: "play none none none" };

      // Heading block
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            ...trigger,
          },
        },
      );

      // Image: slide from left
      gsap.fromTo(
        imageRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            ...trigger,
          },
        },
      );

      // Card: slide from right
      gsap.fromTo(
        cardRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            ...trigger,
          },
        },
      );

      // Countdown boxes: staggered pop in
      const boxes = countdownRef.current?.querySelectorAll(".countdown-box");
      if (boxes) {
        gsap.fromTo(
          boxes,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: "back.out(1.5)",
            stagger: 0.1,
            scrollTrigger: {
              trigger: countdownRef.current,
              start: "top 88%",
              ...trigger,
            },
          },
        );
      }

      // Button
      gsap.fromTo(
        btnRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: btnRef.current,
            start: "top 92%",
            ...trigger,
          },
        },
      );
    }, sectionRef);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-5xl font-bold text-gray-900">
            Win Your Dream Home
          </h2>
          <p className="text-gray-500 text-[20px] font-medium mt-1">
            Participate in Our Property Raffles
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading raffles...</p>
          </div>
        ) : currentRaffle ? (
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div>
              <Image
                src={currentRaffle.thumbnail || "/images/win1.jpg"}
                alt={currentRaffle.title}
                className="object-cover rounded-2xl"
                width={811}
                height={519}
              />
            </div>
            <div className="shadow-[0_25px_50px_-12px_rgba(0,0,0,0.05)] p-[40px] rounded-r-2xl h-[470px]">
              {/* Current Raffle */}
              <span className="text-xs font-semibold text-primary-600 uppercase tracking-widest">
                Current Raffle
              </span>

              {/* Title */}
              <h3 className="font-bold text-2xl text-gray-900 mt-1 mb-1">
                {currentRaffle.title}
              </h3>

              {/* Price */}
              <p className="text-primary-600 font-semibold text-base mb-4">
                Win this {formatPrice(currentRaffle.price)} Property
              </p>

              {/* Tickets Sold */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
                <span>Tickets Sold</span>
                <span>
                  {currentRaffle.tickets_sold} / {currentRaffle.max_tickets}
                </span>
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No raffle has been found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
