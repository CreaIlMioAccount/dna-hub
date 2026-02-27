"use client";

import {
  FiHome,
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiMenu,
  FiGrid,
  FiFolder,
  FiStar
} from "react-icons/fi";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  variant?: "desktop" | "mobile";
}

export default function Sidebar({ open, setOpen, variant = "desktop" }: SidebarProps) {
  const menu = [
    { label: "Dashboard", icon: <FiHome />, href: "/" },
    { label: "Analytics", icon: <FiBarChart2 />, href: "/analytics" },
    { label: "Projects", icon: <FiFolder />, href: "/projects" },
    { label: "Favorites", icon: <FiStar />, href: "/favorites" },
    { label: "Settings", icon: <FiSettings />, href: "/settings" },
  ];

  if (variant === "mobile") {
    return (
      <div className="flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-4 w-full">
        <div className="flex items-center gap-3 mb-3">
          <FiGrid className="text-xl text-gray-700 dark:text-gray-300" />
          <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
           Dna-Hub
          </h1>
        </div>

        <nav className="flex flex-col gap-2">
          {menu.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <aside
      className={`
        hidden md:flex flex-col
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        transition-all duration-300
        ${open ? "w-64" : "w-20"}
        h-screen
      `}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <FiGrid className="text-xl text-gray-700 dark:text-gray-300" />
          {open && (
            <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
             Dna-Hub
            </h1>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-gray-600 dark:text-gray-300 cursor-pointer"
        >
          <FiMenu size={22} />
        </button>
      </div>

      <nav className="mt-2">
        {menu.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="flex items-center gap-4 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <span className="text-xl">{item.icon}</span>
            {open && <span className="text-sm font-medium">{item.label}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
