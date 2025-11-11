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
          height: "620px",
          width: "100%",
        }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 750,
            center: [73, 21],
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
                      fill: "var(--base-300)", // same as default
                      stroke: "var(--base-400)",
                      strokeWidth: 0.4,
                      outline: "none",
                    },
                    pressed: {
                      fill: "var(--base-300)", // same as default
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
                fill="var(--base-250)"
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
                  fontWeight: 500,
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
