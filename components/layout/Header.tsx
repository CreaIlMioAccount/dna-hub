"use client";

import { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiBell,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiHome,
  FiBarChart2,
  FiFolder,
  FiStar
} from "react-icons/fi";
import { BsSun, BsMoon } from "react-icons/bs";
import Image from "next/image";

interface HeaderProps {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  setSidebarMobile: (value: boolean) => void;
  isMobile: boolean;
}

export default function Header({
  openMenu,
  setOpenMenu,
  setSidebarMobile,
  isMobile
}: HeaderProps) {
  const [openProfile, setOpenProfile] = useState(false);

  const profileRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setOpenProfile(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest("#header-menu-toggle")) {
          setOpenMenu(false);
          setSidebarMobile(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpenMenu, setSidebarMobile]);

  return (
    <header className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-8 py-5 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-[1.05rem]">

      {/* LEFT */}
      <div
  className="relative flex items-center gap-4 
             flex-row            /* MOBILE: logo affianco al menu */
             md:flex-row"        /* DESKTOP: tutto in fila */
  ref={menuRef}
>

        <button
          id="header-menu-toggle"
          onClick={() => {
            setOpenMenu(!openMenu);
            if (isMobile) setSidebarMobile(!openMenu);
          }}
          className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300 cursor-pointer"
        >
          <FiMenu size={24} />
        </button>

        <div className="flex flex-col items-start">
          <Image
            src="/logo.png"
            alt="Logo"
            width={75}
            height={75}
            className="object-contain select-none pointer-events-none"
          />

          {/* ORA L’OROLOGIO VA SOTTO AL LOGO IN MOBILE */}
          <div className="md:hidden mt-2">
            <Clock />
          </div>
        </div>

        {/* ORA L’OROLOGIO TORNA A DESTRA IN DESKTOP */}
        <div className="hidden md:block">
          <Clock />
        </div>

        {/* MENU DESKTOP RIPRISTINATO */}
        {openMenu && !isMobile && (
          <div className="absolute top-20 left-0 w-64 bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-200 dark:border-gray-800 p-4 z-50 text-[0.95rem]">
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                <FiHome size={18} />
                Dashboard
              </button>

              <button className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                <FiBarChart2 size={18} />
                Analytics
              </button>

              <button className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                <FiFolder size={18} />
                Projects
              </button>

              <button className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                <FiStar size={18} />
                Favorites
              </button>

              <button className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                <FiSettings size={18} />
                Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CENTER */}
      <div className="flex flex-col flex-1 md:flex-none" />

      {/* RIGHT */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5 w-full md:w-auto">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-xl w-full md:w-80">
          <FiSearch className="text-gray-500 mr-3" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full text-[1.05rem]"
          />
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300">
            <BsSun size={20} />
          </button>

          <button className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300">
            <BsMoon size={20} />
          </button>

          <button className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300">
            <FiBell size={20} />
          </button>

          <div className="relative" ref={profileRef}>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setOpenProfile(!openProfile)}
            >
              <Image
                src="/images/profile.png"
                alt="Profile"
                width={44}
                height={44}
                className="rounded-full object-cover"
              />
              <span className="text-[1.05rem] font-medium text-gray-800 dark:text-gray-200">
                John Smith
              </span>
              <FiChevronDown size={18} className="text-gray-500" />
            </div>

            {openProfile && (
              <div className="absolute right-0 mt-4 w-72 bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-200 dark:border-gray-800 p-4 z-50 text-[0.95rem]">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/images/profile.png"
                    alt="Profile"
                    width={52}
                    height={52}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">John Smith</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">johnson@nextadmin.com</p>
                  </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700 mb-3" />

                <div className="flex flex-col gap-2">
                  <button className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <FiUser size={18} />
                    View profile
                  </button>

                  <button className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <FiSettings size={18} />
                    Account settings
                  </button>

                  <button className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600">
                    <FiLogOut size={18} />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/* CLOCK */
function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();

      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");

      setTime(`${day}/${month}/${year} — ${h}:${m}:${s}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-5 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 font-medium text-[1.05rem] shadow-sm select-none">
      {time}
    </div>
  );
}
