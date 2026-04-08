import PublicPageFrame from "@/components/layout/PublicPageFrame";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
	return (
		<PublicPageFrame>
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				<div className="max-w-3xl mb-10">
					<p className="text-primary-600 font-semibold uppercase tracking-[0.2em] text-xs mb-3">
						Contact Us
					</p>
					<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
						Talk to our team about listings, raffles, or partnerships.
					</h1>
					<p className="mt-4 text-lg text-gray-600 leading-relaxed">
						Use the form below or reach out directly. The layout stays clean and consistent on
						every public page.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
					<form className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-5">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<input
								className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary-600"
								placeholder="Full name"
							/>
							<input
								className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary-600"
								placeholder="Email address"
							/>
						</div>
						<input
							className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary-600"
							placeholder="Subject"
						/>
						<textarea
							className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary-600 min-h-40"
							placeholder="Tell us how we can help"
						/>
						<button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-full transition-colors">
							Send Message
						</button>
					</form>

					<div className="space-y-4">
						{[
							{ icon: MapPin, label: "Location", value: "Av. Winston Churchill, Santo Domingo" },
							{ icon: Phone, label: "Phone", value: "+1 (809) 555-0123" },
							{ icon: Mail, label: "Email", value: "info@expovivienda.com" },
						].map((item) => {
							const Icon = item.icon;

							return (
								<div key={item.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
									<div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
										<Icon size={18} />
									</div>
									<div>
										<p className="text-sm font-semibold text-gray-900">{item.label}</p>
										<p className="text-sm text-gray-600 mt-1">{item.value}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</PublicPageFrame>
	);
}
