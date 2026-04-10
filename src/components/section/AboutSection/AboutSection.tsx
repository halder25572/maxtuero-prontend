import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Target, Users, Globe, CheckCircle } from "lucide-react";
import CTASection from "@/components/home/CTASection";

const stats = [
    { value: "12,000+", label: "Happy Clients" },
    { value: "8,500+", label: "Properties Sold" },
    { value: "250+", label: "Expert Agents" },
    { value: "$2.5B+", label: "Total Sales" },
];

const purposes = [
    {
        icon: <Target size={20} className="text-primary-600" />,
        title: "Our Vision",
        description:
            "To become the most trusted real estate platform in the Caribbean, connecting buyers with their perfect properties through innovation and transparency.",
    },
    {
        icon: <CheckCircle size={20} className="text-primary-600" />,
        title: "Our Mission",
        description:
            "To simplify the property buying experience by providing cutting-edge virtual tools, expert guidance, and exclusive access to premium listings.",
    },
    {
        icon: <Globe size={20} className="text-primary-600" />,
        title: "Our Values",
        description:
            "Integrity, transparency, and excellence drive everything we do. We believe everyone deserves access to quality real estate services.",
    },
];

const team = [
    {
        name: "Carlos Rodriguez",
        title: "CEO & Co-Founder",
        avatar: "/images/a1.jpg",
        bio: "15+ years in Dominican real estate market with expertise in luxury properties.",
    },
    {
        name: "Maria Gutierrez",
        title: "Head of Operations",
        avatar: "/images/a2.jpg",
        bio: "Operations expert with a passion for creating seamless client experiences.",
    },
    {
        name: "Roberto Alvarez",
        title: "Chief Technology Officer",
        avatar: "/images/a3.jpg",
        bio: "Tech innovator leading our virtual expo platform development.",
    },
    {
        name: "Ana Fernandez",
        title: "Director of Sales",
        avatar: "/images/a4.jpg",
        bio: "Award-winning sales director with 200+ successful property transactions.",
    },
    {
        name: "Luis Fernandez",
        title: "Marketing Director",
        avatar: "/images/a5.jpg",
        bio: "Creative marketing strategist driving brand growth across Latin America.",
    },
    {
        name: "Isabella Torres",
        title: "Client Relations",
        avatar: "/images/a6.jpg",
        bio: "Dedicated to ensuring every client has an exceptional experience.",
    },
];

const journey = [
    {
        year: "2019",
        title: "Platform Launch",
        description: "ExpoVivienda was founded with a vision to transform Dominican Republic real estate market.",
    },
    {
        year: "2020",
        title: "First Virtual Expo",
        description: "Launched our first virtual property fair, connecting 50+ developers with thousands of buyers.",
    },
    {
        year: "2021",
        title: "Raffle Innovation",
        description: "Introduced property raffles, making homeownership accessible to more Dominicans.",
    },
    {
        year: "2022",
        title: "Market Expansion",
        description: "Expanded to cover all major cities and coastal areas across the Dominican Republic.",
    },
    {
        year: "2023",
        title: "International Growth",
        description: "Reached 10,000+ properties listed and attracted international investors from 30+ countries.",
    },
    {
        year: "2024",
        title: "Industry Leader",
        description: "Became the #1 digital real estate platform in the Dominican Republic with 250+ partner developers.",
    },
];

export default function AboutSection() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white pt-16">

                {/* Hero */}
                <section className="bg-blue-50 py-16 md:py-20 text-center px-4">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-2xl sm:text-3xl md:text-[56px] font-bold text-gray-900 mb-4 md:leading-[61px]">
                            Transforming Real Estate in
                            <br /> the Dominican Republic
                        </h1>
                        <p className="text-gray-500 mt-[20px] text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                            ExpoVivienda was created to connect buyers with premium properties through innovative
                            virtual technology, expert guidance, and exclusive raffle opportunities.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <a href="/properties" className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
                                Explore Properties
                            </a>
                            <a href="/contact" className="border border-gray-300 hover:border-primary-600 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
                                Contact Us
                            </a>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-12">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center bg-white pt-[32px] pb-[60px] px-[77px] rounded-[16px] bg-transparent shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
                                <p className="text-[32px] mb-[8px] font-bold text-[#2664EB]">{s.value}</p>
                                <p className="text-[#4B5563] text-[14px] font-medium mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Our Purpose */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-5xl font-bold text-gray-900">Our Purpose</h2>
                            <p className="text-[#4B5563] text-sm mt-2">The principles that guide everything we do</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {purposes.map((p) => (
                                <div key={p.title} className="bg-blue-50 rounded-2xl p-6">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                                        {p.icon}
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-sm mb-2">{p.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{p.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Meet Our Team */}
                <section className="py-16 md:py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Meet Our Team</h2>
                            <p className="text-gray-400 text-sm mt-2">
                                Dedicated professionals committed to finding your perfect property
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {team.map((member) => (
                                <div key={member.name} className="bg-white rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="overflow-hidden">
                                        <img
                                            src={member.avatar}
                                            alt={member.name}
                                            className="w-full h-[280px] object-top hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-black font-semibold text-[20px]">{member.name}</h3>
                                        <p className="text-[#2664EB] text-[14px] font-medium mt-0.5 mb-2">{member.title}</p>
                                        <p className="text-[#4B5563] text-[14px] leading-[21px]">{member.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our Journey */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className="text-2xl sm:text-[48px] font-bold text-black">Our Journey</h2>
                            <p className="text-[#4B5563] text-[17px] mt-4 max-w-2xl mx-auto">
                                Milestones that shaped ExpoVivienda into the leading platform it is today
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200 lg:left-1/2 lg:-translate-x-1/2" />

                            <div className="space-y-8 md:space-y-10">
                                {journey.map((item, i) => (
                                    <div key={item.year} className="relative lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start">
                                        <div className={i % 2 === 0 ? "lg:pr-10" : "lg:pr-10 lg:order-2"}>
                                            <div className={
                                                "ml-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:ml-0 " +
                                                (i % 2 === 0 ? "lg:text-right" : "")
                                            }>
                                                <p className="text-[#2664EB] font-bold text-2xl mb-1">{item.year}</p>
                                                <h3 className="font-bold text-black text-[18px] mb-2">{item.title}</h3>
                                                <p className="text-[#4B5563] text-[14px] leading-[21px]">{item.description}</p>
                                            </div>
                                        </div>

                                        <div className={i % 2 === 0 ? "lg:pl-10" : "hidden lg:block lg:pl-10 lg:order-1"} />

                                        <div className="absolute left-3 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-primary-600 shadow lg:left-1/2" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <CTASection />
            <Footer />
        </>
    );
}