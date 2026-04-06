import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-display font-bold text-xl text-white mb-3">EXPOVIVIENDA</p>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Your trusted partner for finding premium properties in the Dominican Republic.
            </p>
            <div className="flex gap-4 mt-5">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <p className="text-white font-semibold uppercase text-xs tracking-widest mb-4">Company</p>
            <ul className="space-y-2">
              {["About Us", "Our Agents", "Virtual Expo", "Raffles", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold uppercase text-xs tracking-widest mb-4">Contact</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin size={14} className="mt-0.5 shrink-0 text-primary-400" />
                Av. Winston Churchill, Santo Domingo, Dominican Republic
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone size={14} className="shrink-0 text-primary-400" />
                +1 (809) 555-0123
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={14} className="shrink-0 text-primary-400" />
                info@expovivienda.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2025 ExpoVivienda. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
