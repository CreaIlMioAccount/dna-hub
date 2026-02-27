"use client";

import {
  FiHome,
  FiBarChart2,
  FiFolder,
  FiStar,
  FiSettings
} from "react-icons/fi";

export default function HeaderMenuMobile() {
  return (
    <div className="w-full bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-[0.95rem]">
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
  );
}
