"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import { getRaffleById, RaffleDetailItem } from "@/lib/api";
import { readStoredAuthSession } from "@/lib/store";

/* ─── Countdown hook ─── */
function useCountdown(targetDate: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return t;
}

function isCountdownFinished({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  return days === 0 && hours === 0 && minutes === 0 && seconds === 0;
}

const pad = (n: number) => String(n).padStart(2, "0");

type BuyTicketResponse = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

/* ─── Part 2: Draw countdown box ─── */
const DrawBox = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-blue-600 rounded-2xl flex flex-col items-center justify-center py-6 px-4 min-w-[100px]">
    <span className="text-4xl font-bold text-white leading-none">{value}</span>
    <span className="text-xs text-blue-200 tracking-widest uppercase mt-2">
      {label}
    </span>
  </div>
);

/* ─── Part 4: How It Works step ─── */
const Step = ({
  number,
  icon,
  title,
  desc,
}: {
  number: number;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="flex flex-col items-center text-center space-y-3 max-w-[250px]">
    <div className="relative">
      <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white">
        {icon}
      </div>
      <span className="absolute -top-1 -right-0 w-10 h-10 py-[8px] bg-white text-blue-600 text-[16px] font-bold rounded-full flex items-center justify-center">
        {number}
      </span>
    </div>
    <h4 className="text-[20px] font-bold text-black">{title}</h4>
    <p className="text-[14px] text-[#4B5563]">{desc}</p>
  </div>
);

/* ─── Part 5: Winner card ─── */
const WinnerCard = ({
  name,
  date,
  prize,
  prizeValue,
  location,
  image,
}: {
  name: string;
  date: string;
  prize: string;
  prizeValue: string;
  location: string;
  image: string;
}) => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
    <div className="relative w-full h-[256px]">
      <Image src={image} alt={name} fill className="w-[362px]" />
      <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        Winner
      </span>
    </div>
    <div className="p-4 space-y-3">
      <div>
        <h3 className="text-base font-bold text-gray-900">{name}</h3>
        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {date}
        </p>
      </div>
      <div className="bg-blue-50 rounded-xl px-3 py-2.5">
        <p className="text-[11px] text-gray-400 mb-0.5">Prize Won</p>
        <p className="text-xs font-semibold text-gray-800">{prize}</p>
        <p className="text-base font-bold text-blue-600 mt-0.5">{prizeValue}</p>
      </div>
      <p className="text-xs text-gray-400 flex items-center gap-1">
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {location}
      </p>
    </div>
  </div>
);

