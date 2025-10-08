"use client";

import { useState, useEffect } from "react";
import { Card, Select, Button, Row, Col, Statistic, Alert, Badge } from "antd";
import {  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, Calendar, Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { format, addHours } from "date-fns";
import { getAQIColor } from "../utils/airQuality";

interface ForecastData {
  timestamp: string;
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
  confidence: number;
  weather: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
  };
}

interface ForecastChartProps {
  location?: string;
  pollutant?: string;
}

export default function ForecastChart({ location = "Current Location" }: ForecastChartProps) {
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("24h");
  const [loading, setLoading] = useState(false);

  // Generate mock forecast data
  const generateForecastData = (hours: number): ForecastData[] => {
    const data: ForecastData[] = [];
    const now = new Date();
    const baseAQI = 45;
    
    for (let i = 0; i < hours; i++) {
      const timestamp = addHours(now, i);
      
      // Simulate realistic air quality patterns
      const hour = timestamp.getHours();
      const dayOfWeek = timestamp.getDay();
      
      // Rush hour patterns (worse air quality)
      const rushHourMultiplier = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19) ? 1.3 : 1;
      
      // Weekend patterns (better air quality)
      const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.8 : 1;
      
      // Random variation
      const randomVariation = 0.8 + Math.random() * 0.4;
      
      const aqi = Math.floor(baseAQI * rushHourMultiplier * weekendMultiplier * randomVariation);
      
      data.push({
        timestamp: timestamp.toISOString(),
        aqi,
        pm25: Math.floor(aqi * 0.3 + Math.random() * 10),
        pm10: Math.floor(aqi * 0.5 + Math.random() * 15),
        o3: Math.floor(aqi * 0.4 + Math.random() * 20),
        confidence: Math.max(0.6, 1 - (i * 0.02)), // Confidence decreases over time
        weather: {
          temperature: 20 + Math.sin(i * 0.1) * 5 + Math.random() * 3,
          humidity: 60 + Math.random() * 20,
          windSpeed: 5 + Math.random() * 10,
          condition: ["sunny", "cloudy", "rainy", "windy"][Math.floor(Math.random() * 4)]
        }
      });
    }
    
    return data;
  };

  useEffect(() => {
    setLoading(true);
    const hours = selectedPeriod === "24h" ? 24 : selectedPeriod === "48h" ? 48 : 168; // 7 days
    setTimeout(() => {
      setForecastData(generateForecastData(hours));
      setLoading(false);
    }, 1000);
  }, [selectedPeriod]);

  const formatChartData = forecastData.map(d => ({
    time: format(new Date(d.timestamp), selectedPeriod === "7d" ? "MMM dd" : "HH:mm"),
    aqi: d.aqi,
    pm25: d.pm25,
    pm10: d.pm10,
    o3: d.o3,
    confidence: d.confidence
  }));

  // Calculate forecast statistics
  const currentAQI = forecastData[0]?.aqi || 0;
  const maxAQI = Math.max(...forecastData.map(d => d.aqi));
  const avgAQI = forecastData.reduce((sum, d) => sum + d.aqi, 0) / forecastData.length;

  // Find peak pollution times
  const peakTimes = forecastData
    .filter(d => d.aqi > avgAQI * 1.2)
    .slice(0, 3)
    .map(d => format(new Date(d.timestamp), "HH:mm"));

  // Get alerts for high pollution
  const alerts = forecastData.filter(d => d.aqi > 100);

  const StatCard = ({ title, value, suffix, icon: Icon, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full">
        <Statistic
          title={title}
          value={value}
          suffix={suffix}
          prefix={Icon && <Icon className="w-4 h-4" style={{ color }} />}
          valueStyle={{ color }}
        />
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <div>
                <h3 className="text-lg font-semibold">Air Quality Forecast</h3>
                <p className="text-gray-600">{location}</p>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Select
                value={selectedPeriod}
                onChange={setSelectedPeriod}
                className="w-full"
                options={[
                  { label: "Next 24 Hours", value: "24h" },
                  { label: "Next 48 Hours", value: "48h" },
                  { label: "Next 7 Days", value: "7d" }
                ]}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div className="flex gap-2">
                <Button icon={<Calendar className="w-4 h-4" />}>
                  Calendar View
                </Button>
                <Button icon={<Clock className="w-4 h-4" />}>
                  Timeline
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </motion.div>

      {/* Forecast Statistics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Current AQI"
            value={currentAQI}
            icon={TrendingUp}
            color={getAQIColor(currentAQI)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Peak AQI"
            value={maxAQI}
            icon={TrendingUp}
            color={getAQIColor(maxAQI)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Average AQI"
            value={Math.round(avgAQI)}
            icon={TrendingDown}
            color="#666"
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Forecast Confidence"
            value={Math.round(forecastData[0]?.confidence * 100 || 0)}
            suffix="%"
            icon={TrendingUp}
            color="#16a34a"
          />
        </Col>
      </Row>

      {/* Alerts */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Alert
            message="High Pollution Forecast"
            description={`Air quality is expected to reach unhealthy levels at ${alerts[0] ? format(new Date(alerts[0].timestamp), "HH:mm") : "various times"}. Consider limiting outdoor activities.`}
            type="warning"
            icon={<AlertTriangle className="w-4 h-4" />}
            showIcon
          />
        </motion.div>
      )}

      {/* Forecast Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card title="AQI Forecast Trend" loading={loading}>
          <div className="h-[400px]">
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
                    formatter={(value: any, name: string) => [
                    value,
                    name === 'aqi' ? 'AQI' : name.toUpperCase()
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="aqi"
                  stroke="#16a34a"
                  fill="#16a34a"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Peak Times and Recommendations */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card title="Peak Pollution Times">
              <div className="space-y-2">
                {peakTimes.map((time, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded">
                    <span className="font-medium">{time}</span>
                    <Badge count="High" style={{ backgroundColor: '#ef4444' }} />
                  </div>
                ))}
                {peakTimes.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No peak pollution times forecasted</p>
                )}
              </div>
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card title="Forecast Recommendations">
              <div className="space-y-2">
                {maxAQI > 100 && (
                  <div className="p-2 bg-yellow-50 rounded">
                    <p className="text-sm">Limit outdoor activities during peak hours</p>
                  </div>
                )}
                {maxAQI > 150 && (
                  <div className="p-2 bg-red-50 rounded">
                    <p className="text-sm">Consider staying indoors during high pollution periods</p>
                  </div>
                )}
                {maxAQI <= 100 && (
                  <div className="p-2 bg-green-50 rounded">
                    <p className="text-sm">Good air quality expected throughout the forecast period</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
}
