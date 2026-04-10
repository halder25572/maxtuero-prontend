"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const hasSolidNav = !isHome || isScrolled;

  const navShellClass = hasSolidNav
    ? "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    : "fixed top-0 left-0 right-0 z-50 bg-[rgba(255,255,255,0.16)] backdrop-blur-[8px]";

  const navLinkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      isActiveLink(href)
        ? href === "/" && isHome
          ? hasSolidNav
            ? "text-gray-900 font-bold"
            : "text-white font-bold"
          : "text-primary-600"
        : hasSolidNav
          ? "text-gray-700 hover:text-gray-900"
          : "text-white/70 hover:text-white"
    }`;

  return (
    <nav className={navShellClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className={`font-display font-bold text-xl tracking-wide ${
              hasSolidNav ? "text-gray-900" : "text-white"
            }`}
          >
            EXPOVIVIENDA
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2 transition-colors rounded-[999px]"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-2 transition-colors ${
              hasSolidNav ? "text-gray-700" : "text-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-2 text-sm font-medium ${
                isActiveLink(link.href)
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="mt-3 block text-center bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
