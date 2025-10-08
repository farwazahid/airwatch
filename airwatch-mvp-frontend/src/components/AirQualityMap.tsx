"use client";

import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getAQICategory } from "../utils/airQuality";
import { AirQualityData } from "../utils/airQuality";

// You'll need to add your Mapbox token to environment variables
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface AirQualityMapProps {
  data: AirQualityData[];
  selectedLayer: string;
  selectedPollutant: string;
  showSensors: boolean;
  showHeatmap: boolean;
  onLocationSelect: (location: AirQualityData | null) => void;
}

function AirQualityMap({
  data,
  selectedLayer,
  selectedPollutant,
  showSensors,
  showHeatmap,
  onLocationSelect
}: AirQualityMapProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [popup, setPopup] = useState<mapboxgl.Popup | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    try {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.0060, 40.7128],
        zoom: 10
      });

      console.log('Map created successfully');

      if (mapRef.current) {
        mapRef.current.on('load', () => {
          if (!mapRef.current) return;
          console.log('Map loaded successfully');

          // Add data source
          mapRef.current.addSource('air-quality-data', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: data.map((point, index) => ({
                type: 'Feature',
                properties: {
                  id: index,
                  aqi: point.aqi,
                  pm25: point.pm25,
                  pm10: point.pm10,
                  o3: point.o3,
                  no2: point.no2,
                  name: point.location.name
                },
                geometry: {
                  type: 'Point',
                  coordinates: [point.location.lng, point.location.lat]
                }
              }))
            }
          });

          // Add heatmap layer
          if (showHeatmap && selectedLayer === 'heatmap') {
            mapRef.current.addLayer({
              id: 'heatmap',
              type: 'heatmap',
              source: 'air-quality-data',
              paint: {
                'heatmap-weight': [
                  'interpolate',
                  ['linear'],
                  ['get', selectedPollutant],
                  0, 0,
                  300, 1
                ],
                'heatmap-intensity': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  0, 1,
                  15, 3
                ],
                'heatmap-color': [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0, 'rgba(0, 228, 0, 0)',
                  0.1, 'rgba(0, 228, 0, 0.5)',
                  0.2, 'rgba(255, 255, 0, 0.5)',
                  0.3, 'rgba(255, 126, 0, 0.5)',
                  0.4, 'rgba(255, 0, 0, 0.5)',
                  0.5, 'rgba(143, 63, 151, 0.5)',
                  1, 'rgba(126, 0, 35, 0.5)'
                ],
                'heatmap-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  0, 2,
                  15, 20
                ],
                'heatmap-opacity': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  7, 1,
                  15, 0
                ]
              }
            });
          }

          // Add circle layer for sensor points
          if (showSensors && selectedLayer === 'sensors') {
            mapRef.current.addLayer({
              id: 'sensors',
              type: 'circle',
              source: 'air-quality-data',
              paint: {
                'circle-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  0, 4,
                  15, 12
                ],
                'circle-color': [
                  'interpolate',
                  ['linear'],
                  ['get', selectedPollutant],
                  0, '#00e400',
                  50, '#ffff00',
                  100, '#ff7e00',
                  150, '#ff0000',
                  200, '#8f3f97',
                  300, '#7e0023'
                ],
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.8
              }
            });
          }

          // Add click handler for sensor points
          mapRef.current.on('click', 'sensors', (e) => {
            if (!mapRef.current || !e.features) return;
            
            const feature = e.features[0];
            const point = data[feature.properties?.id];
            
            if (point) {
              onLocationSelect(point);
              
              // Create popup
              if (popup) popup.remove();
              
              const newPopup = new mapboxgl.Popup()
                .setLngLat([point.location.lng, point.location.lat])
                .setHTML(`
                  <div class="p-2 min-w-[200px]">
                    <h3 class="font-semibold text-sm mb-2">${point.location.name}</h3>
                    <div class="space-y-1 text-xs">
                      <div class="flex justify-between">
                        <span>AQI:</span>
                        <span class="font-medium">${point.aqi}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>PM2.5:</span>
                        <span class="font-medium">${point.pm25} µg/m³</span>
                      </div>
                      <div class="flex justify-between">
                        <span>PM10:</span>
                        <span class="font-medium">${point.pm10} µg/m³</span>
                      </div>
                      <div class="flex justify-between">
                        <span>O3:</span>
                        <span class="font-medium">${point.o3} ppb</span>
                      </div>
                      <div class="mt-2 pt-2 border-t">
                        <p class="text-xs text-gray-500">
                          ${getAQICategory(point.aqi).description}
                        </p>
                      </div>
                    </div>
                  </div>
                `)
                .addTo(mapRef.current);
              
              setPopup(newPopup);
            }
          });

          // Change cursor on hover
          mapRef.current.on('mouseenter', 'sensors', () => {
            if (mapRef.current) {
              mapRef.current.getCanvas().style.cursor = 'pointer';
            }
          });

          mapRef.current.on('mouseleave', 'sensors', () => {
            if (mapRef.current) {
              mapRef.current.getCanvas().style.cursor = '';
            }
          });

          mapRef.current.on('error', (e) => {
            console.error('Map error:', e);
          });

          mapRef.current.on('style.load', () => {
            console.log('Map style loaded');
          });
        });
      }
    } catch (error) {
      console.error('Error creating map:', error);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [data, onLocationSelect, popup, selectedLayer, selectedPollutant, showHeatmap, showSensors]);

  // Update data when props change
  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    const source = mapRef.current.getSource('air-quality-data') as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData({
        type: 'FeatureCollection',
        features: data.map((point, index) => ({
          type: 'Feature',
          properties: {
            id: index,
            aqi: point.aqi,
            pm25: point.pm25,
            pm10: point.pm10,
            o3: point.o3,
            no2: point.no2,
            name: point.location.name
          },
          geometry: {
            type: 'Point',
            coordinates: [point.location.lng, point.location.lat]
          }
        }))
      });
    }
  }, [data]);

  // Update layers when props change
  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    // Remove existing layers
    if (mapRef.current.getLayer('heatmap')) {
      mapRef.current.removeLayer('heatmap');
    }
    if (mapRef.current.getLayer('sensors')) {
      mapRef.current.removeLayer('sensors');
    }

    // Add layers based on current props
    if (showHeatmap && selectedLayer === 'heatmap') {
      mapRef.current.addLayer({
        id: 'heatmap',
        type: 'heatmap',
        source: 'air-quality-data',
        paint: {
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', selectedPollutant],
            0, 0,
            300, 1
          ],
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1,
            15, 3
          ],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(0, 228, 0, 0)',
            0.1, 'rgba(0, 228, 0, 0.5)',
            0.2, 'rgba(255, 255, 0, 0.5)',
            0.3, 'rgba(255, 126, 0, 0.5)',
            0.4, 'rgba(255, 0, 0, 0.5)',
            0.5, 'rgba(143, 63, 151, 0.5)',
            1, 'rgba(126, 0, 35, 0.5)'
          ],
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 2,
            15, 20
          ],
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, 1,
            15, 0
          ]
        }
      });
    }

    if (showSensors && selectedLayer === 'sensors') {
      mapRef.current.addLayer({
        id: 'sensors',
        type: 'circle',
        source: 'air-quality-data',
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 4,
            15, 12
          ],
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', selectedPollutant],
            0, '#00e400',
            50, '#ffff00',
            100, '#ff7e00',
            150, '#ff0000',
            200, '#8f3f97',
            300, '#7e0023'
          ],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 0.8
        }
      });
    }
  }, [selectedLayer, selectedPollutant, showSensors, showHeatmap]);

  return (
    <div className="w-full h-full relative">
      <div 
        ref={mapContainerRef} 
        className="w-full h-full" 
        style={{ minHeight: '700px', width: '100%' }}
      />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => {
            if (mapRef.current) {
              mapRef.current.zoomIn();
            }
          }}
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: '8px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={() => {
            if (mapRef.current) {
              mapRef.current.zoomOut();
            }
          }}
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: '8px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
          </svg>
        </button>
      </div>

      {/* Map Attribution */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded shadow">
        © Mapbox © OpenStreetMap
      </div>
    </div>
  );
}

export default AirQualityMap;