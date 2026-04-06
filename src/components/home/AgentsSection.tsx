import { Star } from "lucide-react";
import { AGENTS } from "@/lib/constants";

export default function AgentsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-gray-900">Meet Our Expert Agents</h2>
          <p className="text-gray-500 mt-1">Connect with licensed professionals</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
              />
              <h3 className="font-semibold text-gray-900 text-sm">{agent.name}</h3>
              <p className="text-gray-400 text-xs mt-0.5 mb-3">{agent.title}</p>

              <div className="flex items-center justify-center gap-1 mb-4">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-semibold text-gray-700">{agent.rating}</span>
              </div>

              <div className="flex justify-around text-center border-t border-gray-100 pt-4 mb-4">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{agent.listings}</p>
                  <p className="text-gray-400 text-xs">Listings</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{agent.sales}</p>
                  <p className="text-gray-400 text-xs">Sales</p>
                </div>
              </div>

              <button className="w-full border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white text-xs font-semibold py-2 rounded-lg transition-colors">
                Contact Agent
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
