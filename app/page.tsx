"use client";

import {
  FiUsers,
  FiEye,
  FiTrendingDown,
  FiClock,
  FiGlobe,
  FiGithub,
  FiTrendingUp,
  FiFacebook,
  FiTwitter
} from "react-icons/fi";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Page() {
  const stats = [
    {
      label: "Visitatori unici",
      value: "18.6K",
      change: "+18%",
      positive: true,
      icon: <FiUsers size={18} />,
    },
    {
      label: "Visualizzazioni",
      value: "55.9K",
      change: "+25%",
      positive: true,
      icon: <FiEye size={18} />,
    },
    {
      label: "Bounce rate",
      value: "54%",
      change: "-7%",
      positive: false,
      icon: <FiTrendingDown size={18} />,
    },
    {
      label: "Durata visita",
      value: "2m 56s",
      change: "+12%",
      positive: true,
      icon: <FiClock size={18} />,
    },
  ];

  /* GRAFICO VISITATORI */
  const chartOptions = {
    chart: { id: "visitors", toolbar: { show: false } },
    xaxis: { categories: Array.from({ length: 30 }, (_, i) => i + 1) },
    colors: ["#3b82f6"],
    stroke: { curve: "smooth", width: 3 },
    fill: { opacity: 0.3 },
    dataLabels: { enabled: false },
    grid: { borderColor: "#e5e7eb" },
  };

  const chartSeries = [
    {
      name: "Visitatori",
      data: [
        120, 180, 150, 200, 250, 300, 280, 260, 310, 330,
        290, 270, 350, 370, 390, 360, 340, 320, 300, 280,
        260, 240, 220, 210, 230, 250, 270, 290, 310, 330
      ],
    },
  ];

  /* MAPPA A BARRE (Paesi principali) */
  const countriesOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 4,
      },
    },
    xaxis: {
      categories: ["USA", "Canada", "Francia", "Italia", "Australia", "India"],
    },
    colors: ["#3b82f6"],
    dataLabels: { enabled: false },
    grid: { borderColor: "#e5e7eb" },
  };

  const countriesSeries = [
    {
      name: "Traffico",
      data: [35, 26, 18, 14, 10, 7],
    },
  ];

  return (
    <div className="w-full flex flex-col gap-8">

      {/* TITOLO */}
      <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Panoramica
      </h1>

      {/* CARD ULTRA COMPATTE */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((item, i) => (
          <div
            key={i}
            className="flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs">
              <span className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                {item.icon}
              </span>
              {item.label}
            </div>

            <div className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-2 leading-none">
              {item.value}
            </div>

            <div
              className={`text-xs font-semibold mt-1 ${
                item.positive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {item.change}
            </div>
          </div>
        ))}
      </div>

      {/* GRAFICO VISITATORI */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Analytics Visitatori
          </h2>

          <select className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-700">
            <option>Ultimi 7 giorni</option>
            <option>Ultimi 30 giorni</option>
            <option>Ultimi 90 giorni</option>
          </select>
        </div>

        <Chart options={chartOptions} series={chartSeries} type="area" height={300} />
      </div>

      {/* 🔥 BLOCCO SOTTO IL GRAFICO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* CARD 1 */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Provenienza traffico
          </h3>

          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Diretto — 42%</li>
            <li>• Social — 28%</li>
            <li>• Ricerca — 21%</li>
            <li>• Referral — 9%</li>
          </ul>
        </div>

        {/* CARD 2 */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Dispositivi
          </h3>

          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Mobile — 63%</li>
            <li>• Desktop — 31%</li>
            <li>• Tablet — 6%</li>
          </ul>
        </div>

        {/* CARD 3 */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Pagine più viste
          </h3>

          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• /home — 12.4K</li>
            <li>• /blog — 8.1K</li>
            <li>• /pricing — 5.6K</li>
            <li>• /dashboard — 4.9K</li>
          </ul>
        </div>
      </div>
      {/* SEZIONE: TOP COUNTRIES / TOP CONTENT / TOP CHANNELS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* TOP COUNTRIES — SOLO QUESTA PARTE MODIFICATA */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            🌍 Paesi principali
          </h2>

          {/* MAPPA A BARRE */}
          <div className="rounded-xl overflow-hidden mb-4">
            <Chart
              options={countriesOptions}
              series={countriesSeries}
              type="bar"
              height={250}
            />
          </div>

          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li className="flex justify-between"><span>🇺🇸 Stati Uniti</span><span>35%</span></li>
            <li className="flex justify-between"><span>🇨🇦 Canada</span><span>26%</span></li>
            <li className="flex justify-between"><span>🇫🇷 Francia</span><span>18%</span></li>
            <li className="flex justify-between"><span>🇮🇹 Italia</span><span>14%</span></li>
            <li className="flex justify-between"><span>🇦🇺 Australia</span><span>10%</span></li>
            <li className="flex justify-between"><span>🇮🇳 India</span><span>7%</span></li>
          </ul>
        </div>

        {/* TOP CONTENT */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            📄 Contenuti più visti
          </h2>

          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
            <li className="flex justify-between">
              <span>/</span><span>2.5K viste — 2.1K unici</span>
            </li>
            <li className="flex justify-between">
              <span>/blog/</span><span>376 viste — 139 unici</span>
            </li>
            <li className="flex justify-between">
              <span>/reserve/success</span><span>468 viste — 290 unici</span>
            </li>
            <li className="flex justify-between">
              <span>/product/product-details</span><span>298 viste — 176 unici</span>
            </li>
            <li className="flex justify-between">
              <span>/blog/digital-marketing</span><span>179 viste — 57 unici</span>
            </li>
          </ul>
        </div>

        {/* TOP CHANNELS */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            📡 Canali principali
          </h2>

          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
            <li className="flex justify-between">
              <span>🔍 Google</span><span>4.2K viste — 3.8K unici</span>
            </li>
            <li className="flex justify-between">
              <span>🐙 GitHub</span><span>1.9K viste — 509 unici</span>
            </li>
            <li className="flex justify-between">
              <span>🚀 Product Hunt</span><span>1.5K viste — 986 unici</span>
            </li>
            <li className="flex justify-between">
              <span>📘 Facebook</span><span>974 viste — 639 unici</span>
            </li>
            <li className="flex justify-between">
              <span>🐦 Twitter</span><span>179 viste — 57 unici</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
