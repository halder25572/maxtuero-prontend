"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/userDashboard/DashboardLayout";
import { useDashboard } from "@/contexts/DashboardContext";

const ticketItems = [
  {
    id: 1,
    title: "Oceanview Luxury Villa",
    location: "Malibu, CA",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900",
    raffleDrawDate: "2026-05-15",
    ticketNumber: "RAF-2024-001",
    winner: true,
  },
  {
    id: 2,
    title: "Miami Waterfront Condo",
    location: "Miami Beach, FL",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900",
    raffleDrawDate: "2026-05-20",
    ticketNumber: "RAF-2024-002",
    winner: false,
  },
  {
    id: 3,
    title: "Aspen Mountain Chalet",
    location: "Aspen, CO",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=900",
    raffleDrawDate: "2026-05-25",
    ticketNumber: "RAF-2024-003",
    winner: false,
  },
  {
    id: 4,
    title: "Scottsdale Desert Retreat",
    location: "Scottsdale, AZ",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14b4f?w=900",
    raffleDrawDate: "2026-05-30",
    ticketNumber: "RAF-2024-004",
    winner: true,
  },
];

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function RaffleTickets() {
  const { profile } = useDashboard();

  return (
    <DashboardLayout
      ticketsCount={profile?.tickets_count || 0}
      savedCount={profile?.saved_properties_count || 0}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Raffle Tickets</h1>
          <p className="text-gray-400 text-sm mt-0.5">{ticketItems.length} tickets available</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-100">
              {["Property", "Raffle Draw Date", "Ticket Number", "Winner"].map((col) => (
                <th
                  key={col}
                  className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 py-3"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {ticketItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                {/* Property */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-11 h-11 rounded-xl object-cover shrink-0"
                    />
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  </div>
                </td>

                {/* Raffle Draw Date */}
                <td className="px-4 py-4">
                  <p className="font-semibold text-gray-900 text-sm">{formatDate(item.raffleDrawDate)}</p>
                </td>

                {/* Ticket Number */}
                <td className="px-4 py-4">
                  <p className="font-mono text-sm text-gray-900 font-medium">{item.ticketNumber}</p>
                </td>

                {/* Winner */}
                <td className="px-4 py-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      item.winner ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {item.winner ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}