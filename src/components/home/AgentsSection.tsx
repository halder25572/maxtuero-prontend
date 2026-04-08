import { Star } from "lucide-react";
import { AGENTS } from "@/lib/constants";
import Image from "next/image";

export default function AgentsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-5xl font-bold text-black">Meet Our Expert Agents</h2>
          <p className="text-[#4B5563] mt-1 text-[20px]">Connect with licensed professionals</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="bg-[radial-gradient(114.09%_141.5%_at_100%_0%,rgba(30,64,175,0)_0%,rgba(30,64,175,0.05)_100%)] h-[420px] rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
            >
              {/* Avatar */}
              <Image
                src={agent.avatar}
                alt={agent.name}
                width={80}
                height={80}
                className="rounded-full object-cover mx-auto mb-4 border-4 border-white bg-[url('/path-to-your-image.jpg')] bg-[lightgray] bg-cover bg-no-repeat bg-center
           shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]"
              />

              {/* Name */}
              <h3 className="font-bold text-gray-900 text-base mt-[20px]">{agent.name}</h3>

              {/* Company */}
              <p className="text-[#4B5563] text-[14px] font-semibold mt-2">{agent.title}</p>
              <p className="text-[12px] font-medium text-[#1E40AF] mt-[14px] mb-[29px]">{agent.designation}</p>
              

              {/* Stats */}
              <div className="flex justify-around text-center mb-5">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{agent.listings}</p>
                  <p className="text-gray-400 text-xs">Properties</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{agent.sales}</p>
                  <p className="text-gray-400 text-xs">Sales</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <p className="font-bold text-gray-900 text-sm">{agent.rating}</p>
                  </div>
                  <p className="text-gray-400 text-xs">Rating</p>
                </div>
              </div>

              {/* Button */}
              <button className="w-full bg-primary-600 mt-[24px] hover:bg-primary-700 text-white text-sm font-semibold py-2.5 rounded-full transition-colors">
                Contact Agent
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
