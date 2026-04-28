"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await login({ email, password });
      router.replace("/dashboard");
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900">
          <img
            src="/images/logino.jpg" // add your image in public folder
          alt="house"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        <div className="relative z-10 flex flex-col justify-between p-10 text-white w-full">
          <h1 className="text-2xl font-bold tracking-wide">
            EXPOVIVIENDA
          </h1>

          <div>
            <h2 className="text-3xl font-semibold leading-tight mb-4">
              Your property journey <br /> continues here.
            </h2>
            <p className="text-sm text-gray-200">
              Log in to access your dashboard, <br />
              save searches and exclusive listings.
            </p>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white px-6">
        <div className="w-full max-w-md">

          <p className="text-sm text-[#2664EB] text-[12px] font-semibold mb-2">
            ✨ Welcome back
          </p>

          <h2 className="text-[28px] font-extrabold mb-2">
            Log in to your account
          </h2>

          <p className="text-sm text-[#4B5563] mb-6">
            Pick up where you left off
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
                {error}
              </div>
            ) : null}

            <div>
              <label className="text-sm text-[#4B5563]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full mt-1 px-4 py-3 rounded-full bg-gray-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-[#4B5563]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full mt-1 px-4 py-3 rounded-full bg-gray-100 focus:outline-none"
              />
            </div>

            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-[#2664EB]">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Signing in..." : "Log In"}
            </button>
          </form>

          <div className="text-center text-sm text-gray-400 my-4">
            or continue with
          </div>

          <button className="w-full border py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
            />
            Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}