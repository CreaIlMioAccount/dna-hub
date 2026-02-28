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
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
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
  // --- Paesi principali ---
  const countriesData = Object.entries(analytics.countries).map(([country, value]) => ({
    label: country,
    value: Number(value),
  }));

  const countriesSeries: ApexOptions["series"] = [
    {
      name: "Paesi",
      data: countriesData.map((c) => c.value),
    },
  ];
      </div>
    </div>
  );
}
