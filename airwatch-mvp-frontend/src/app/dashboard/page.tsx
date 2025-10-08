"use client";

import { Card, Col, Row, Alert, Progress } from "antd";
import {  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Activity, Shield, Wind, Sun, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import DashboardLayout from "../../components/DashboardLayout";
import { generateMockData, generateHistoricalData, getAQICategory, getAQIColor, getTimeAgo } from "../../utils/airQuality";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [currentData, setCurrentData] = useState<any>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize data on client side only to avoid hydration mismatch
    setCurrentData(generateMockData()[0]);
    setHistoricalData(generateHistoricalData(7));
    setLastUpdated(new Date().toISOString());
    setIsLoading(false);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newData = generateMockData()[0];
      setCurrentData(newData);
      setLastUpdated(new Date().toISOString());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Show loading state while data initializes
  if (isLoading || !currentData || historicalData.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-lg text-gray-600">Loading air quality data...</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const aqiCategory = getAQICategory(currentData.aqi);
  const aqiColor = getAQIColor(currentData.aqi);

  // Calculate trends (simplified)
  const recentData = historicalData.slice(-24); // Last 24 hours
  const previousData = historicalData.slice(-48, -24); // Previous 24 hours
  const currentAvg = recentData.reduce((sum, d) => sum + d.aqi, 0) / recentData.length;
  const previousAvg = previousData.reduce((sum, d) => sum + d.aqi, 0) / previousData.length;
  const trend = currentAvg > previousAvg ? "up" : "down";
  const trendPercentage = Math.abs(((currentAvg - previousAvg) / previousAvg) * 100);

  const formatChartData = historicalData.slice(-24).map((d, ) => ({
    time: format(new Date(d.timestamp), "HH:mm"),
    aqi: d.aqi,
    pm25: d.pm25,
    pm10: d.pm10,
    o3: d.o3
  }));

  const StatCard = ({ title, value, suffix, icon: Icon, color, trend, trendValue }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-sm text-gray-600 mb-1">{title}</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold" style={{ color }}>
                {value}
              </span>
              {suffix && <span className="text-sm text-gray-500">{suffix}</span>}
            </div>
            {trend && (
              <div className="flex items-center gap-1 mt-1">
                {trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-red-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-green-500" />
                )}
                <span className={`text-xs ${trend === "up" ? "text-red-500" : "text-green-500"}`}>
                  {trendValue}%
                </span>
              </div>
            )}
          </div>
          <div className="p-2 rounded-full" style={{ backgroundColor: `${color}20` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <div className="w-full space-y-6">
        {/* Header with current status */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Air Quality Dashboard</h1>
              <p className="text-gray-600">Real-time air quality monitoring and analysis</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Last updated</div>
              <div className="text-sm font-medium">{getTimeAgo(lastUpdated)}</div>
            </div>
          </div>
        </motion.div>

        {/* Current AQI Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl pulse-green"
                  style={{ backgroundColor: aqiColor }}
                >
                  {currentData.aqi}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{aqiCategory.level}</h2>
                  <p className="text-gray-600">{aqiCategory.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">24h Trend</div>
                <div className="flex items-center gap-1">
                  {trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-red-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  )}
                  <span className={`font-medium ${trend === "up" ? "text-red-500" : "text-green-500"}`}>
                    {trendPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Health Alert */}
        {currentData.aqi > 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Alert
              message={aqiCategory.healthMessage}
              description={
                <div>
                  <p className="mb-2">Recommendations:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {aqiCategory.recommendations.slice(0, 3).map((rec, index) => (
                      <li key={index} className="text-sm">{rec}</li>
                    ))}
                  </ul>
                </div>
              }
              type={currentData.aqi > 200 ? "error" : "warning"}
              showIcon
              className="mb-6"
            />
          </motion.div>
        )}

        {/* Key Metrics */}
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={12} md={6}>
            <StatCard
              title="PM2.5 (µg/m³)"
              value={currentData.pm25}
              icon={Droplets}
              color="#3b82f6"
              trend={trend}
              trendValue={trendPercentage.toFixed(1)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatCard
              title="PM10 (µg/m³)"
              value={currentData.pm10}
              icon={Wind}
              color="#8b5cf6"
              trend={trend}
              trendValue={trendPercentage.toFixed(1)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatCard
              title="O3 (ppb)"
              value={currentData.o3}
              icon={Sun}
              color="#f59e0b"
              trend={trend}
              trendValue={trendPercentage.toFixed(1)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatCard
              title="NO2 (ppb)"
              value={currentData.no2}
              icon={Activity}
              color="#ef4444"
              trend={trend}
              trendValue={trendPercentage.toFixed(1)}
            />
          </Col>
        </Row>

        {/* Charts Section */}
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={16}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card title="24-Hour Air Quality Trends" className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={formatChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#666"
                      fontSize={12}
                      tick={{ fill: '#666' }}
                    />
                    <YAxis 
                      stroke="#666"
                      fontSize={12}
                      tick={{ fill: '#666' }}
                    />
                    <RechartsTooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="aqi"
                      stroke={aqiColor}
                      fill={aqiColor}
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card title="Pollutant Breakdown" className="h-[400px]">
                <div className="space-y-4">
                  {[
                    { name: "PM2.5", value: currentData.pm25, max: 50, color: "#3b82f6" },
                    { name: "PM10", value: currentData.pm10, max: 100, color: "#8b5cf6" },
                    { name: "O3", value: currentData.o3, max: 100, color: "#f59e0b" },
                    { name: "NO2", value: currentData.no2, max: 50, color: "#ef4444" },
                    { name: "CO", value: currentData.co, max: 10, color: "#6b7280" },
                    { name: "SO2", value: currentData.so2, max: 20, color: "#10b981" }
                  ].map((pollutant) => (
                    <div key={pollutant.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{pollutant.name}</span>
                        <span className="text-sm text-gray-600">{pollutant.value}</span>
                      </div>
                      <Progress
                        percent={(pollutant.value / pollutant.max) * 100}
                        strokeColor={pollutant.color}
                        showInfo={false}
                        size="small"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card title="Health Recommendations">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">For General Population</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {aqiCategory.recommendations.slice(0, 3).map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">For Sensitive Groups</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    Children and elderly should limit outdoor activities
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    People with asthma should carry inhalers
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    Consider indoor air purifiers
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}