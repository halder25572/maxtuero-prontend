"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

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
              Create your investor profile.
            </h2>
            <p className="text-sm text-gray-200">
              Join thousands of users tracking market trends and <br />
              managing their property portfolios.
            </p>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white px-6">
        <div className="w-full max-w-md">

          <h2 className="text-2xl font-bold mb-2">
            Create your account
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Start creating memory books in minutes
          </p>

          <form className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Jane Doe"
                className="w-full mt-1 px-4 py-3 rounded-full bg-gray-100 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="jane@example.com"
                className="w-full mt-1 px-4 py-3 rounded-full bg-gray-100 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 pr-12 rounded-full bg-gray-100 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Role Toggle */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                className="flex-1 py-2 rounded-full border border-blue-600 text-blue-600 font-medium"
              >
                I’m a Buyer
              </button>
              <button
                type="button"
                className="flex-1 py-2 rounded-full bg-gray-100 text-gray-600"
              >
                I’m a Agent
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          </form>

          <div className="text-center text-sm text-gray-400 my-4">
            or continue with
          </div>

          {/* Google */}
          <button className="w-full border py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
            />
            Google
          </button>

          <Link href="/login" className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <span className="text-blue-600">
              Log in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}