/* ─── Main Page ─── */
export default function DetailsPage() {
  const params = useParams<{ id: string }>();
  const [raffle, setRaffle] = useState<RaffleDetailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deadlineDate = useMemo(
    () =>
      raffle && raffle.dead_line
        ? new Date(raffle.dead_line)
        : new Date(
            Date.now() + 12 * 86400000 + 8 * 3600000 + 28 * 60000 + 34000,
          ),
    [raffle],
  );
  const drawDate = useMemo(
    () =>
      raffle && raffle.draw_date
        ? new Date(raffle.draw_date)
        : new Date(
            Date.now() + 14 * 86400000 + 8 * 3600000 + 28 * 60000 + 34000,
          ),
    [raffle],
  );

  const deadlineCountdown = useCountdown(deadlineDate);
  const drawCountdown = useCountdown(drawDate);

  const deadlineFinished = isCountdownFinished(deadlineCountdown);
  const drawFinished = isCountdownFinished(drawCountdown);

  // Determine which countdown to show
  const currentCountdown = deadlineFinished ? drawCountdown : deadlineCountdown;
  const countdownLabel = deadlineFinished ? "Draw" : "Deadline";

  const [tickets, setTickets] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [purchaseForm, setPurchaseForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isSubmittingPurchase, setIsSubmittingPurchase] = useState(false);
  const pricePerTicket = raffle?.ticket_price || 50;
  const liveStarted = drawFinished;

  const handlePurchaseInputChange = (
    field: keyof typeof purchaseForm,
    value: string,
  ) => {
    setPurchaseForm((current) => ({ ...current, [field]: value }));
  };

  const handleBuyTickets = async () => {
    if (!params.id) {
      toast.error("Raffle ID is missing");
      return;
    }

    if (
      !purchaseForm.name.trim() ||
      !purchaseForm.email.trim() ||
      !purchaseForm.phone.trim() ||
      !purchaseForm.address.trim()
    ) {
      toast.error("Please complete all required fields");
      return;
    }

    if (!agreed) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://maxtuero.thenightowl.team/api";

    setIsSubmittingPurchase(true);

    try {
      const session = readStoredAuthSession();
      let token = session?.token || "";

      if (!token) {
        const authData = localStorage.getItem("expovivienda_auth_session");
        if (authData) {
          token = JSON.parse(authData)?.token || "";
        }
      }

      if (!token) {
        token = localStorage.getItem("auth_token") || "";
      }

      if (!token) {
        toast.error("Please log in to purchase tickets");
        return;
      }

      const response = await fetch(
        `${baseUrl}/raffle/${params.id}/buy-ticket`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ticket_count: tickets,
            name: purchaseForm.name.trim(),
            email: purchaseForm.email.trim(),
            phone: purchaseForm.phone.trim(),
            address: purchaseForm.address.trim(),
          }),
        },
      );

      const data: BuyTicketResponse | null = await response
        .json()
        .catch(() => null);

      const message =
        data?.message ||
        (response.ok
          ? "Tickets purchased successfully"
          : "Failed to purchase tickets");

      if (!response.ok || !data || data.success === false) {
        toast.error(message);
        return;
      }

      toast.success(message);
      setPurchaseForm({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      setTickets(1);
      setAgreed(false);
    } catch (purchaseError) {
      const message =
        purchaseError instanceof Error
          ? purchaseError.message
          : "Failed to purchase tickets";
      toast.error(message);
    } finally {
      setIsSubmittingPurchase(false);
    }
  };

  // Fetch raffle data
  useEffect(() => {
    const fetchRaffle = async () => {
      if (!params.id) return;

      try {
        setLoading(true);
        const data = await getRaffleById(params.id);
        setRaffle(data.raffle);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load raffle");
      } finally {
        setLoading(false);
      }
    };

    fetchRaffle();
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#f0f2f5] pt-16 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Loading raffle details...</p>
          </div>
        </main>
      </>
    );
  }

  if (error || !raffle) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#f0f2f5] pt-16 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">{error || "Raffle not found"}</p>
          </div>
        </main>
      </>
    );
  }

  if (liveStarted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#f0f2f5] pt-16">
          <section className="flex min-h-[calc(100vh-4rem)] items-start justify-center px-4 py-6 sm:px-6">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="relative min-h-[420px]">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
                  alt="Santo Domingo Penthouse"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/45" />

                <div className="absolute inset-0 flex items-center justify-center px-4">
                  <div className="w-full max-w-md rounded-2xl bg-black/30 p-6 text-center text-white backdrop-blur-sm">
                    <span className="mx-auto mb-4 inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      Live Now
                    </span>
                    <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                      {raffle.title}
                    </h1>
                    <p className="mt-2 text-sm text-blue-50">
                      The live draw has started. Watch the result and ticket
                      updates here.
                    </p>
                    {raffle.live_stream_url ? (
                      <a
                        href={raffle.live_stream_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
                      >
                        Watch Live
                      </a>
                    ) : (
                      <button
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-gray-400 px-6 py-3 text-sm font-semibold text-white shadow-lg cursor-not-allowed"
                        disabled
                      >
                        Live Stream Not Available
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#f0f2f5] min-h-screen mt-16">
        {/* ══════════════════════════════════════
          PART 1 — Top Card
      ══════════════════════════════════════ */}
        <section className="flex items-center justify-center p-6 pb-0">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden grid md:grid-cols-2 max-w-4xl w-full">
            {/* Image */}
            <div className="relative min-h-[380px]">
              <Image
                src={
                  raffle.thumbnail ||
                  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
                }
                alt={raffle.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Grand Prize
              </div>
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col justify-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  {raffle.title}
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  {raffle.bedrooms} Bed &nbsp;·&nbsp; {raffle.bathrooms} Bath
                  &nbsp;·&nbsp; {raffle.area} m²
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Estimated value</p>
                <p className="text-4xl font-extrabold text-gray-900 tracking-tight">
                  ${raffle.price.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {countdownLabel} ends in
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { val: pad(currentCountdown.days), lbl: "Days" },
                    { val: pad(currentCountdown.hours), lbl: "Hours" },
                    { val: pad(currentCountdown.minutes), lbl: "Min" },
                    { val: pad(currentCountdown.seconds), lbl: "Sec" },
                  ].map(({ val, lbl }) => (
                    <div
                      key={lbl}
                      className="bg-[#f0f4ff] rounded-xl py-2.5 text-center"
                    >
                      <p className="text-xl font-bold text-gray-900 leading-none">
                        {val}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">{lbl}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-gray-800">
                    Tickets sold
                  </span>
                  <span className="font-semibold text-gray-800">
                    {Math.round(
                      (raffle.tickets_sold / raffle.max_tickets) * 100,
                    )}
                    %
                  </span>
                </div>
                <div className="w-full h-[5px] bg-gray-200 rounded-full">
                  <div
                    className="h-[5px] bg-blue-600 rounded-full"
                    style={{
                      width: `${(raffle.tickets_sold / raffle.max_tickets) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{raffle.tickets_sold.toLocaleString()} entries</span>
                  <span>{raffle.max_tickets.toLocaleString()} max</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Tickets:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTickets(Math.max(1, tickets - 1))}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 font-bold hover:bg-gray-50 transition"
                  >
                    −
                  </button>
                  <span className="text-sm font-semibold text-gray-900 w-4 text-center">
                    {tickets}
                  </span>
                  <button
                    onClick={() => setTickets(tickets + 1)}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 font-bold hover:bg-gray-50 transition"
                  >
                    +
                  </button>
                  <span className="text-sm font-semibold text-gray-900">
                    ${tickets * pricePerTicket} total
                  </span>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                Secure My Entry — ${tickets * pricePerTicket}
              </button>
              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Verified drawing process • Winner announced live
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
          PART 2 — Draw Date Countdown
      ══════════════════════════════════════ */}
        <section className="py-14 px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {countdownLabel} Countdown
          </h2>
          <p className="text-sm text-gray-400 mt-2 mb-8">
            {deadlineFinished
              ? `The winner will be announced on ${new Date(raffle.draw_date).toLocaleDateString()}`
              : `The deadline ends on ${new Date(raffle.dead_line).toLocaleDateString()}`}
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <DrawBox value={pad(currentCountdown.days)} label="Days" />
            <DrawBox value={pad(currentCountdown.hours)} label="Hours" />
            <DrawBox value={pad(currentCountdown.minutes)} label="Minutes" />
            <DrawBox value={pad(currentCountdown.seconds)} label="Seconds" />
          </div>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl px-6 py-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-gray-900">
                Tickets Sold
              </span>
              <span className="text-sm font-bold text-blue-600">
                {raffle.tickets_sold.toLocaleString()} /{" "}
                {raffle.max_tickets.toLocaleString()}
              </span>
            </div>
            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-blue-600 rounded-full"
                style={{
                  width: `${(raffle.tickets_sold / raffle.max_tickets) * 100}%`,
                }}
              />
              <span className="absolute left-[68%] top-1/2 -translate-y-1/2 text-[9px] text-white font-bold">
                {Math.round((raffle.tickets_sold / raffle.max_tickets) * 100)}%
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Only {(raffle.max_tickets - raffle.tickets_sold).toLocaleString()}{" "}
              tickets remaining!
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════
          PART 3 — Purchase Form
      ══════════════════════════════════════ */}
        <section className="py-4 px-6 flex justify-center bg-[#eef1f8]">
          <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-gray-900">
                Purchase Your Tickets
              </h2>
              <p className="text-sm text-gray-400">
                Each ticket costs ${raffle.ticket_price}. The more tickets you
                buy, better your chances!
              </p>
            </div>

            {/* Counter */}
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-3">
                Number of Tickets
              </p>
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => setTickets(Math.max(1, tickets - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 text-xl font-light hover:bg-gray-50 transition"
                >
                  −
                </button>
                <span className="text-3xl font-bold text-blue-600 w-8 text-center">
                  {tickets}
                </span>
                <button
                  onClick={() => setTickets(tickets + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 text-xl font-light hover:bg-gray-50 transition"
                >
                  +
                </button>
              </div>
              <div className="text-center mt-3">
                <p className="text-xs text-gray-400">Total Price</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${tickets * pricePerTicket}
                </p>
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">
                  Full Name <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={purchaseForm.name}
                  onChange={(e) =>
                    handlePurchaseInputChange("name", e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">
                  Email Address <span className="text-blue-600">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={purchaseForm.email}
                  onChange={(e) =>
                    handlePurchaseInputChange("email", e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">
                  Phone Number <span className="text-blue-600">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 (609) 000-0000"
                  value={purchaseForm.phone}
                  onChange={(e) =>
                    handlePurchaseInputChange("phone", e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">
                  Full Adress <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={purchaseForm.address}
                  onChange={(e) =>
                    handlePurchaseInputChange("address", e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-blue-600 flex-shrink-0"
              />
              <span className="text-xs text-gray-500 leading-relaxed">
                I agree to the terms and conditions and confirm that I am 18
                years or older. I understand that the draw is final and legally
                binding.
              </span>
            </label>

            {/* Button */}
            <button
              type="button"
              onClick={handleBuyTickets}
              disabled={isSubmittingPurchase}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              {isSubmittingPurchase
                ? "Processing..."
                : `Purchase Tickets - $${tickets * pricePerTicket}`}
            </button>

            {/* Security */}
            <div className="flex justify-center gap-6 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Secure Payment
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                SSL Encrypted
              </span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
          PART 4 — How It Works
      ══════════════════════════════════════ */}
        <section className="py-16 px-6 bg-white text-center">
          <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
          <p className="text-sm text-gray-400 mt-2 mb-12 max-w-md mx-auto">
            Participating in our raffle is simple and transparent. Follow these
            easy steps to enter.
          </p>
          <div className="flex flex-wrap justify-center gap-10">
            <Step
              number={1}
              title="Purchase Tickets"
              desc={`Choose how many tickets you want to purchase. Each ticket is $${raffle.ticket_price} and gives you a chance to win.`}
              icon={
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              }
            />
            <Step
              number={2}
              title="Get Your Numbers"
              desc="Receive your unique raffle numbers via email immediately after purchase confirmation."
              icon={
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
            />
            <Step
              number={3}
              title="Wait for Draw"
              desc="The draw will be conducted live and streamed on our social media channels on specified date."
              icon={
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              }
            />
            <Step
              number={4}
              title="Win Your Dream Home"
              desc="If your number is drawn, we'll contact you immediately and handle all the legal transfer paperwork."
              icon={
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              }
            />
          </div>
        </section>

        {/* ══════════════════════════════════════
          PART 5 — Our Happy Winners
      ══════════════════════════════════════ */}
        <section className="py-16 px-6 bg-[#f0f2f5]">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900">
              Our Happy Winners
            </h2>
            <p className="text-sm text-[#4B5563] mt-[19px] max-w-sm mx-auto">
              Join the growing list of people who have won their dream homes
              through ExpoVivienda raffles.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <WinnerCard
              name="María González"
              date="December 2024"
              prize="2-Bedroom Apartment in Bella Vista"
              prizeValue="$180,000"
              location="Bella Vista, Santo Domingo"
              image="/images/d1.jpg"
            />
            <WinnerCard
              name="Carlos Rodriguez"
              date="October 2024"
              prize="3-Bedroom House in Santiago"
              prizeValue="$220,000"
              location="Santiago de los Caballeros"
              image="/images/d2.jpg"
            />
            <WinnerCard
              name="Ana Martinez"
              date="August 2024"
              prize="Luxury Condo in Punta Cana"
              prizeValue="$280,000"
              location="Punta Cana"
              image="/images/d3.jpg"
            />
            <WinnerCard
              name="Roberto Pérez"
              date="June 2024"
              prize="2-Bedroom Apartment in Naco"
              prizeValue="$165,000"
              location="Naco, Santo Domingo"
              image="/images/d4.jpg"
            />
            <WinnerCard
              name="Luisa Fernández"
              date="April 2024"
              prize="Beach House in Las Terrenas"
              prizeValue="$320,000"
              location="Las Terrenas, Samaná"
              image="/images/d5.jpg"
            />
            <WinnerCard
              name="José Ramirez"
              date="February 2024"
              prize="3-Bedroom Apartment in La Esperilla"
              prizeValue="$195,000"
              location="La Esperilla, Santo Domingo"
              image="/images/d6.jpg"
            />
          </div>
        </section>
      </main>
      <CTASection />
      <Footer />
    </>
  );
}
