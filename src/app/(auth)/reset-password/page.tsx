import Image from "next/image";

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* LEFT SIDE */}
            <div className="relative w-full lg:w-1/2 h-[320px] lg:h-auto">
                <Image src="/images/logino.jpg" alt="House" fill className="object-cover" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-10 text-white">
                    <h1 className="text-lg font-semibold tracking-wide">EXPOVIVIENDA</h1>

                    <div>
                        <h2 className="text-2xl lg:text-3xl font-bold mb-2">Secure your account.</h2>
                        <p className="text-sm lg:text-base text-white/90 max-w-md">
                            Set a new, unique password to ensure your property portfolio remains private and protected.
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 px-6 py-12">
                <div className="w-full max-w-md text-center">
                    <div className="flex justify-center mb-4">
                        <span className="text-blue-600 text-xl">Key</span>
                    </div>

                    <h2 className="text-lg font-semibold mb-2">Reset Your Password</h2>

                    <p className="text-xs text-gray-500 mb-6">Enter and confirm your new password below.</p>

                    <form className="space-y-4 text-left">
                        <div>
                            <label className="text-xs text-gray-600 block mb-1">New Password</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                className="w-full px-4 py-2 rounded-full bg-gray-200 focus:outline-none text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-600 block mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                className="w-full px-4 py-2 rounded-full bg-gray-200 focus:outline-none text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full text-sm font-medium transition"
                        >
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}