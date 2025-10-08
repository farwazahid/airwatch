"use client";

import { useState } from "react";
import { Card, Row, Col, Select, Button, Tooltip, Switch } from "antd";
import { 
  Layers, 
  MapPin, 
  Thermometer, 
  RefreshCw,
  Download,
  Share2
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/DashboardLayout";
import { generateMockData } from "../../utils/airQuality";

import MapWrapper from "../../components/MapWrapper";

export default function MapPage() {
  const [selectedLayer, setSelectedLayer] = useState("heatmap");
  const [showSensors, setShowSensors] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [selectedPollutant, setSelectedPollutant] = useState("aqi");
  const [timeRange, setTimeRange] = useState("realtime");
  const [mapData, setMapData] = useState(generateMockData());
  const [, setSelectedLocation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setMapData(generateMockData());
      setIsLoading(false);
    }, 1000);
  };

  const layerOptions = [
    { value: "heatmap", label: "Heat Map", icon: <Thermometer className="w-4 h-4" /> },
    { value: "sensors", label: "Sensor Points", icon: <MapPin className="w-4 h-4" /> },
    { value: "contours", label: "Contour Lines", icon: <Layers className="w-4 h-4" /> }
  ];

  const pollutantOptions = [
    { value: "aqi", label: "AQI", color: "#16a34a" },
    { value: "pm25", label: "PM2.5", color: "#3b82f6" },
    { value: "pm10", label: "PM10", color: "#8b5cf6" },
    { value: "o3", label: "Ozone", color: "#f59e0b" },
    { value: "no2", label: "NO2", color: "#ef4444" }
  ];

  const timeRangeOptions = [
    { value: "realtime", label: "Real-time" },
    { value: "1hour", label: "1 Hour" },
    { value: "24hours", label: "24 Hours" },
    { value: "7days", label: "7 Days" }
  ];

  return (
    <DashboardLayout>
      <div className="w-full h-[calc(100vh-64px)] flex flex-col">
        {/* Map Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-4">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={12} md={6}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Visualization Layer</label>
                  <Select
                    value={selectedLayer}
                    onChange={setSelectedLayer}
                    className="w-full"
                    options={layerOptions.map(option => ({
                      value: option.value,
                      label: (
                        <div className="flex items-center gap-2">
                          {option.icon}
                          {option.label}
                        </div>
                      )
                    }))}
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
                    options={pollutantOptions.map(option => ({
                      value: option.value,
                      label: (
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: option.color }}
                          />
                          {option.label}
                        </div>
                      )
                    }))}
                  />
                </div>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Time Range</label>
                  <Select
                    value={timeRange}
                    onChange={setTimeRange}
                    className="w-full"
                    options={timeRangeOptions}
                  />
                </div>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <div className="flex gap-2">
                  <Tooltip title="Refresh Data">
                    <Button 
                      icon={<RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}
                      onClick={refreshData}
                      loading={isLoading}
                    />
                  </Tooltip>
                  <Tooltip title="Export Map">
                    <Button icon={<Download className="w-4 h-4" />} />
                  </Tooltip>
                  <Tooltip title="Share Map">
                    <Button icon={<Share2 className="w-4 h-4" />} />
                  </Tooltip>
                </div>
              </Col>
            </Row>

            {/* Toggle Controls */}
            <Row gutter={[16, 16]} className="mt-4">
              <Col>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={showSensors} 
                    onChange={setShowSensors}
                    size="small"
                  />
                  <span className="text-sm">Show Sensor Points</span>
                </div>
              </Col>
              <Col>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={showHeatmap} 
                    onChange={setShowHeatmap}
                    size="small"
                  />
                  <span className="text-sm">Show Heat Map</span>
                </div>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col span={24}>
                
                            {/* Map Legend */}
              <div className=" bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <h4 className="font-medium mb-2">AQI Color Scale</h4>
                <div className="space-y-1">
                  {[
                    { range: "0-50", label: "Good", color: "#00e400" },
                    { range: "51-100", label: "Moderate", color: "#ffff00" },
                    { range: "101-150", label: "Unhealthy for Sensitive", color: "#ff7e00" },
                    { range: "151-200", label: "Unhealthy", color: "#ff0000" },
                    { range: "201-300", label: "Very Unhealthy", color: "#8f3f97" },
                    { range: "301+", label: "Hazardous", color: "#7e0023" }
                  ].map((item) => (
                    <div key={item.range} className="flex items-center gap-2">
                      <div 
                        className="w-5 h-5 rounded flex-shrink-0 border border-gray-200"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs font-medium text-gray-700 min-w-[45px]">{item.range}</span>
                      <span className="text-xs text-gray-600">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              </Col>
            </Row>
          </Card>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ flex: 1 }}
        >
          <Card className="h-full" classNames={{body: 'p-0'}}>
            <div className="w-full h-full">
              <MapWrapper
                data={mapData}
                selectedLayer={selectedLayer}
                selectedPollutant={selectedPollutant}
                showSensors={showSensors}
                showHeatmap={showHeatmap}
                onLocationSelect={setSelectedLocation}
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}