import Link from "next/link";

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex w-1/2 relative bg-gray-900">
                    <img
                        src="/images/logino.jpg"
                    alt="house"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />

                <div className="relative z-10 flex flex-col justify-between p-10 text-white w-full">
                    <h1 className="text-2xl font-bold tracking-wide">
                        EXPOVIVIENDA
                    </h1>

                    <div>
                        <h2 className="text-3xl font-semibold leading-tight mb-4">
                            Forgot your password?
                        </h2>
                        <p className="text-sm text-gray-200">
                            Don’t worry, it happens. Enter your email below <br />
                            to securely recover your account access.
                        </p>
                    </div>
                </div>

                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-white px-6">
                <div className="w-full max-w-md text-center">

                    <h1 className="text-xl font-bold tracking-wide mb-6">
                        EXPOVIVIENDA
                    </h1>

                    <h2 className="text-2xl font-semibold mb-2">
                        Reset password
                    </h2>

                    <p className="text-sm text-gray-500 mb-6">
                        Enter your email and we’ll send you a link to reset your password.
                    </p>

                    <form className="space-y-4 text-left">
                        <div>
                            <label className="text-sm text-gray-600">Email</label>
                            <input
                                type="email"
                                placeholder="jane@example.com"
                                className="w-full mt-1 px-4 py-3 rounded-full bg-gray-100 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition"
                        >
                            Send Reset Link
                        </button>
                    </form>

                    <div className="mt-4">
                        <Link href="/login"
                            className="text-sm text-blue-600 inline-flex items-center gap-1"
                        >
                            ← Back to login
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}