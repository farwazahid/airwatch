"use client";

import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  EnvironmentOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // Convert pathname to menu key
  const getSelectedKey = (path: string) => {
    switch (path) {
      case "/dashboard":
        return "1";
      case "/map":
        return "2";
      case "/forecast":
        return "3";
      default:
        return "1";
    }
  };

  const handleMenuClick = (key: string) => {
    switch (key) {
      case "1":
        router.push("/dashboard");
        break;
      case "2":
        router.push("/map");
        break;
      case "3":
        router.push("/forecast");
        break;
    }
  };

  return (
    <aside className="w-56 border-r border-gray-100 h-[calc(100vh-64px)] sticky top-0 bg-white sidebar-enhanced">
      <div className="p-4 flex flex-col gap-6 h-full">
        <div className="flex items-center gap-2 px-2">
          <div className="w-9 h-9 rounded-full bg-eco-green-50 flex items-center justify-center text-eco-green-600 icon-enhanced">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15 8H9L12 2Z" fill="#16a34a" />
              <circle cx="12" cy="15" r="6" fill="#34d399" />
            </svg>
          </div>
          <div className="text-sm font-semibold text-[#0b3b16]">AirWatch</div>
        </div>

        <div className="flex-1 px-2">
          <Menu
            mode="inline"
            selectedKeys={[getSelectedKey(pathname)]}
            onClick={({ key }) => handleMenuClick(key)}
            items={[
              { key: "1", icon: <DashboardOutlined />, label: "Dashboard" },
              { key: "2", icon: <EnvironmentOutlined />, label: "Map" },
              { key: "3", icon: <LineChartOutlined />, label: "Forecast" },
            ]}
          />
        </div>

        <div className="px-2">
          <small className="text-xs text-gray-400">v0.1 • green theme</small>
        </div>
      </div>
    </aside>
  );
}
