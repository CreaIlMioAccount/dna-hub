// @ts-nocheck
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
export default function Header({
  openMenu,
  setOpenMenu,
  isMobile,
}: {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  isMobile: boolean;
}) {

  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  
useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
      setOpenProfile(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);





  return (
    <header className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-8 py-5 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-[1.05rem]">

      {/* LEFT */}
      <div className="relative flex items-center gap-4">

        {/* HAMBURGER → apre solo la card menu */}
        <button
          id="header-menu-toggle"
          onClick={() => setOpenMenu(!openMenu)}
          className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300 cursor-pointer"
        >
          <FiMenu size={24} />
        </button>

        <Image
          src="/logo.png"
          alt="Logo"
          width={75}
          height={75}
          className="object-contain select-none pointer-events-none"
        />

        <Clock />
      </div>

      {/* MENU CARD DESKTOP */}
      {openMenu && !isMobile && (
        <div className="absolute top-20 left-8 w-64 bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-200 dark:border-gray-800 p-4 z-50">
          <MenuItems />
        </div>
      )}

      {/* MENU CARD MOBILE */}
      {openMenu && isMobile && (
        <div className="w-full md:hidden">
          <div className="w-full bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-800 p-4">
            <MenuItems />
          </div>
        </div>
      )}

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
              <div className="absolute right-0 mt-4 w-72 bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-200 dark:border-gray-800 p-4 z-50">
                <ProfileMenu />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function MenuItems() {
  return (
    <div className="flex flex-col gap-2">
      <MenuItem icon={<FiHome />} label="Dashboard" />
      <MenuItem icon={<FiBarChart2 />} label="Analytics" />
      <MenuItem icon={<FiFolder />} label="Projects" />
      <MenuItem icon={<FiStar />} label="Favorites" />
      <MenuItem icon={<FiSettings />} label="Settings" />
    </div>
  );
}

function MenuItem({ icon, label }) {
  return (
    <button className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
      {icon}
      {label}
    </button>
  );
}

function ProfileMenu() {
  return (
    <div className="flex flex-col gap-2">
      <MenuItem icon={<FiUser />} label="View profile" />
      <MenuItem icon={<FiSettings />} label="Account settings" />
      <MenuItem icon={<FiLogOut />} label="Log out" />
    </div>
  );
}

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
