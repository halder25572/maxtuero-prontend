import { CheckCircle } from "lucide-react";

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
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
              Experience Virtual Property Fairs
            </h2>
            <p className="text-gray-600 mb-6">
              Join our innovative virtual real estate expos and explore hundreds of properties from
              the comfort of your home. Connect with developers, attend live tours, and discover
              exclusive deals available only during our events.
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-gray-700 text-sm">
                  <CheckCircle size={16} className="text-green-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="/virtual-expo"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Explore Current Expos
            </a>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
              alt="Virtual Expo"
              className="w-full rounded-2xl shadow-xl object-cover h-80"
            />
            <div className="absolute bottom-4 right-4 bg-white rounded-xl px-4 py-3 shadow-lg text-center">
              <p className="text-xs text-gray-500">Next Expo</p>
              <p className="font-bold text-gray-900 text-sm">March 15-17</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
