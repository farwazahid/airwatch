export interface AirQualityData {
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  co: number;
  so2: number;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
}

export interface AQICategory {
  level: string;
  color: string;
  description: string;
  healthMessage: string;
  recommendations: string[];
}

export const getAQICategory = (aqi: number): AQICategory => {
  if (aqi <= 50) {
    return {
      level: "Good",
      color: "#00e400",
      description: "Air quality is satisfactory",
      healthMessage: "No health impacts expected",
      recommendations: [
        "Enjoy outdoor activities",
        "Open windows for fresh air",
        "Ideal for outdoor exercise"
      ]
    };
  } else if (aqi <= 100) {
    return {
      level: "Moderate",
      color: "#ffff00",
      description: "Air quality is acceptable",
      healthMessage: "Sensitive people may experience minor breathing discomfort",
      recommendations: [
        "Sensitive individuals should limit outdoor activities",
        "Consider wearing a mask if you have respiratory issues",
        "Keep windows closed if you have allergies"
      ]
    };
  } else if (aqi <= 150) {
    return {
      level: "Unhealthy for Sensitive Groups",
      color: "#ff7e00",
      description: "Sensitive groups may experience health effects",
      healthMessage: "Children, elderly, and people with heart/lung disease should avoid outdoor activities",
      recommendations: [
        "Avoid outdoor exercise",
        "Keep windows and doors closed",
        "Use air purifiers indoors",
        "Consider wearing N95 masks outdoors"
      ]
    };
  } else if (aqi <= 200) {
    return {
      level: "Unhealthy",
      color: "#ff0000",
      description: "Everyone may experience health effects",
      healthMessage: "Everyone should avoid outdoor activities",
      recommendations: [
        "Stay indoors as much as possible",
        "Use air purifiers with HEPA filters",
        "Wear N95 masks if going outside",
        "Avoid outdoor exercise completely"
      ]
    };
  } else if (aqi <= 300) {
    return {
      level: "Very Unhealthy",
      color: "#8f3f97",
      description: "Health warnings of emergency conditions",
      healthMessage: "Everyone should avoid all outdoor activities",
      recommendations: [
        "Stay indoors with windows and doors closed",
        "Use high-efficiency air purifiers",
        "Avoid any outdoor activities",
        "Consider relocating if possible"
      ]
    };
  } else {
    return {
      level: "Hazardous",
      color: "#7e0023",
      description: "Health alert: everyone may experience serious health effects",
      healthMessage: "Emergency conditions - everyone should avoid all outdoor activities",
      recommendations: [
        "Stay indoors with all windows and doors closed",
        "Use multiple high-efficiency air purifiers",
        "Avoid any outdoor exposure",
        "Consider emergency evacuation if possible"
      ]
    };
  }
};

export const generateMockData = (): AirQualityData[] => {
  const locations = [
    { name: "Downtown", lat: 40.7128, lng: -74.0060 },
    { name: "Central Park", lat: 40.7829, lng: -73.9654 },
    { name: "Brooklyn", lat: 40.6782, lng: -73.9442 },
    { name: "Queens", lat: 40.7282, lng: -73.7949 },
    { name: "Bronx", lat: 40.8448, lng: -73.8648 }
  ];

  return locations.map((location) => ({
    aqi: Math.floor(Math.random() * 200) + 20,
    pm25: Math.floor(Math.random() * 50) + 5,
    pm10: Math.floor(Math.random() * 80) + 10,
    o3: Math.floor(Math.random() * 100) + 10,
    no2: Math.floor(Math.random() * 60) + 5,
    co: Math.floor(Math.random() * 10) + 1,
    so2: Math.floor(Math.random() * 30) + 2,
    timestamp: new Date().toISOString(),
    location
  }));
};

export const generateHistoricalData = (days: number = 7): AirQualityData[] => {
  const data: AirQualityData[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate 24 data points per day (hourly)
    for (let hour = 0; hour < 24; hour++) {
      const timestamp = new Date(date);
      timestamp.setHours(hour, 0, 0, 0);
      
      // Simulate daily patterns (worse during rush hours)
      const baseAQI = 30;
      const rushHourMultiplier = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19) ? 1.5 : 1;
      const randomVariation = Math.random() * 0.4 + 0.8; // 0.8 to 1.2
      
      const aqi = Math.floor(baseAQI * rushHourMultiplier * randomVariation);
      
      data.push({
        aqi,
        pm25: Math.floor(aqi * 0.3 + Math.random() * 10),
        pm10: Math.floor(aqi * 0.5 + Math.random() * 15),
        o3: Math.floor(aqi * 0.4 + Math.random() * 20),
        no2: Math.floor(aqi * 0.2 + Math.random() * 8),
        co: Math.floor(aqi * 0.05 + Math.random() * 2),
        so2: Math.floor(aqi * 0.1 + Math.random() * 5),
        timestamp: timestamp.toISOString(),
        location: {
          lat: 40.7128,
          lng: -74.0060,
          name: "Current Location"
        }
      });
    }
  }
  
  return data;
};

export const getAQIColor = (aqi: number): string => {
  const category = getAQICategory(aqi);
  return category.color;
};

export const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleString();
};

export const getTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};
