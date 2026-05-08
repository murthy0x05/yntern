"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", icon: "home", href: "/candidate", color: "#6366f1" },
  {
    label: "My Profile",
    icon: "person",
    href: "/candidate/profile",
    color: "#8b5cf6",
  },
  {
    label: "AI Analyzer",
    icon: "auto_awesome",
    href: "/candidate/analyzer",
    color: "#10b981",
  },
  {
    label: "Job Feed",
    icon: "work",
    href: "/candidate/jobs",
    color: "#3b82f6",
  },
  {
    label: "AI Chat",
    icon: "smart_toy",
    href: "/candidate/chat",
    color: "#f59e0b",
  },
  {
    label: "Applications",
    icon: "assignment",
    href: "/candidate/applications",
    color: "#f43f5e",
  },
  {
    label: "Insights",
    icon: "insights",
    href: "/candidate/insights",
    color: "#06b6d4",
  },
];

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/candidate") return pathname === "/candidate";
    return pathname.startsWith(href);
  };

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
        <Link
          className="font-[Instrument_Serif] text-xl italic text-black"
          href="/"
        >
          Yntern<sup className="text-[0.6em] ml-0.5">®</sup>
        </Link>

        {/* Search */}
        <div className="max-w-md relative group ml-auto">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4c4546] text-[20px] pointer-events-none group-focus-within:text-black transition-colors">
            search
          </span>
          <input
            className="w-full bg-[#f3f3f3] border border-[#cfc4c5]/30 rounded-full py-1.5 pl-9 pr-3 text-sm font-[Inter] focus:outline-none focus:border-black focus:bg-white focus:shadow-md transition-all placeholder:text-[#848484]"
            placeholder="Search anything..."
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          />
          {searchFocused && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-[#cfc4c5] shadow-xl rounded-xl p-3 z-[100] animate-fade-rise">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#8b5cf6] animate-spin">
                  sync
                </span>
                <p className="font-[Inter] text-[12px] text-[#4c4546]">
                  {searchValue ? `Searching across jobs, messages, and insights for "${searchValue}"...` : "Type to search your dashboard..."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="p-1.5 hover:bg-[#eeeeee] rounded-xl transition-colors text-[#4c4546] hover:text-black cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">
            notifications
          </span>
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`flex flex-col sticky top-[56px] h-[calc(100vh-56px)] border-r border-[#cfc4c5] bg-white/80 backdrop-blur-[40px] z-50 transition-all duration-300 ease-in-out overflow-hidden ${
          collapsed ? "w-[64px]" : "w-56"
        }`}
      >
        <nav
          className={`flex-1 overflow-y-auto py-4 flex flex-col gap-0.5 ${
            collapsed ? "px-1.5 items-center" : "px-3"
          }`}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                className={`flex items-center gap-3 py-2.5 rounded-xl transition-all duration-300 ease-in-out ${
                  collapsed ? "justify-center px-0" : "px-3"
                } ${
                  active
                    ? "bg-gradient-to-r from-[#f0f0ff] to-[#f5f3ff] text-[#4338ca] font-semibold shadow-[0_0_0_1px_rgba(99,102,241,0.15)]"
                    : "text-[#4c4546] hover:bg-[#eeeeee]"
                }`}
                href={item.href}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
                    color: active ? item.color : undefined,
                  }}
                >
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="font-[Inter] text-sm">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer user */}
        <div
          className={`p-4 border-t border-[#cfc4c5]/30 ${
            collapsed ? "px-1.5" : ""
          }`}
        >
          <Link
            className={`flex items-center gap-3 py-2.5 rounded-xl transition-all duration-300 ease-in-out ${
              collapsed ? "justify-center px-0" : "px-3"
            } ${
              pathname === "/candidate/profile"
                ? "bg-gradient-to-r from-[#f0f0ff] to-[#f5f3ff] shadow-[0_0_0_1px_rgba(99,102,241,0.15)]"
                : "text-[#4c4546] hover:bg-[#eeeeee]"
            }`}
            href="/candidate/profile"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[11px] font-semibold shrink-0">
              PK
            </div>
            {!collapsed && (
              <span className="font-[Inter] text-sm font-medium text-black">
                Pavan Kumar
              </span>
            )}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full relative overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
