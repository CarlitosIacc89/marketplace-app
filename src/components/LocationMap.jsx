"use client";
import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect } from "react";

const LocationMap = ({ location, ...divProps }) => {
  useEffect(() => {
    loadMap();
  }, []);

  async function loadMap() {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    });
    const { Map } = await loader.importLibrary("maps");
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");

    const initialMap = new Map(document.getElementById("mapsDiv"), {
      mapId: "map",
      center: location,
      zoom: 8,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: true,
    });
    const initialPin = new AdvancedMarkerElement({
      map: initialMap,
      position: location,
    });
  }
  return (
    <>
      <div {...divProps} id="mapsDiv">
        Map
      </div>
    </>
  );
};

export default LocationMap;
