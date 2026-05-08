import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-white text-[#000000] antialiased h-screen overflow-hidden flex flex-col">
      {/* TopNavBar */}
      <nav className="w-full z-50 flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-[20px] border-b-[0.5px] border-gray-200 animate-fade-rise">
        <Link
          href="/"
          className="text-2xl tracking-tighter text-[#000000] font-[Instrument_Serif] italic"
        >
          Yntern<sup className="text-sm">®</sup>
        </Link>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium tracking-tight">
          <Link
            className="text-[#000000] font-semibold transition-all duration-300 ease-out font-[Inter]"
            href="/"
          >
            Home
          </Link>
          <a
            className="text-[#6F6F6F] hover:text-[#000000] transition-all duration-300 ease-out font-[Inter]"
            href="#"
          >
            Studio
          </a>
          <a
            className="text-[#6F6F6F] hover:text-[#000000] transition-all duration-300 ease-out font-[Inter]"
            href="#"
          >
            About
          </a>
          <a
            className="text-[#6F6F6F] hover:text-[#000000] transition-all duration-300 ease-out font-[Inter]"
            href="#"
          >
            Journal
          </a>
          <a
            className="text-[#6F6F6F] hover:text-[#000000] transition-all duration-300 ease-out font-[Inter]"
            href="#"
          >
            Reach Us
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            className="text-[#000000] font-medium font-[Inter] hover:text-[#6F6F6F] transition-colors"
            href="/login"
          >
            Login
          </Link>
          <Link href="/register">
            <button className="bg-[#000000] text-white rounded-full px-5 py-2 text-sm transition-transform duration-300 hover:scale-[1.03] font-[Inter] cursor-pointer">
              Sign up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start text-center px-6 w-full">
        {/* Video Background */}
        <div
          className="absolute inset-x-0 bottom-0 top-[6vh] -z-10"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 15%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 15%)",
          }}
        >
          <video
            autoPlay
            className="w-full h-full object-cover object-top"
            id="bg-video"
            loop
            muted
            playsInline
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
          />
        </div>

        <div className="flex flex-col items-center pt-[8vh]">
          <h1
            className="text-[#000000] max-w-none whitespace-nowrap animate-fade-rise"
            style={{
              fontFamily: "'Instrument Serif'",
              fontSize: "56px",
              lineHeight: "0.95",
              letterSpacing: "-1.5px",
            }}
          >
            Find the <span className="text-[#6F6F6F]">talent</span> that shapes{" "}
            <span className="text-[#6F6F6F]">tomorrow.</span>
          </h1>
          <p className="text-sm text-[#6F6F6F] max-w-xl mt-5 animate-fade-rise-delay font-[Inter]">
            Our advanced platform helps recruiters find the best candidates.
            <br /> Effortlessly streamline your hiring process to build great
            teams.
          </p>
          <Link href="/register">
            <button className="bg-[#000000] text-white rounded-full px-10 py-3.5 text-sm mt-8 transition-transform duration-300 hover:scale-[1.03] animate-fade-rise-delay-2 font-[Inter] cursor-pointer">
              Begin Journey
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
