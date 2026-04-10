export default function LoginPage() {
	return (
		<main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
			<div className="w-full max-w-md rounded-3xl bg-white border border-gray-100 shadow-sm p-8">
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 mb-2">
					Welcome Back
				</p>
				<h1 className="text-3xl font-bold text-gray-900">Sign in to your account</h1>
				<form className="mt-8 space-y-4">
					<input
						type="email"
						placeholder="Email address"
						className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary-600"
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary-600"
					/>
					<button className="w-full rounded-full bg-primary-600 px-5 py-3 font-semibold text-white hover:bg-primary-700 transition-colors">
						Login
					</button>
				</form>
			</div>
		</main>
	);
}
