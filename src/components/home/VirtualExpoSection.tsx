import { ul } from "framer-motion/client";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VirtualExpoSection() {
  const features = [
    "Live property tours",
    "Meet developers",
    "Exclusive deals",
    "Interactive Q&A",
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-[#0F172A] mb-4">
              Experience Virtual Property Fairs
            </h2>
            <p className="text-gray-600 mb-6">
              Join our innovative virtual real estate expos and explore hundreds of properties from
              the comfort of your home. Connect with developers, attend live tours, and discover
              exclusive deals available only during our events.
            </p>
            <ul className="space-y-3 mb-8 grid grid-cols-2 gap-3">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-gray-700 text-[20px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 20C11.36 20 12.66 19.74 13.9 19.22C15.0867 18.7133 16.1433 17.9967 17.07 17.07C17.9967 16.1433 18.7133 15.0867 19.22 13.9C19.74 12.66 20 11.36 20 10C20 8.64 19.74 7.34 19.22 6.1C18.7133 4.91333 17.9967 3.85667 17.07 2.93C16.1433 2.00333 15.0867 1.28667 13.9 0.780001C12.66 0.26 11.36 0 10 0C8.64 0 7.34 0.26 6.1 0.780001C4.91333 1.28667 3.85667 2.00333 2.93 2.93C2.00333 3.85667 1.28667 4.91333 0.78 6.1C0.26 7.34 0 8.64 0 10C0 11.36 0.26 12.66 0.78 13.9C1.28667 15.0867 2.00333 16.1433 2.93 17.07C3.85667 17.9967 4.91333 18.7133 6.1 19.22C7.34 19.74 8.64 20 10 20ZM15.46 7.46L9 13.92L4.8 9.7L6.2 8.3L9 11.08L14.04 6.04L15.46 7.46Z" fill="#10B981" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/virtual-expo"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white text-[16px] font-bold px-6 py-3 rounded-[999px] transition-colors"
            >
              Explore Current Expos
            </Link>
          </div>

          <div className="relative">
            <Image
              src="/images/exper1.jpg"
              alt="Virtual Expo"
              className="rounded-2xl shadow-xl object-cover"
              width={492}
              height={572}
            />
            <div className="absolute bottom-[32px] right-36 bg-white rounded-xl px-4 py-3 shadow-lg text-center">
              <p className="text-xs text-gray-500">Next Expo</p>
              <p className="font-bold text-gray-900 text-sm">March 15-17</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
