"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Phone, Mail, MapPin } from "lucide-react";
import CTASection from "@/components/home/CTASection";
import { useEffect, useState } from "react";

// API response type
interface ContactResponse {
  success: boolean;
  status: string;
  message: string;
  data: {
    hours: Array<{
      day: string;
      hours: string;
      closed?: boolean;
    }>;
    latitude: string | null;
    longitude: string | null;
    phone: {
      desc: string;
      color: string;
    };
    Email: {
      desc: string;
      color: string;
    };
    Office: {
      desc: string;
      color: string;
    };
  };
  exception_file: string | null;
  exception_path: string | null;
}

const subjects = [
  "Select a subject",
  "Property Inquiry",
  "Virtual Expo",
  "Raffle Tickets",
  "Agent Partnership",
  "General Question",
];

export default function ContactAgentPage() {
  const [contactData, setContactData] = useState<ContactResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch contact data from API
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://maxtuero.thenightowl.team";
        const response = await fetch(`${baseUrl}/contact/get`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch contact data: ${response.status}`);
        }
        
        const data: ContactResponse = await response.json();
        
        if (data.success && data.data) {
          setContactData(data.data);
        } else {
          throw new Error(data.message || "Failed to load contact data");
        }
      } catch (err) {
        console.error("Error fetching contact data:", err);
        setError(err instanceof Error ? err.message : "Failed to load contact data");
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // Fallback data if API fails
  const fallbackData = {
    hours: [
      { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM", closed: false },
      { day: "Saturday", hours: "9:00 AM – 2:00 PM", closed: false },
      { day: "Sunday", hours: "Closed", closed: true },
    ],
    latitude: null,
    longitude: null,
    phone: {
      desc: "<p>Mon-Fri from 8am to 6pm</p>",
      color: "+1 (809) 555-1234",
    },
    Email: {
      desc: "<p>We'll response within 24 hours</p>",
      color: "info@expovivienda.com",
    },
    Office: {
      desc: "<p>Visit us in person</p>",
      color: "Av. Winston Churchill 1100 Santo Domingo, D.N.",
    },
  };

  const data = contactData || fallbackData;

  // Create contact cards from API data
  const contactCards = [
    {
      icon: <Phone size={22} className="text-primary-600" />,
      title: "Phone",
      subtitle: data.phone.desc.replace(/<[^>]*>/g, ''), // Strip HTML tags
      value: data.phone.color,
      href: `tel:${data.phone.color.replace(/\D/g, '')}`,
    },
    {
      icon: <Mail size={22} className="text-primary-600" />,
      title: "Email",
      subtitle: data.Email.desc.replace(/<[^>]*>/g, ''), // Strip HTML tags
      value: data.Email.color,
      href: `mailto:${data.Email.color}`,
    },
    {
      icon: <MapPin size={22} className="text-primary-600" />,
      title: "Office",
      subtitle: data.Office.desc.replace(/<[^>]*>/g, ''), // Strip HTML tags
      value: data.Office.color,
      href: "#map",
    },
  ];

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="h-12 bg-gray-200 rounded-full w-12 mx-auto mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <p className="text-red-600 mb-4">Failed to load contact information</p>
              <p className="text-gray-500 text-sm">{error}</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Header */}
          <div className="text-center mb-12 w-[754px] mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#272727]">
              Get in Touch
            </h1>
            <p className="text-gray-500 text-sm sm:text-[20px] mt-3 leading-[28px]">
              Have questions about properties, our virtual expo, or raffles? Our expert team is
              here to help you find your dream home in the Dominican Republic.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  {card.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{card.title}</h3>
                <p className="text-gray-400 text-xs mb-2">{card.subtitle}</p>
                <a
                  href={card.href}
                  className="text-primary-600 text-xs font-semibold hover:underline whitespace-pre-line"
                >
                  {card.value}
                </a>
              </div>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-900 text-lg mb-1">Send us a Message</h2>
              <p className="text-gray-400 text-xs mb-6">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1 block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1 block">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1(809) 555-0000"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1 block">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors text-gray-400">
                    {subjects.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1 block">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300 resize-none"
                  />
                </div>

                {/* Submit */}
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors">
                  Send Message
                </button>
              </div>
            </div>

            {/* Map + Hours */}
            <div className="space-y-4">
              {/* Map */}
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="p-5 pb-3">
                  <h2 className="font-bold text-gray-900 text-sm">Visit Our Office</h2>
                </div>
                <div id="map" className="h-52 w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    src={
                      data.latitude && data.longitude
                        ? `https://maps.google.com/maps?q=${data.latitude},${data.longitude}&output=embed`
                        : `https://maps.google.com/maps?q=Av.+Winston+Churchill+1100+Santo+Domingo&output=embed`
                    }
                    className="border-0"
                  />
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="font-bold text-gray-900 text-sm mb-4">Office Hours</h2>
                <div className="space-y-3">
                  {data.hours.length > 0 ? (
                    data.hours.map((row: any) => (
                      <div key={row.day} className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm">{row.day}</span>
                        <span className={`text-sm font-semibold ${row.closed ? "text-gray-400" : "text-primary-600"}`}>
                          {row.hours}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 text-sm text-center py-4">
                      No office hours available
                    </div>
                  )}
                </div>
                <div className="mt-5 bg-blue-50 rounded-xl px-4 py-3 flex items-start gap-2">
                  <span className="text-primary-600 text-xs mt-0.5">ℹ</span>
                  <p className="text-gray-500 text-xs">
                    Property viewings available by appointment 7 days a week
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CTASection/>
      <Footer />
    </>
  );
}