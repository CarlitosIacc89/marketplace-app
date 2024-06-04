"use client";
import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useRef, useState } from "react";

const DistancePicker = ({ onChange, defaultRadius }) => {
  const [radius, setRadius] = useState(defaultRadius);
  const [center, setCenter] = useState(null);
  const [zoom, setZoom] = useState(7);
  const [geoError, setGeoError] = useState("");

  useEffect(() => {
    if (center) {
      loadMap();
      if (window && window.localStorage) {
        window.localStorage.setItem("center", JSON.stringify(center));
      }
    }
    if (!center) {
      if (
        window &&
        window.localStorage &&
        window.localStorage.getItem("center")
      ) {
        setCenter(JSON.parse(window.localStorage.getItem("center")));
      }
    }
  }, [center]);

  useEffect(() => {
    if (center && radius) {
      onChange({ center, radius });
    }
  }, [radius, center]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => setGeoError(err.message)
    );
  }, []);

  async function loadMap() {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    });
    const Core = await loader.importLibrary("core");
    const { Map, Circle } = await loader.importLibrary("maps");

    const initialMap = new Map(document.getElementById("mapDistance"), {
      mapId: "map",
      center: center,
      zoom: zoom,
      mapTypeControl: false,
      streetViewControl: false,
    });
    const circle = new Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map: initialMap,
      center: center,
      radius,
      editable: true,
    });
    Core.event.addListener(circle, "bounds_changed", () => {
      const radius = circle.getRadius();
      setRadius(radius);
      if (radius > 1500000) initialMap.setZoom(1);
      else if (radius > 800000) initialMap.setZoom(2);
      else if (radius > 400000) initialMap.setZoom(3);
      else if (radius > 180000) initialMap.setZoom(4);
      else if (radius > 100000) initialMap.setZoom(5);
      else if (radius > 50000) initialMap.setZoom(6);
      else if (radius > 25000) initialMap.setZoom(7);
      else if (radius > 11000) initialMap.setZoom(8);
      else if (radius > 5000) initialMap.setZoom(9);
      else if (radius <= 5000) initialMap.setZoom(10);
    });
    Core.event.addListener(circle, "center_changed", () => {
      setCenter(circle.getCenter()?.toJSON());
      initialMap.setCenter(circle.getCenter());
    });
  }
  return (
    <>
      <div id="mapDistance" className="w-full h-64 bg-gray-100 relative">
        {(!center || geoError) && (
          <div className=" absolute inset-0 text-white p-4 content-center">
            <span className="bg-blue-400 p-2 rounded">
              {geoError || "Loading map..."}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default DistancePicker;
