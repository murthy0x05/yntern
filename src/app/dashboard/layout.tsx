"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", icon: "home", href: "/dashboard" },
  { label: "JD Input", icon: "edit_note", href: "/dashboard/jd-input" },
  { label: "Discover", icon: "person_search", href: "/dashboard/discover" },
  { label: "Theater", icon: "theater_comedy", href: "/dashboard/theater" },
  { label: "Messages", icon: "mail", href: "#" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
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
            className="w-full bg-[#f3f3f3] border border-[#cfc4c5]/30 rounded-full py-1.5 pl-9 pr-3 text-sm font-[Inter] focus:outline-none focus:border-black focus:bg-white transition-all placeholder:text-[#848484]"
            placeholder="Search anything..."
            type="text"
          />
        </div>

        {/* Notifications + User */}
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
                    ? "bg-[#f3f3f3] text-black font-semibold"
                    : "text-[#4c4546] hover:bg-[#eeeeee]"
                }`}
                href={item.href}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
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
          <a
            className={`flex items-center gap-3 py-2.5 rounded-xl text-[#4c4546] hover:bg-[#eeeeee] transition-all duration-300 ease-in-out ${
              collapsed ? "justify-center px-0" : "px-3"
            }`}
            href="#"
          >
            <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white text-[11px] font-semibold shrink-0">
              SJ
            </div>
            {!collapsed && (
              <span className="font-[Inter] text-sm font-medium text-black">
                Sarah Jenkins
              </span>
            )}
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full relative overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
