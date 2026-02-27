"use client";

import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative flex items-center w-14 h-7 bg-gray-300 dark:bg-gray-700 rounded-full px-1 transition-all duration-300"
    >
      <div
        className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white dark:bg-black shadow transition-all duration-300
        ${theme === "light" ? "translate-x-0" : "translate-x-7"}`}
      />

      <FiSun className="text-yellow-500 absolute left-2 text-sm" />
      <FiMoon className="text-blue-300 absolute right-2 text-sm" />
    </button>
  );
}
