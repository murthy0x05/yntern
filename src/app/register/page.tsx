import Link from "next/link";

export const metadata = {
  title: "Yntern® — Join the Collective",
  description:
    "Choose your path — register as a candidate or recruiter on Yntern.",
};

export default function RegisterPage() {
  return (
    <div className="bg-[#f9f9f9] text-[#1b1b1b] antialiased h-screen overflow-hidden flex">
      {/* Left Side: Cinematic Video Frame (Sarvam-style) */}
      <div className="hidden md:block md:w-1/2 p-3 pr-0">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-[#eeeeee] to-[#e2e2e2] animate-pulse"
          />
          <video
            aria-label="Cinematic background video of abstract fluid motion"
            autoPlay
            className="absolute inset-0 w-full h-full object-cover z-10"
            loop
            muted
            playsInline
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          />
          <div className="absolute inset-0 z-20 pointer-events-none rounded-2xl shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]" />
        </div>
      </div>

      {/* Right Side: Registration Path Selection */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-8 lg:px-16">
        <div className="flex flex-col gap-6 w-full max-w-md">
          {/* Logo */}
          <div className="mb-4">
            <Link
              className="font-[Instrument_Serif] text-2xl italic text-black"
              href="/"
            >
              Yntern<sup>®</sup>
            </Link>
          </div>

          {/* Candidate Card */}
          <Link
            className="group relative flex items-center justify-between w-full p-5 rounded-xl border-[0.5px] border-[#cfc4c5] bg-white hover:border-black transition-all duration-500 ease-out"
            href="/register/candidate"
          >
            <span className="font-[Inter] text-base text-black">
              I&apos;m a candidate
            </span>
            <span className="material-symbols-outlined text-[#5e5e5e] group-hover:text-black transition-colors duration-500">
              arrow_forward
            </span>
            <div className="absolute bottom-0 left-5 right-5 h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>

          {/* Recruiter Card */}
          <Link
            className="group relative flex items-center justify-between w-full p-5 rounded-xl border-[0.5px] border-[#cfc4c5] bg-white hover:border-black transition-all duration-500 ease-out"
            href="/register/recruiter"
          >
            <span className="font-[Inter] text-base text-black">
              I&apos;m a recruiter
            </span>
            <span className="material-symbols-outlined text-[#5e5e5e] group-hover:text-black transition-colors duration-500">
              arrow_forward
            </span>
            <div className="absolute bottom-0 left-5 right-5 h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>

          {/* Footer Link */}
          <div className="mt-6 pt-6 border-t-[0.5px] border-[#cfc4c5] w-full">
            <Link
              className="inline-flex items-center gap-2 font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#5e5e5e] hover:text-black transition-colors duration-300"
              href="/login"
            >
              Already have an account? Login
              <span className="material-symbols-outlined text-[14px]">
                login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
