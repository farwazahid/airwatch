"use client";

import { useState } from "react";
import { Card, Row, Col, Select, Button, Tabs } from "antd";
import { 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  MapPin, 
  Clock,
  BarChart3,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/DashboardLayout";
import ForecastChart from "../../components/ForecastChart";
import ComparisonTool from "../../components/ComparisonTool";

export default function ForecastPage() {
  const [selectedLocation, setSelectedLocation] = useState("Current Location");
  const [selectedPollutant, setSelectedPollutant] = useState("aqi");
  const [activeTab, setActiveTab] = useState("forecast");

  const locations = [
    "Current Location",
    "Downtown",
    "Central Park", 
    "Brooklyn",
    "Queens",
    "Bronx",
    "Manhattan",
    "Staten Island"
  ];

  const pollutants = [
    { value: "aqi", label: "AQI", color: "#16a34a" },
    { value: "pm25", label: "PM2.5", color: "#3b82f6" },
    { value: "pm10", label: "PM10", color: "#8b5cf6" },
    { value: "o3", label: "Ozone", color: "#f59e0b" },
    { value: "no2", label: "NO2", color: "#ef4444" }
  ];

  const tabItems = [
    {
      key: "forecast",
      label: (
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Forecast
        </div>
      ),
      children: (
        <ForecastChart 
          location={selectedLocation}
          pollutant={selectedPollutant}
        />
      )
    },
    {
      key: "comparison",
      label: (
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Comparison
        </div>
      ),
      children: <ComparisonTool />
    },
    {
      key: "alerts",
      label: (
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Alerts
        </div>
      ),
      children: (
        <div className="space-y-6">
          <Card title="Air Quality Alerts">
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Moderate Air Quality Alert</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Air quality is expected to reach moderate levels (AQI 51-100) in Downtown area 
                      between 2:00 PM - 6:00 PM today.
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-yellow-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Downtown
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        2:00 PM - 6:00 PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-800">Unhealthy for Sensitive Groups</h4>
                    <p className="text-sm text-orange-700 mt-1">
                      PM2.5 levels are forecasted to exceed 35 µg/m³ in Central Park 
                      tomorrow morning (6:00 AM - 10:00 AM).
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-orange-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Central Park
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Tomorrow 6:00 AM - 10:00 AM
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Good Air Quality Expected</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Air quality is forecasted to remain in the good range (AQI 0-50) 
                      across all monitored locations for the next 24 hours.
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-green-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        All Locations
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Next 24 hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Alert Settings">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Notification Preferences</h4>
                  <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Email alerts for AQI &gt; 100</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Push notifications for PM2.5 &gt; 35</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">SMS alerts for critical conditions</span>
                      </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Alert Thresholds</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>AQI Warning:</span>
                      <span className="font-medium">100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AQI Critical:</span>
                      <span className="font-medium">200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PM2.5 Warning:</span>
                      <span className="font-medium">35 µg/m³</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    }
  ];

  return (
    <DashboardLayout>
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Air Quality Forecast</h1>
            <p className="text-gray-600">Predictive analysis and location comparison</p>
          </div>

          {/* Controls */}
          <Card className="mb-6">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={12} md={6}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <Select
                    value={selectedLocation}
                    onChange={setSelectedLocation}
                    className="w-full"
                    options={locations.map(loc => ({ label: loc, value: loc }))}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Pollutant</label>
                  <Select
                    value={selectedPollutant}
                    onChange={setSelectedPollutant}
                    className="w-full"
                    options={pollutants.map(poll => ({
                      label: poll.label,
                      value: poll.value
                    }))}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Time Range</label>
                  <Select
                    defaultValue="24h"
                    className="w-full"
                    options={[
                      { label: "Next 24 Hours", value: "24h" },
                      { label: "Next 48 Hours", value: "48h" },
                      { label: "Next 7 Days", value: "7d" }
                    ]}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div className="flex gap-2">
                  <Button type="primary" icon={<Calendar className="w-4 h-4" />}>
                    Calendar View
                  </Button>
                  <Button icon={<TrendingUp className="w-4 h-4" />}>
                    Trends
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Main Content */}
          <Card>
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
              className="forecast-tabs"
            />
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
