"use client";

import { useState } from "react";
import { Raffle } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Ticket, CreditCard } from "lucide-react";

interface TicketPurchaseProps {
  raffle: Raffle;
}

export default function TicketPurchase({ raffle }: TicketPurchaseProps) {
  const [quantity, setQuantity] = useState(1);

  const total = quantity * raffle.ticketPrice;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="font-semibold text-gray-900">Purchase Tickets</h3>

      <div className="bg-primary-50 rounded-xl p-4">
        <p className="text-xs text-gray-500 mb-1">Price per ticket</p>
        <p className="text-primary-600 font-bold text-2xl">{formatPrice(raffle.ticketPrice)}</p>
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-9 h-9 border border-gray-200 rounded-lg text-gray-700 font-semibold hover:border-primary-400 transition-colors"
          >
            −
          </button>
          <span className="text-lg font-semibold text-gray-900 w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(50, q + 1))}
            className="w-9 h-9 border border-gray-200 rounded-lg text-gray-700 font-semibold hover:border-primary-400 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{quantity} ticket{quantity > 1 ? "s" : ""}</span>
          <span>{formatPrice(raffle.ticketPrice)} each</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors">
        <Ticket size={16} />
        Buy {quantity} Ticket{quantity > 1 ? "s" : ""}
      </button>
      <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
        <CreditCard size={11} /> Secure payment — SSL encrypted
      </p>
    </div>
  );
}
