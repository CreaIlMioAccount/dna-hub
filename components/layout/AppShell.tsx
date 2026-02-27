"use client";

import { useState, ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import HeaderMenuMobile from "./HeaderMenuMobile";

export default function AppShell({ children }: { children: ReactNode }) {
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">

      <Header
        openMenu={headerMenuOpen}
        setOpenMenu={setHeaderMenuOpen}
        setSidebarMobile={setSidebarOpen}
        isMobile={isMobile}
      />

      {/* DESKTOP */}
      {!isMobile && (
        <div className="flex flex-1">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} variant="desktop" />

          <main className="flex-1 p-10">
            {children}
          </main>
        </div>
      )}

      {/* MOBILE */}
      {isMobile && (
        <div className="flex flex-col flex-1">

          {/* 1️⃣ MENU MOBILE */}
          {headerMenuOpen && (
            <div className="px-4 mt-3">
              <HeaderMenuMobile />
            </div>
          )}

          {/* 2️⃣ SIDEBAR MOBILE */}
          {sidebarOpen && (
            <div className="px-4 mt-3">
              <Sidebar open={true} setOpen={setSidebarOpen} variant="mobile" />
            </div>
          )}

          {/* 3️⃣ CONTENUTO */}
          <main className="p-6 flex-1">
            {children}
          </main>
        </div>
      )}
    </div>
  );
}
