"use client";
import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const LocationPicker = ({ location, setLocation }) => {
  const [map, setMap] = useState(null);
  const [pin, setPin] = useState(null);

  async function loadMap() {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    });
    const { Map } = await loader.importLibrary("maps");
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");

    const initialMap = new Map(document.getElementById("mapElem"), {
      mapId: "map",
      center: location,
      zoom: 8,
      mapTypeControl: false,
      streetViewControl: false,
    });
    const initialPin = new AdvancedMarkerElement({
      map: initialMap,
      position: location,
    });
    initialMap.addListener("click", (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      initialPin.position = { lat, lng };
      setLocation({ lat, lng });
    });
    setMap(initialMap);
    setPin(initialPin);
  }

  useEffect(() => {
    loadMap();
  }, []);
  useEffect(() => {
    if (map && pin) {
      map.setCenter(location);
      pin.position = location;
    }
  }, [location, map, pin]);
  return (
    <>
      <div id="mapElem" className="w-full h-[200px]"></div>
    </>
  );
};

export default LocationPicker;
