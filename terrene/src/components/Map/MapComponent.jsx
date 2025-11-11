"use client";

import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const locations = [
  {
    name: "Coimbatore",
    coordinates: [77.015083, 11.094444],
  },
  { name: "New York", coordinates: [-74.006, 40.7128] },
  { name: "Los Angeles", coordinates: [-118.2437, 34.0522] },
  { name: "Toronto", coordinates: [-79.3832, 43.6532] },
  { name: "Mexico City", coordinates: [-99.1332, 19.4326] },
  { name: "Buenos Aires", coordinates: [-58.3816, -34.6037] },
  { name: "Sao Paulo", coordinates: [-46.6333, -23.5505] },
  { name: "London", coordinates: [-0.1276, 51.5074] },
  { name: "Paris", coordinates: [2.3522, 48.8566] },
  { name: "Berlin", coordinates: [13.405, 52.52] },
  { name: "Madrid", coordinates: [-3.7038, 40.4168] },
  { name: "Rome", coordinates: [12.4964, 41.9028] },
  { name: "Cairo", coordinates: [31.2357, 30.0444] },
  { name: "Nairobi", coordinates: [36.8219, -1.2921] },
  { name: "Johannesburg", coordinates: [28.0473, -26.2041] },
  { name: "Istanbul", coordinates: [28.9784, 41.0082] },
  { name: "Dubai", coordinates: [55.2708, 25.2048] },
  { name: "Singapore", coordinates: [103.8198, 1.3521] },
  { name: "Tokyo", coordinates: [139.6917, 35.6895] },
  { name: "Seoul", coordinates: [126.978, 37.5665] },
  { name: "Sydney", coordinates: [151.2093, -33.8688] },
  { name: "Auckland", coordinates: [174.7633, -36.8485] },
];

export default function MapChart() {
  const handleMarkerClick = (locationName) => {
    console.log(`Clicked on ${locationName}`);
  };

  return (
      <div
        style={{
          zIndex: 50,
          borderRadius: "2.5rem",
          height: "fit-content",
          width: "100%",
          marginInline: "auto",
          padding: "1rem",
          background: "var(--base-450)",
        }}
      >
        <div
          style={{
            zIndex: 50,
            borderRadius: "1.8rem",
            overflow: "hidden",
            width: "100%",
            aspectRatio: "7/3"
          }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 200,
              // center: [73, 21],
            }}
            style={{
              width: "100%",
              height: "100%",
              background: "var(--base-500)",
            }}
          >
            {/* World Map */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "var(--base-300)",
                        stroke: "var(--base-400)",
                        strokeWidth: 0.4,
                        outline: "none",
                      },
                      hover: {
                        fill: "var(--base-300)", 
                        stroke: "var(--base-400)",
                        strokeWidth: 0.4,
                        outline: "none",
                      },
                      pressed: {
                        fill: "var(--base-300)", 
                        stroke: "var(--base-400)",
                        strokeWidth: 0.4,
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Location Marker */}
            {locations.map((loc) => (
              <Marker
                key={loc.name}
                coordinates={loc.coordinates}
                onClick={() => handleMarkerClick(loc.name)}
              >
                <circle
                  r={6}
                  fill="#ff8400"
                  stroke="var(--base-100)"
                  strokeWidth={1.5}
                  cursor="pointer"
                />
                <text
                  textAnchor="start"
                  y={3}
                  x={10}
                  style={{
                    fill: "var(--base-100)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {loc.name}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>
  );
}
