"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState<"user" | "agent">("user");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError(null);

    if (password !== passwordConfirmation) {
      setValidationError("Passwords do not match");
      return;
    }

    try {
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role,
      });

      router.replace(`/check-email?email=${encodeURIComponent(email)}`);
      router.refresh();
    } catch (registerError) {
      // Error is handled by the hook
    }
  };

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

          <form className="space-y-4" onSubmit={handleSubmit}>
            {validationError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 text-left">
                {validationError}
              </div>
            ) : null}

            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                className="w-full mt-1 px-4 py-3 rounded-full bg-gray-100 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                className="w-full mt-1 px-4 py-3 rounded-full bg-gray-100 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                className="w-full mt-1 px-4 py-3 rounded-full bg-gray-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordConfirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
                autoComplete="new-password"
                className="w-full mt-1 px-4 py-3 rounded-full bg-gray-100 focus:outline-none"
              />
            </div>

            {/* Role Toggle */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`flex-1 py-2 rounded-full border font-medium ${
                  role === "user"
                    ? "border-blue-600 text-blue-600"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                I&apos;m a Buyer
              </button>
              <button
                type="button"
                onClick={() => setRole("agent")}
                className={`flex-1 py-2 rounded-full font-medium ${
                  role === "agent"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                I&apos;m an Agent
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition disabled:opacity-70"
            >
              {isLoading ? "Creating account..." : "Create Account"}
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