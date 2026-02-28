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
import type { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Page() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/analytics", { cache: "no-store" });
      const data = await res.json();
      setAnalytics(data);
    }
    load();
  }, []);

  if (!analytics) {
    return (
      <div className="w-full max-w-5xl mx-auto p-10 text-gray-500">
        Caricamento dati reali...
      </div>
    );
  }

  const stats = [
    {
      label: "Visitatori unici",
      value: analytics.visitors,
      change: "+18%",
      positive: true,
      icon: <FiUsers size={18} />,
    },
    {
      label: "Visualizzazioni",
      value: analytics.views,
      change: "+25%",
      positive: true,
      icon: <FiEye size={18} />,
    },
    {
      label: "Bounce rate",
      value: analytics.bounce_rate + "%",
      change: "-7%",
      positive: false,
      icon: <FiTrendingDown size={18} />,
    },
    {
      label: "Durata visita",
      value: analytics.avg_time + "s",
      change: "+12%",
      positive: true,
      icon: <FiClock size={18} />,
    },
  ];

  const chartOptions: ApexOptions = {
    chart: { id: "visitors", toolbar: { show: false } },
    xaxis: { categories: Array.from({ length: analytics.visitors_daily.length }, (_, i) => i + 1) },
    colors: ["#3b82f6"],
    stroke: { curve: "smooth", width: 3 },
    fill: { opacity: 0.3 },
    dataLabels: { enabled: false },
    grid: { borderColor: "#e5e7eb" },
  };

  const chartSeries = [
    {
      name: "Visitatori",
      data: analytics.visitors_daily,
    },
  ];

  const countriesOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 4,
      },
    },
    xaxis: {
      categories: Object.keys(analytics.countries),
    },
    colors: ["#3b82f6"],
    dataLabels: { enabled: false },
    grid: { borderColor: "#e5e7eb" },
  };

  const countriesSeries: ApexAxisChartSeries = [
  {
    name: "Paesi",
    data: countriesData.map((c) => Number(c.value)),
  },
];


  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">

      <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Panoramica
      </h1>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            🌍 Paesi principali
          </h2>

          <div className="rounded-xl overflow-hidden mb-4">
            <Chart
              options={countriesOptions}
              series={countriesSeries}
              type="bar"
              height={250}
            />
          </div>

          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            {Object.entries(analytics.countries).map(([country, value]) => (
              <li key={country} className="flex justify-between">
                <span>{country}</span>
                <span>{value}%</span>
              </li>
            ))}
          </ul>
        </div>

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
