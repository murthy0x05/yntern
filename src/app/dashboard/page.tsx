"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-[#f9f9f9] text-[#1b1b1b] font-[Inter] antialiased flex min-h-screen pt-[56px]">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full h-[56px] bg-white border-b border-[#cfc4c5]/30 z-[60] flex items-center px-5 gap-4">
        <button
          className="p-1.5 -ml-1 hover:bg-[#eeeeee] rounded-xl transition-colors text-black cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>
        <Link className="font-[Instrument_Serif] text-xl italic text-black" href="/">
          Yntern<sup className="text-[0.6em] ml-0.5">®</sup>
        </Link>
        <div className="max-w-md relative group ml-auto">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4c4546] text-[20px] pointer-events-none group-focus-within:text-black transition-colors">
            search
          </span>
          <input
            className="w-full bg-[#f3f3f3] border border-[#cfc4c5]/30 rounded-full py-1.5 pl-9 pr-3 text-sm font-[Inter] focus:outline-none focus:border-black focus:bg-white transition-all placeholder:text-[#848484]"
            placeholder="Find people..."
            type="text"
          />
        </div>
      </header>

      {/* SideNavBar */}
      <aside
        className={`flex flex-col sticky top-[56px] h-[calc(100vh-56px)] border-r border-[#cfc4c5] bg-white/80 backdrop-blur-[40px] z-50 transition-all duration-300 ease-in-out overflow-hidden ${
          collapsed ? "w-[64px]" : "w-56"
        }`}
      >
        <nav className={`flex-1 overflow-y-auto py-4 flex flex-col gap-0.5 ${collapsed ? "px-1.5 items-center" : "px-3"}`}>
          <a
            className={`flex items-center gap-3 py-2.5 rounded-xl bg-[#f3f3f3] text-black font-semibold hover:bg-[#eeeeee] transition-all duration-300 ease-in-out ${
              collapsed ? "justify-center px-0" : "px-3"
            }`}
            href="#"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            {!collapsed && <span className="font-[Inter] text-sm">Home</span>}
          </a>
          <a
            className={`flex items-center gap-3 py-2.5 rounded-xl text-[#4c4546] hover:bg-[#eeeeee] transition-all duration-300 ease-in-out ${
              collapsed ? "justify-center px-0" : "px-3"
            }`}
            href="#"
          >
            <span className="material-symbols-outlined">stars</span>
            {!collapsed && <span className="font-[Inter] text-sm">Top Candidates</span>}
          </a>
          <a
            className={`flex items-center gap-3 py-2.5 rounded-xl text-[#4c4546] hover:bg-[#eeeeee] transition-all duration-300 ease-in-out ${
              collapsed ? "justify-center px-0" : "px-3"
            }`}
            href="#"
          >
            <span className="material-symbols-outlined">mail</span>
            {!collapsed && <span className="font-[Inter] text-sm">Messages</span>}
          </a>
          <a
            className={`flex items-center gap-3 py-2.5 rounded-xl text-[#4c4546] hover:bg-[#eeeeee] transition-all duration-300 ease-in-out ${
              collapsed ? "justify-center px-0" : "px-3"
            }`}
            href="#"
          >
            <span className="material-symbols-outlined">history</span>
            {!collapsed && <span className="font-[Inter] text-sm">Candidate History</span>}
          </a>
        </nav>
        {/* Footer Tab */}
        <div className={`p-4 border-t border-[#cfc4c5]/30 ${collapsed ? "px-1.5" : ""}`}>
          <a
            className={`flex items-center gap-3 py-2.5 rounded-xl text-[#4c4546] hover:bg-[#eeeeee] transition-all duration-300 ease-in-out ${
              collapsed ? "justify-center px-0" : "px-3"
            }`}
            href="#"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Sarah Jenkins"
              className="w-7 h-7 rounded-full object-cover border border-[#cfc4c5]/30"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHEbxEKhkCEWf1l9dhccuLdniQItH9qk6XZFWVABlVNzNwVmesqDFKSpT23XzUp3jJspxg4mqYObcRMhAFMNY4-dHot5DBoeQppY_6Lj9SBEltZq_Tvf5iFb-AusGsKZSEHF9LFYae9OYoEwQW6rJvXz53AJi0fDLhFEF9MQqY_9XR2qrT6XKxcUtzMOMM0YC2wqi-qGU54NH_Rgy6Rd9Oa5Wjz6GsLQFPd2X3fWM5DV1tUdgTCxCpfZIPcW2-Ms0xGoY2XvQn7Q"
            />
            {!collapsed && <span className="font-[Inter] text-sm font-medium text-black">Sarah Jenkins</span>}
          </a>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col w-full relative overflow-x-hidden">
        <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 flex-1 flex flex-col gap-16 pt-6 pb-12">
          {/* Section 1: Initiate Search (Hero Input) */}
          <section className="flex flex-col gap-6 max-w-4xl pt-4">
            <div className="bg-white border border-[#cfc4c5] rounded-2xl p-1 relative group focus-within:border-black transition-colors duration-500">
              <textarea
                className="w-full min-h-[160px] bg-transparent border-none resize-none focus:ring-0 p-5 font-[Inter] text-sm text-black placeholder:text-[#848484]"
                placeholder="Paste full job description, required skills, and cultural fit attributes..."
              />
              <div className="flex items-center justify-between p-3 border-t border-[#cfc4c5]/30 bg-[#f9f9f9]/50 rounded-b-[14px]">
                <button className="flex items-center gap-2 px-4 py-2 text-[#4c4546] hover:text-black transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">upload_file</span>
                  <span className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] uppercase">Upload JD Document</span>
                </button>
                <button className="bg-black text-white px-6 py-2.5 rounded-full font-[Inter] text-[11px] font-semibold uppercase tracking-widest hover:bg-black/90 transition-opacity flex items-center gap-2 cursor-pointer">
                  Find candidates
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>

          {/* Section 2: Active Scouting Sessions */}
          <section className="flex flex-col gap-12">
            <div className="flex justify-between items-end border-b border-[#cfc4c5]/50 pb-4">
              <h3
                className="text-black"
                style={{ fontFamily: "'Instrument Serif'", fontSize: "36px", lineHeight: "1.2" }}
              >
                Active Sessions
              </h3>
              <a
                className="font-[Inter] text-[12px] font-semibold uppercase tracking-widest text-[#4c4546] hover:text-black transition-colors"
                href="#"
              >
                View All History
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Session Card 1 */}
              <div className="group border border-[#cfc4c5] bg-white rounded-xl p-5 hover:border-black transition-all duration-500 flex flex-col gap-4 cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded-full bg-[#eeeeee] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#4c4546]">terminal</span>
                  </div>
                  <span className="font-[Inter] text-[12px] font-semibold text-[#4c4546] uppercase bg-[#f3f3f3] px-3 py-1 rounded-full">In Progress</span>
                </div>
                <div>
                  <h4
                    className="text-black mb-2 group-hover:underline decoration-1 underline-offset-4"
                    style={{ fontFamily: "'Instrument Serif'", fontSize: "24px", lineHeight: "1.2" }}
                  >
                    Senior Staff Engineer
                  </h4>
                  <p className="font-[Inter] text-sm text-[#4c4546]">Distributed Systems · San Francisco / Remote</p>
                </div>
                <div className="mt-auto pt-4 border-t border-[#cfc4c5]/30 flex justify-between items-center">
                  <span className="font-[Inter] text-[12px] font-semibold text-[#4c4546] uppercase tracking-wide">12 Candidates Found</span>
                  <span className="material-symbols-outlined text-black opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">east</span>
                </div>
              </div>
              {/* Session Card 2 */}
              <div className="group border border-[#cfc4c5] bg-white rounded-xl p-5 hover:border-black transition-all duration-500 flex flex-col gap-4 cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded-full bg-[#eeeeee] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#4c4546]">design_services</span>
                  </div>
                  <span className="font-[Inter] text-[12px] font-semibold text-[#4c4546] uppercase bg-[#f3f3f3] px-3 py-1 rounded-full">Refining</span>
                </div>
                <div>
                  <h4
                    className="text-black mb-2 group-hover:underline decoration-1 underline-offset-4"
                    style={{ fontFamily: "'Instrument Serif'", fontSize: "24px", lineHeight: "1.2" }}
                  >
                    Product Design Lead
                  </h4>
                  <p className="font-[Inter] text-sm text-[#4c4546]">0 to 1 Consumer · New York</p>
                </div>
                <div className="mt-auto pt-4 border-t border-[#cfc4c5]/30 flex justify-between items-center">
                  <span className="font-[Inter] text-[12px] font-semibold text-[#4c4546] uppercase tracking-wide">4 Candidates Found</span>
                  <span className="material-symbols-outlined text-black opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">east</span>
                </div>
              </div>
              {/* Session Card 3 */}
              <div className="group border border-[#cfc4c5] bg-white rounded-xl p-5 hover:border-black transition-all duration-500 flex flex-col gap-4 cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded-full bg-[#eeeeee] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#4c4546]">monitoring</span>
                  </div>
                  <span className="font-[Inter] text-[12px] font-semibold text-black uppercase bg-[#eeeeee] px-3 py-1 rounded-full">Ready for Review</span>
                </div>
                <div>
                  <h4
                    className="text-black mb-2 group-hover:underline decoration-1 underline-offset-4"
                    style={{ fontFamily: "'Instrument Serif'", fontSize: "24px", lineHeight: "1.2" }}
                  >
                    VP of Growth Marketing
                  </h4>
                  <p className="font-[Inter] text-sm text-[#4c4546]">B2B SaaS · London / Remote</p>
                </div>
                <div className="mt-auto pt-4 border-t border-[#cfc4c5]/30 flex justify-between items-center">
                  <span className="font-[Inter] text-[12px] font-semibold text-black uppercase tracking-wide">28 Candidates Found</span>
                  <span className="material-symbols-outlined text-black opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">east</span>
                </div>
              </div>
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}
