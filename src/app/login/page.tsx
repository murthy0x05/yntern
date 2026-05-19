"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db } from "@/utils/firebase/client";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user is a recruiter or candidate
      const recruitersRef = collection(db, "recruiters");
      const q = query(recruitersRef, where("auth_user_id", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        router.push("/recruiter");
      } else {
        router.push("/candidate");
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
      setLoading(false);
    }
  };

  const handleOAuth = async (providerName: "google" | "github") => {
    try {
      const provider = providerName === "google" ? new GoogleAuthProvider() : new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/candidate"); // Standard fallback, ideally checking role after oauth too
    } catch (err: any) {
      setError(err.message || "Failed to sign in with provider");
    }
  };

  return (
    <div className="bg-[#f9f9f9] text-[#1b1b1b] h-screen overflow-hidden flex font-[Inter] antialiased">
      {/* Floating Error Bar */}
      {error && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-red-50 border border-red-200 text-red-600 pl-5 pr-3 py-2.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-sm font-[Inter] flex items-center gap-3 animate-in slide-in-from-top-4 fade-in duration-300">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span className="mr-2">{error}</span>
          <button 
            onClick={() => setError("")}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors cursor-pointer text-red-500"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Left side: Video Panel */}
      <div className="hidden lg:block lg:w-[50%] p-3 pr-0">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <video
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
            loop
            muted
            playsInline
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 relative">
        <div className="w-full max-w-[380px]">
          {/* Logo */}
          <div className="mb-10">
            <Link
              className="font-[Instrument_Serif] text-2xl italic text-black"
              href="/"
            >
              Yntern<sup>®</sup>
            </Link>
          </div>

          <h1
            className="mb-10 italic text-[#1b1b1b]"
            style={{
              fontFamily: "'Instrument Serif'",
              fontSize: "36px",
              lineHeight: "1.2",
            }}
          >
            Welcome Back
          </h1>



          <form className="flex flex-col gap-7" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="flex flex-col gap-3">
              <label className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase">
                Email Address
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] placeholder:text-[#7e7576] focus:ring-0 focus:border-black transition-colors outline-none"
                placeholder="user@yntern.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password Input */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase">
                  Password
                </label>
                <Link
                  href="#"
                  className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] hover:text-[#1b1b1b] transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <input
                className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] placeholder:text-[#7e7576] focus:ring-0 focus:border-black transition-colors outline-none"
                placeholder="••••••••"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Submit Button */}
            <button
              className="w-full bg-black text-white rounded-full py-3 mt-2 font-[Inter] text-sm flex items-center justify-center hover:opacity-80 transition-opacity duration-300 cursor-pointer disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Continue"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-[#cfc4c5]" />
            <span className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase">
              or continue with
            </span>
            <div className="flex-1 h-px bg-[#cfc4c5]" />
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-4">
            <button
              className="w-full border border-[#cfc4c5] rounded-full py-2.5 flex items-center justify-center gap-3 hover:bg-[#e2e2e2] transition-colors duration-300 font-[Inter] text-sm text-[#1b1b1b] cursor-pointer"
              type="button"
              onClick={() => handleOAuth("google")}
            >
              <svg
                height="20"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              className="w-full border border-[#cfc4c5] rounded-full py-2.5 flex items-center justify-center gap-3 hover:bg-[#e2e2e2] transition-colors duration-300 font-[Inter] text-sm text-[#1b1b1b] cursor-pointer"
              type="button"
              onClick={() => handleOAuth("github")}
            >
              <svg
                fill="currentColor"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Footer Link */}
          <div className="mt-10 text-center">
            <Link
              className="font-[Inter] text-sm text-[#4c4546] hover:text-[#1b1b1b] transition-colors duration-300"
              href="/register"
            >
              New to the collective?{" "}
              <span className="border-b border-[#4c4546] pb-0.5">
                Join us →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
