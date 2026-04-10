import PublicPageFrame from "@/components/layout/PublicPageFrame";

export default function DashboardPage() {
	return (
		<PublicPageFrame className="bg-gray-50">
			<main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 mb-2">
						User Dashboard
					</p>
					<h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
					<p className="mt-3 text-sm text-gray-600">
						This route now exports a page component, so production build can continue.
					</p>
				</div>
			</main>
		</PublicPageFrame>
	);
}
