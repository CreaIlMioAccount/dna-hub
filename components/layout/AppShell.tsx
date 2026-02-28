"use client";

import { useState, ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { FiMenu } from "react-icons/fi";

export default function AppShell({ children }: { children: ReactNode }) {
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<null | boolean>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile === null) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">

      <Header
        openMenu={headerMenuOpen}
        setOpenMenu={setHeaderMenuOpen}
        isMobile={isMobile}
      />

      {!isMobile && (
        <div className="flex flex-1">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} variant="desktop" />
          <main className="flex-1 p-10">{children}</main>
        </div>
      )}

      {isMobile && (
        <div className="flex flex-col flex-1">

          {/* BARRA MOBILE ORIZZONTALE COMPATTA */}
          <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-12">
            <div className="text-base font-semibold text-gray-800 dark:text-gray-200">
              Dna-Hub
            </div>

            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300"
            >
              <FiMenu size={20} />
            </button>
          </div>

          {sidebarOpen && (
            <div className="absolute inset-0 z-50 bg-black/40">
              <div className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 shadow-xl">

                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-full"
                >
                  ✕
                </button>

                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} variant="mobile" />
              </div>
            </div>
          )}

          <main className="p-4">{children}</main>
        </div>
      )}
    </div>
  );
}
