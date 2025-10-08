"use client";

import dynamic from "next/dynamic";
import { AirQualityData } from "../utils/airQuality";

// Create a wrapper component that properly handles the dynamic import
const AirQualityMapComponent = dynamic(
  () => import("./AirQualityMap"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    )
  }
);

interface MapWrapperProps {
  data: AirQualityData[];
  selectedLayer: string;
  selectedPollutant: string;
  showSensors: boolean;
  showHeatmap: boolean;
  onLocationSelect: (location: AirQualityData | null) => void;
}

export default function MapWrapper(props: MapWrapperProps) {
  return <AirQualityMapComponent {...props} />;
}
